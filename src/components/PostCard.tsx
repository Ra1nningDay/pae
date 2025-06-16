import React from "react";

// Helper function to calculate time remaining
function getTimeRemaining(expiresAt: string): string {
  const now = new Date();
  const expiration = new Date(expiresAt);
  const timeLeft = expiration.getTime() - now.getTime();

  if (timeLeft <= 0) {
    return "หมดอายุแล้ว";
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `อีก ${hours} ชม. ${minutes} นาที`;
  } else {
    return `อีก ${minutes} นาที`;
  }
}

export type Post = {
  id: string;
  title: string;
  content: string;
  contactInfo?: string | null;
  authorName: string;
  author_ipaddress?: string;
  expiresAt?: string | null; // วันที่หมดอายุ
  tags: { id: number; name: string }[];
  createdAt: string;
};

export default function PostCard({
  post,
  style,
  className,
  showIpAddress = false,
}: {
  post: Post;
  style?: React.CSSProperties;
  className?: string;
  showIpAddress?: boolean;
}) {
  return (
    <div
      className={`bg-[var(--card)] border-2 border-[var(--card-border)] rounded-xl shadow-md p-6 flex flex-col gap-2 w-full max-w-xl text-[var(--foreground)] ${
        className || ""
      }`}
      style={{ ...style, margin: 8 }}
    >
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold text-[var(--primary)] break-words">
          {post.title}
        </h2>{" "}
        <div className="text-xs text-[var(--accent)] text-right">
          <div>{new Date(post.createdAt).toLocaleString()}</div>
          {/* {post.expiresAt && (
            <div className="text-[var(--muted)] opacity-70">
              {getTimeRemaining(post.expiresAt)}
            </div>
          )} */}
        </div>
      </div>
      <div className="text-sm mb-2 whitespace-pre-line">{post.content}</div>
      {post.contactInfo && (
        <div className="text-xs text-[var(--accent)] mb-2">
          Contact: {post.contactInfo}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {post.tags.map((tag) => (
          <span
            key={tag.id}
            className="bg-[var(--primary)]/20 text-[var(--primary)] px-2 py-0.5 rounded-full text-xs font-mono"
          >
            #{tag.name}
          </span>
        ))}
      </div>{" "}
      <div className="text-xs text-[var(--accent)] mt-2">
        By {post.authorName}
        {showIpAddress && post.author_ipaddress && (
          <span className="ml-2 text-[var(--muted)] opacity-70">
            ({post.author_ipaddress})
          </span>
        )}
      </div>
      {/* {post.expiresAt && (
        <div className="text-xs text-[var(--accent)] mt-2">
          {getTimeRemaining(post.expiresAt)}
        </div>
      )} */}
    </div>
  );
}
