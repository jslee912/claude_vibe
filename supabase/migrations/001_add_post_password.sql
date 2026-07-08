-- Supabase SQL Editor에서 이 파일 전체를 붙여넣고 실행하세요.
-- (anon key로는 실행할 수 없는 DDL이라 대시보드에서 직접 실행해야 합니다.)

-- 1. 비밀번호 해시에 사용할 확장 기능
create extension if not exists pgcrypto;

-- 2. posts 테이블에 password 컬럼 추가 (평문이 아닌 bcrypt 해시로 저장됨)
alter table posts add column if not exists password text;

-- 3. INSERT/UPDATE 시 password 값을 자동으로 해시 처리
create or replace function hash_post_password()
returns trigger
language plpgsql
as $$
begin
  if new.password is not null and new.password !~ '^\$2[aby]\$' then
    new.password := crypt(new.password, gen_salt('bf'));
  end if;
  return new;
end;
$$;

drop trigger if exists trg_hash_post_password on posts;
create trigger trg_hash_post_password
before insert or update on posts
for each row execute function hash_post_password();

-- 4. 비밀번호 검증 후 수정하는 RPC (해시는 함수 밖으로 절대 노출되지 않음)
create or replace function update_post_with_password(
  post_id bigint,
  input_password text,
  new_title text,
  new_content text
) returns table (id bigint, created_at timestamptz, title text, content text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from posts p
    where p.id = post_id and p.password = crypt(input_password, p.password)
  ) then
    raise exception 'INVALID_PASSWORD';
  end if;

  return query
  update posts
  set title = new_title, content = new_content
  where posts.id = post_id
  returning posts.id, posts.created_at, posts.title, posts.content;
end;
$$;

-- 5. 비밀번호 검증 후 삭제하는 RPC
create or replace function delete_post_with_password(
  post_id bigint,
  input_password text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from posts p
    where p.id = post_id and p.password = crypt(input_password, p.password)
  ) then
    raise exception 'INVALID_PASSWORD';
  end if;

  delete from posts where id = post_id;
  return true;
end;
$$;

grant execute on function update_post_with_password(bigint, text, text, text) to anon, authenticated;
grant execute on function delete_post_with_password(bigint, text) to anon, authenticated;

-- 6. RLS 활성화: 목록 조회/작성은 누구나 가능, 수정/삭제는 위 RPC를 통해서만 가능
alter table posts enable row level security;

drop policy if exists "public can read posts" on posts;
create policy "public can read posts"
on posts for select
using (true);

drop policy if exists "public can insert posts" on posts;
create policy "public can insert posts"
on posts for insert
with check (true);

-- update/delete 정책을 만들지 않음 -> anon 키로 테이블에 직접 UPDATE/DELETE 불가능.
-- 오직 SECURITY DEFINER로 정의된 위 두 RPC 함수를 통해서만 수정/삭제가 가능합니다.
