import React from "react";

export type Post = {
  id: string;
  title: string;
  content: string;
  contactInfo?: string | null;
  authorName: string;
  tags: { id: number; name: string }[];
  createdAt: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 flex flex-col gap-2 w-full max-w-xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold text-primary break-words">
          {post.title}
        </h2>
        <span className="text-xs text-zinc-500">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
      <div className="text-sm text-zinc-700 dark:text-zinc-200 mb-2 whitespace-pre-line">
        {post.content}
      </div>
      {post.contactInfo && (
        <div className="text-xs text-zinc-500 mb-2">
          Contact: {post.contactInfo}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {post.tags.map((tag) => (
          <span
            key={tag.id}
            className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-mono"
          >
            #{tag.name}
          </span>
        ))}
      </div>
      <div className="text-xs text-zinc-400 mt-2">By {post.authorName}</div>
    </div>
  );
}
