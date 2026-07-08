import "./MarqueeBanner.css";

const items = [
  { label: "공지", text: "커뮤니티 이용규칙이 새롭게 업데이트되었습니다" },
  { label: "이벤트", text: "이번 달 우수 게시글 작성자에게 커피 쿠폰을 드려요" },
  { label: "TIP", text: "마크다운 문법으로 글을 꾸며보세요" },
  { label: "안내", text: "신규 카테고리 '취미'가 추가되었습니다" },
];

const track = [...items, ...items];

export default function MarqueeBanner() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {track.map((item, i) => (
          <span className="marquee__item" key={i}>
            <strong>{item.label}</strong>
            {item.text}
            <span className="marquee__dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
