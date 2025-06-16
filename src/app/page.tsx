"use client";
import React, { useEffect, useState, useMemo } from "react";
import PostCard, { Post } from "../components/PostCard";
import PostForm from "../components/PostForm";
import CyberpunkBackground from "../components/CyberpunkBackground";
import CyberpunkWatermark from "../components/CyberpunkWatermark";
import { useRouter } from "next/navigation";

// Constants for board and card dimensions
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

  // Call api to create the post
  //**
  // เปลี่ยน Api call จากใช้งานด้วยการเรียกผ่าน cilent component ย้ายไปไว้ใน server component **/lib/api/postRequest.ts
  //  */
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

  // Real-time search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        fetchPosts(search.trim());
      } else {
        fetchPosts();
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submit จะไม่ต้องทำอะไรเพราะมี useEffect handle แล้ว
  };
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
  }, [posts]);
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: "#0a0a0a",
      }}
    >
      {/* Cyberpunk Animated Background */}
      <CyberpunkBackground /> {/* Dark overlay for content readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      {/* Watermark "แปะ!" */}
      <CyberpunkWatermark />
      {/* Content */}
      <div className="relative z-20">
        {" "}
        {/* Search Bar */}
        <header className="flex justify-center py-8 z-20">
          <form onSubmit={handleSearch} className="w-full max-w-lg flex gap-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ค้นหา #tag หรือคำค้นหา"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-2 border-cyan-400/50 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.5)] w-full text-lg bg-black/70 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300"
              />
              {loading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="animate-spin h-5 w-5 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>{" "}
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-lg px-6 py-3 font-semibold hover:from-pink-400 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] text-lg"
            >
              ค้นหา
            </button>
          </form>{" "}
        </header>{" "}
        {/* Search Results Info */}
        {search && !loading && (
          <div className="text-center mb-4">
            <p className="text-cyan-300 text-sm bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-cyan-400/30">
              {posts.length > 0
                ? `พบ ${posts.length} โพสต์สำหรับ "${search}"`
                : `ไม่พบโพสต์สำหรับ "${search}"`}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="ml-2 text-pink-400 hover:text-pink-300 hover:underline text-sm transition-colors"
                >
                  แสดงทั้งหมด
                </button>
              )}
            </p>
          </div>
        )}
        {/* Scatter Board */}
        <main
          className="relative flex-1 mx-auto w-full max-w-[1200px] min-h-[900px] bg-transparent"
          style={{ minHeight: BOARD_HEIGHT }}
        >
          {" "}
          {loading ? (
            <div className="text-cyan-300 text-center pt-20">
              <div className="inline-flex items-center gap-3 bg-black/70 backdrop-blur-sm rounded-lg px-6 py-4 border border-cyan-400/30">
                <div className="animate-spin h-6 w-6 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                <span className="text-lg">กำลังโหลดโพสต์...</span>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center pt-20">
              <div className="inline-block bg-black/70 backdrop-blur-sm rounded-lg px-6 py-4 border border-pink-400/30">
                <span className="text-pink-300 text-lg">ไม่พบโพสต์</span>
              </div>
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
                  boxShadow: `
                    0 0 20px rgba(34, 211, 238, 0.3),
                    0 0 40px rgba(236, 72, 153, 0.2),
                    0 8px 32px rgba(0, 0, 0, 0.5)
                  `,
                  background: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                  backdropFilter: "blur(10px)",
                }}
                className="transition-all hover:scale-105 hover:z-50 cursor-pointer duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5),0_0_60px_rgba(236,72,153,0.3)]"
              />
            ))
          )}
        </main>{" "}
        {/* Floating Action Button */}
        <button
          className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center text-xl hover:scale-110 transition-all duration-300 z-50 font-bold gap-1 shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] border border-pink-400/30"
          onClick={() => setShowModal(true)}
          aria-label="แปะโพสต์"
        >
          <span className="text-3xl leading-none">+</span>
          <span className="text-xs font-semibold">แปะโพสต์</span>
        </button>{" "}
        {/* Modal for PostForm */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-black/80 backdrop-blur-lg rounded-xl p-8 relative w-[420px] max-w-full border border-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.3)]">
              <button
                className="absolute top-2 right-2 text-cyan-300 hover:text-pink-400 text-2xl font-bold transition-colors"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-center text-cyan-300">
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
