"use client";
import React, { useEffect, useState, useMemo } from "react";
import PostCard, { Post } from "../components/PostCard";
import PostForm from "../components/PostForm";
import CyberpunkBackground from "../components/CyberpunkBackground";
import CyberpunkWatermark from "../components/CyberpunkWatermark";
import { useRouter } from "next/navigation";

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

// Constants for board and card dimensions
const BOARD_WIDTH = 1600; // เพิ่มจาก 1200
const BOARD_HEIGHT = 1200; // เพิ่มจาก 900
const CARD_WIDTH = 340;
const CARD_HEIGHT = 210;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
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

    const centerX = BOARD_WIDTH / 2;
    const centerY = BOARD_HEIGHT / 2;
    const margin = 40;
    const minDistance = 120;
    const avoidCenterRadius = 300; // รัศมีที่หลีกเลี่ยงตรงกลาง

    for (let i = 0; i < posts.length; i++) {
      let left: number, top: number;
      let attempts = 0;
      const maxAttempts = 100;

      do {
        // สร้างการกระจายแบบ spiral หรือ cluster
        if (i < 4) {
          // การ์ด 4 ใบแรกวางที่มุม 4 มุม
          const corners = [
            { x: margin, y: margin },
            { x: BOARD_WIDTH - CARD_WIDTH - margin, y: margin },
            { x: margin, y: BOARD_HEIGHT - CARD_HEIGHT - margin },
            {
              x: BOARD_WIDTH - CARD_WIDTH - margin,
              y: BOARD_HEIGHT - CARD_HEIGHT - margin,
            },
          ];
          const corner = corners[i];
          left = corner.x + (Math.random() - 0.5) * 100;
          top = corner.y + (Math.random() - 0.5) * 100;
        } else {
          // การ์ดที่เหลือกระจายแบบ spiral รอบ ๆ
          const angle = i * 137.5 * (Math.PI / 180); // Golden angle
          const radius = avoidCenterRadius + i * 15; // เพิ่มรัศมีทีละน้อย

          left = centerX + Math.cos(angle) * radius - CARD_WIDTH / 2;
          top = centerY + Math.sin(angle) * radius - CARD_HEIGHT / 2;

          // เพิ่ม randomness
          left += (Math.random() - 0.5) * 80;
          top += (Math.random() - 0.5) * 80;
        }

        // ตรวจสอบขอบเขต
        left = Math.max(
          margin,
          Math.min(BOARD_WIDTH - CARD_WIDTH - margin, left)
        );
        top = Math.max(
          margin,
          Math.min(BOARD_HEIGHT - CARD_HEIGHT - margin, top)
        );

        // ตรวจสอบระยะห่างจากการ์ดอื่น ๆ
        const tooClose = positions.some((pos) => {
          const distance = Math.sqrt(
            Math.pow(left - pos.left, 2) + Math.pow(top - pos.top, 2)
          );
          return distance < minDistance;
        });

        // ตรวจสอบว่าไม่อยู่ตรงกลางมาก
        const distanceFromCenter = Math.sqrt(
          Math.pow(left + CARD_WIDTH / 2 - centerX, 2) +
            Math.pow(top + CARD_HEIGHT / 2 - centerY, 2)
        );
        const tooCloseToCenter =
          distanceFromCenter < avoidCenterRadius && i >= 4;

        if ((!tooClose && !tooCloseToCenter) || attempts >= maxAttempts) break;
        attempts++;
      } while (attempts < maxAttempts);

      const rotate = Math.random() * 30 - 15; // -15 ถึง +15 องศา
      const z = Math.floor(Math.random() * 30) + 10;
      const scale = 0.92 + Math.random() * 0.16; // 0.92 - 1.08
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
        )}{" "}
        {/* Scatter Board */}
        <main
          className="relative flex-1 mx-auto w-full max-w-[1600px] min-h-[1200px] bg-transparent overflow-hidden"
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
                onClick={() => setSelectedPost(post)}
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
                className="card-hover cursor-pointer hover:border-pink-400/50"
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
        {/* Modal for Post Details */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
            <div className="bg-black/90 backdrop-blur-lg rounded-xl p-8 relative w-[600px] max-w-full max-h-[90vh] overflow-y-auto border border-cyan-400/30 shadow-[0_0_50px_rgba(34,211,238,0.4)]">
              <button
                className="absolute top-4 right-4 text-cyan-300 hover:text-pink-400 text-3xl font-bold transition-colors z-10"
                onClick={() => setSelectedPost(null)}
                aria-label="Close"
              >
                ×
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-cyan-400/30 pb-4">
                  <h2 className="text-2xl font-bold text-cyan-300 mb-2">
                    {selectedPost.title}
                  </h2>
                  <p className="text-pink-300 text-sm">
                    โดย {selectedPost.authorName} •{" "}
                    {new Date(selectedPost.createdAt).toLocaleDateString(
                      "th-TH"
                    )}
                  </p>
                  {selectedPost.expiresAt && (
                    <p className="text-yellow-400 text-sm mt-1">
                      ⏰ {getTimeRemaining(selectedPost.expiresAt)}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div className="text-white leading-relaxed">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                    เนื้อหา:
                  </h3>
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                    <p className="whitespace-pre-wrap">
                      {selectedPost.content}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                {selectedPost.contactInfo && (
                  <div className="text-white">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                      ข้อมูลติดต่อ:
                    </h3>
                    <div className="bg-pink-900/30 rounded-lg p-4 border border-pink-500/30">
                      <p className="text-pink-200">
                        {selectedPost.contactInfo}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                      แท็ก:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30 rounded-full text-sm"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
