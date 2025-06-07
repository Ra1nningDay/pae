"use client";
import React, { useState } from "react";

export default function PostForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const authorName =
      typeof window !== "undefined" ? localStorage.getItem("pae_name") : "";
    if (!authorName) {
      setError("Author name missing.");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        contactInfo,
        tags,
        authorName,
        authorIpaddress: "",
      }),
    });
    if (res.ok) {
      setTitle("");
      setContent("");
      setContactInfo("");
      setTags("");
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to post.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center justify-center min-h-[340px]"
    >
      {/* Central Title Card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-6 z-10 w-64 flex flex-col items-center">
        <input
          className="text-lg font-bold text-center bg-transparent border-b border-primary focus:outline-none mb-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      {/* Content Card */}
      <div className="absolute left-1/2 top-[15%] -translate-x-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow p-4 w-56 flex flex-col items-center">
        <textarea
          className="resize-none w-full bg-transparent border-b border-primary focus:outline-none text-sm"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
        />
      </div>
      {/* Contact Info Card */}
      <div className="absolute left-[15%] top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow p-4 w-44 flex flex-col items-center">
        <input
          className="w-full bg-transparent border-b border-primary focus:outline-none text-sm"
          placeholder="Contact Info (optional)"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
      </div>
      {/* Tags Card */}
      <div className="absolute right-[15%] top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow p-4 w-44 flex flex-col items-center">
        <input
          className="w-full bg-transparent border-b border-primary focus:outline-none text-sm"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>
      {/* Submit Button */}
      <div className="absolute left-1/2 bottom-0 translate-x-[-50%] mb-2">
        <button
          type="submit"
          className="bg-primary text-white rounded px-6 py-2 font-semibold shadow hover:bg-primary/90 transition-colors"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {error && (
        <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </form>
  );
}
