"use client";
import React, { useEffect, useState } from "react";
import PostCard, { Post } from "../components/PostCard";
import PostForm from "../components/PostForm";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (tag?: string) => {
    setLoading(true);
    const url = tag
      ? `/api/posts?tag=${encodeURIComponent(tag)}`
      : "/api/posts";
    const res = await fetch(url);
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(search.trim());
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-8 font-[family-name:var(--font-geist-sans)] bg-background">
      <header className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by hashtag (e.g. #event)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-zinc-300 dark:border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
          />
          <button
            type="submit"
            className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
        </form>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition-colors shadow"
        >
          + Create New Post
        </button>
      </header>
      <main className="flex flex-col gap-6 items-center w-full">
        {loading ? (
          <div className="text-zinc-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-zinc-500">No posts found.</div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </main>
      {/* Modal for PostForm */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 relative w-[420px] max-w-full">
            <button
              className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              Create New Post
            </h2>
            <PostForm
              onSuccess={() => {
                setShowModal(false);
                fetchPosts();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
