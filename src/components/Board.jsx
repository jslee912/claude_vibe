import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const tokens = {
  colors: {
    primary: "#533afd",
    primaryDeep: "#4434d4",
    primaryPress: "#2e2b8c",
    primarySubdued: "#b9b9f9",
    ink: "#0d253d",
    inkSecondary: "#273951",
    inkMute: "#64748d",
    onPrimary: "#ffffff",
    canvas: "#ffffff",
    canvasSoft: "#f6f9fc",
    hairline: "#e3e8ee",
    hairlineInput: "#a8c3de",
    danger: "#ea2261",
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    huge: 64,
  },
  radius: {
    sm: 6,
    lg: 12,
    pill: 9999,
  },
  typography: {
    displayMd: { fontSize: 26, fontWeight: 300, lineHeight: 1.12, letterSpacing: "-0.26px" },
    headingMd: { fontSize: 20, fontWeight: 300, lineHeight: 1.4, letterSpacing: "-0.2px" },
    bodyMd: { fontSize: 15, fontWeight: 300, lineHeight: 1.4, letterSpacing: 0 },
    buttonMd: { fontSize: 16, fontWeight: 400, lineHeight: 1, letterSpacing: 0 },
    caption: { fontSize: 13, fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.39px" },
    microCap: { fontSize: 10, fontWeight: 400, lineHeight: 1.15, letterSpacing: "0.1px", textTransform: "uppercase" },
  },
  fontFamily: "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: tokens.colors.canvasSoft,
    fontFamily: tokens.fontFamily,
    fontFeatureSettings: '"ss01"',
    color: tokens.colors.ink,
    padding: `${tokens.spacing.huge}px ${tokens.spacing.xl}px`,
  },
  wrapper: {
    maxWidth: 720,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacing.xl,
  },
  titleGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing.sm,
  },
  title: {
    ...tokens.typography.displayMd,
    color: tokens.colors.primary,
    margin: 0,
  },
  count: {
    ...tokens.typography.microCap,
    background: tokens.colors.primarySubdued,
    color: tokens.colors.primaryDeep,
    borderRadius: tokens.radius.pill,
    padding: `4px ${tokens.spacing.sm}px`,
  },
  writeButton: {
    ...tokens.typography.buttonMd,
    background: tokens.colors.primary,
    color: tokens.colors.onPrimary,
    border: "none",
    borderRadius: tokens.radius.pill,
    padding: `${tokens.spacing.sm}px ${tokens.spacing.lg}px`,
    cursor: "pointer",
  },
  form: {
    background: tokens.colors.canvas,
    border: `1px solid ${tokens.colors.hairline}`,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.xl,
    marginBottom: tokens.spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing.md,
    boxShadow: "0 1px 3px rgba(0, 55, 112, 0.08)",
  },
  input: {
    ...tokens.typography.bodyMd,
    color: tokens.colors.ink,
    background: tokens.colors.canvas,
    border: `1px solid ${tokens.colors.hairlineInput}`,
    borderRadius: tokens.radius.sm,
    padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
    outline: "none",
    fontFamily: tokens.fontFamily,
  },
  textarea: {
    ...tokens.typography.bodyMd,
    color: tokens.colors.ink,
    background: tokens.colors.canvas,
    border: `1px solid ${tokens.colors.hairlineInput}`,
    borderRadius: tokens.radius.sm,
    padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
    outline: "none",
    resize: "vertical",
    minHeight: 96,
    fontFamily: tokens.fontFamily,
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacing.sm,
  },
  cancelButton: {
    ...tokens.typography.buttonMd,
    background: tokens.colors.canvas,
    color: tokens.colors.inkMute,
    border: `1px solid ${tokens.colors.hairline}`,
    borderRadius: tokens.radius.pill,
    padding: `${tokens.spacing.sm}px ${tokens.spacing.lg}px`,
    cursor: "pointer",
  },
  submitButton: {
    ...tokens.typography.buttonMd,
    background: tokens.colors.primary,
    color: tokens.colors.onPrimary,
    border: "none",
    borderRadius: tokens.radius.pill,
    padding: `${tokens.spacing.sm}px ${tokens.spacing.lg}px`,
    cursor: "pointer",
  },
  dangerButton: {
    ...tokens.typography.buttonMd,
    background: tokens.colors.danger,
    color: tokens.colors.onPrimary,
    border: "none",
    borderRadius: tokens.radius.pill,
    padding: `${tokens.spacing.sm}px ${tokens.spacing.lg}px`,
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing.lg,
  },
  card: {
    background: tokens.colors.canvas,
    border: `1px solid ${tokens.colors.hairline}`,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.xxl,
    boxShadow: "0 1px 3px rgba(0, 55, 112, 0.08)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.sm,
  },
  cardTitle: {
    ...tokens.typography.headingMd,
    color: tokens.colors.ink,
    margin: 0,
    flex: 1,
  },
  newBadge: {
    ...tokens.typography.microCap,
    background: tokens.colors.primarySubdued,
    color: tokens.colors.primaryDeep,
    borderRadius: tokens.radius.pill,
    padding: `2px ${tokens.spacing.sm}px`,
  },
  cardMeta: {
    ...tokens.typography.caption,
    color: tokens.colors.inkMute,
    marginBottom: tokens.spacing.md,
  },
  cardContent: {
    ...tokens.typography.bodyMd,
    color: tokens.colors.inkSecondary,
    margin: 0,
  },
  empty: {
    ...tokens.typography.bodyMd,
    color: tokens.colors.inkMute,
    textAlign: "center",
    padding: tokens.spacing.xxl,
  },
  error: {
    ...tokens.typography.bodyMd,
    color: tokens.colors.onPrimary,
    background: tokens.colors.danger,
    borderRadius: tokens.radius.sm,
    padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
    marginBottom: tokens.spacing.lg,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacing.lg,
    marginTop: tokens.spacing.md,
  },
  textButton: {
    ...tokens.typography.caption,
    background: "none",
    border: "none",
    color: tokens.colors.inkMute,
    cursor: "pointer",
    padding: 0,
  },
  textButtonDanger: {
    ...tokens.typography.caption,
    background: "none",
    border: "none",
    color: tokens.colors.danger,
    cursor: "pointer",
    padding: 0,
  },
  actionPanel: {
    marginTop: tokens.spacing.md,
    paddingTop: tokens.spacing.md,
    borderTop: `1px solid ${tokens.colors.hairline}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing.sm,
  },
  actionRow: {
    display: "flex",
    gap: tokens.spacing.sm,
  },
  actionInput: {
    ...tokens.typography.bodyMd,
    color: tokens.colors.ink,
    background: tokens.colors.canvas,
    border: `1px solid ${tokens.colors.hairlineInput}`,
    borderRadius: tokens.radius.sm,
    padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
    outline: "none",
    fontFamily: tokens.fontFamily,
    flex: 1,
  },
  actionError: {
    ...tokens.typography.caption,
    color: tokens.colors.danger,
  },
};

function formatDate(isoString) {
  const d = new Date(isoString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function readableError(error) {
  if (!error) return null;
  if (error.message?.includes("INVALID_PASSWORD")) return "비밀번호가 일치하지 않습니다.";
  return error.message;
}

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [newestId, setNewestId] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", password: "" });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [actionPassword, setActionPassword] = useState("");
  const [actionError, setActionError] = useState(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, created_at, title, content")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setPosts(data);
      setError(null);
    }
    setIsLoading(false);
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.password.trim()) return;

    setIsSubmitting(true);
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: form.title.trim(),
        content: form.content.trim(),
        password: form.password.trim(),
      })
      .select("id, created_at, title, content")
      .single();
    setIsSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    setPosts((prev) => [data, ...prev]);
    setNewestId(data.id);
    setForm({ title: "", content: "", password: "" });
    setError(null);
    setIsWriting(false);
  };

  const handleCancel = () => {
    setForm({ title: "", content: "", password: "" });
    setIsWriting(false);
  };

  function closeActionPanels() {
    setEditingId(null);
    setPendingDeleteId(null);
    setActionPassword("");
    setActionError(null);
  }

  function startEdit(post) {
    closeActionPanels();
    setEditingId(post.id);
    setEditForm({ title: post.title, content: post.content });
  }

  function startDelete(postId) {
    closeActionPanels();
    setPendingDeleteId(postId);
  }

  const handleEditFieldChange = (field) => (e) => {
    setEditForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  async function submitEdit(postId) {
    if (!editForm.title.trim() || !editForm.content.trim() || !actionPassword.trim()) {
      setActionError("제목, 내용, 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsProcessingAction(true);
    const { data, error } = await supabase.rpc("update_post_with_password", {
      post_id: postId,
      input_password: actionPassword.trim(),
      new_title: editForm.title.trim(),
      new_content: editForm.content.trim(),
    });
    setIsProcessingAction(false);

    if (error) {
      setActionError(readableError(error));
      return;
    }

    const updated = data?.[0];
    setPosts((prev) => prev.map((p) => (p.id === postId ? updated : p)));
    closeActionPanels();
  }

  async function confirmDelete(postId) {
    if (!actionPassword.trim()) {
      setActionError("비밀번호를 입력해주세요.");
      return;
    }

    setIsProcessingAction(true);
    const { error } = await supabase.rpc("delete_post_with_password", {
      post_id: postId,
      input_password: actionPassword.trim(),
    });
    setIsProcessingAction(false);

    if (error) {
      setActionError(readableError(error));
      return;
    }

    setPosts((prev) => prev.filter((p) => p.id !== postId));
    closeActionPanels();
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.titleGroup}>
            <h1 style={styles.title}>자유게시판</h1>
            <span style={styles.count}>{posts.length}</span>
          </div>
          {!isWriting && (
            <button style={styles.writeButton} onClick={() => setIsWriting(true)}>
              글쓰기
            </button>
          )}
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {isWriting && (
          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              style={styles.input}
              placeholder="제목을 입력하세요"
              value={form.title}
              onChange={handleChange("title")}
              autoFocus
            />
            <textarea
              style={styles.textarea}
              placeholder="내용을 입력하세요"
              value={form.content}
              onChange={handleChange("content")}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="비밀번호 (수정/삭제 시 필요합니다)"
              value={form.password}
              onChange={handleChange("password")}
            />
            <div style={styles.formActions}>
              <button type="button" style={styles.cancelButton} onClick={handleCancel}>
                취소
              </button>
              <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? "등록 중..." : "등록"}
              </button>
            </div>
          </form>
        )}

        <div style={styles.list}>
          {isLoading && <div style={styles.empty}>불러오는 중...</div>}
          {!isLoading && posts.length === 0 && (
            <div style={styles.empty}>등록된 게시글이 없습니다.</div>
          )}
          {!isLoading &&
            posts.map((post) => {
              const isEditing = editingId === post.id;
              const isDeleting = pendingDeleteId === post.id;

              return (
                <article key={post.id} style={styles.card}>
                  {isEditing ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacing.md }}>
                      <input
                        style={styles.input}
                        value={editForm.title}
                        onChange={handleEditFieldChange("title")}
                        autoFocus
                      />
                      <textarea
                        style={styles.textarea}
                        value={editForm.content}
                        onChange={handleEditFieldChange("content")}
                      />
                    </div>
                  ) : (
                    <>
                      <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle}>{post.title}</h2>
                        {post.id === newestId && <span style={styles.newBadge}>NEW</span>}
                      </div>
                      <div style={styles.cardMeta}>{formatDate(post.created_at)}</div>
                      <p style={styles.cardContent}>{post.content}</p>
                    </>
                  )}

                  {!isEditing && !isDeleting && (
                    <div style={styles.cardFooter}>
                      <button style={styles.textButton} onClick={() => startEdit(post)}>
                        수정
                      </button>
                      <button style={styles.textButtonDanger} onClick={() => startDelete(post.id)}>
                        삭제
                      </button>
                    </div>
                  )}

                  {isEditing && (
                    <div style={styles.actionPanel}>
                      {actionError && <div style={styles.actionError}>{actionError}</div>}
                      <div style={styles.actionRow}>
                        <input
                          style={styles.actionInput}
                          type="password"
                          placeholder="비밀번호"
                          value={actionPassword}
                          onChange={(e) => setActionPassword(e.target.value)}
                        />
                        <button style={styles.cancelButton} onClick={closeActionPanels}>
                          취소
                        </button>
                        <button
                          style={styles.submitButton}
                          onClick={() => submitEdit(post.id)}
                          disabled={isProcessingAction}
                        >
                          {isProcessingAction ? "확인 중..." : "저장"}
                        </button>
                      </div>
                    </div>
                  )}

                  {isDeleting && (
                    <div style={styles.actionPanel}>
                      {actionError && <div style={styles.actionError}>{actionError}</div>}
                      <div style={styles.actionRow}>
                        <input
                          style={styles.actionInput}
                          type="password"
                          placeholder="비밀번호"
                          value={actionPassword}
                          onChange={(e) => setActionPassword(e.target.value)}
                          autoFocus
                        />
                        <button style={styles.cancelButton} onClick={closeActionPanels}>
                          취소
                        </button>
                        <button
                          style={styles.dangerButton}
                          onClick={() => confirmDelete(post.id)}
                          disabled={isProcessingAction}
                        >
                          {isProcessingAction ? "확인 중..." : "삭제 확인"}
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
        </div>
      </div>
    </div>
  );
}
