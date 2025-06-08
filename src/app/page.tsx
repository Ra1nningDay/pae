"use client";
import React, { useEffect, useState, useMemo } from "react";
import PostCard, { Post } from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useRouter } from "next/navigation";

// ขนาดบอร์ดและการ์ดสำหรับสุ่มตำแหน่ง
const BOARD_WIDTH = 1200;
const BOARD_HEIGHT = 900;
const CARD_WIDTH = 340;
const CARD_HEIGHT = 210;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("pae_name");
      if (!name) {
        router.replace("/welcome");
      }
    }
  }, [router]);

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

  // สุ่มตำแหน่งการ์ดแบบ scatter (random margin, zIndex, scale)
  const cardPositions = useMemo(() => {
    const positions: {
      left: number;
      top: number;
      rotate: number;
      z: number;
      scale: number;
    }[] = [];
    const margin = 80;
    for (let i = 0; i < posts.length; i++) {
      const left = Math.random() * (BOARD_WIDTH - CARD_WIDTH - margin) + margin;
      const top =
        Math.random() * (BOARD_HEIGHT - CARD_HEIGHT - margin) + margin;
      const rotate = Math.random() * 18 - 9; // -9 ถึง +9 องศา
      const z = Math.floor(Math.random() * 20) + 10;
      const scale = 0.96 + Math.random() * 0.08; // 0.96 - 1.04
      positions.push({ left, top, rotate, z, scale });
    }
    return positions;
  }, [posts.length, search]);

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #2d1a60 0%, #3a1c71 50%, #d76d77 100%)",
      }}
    >
      {/* Watermark "แปะ!" */}
      <h1 className="absolute top-16 left-1/2 -translate-x-1/2 text-[10vw] font-extrabold text-white opacity-15 select-none pointer-events-none z-0 whitespace-nowrap">
        แปะ!
      </h1>
      {/* Content */}
      <div className="relative z-10">
        {/* Search Bar */}
        <header className="flex justify-center py-8 z-20">
          <form onSubmit={handleSearch} className="w-full max-w-lg flex gap-2">
            <input
              type="text"
              placeholder="ค้นหา #tag หรือคำค้นหา"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-[var(--card-border)] rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] w-full text-lg shadow bg-[var(--card)] text-[var(--foreground)]"
            />
            <button
              type="submit"
              className="bg-[var(--button)] text-white rounded px-6 py-3 font-semibold hover:brightness-110 transition-colors shadow text-lg"
            >
              ค้นหา
            </button>
          </form>
        </header>
        {/* Scatter Board */}
        <main
          className="relative flex-1 mx-auto w-full max-w-[1200px] min-h-[900px] bg-transparent"
          style={{ minHeight: BOARD_HEIGHT }}
        >
          {loading ? (
            <div className="text-[var(--primary)] text-center pt-20">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-[var(--primary)] text-center pt-20">
              No posts found.
            </div>
          ) : (
            posts.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                style={{
                  position: "absolute",
                  left: cardPositions[i]?.left,
                  top: cardPositions[i]?.top,
                  width: CARD_WIDTH,
                  transform: `rotate(${cardPositions[i]?.rotate}deg) scale(${cardPositions[i]?.scale})`,
                  zIndex: cardPositions[i]?.z,
                  boxShadow:
                    "0 8px 32px 0 rgba(255,176,133,0.10), 0 1.5px 8px 0 rgba(113,173,186,0.10)",
                  background: "var(--card)",
                  border: "2px solid var(--card-border)",
                }}
                className="transition-transform hover:scale-105 hover:z-50 cursor-pointer duration-200"
              />
            ))
          )}
        </main>
        {/* Floating Action Button */}
        <button
          className="fixed bottom-8 right-8 bg-[var(--button)] text-white rounded-full shadow-lg w-20 h-20 flex flex-col items-center justify-center text-xl hover:scale-110 transition z-50 font-bold gap-1"
          onClick={() => setShowModal(true)}
          aria-label="แปะโพสต์"
        >
          <span className="text-3xl leading-none">+</span>
          <span className="text-xs font-semibold">แปะโพสต์</span>
        </button>
        {/* Modal for PostForm */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-[var(--card)] rounded-xl shadow-lg p-8 relative w-[420px] max-w-full border border-[var(--card-border)]">
              <button
                className="absolute top-2 right-2 text-[var(--primary)] hover:text-[var(--button)] text-2xl font-bold"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-center text-[var(--primary)]">
                แปะโพสต์ใหม่
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
    </div>
  );
}
