"use client";
import React, { useState } from "react";
import PostCard, { Post } from "@/components/PostCard";

export default function AdminPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"; // In production, use server-side auth

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
      fetchPosts();
    } else {
      setError("รหัสผ่านไม่ถูกต้อง");
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("ไม่สามารถดึงข้อมูลโพสต์ได้");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-black/80 backdrop-blur-lg rounded-xl p-8 w-[400px] border border-cyan-400/30">
          <h1 className="text-2xl font-bold text-cyan-300 text-center mb-6">
            Admin Panel
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-cyan-300 text-sm mb-2">
                รหัสผ่าน Admin
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-black/70 border border-cyan-400/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                placeholder="ใส่รหัสผ่าน"
                required
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white py-2 rounded-lg font-semibold hover:from-pink-400 hover:to-cyan-400 transition-all"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-300">
            Admin Panel - จัดการโพสต์
          </h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            ออกจากระบบ
          </button>
        </div>

        <div className="mb-6 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/30">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">สถิติ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">
                {posts.length}
              </div>
              <div className="text-sm text-gray-400">โพสต์ทั้งหมด</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {new Set(posts.map((p) => p.author_ipaddress)).size}
              </div>
              <div className="text-sm text-gray-400">IP Address ต่างกัน</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {new Set(posts.map((p) => p.authorName)).size}
              </div>
              <div className="text-sm text-gray-400">ผู้ใช้ต่างกัน</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-cyan-300 py-20">
            <div className="inline-flex items-center gap-3">
              <div className="animate-spin h-6 w-6 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
              <span>กำลังโหลดข้อมูล...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                showIpAddress={true}
                className="bg-black/50 backdrop-blur-sm border-cyan-400/30"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
