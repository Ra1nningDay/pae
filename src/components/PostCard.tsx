import React from "react";

export type Post = {
  id: string;
  title: string;
  content: string;
  contactInfo?: string | null;
  authorName: string;
  author_ipaddress?: string;
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
        </h2>
        <span className="text-xs text-[var(--accent)]">
          {new Date(post.createdAt).toLocaleString()}
        </span>
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
    </div>
  );
}
