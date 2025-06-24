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
const BOARD_WIDTH_DESKTOP = 1920;
const BOARD_HEIGHT_DESKTOP = 1080;
const BOARD_WIDTH_MOBILE = 350;
const BOARD_HEIGHT_MOBILE = 600;
const CARD_WIDTH_DESKTOP = 380; // เพิ่มขึ้นจาก 340
const CARD_HEIGHT_DESKTOP = 240; // เพิ่มขึ้นจาก 210
const CARD_WIDTH_MOBILE = 320; // เพิ่มขึ้นจาก 280
const CARD_HEIGHT_MOBILE = 200; // เพิ่มขึ้นจาก 180

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // ตรวจสอบ Mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic dimensions based on screen size
  const BOARD_WIDTH = isMobile ? BOARD_WIDTH_MOBILE : BOARD_WIDTH_DESKTOP;
  const BOARD_HEIGHT = isMobile ? BOARD_HEIGHT_MOBILE : BOARD_HEIGHT_DESKTOP;
  const CARD_WIDTH = isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;
  const CARD_HEIGHT = isMobile ? CARD_HEIGHT_MOBILE : CARD_HEIGHT_DESKTOP;

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
    const margin = isMobile ? 20 : 60;
    const minDistance = isMobile ? 60 : 100;
    const avoidCenterRadius = isMobile ? 150 : 300;

    for (let i = 0; i < posts.length; i++) {
      let left: number, top: number;
      let attempts = 0;
      const maxAttempts = isMobile ? 20 : 40;

      do {
        if (isMobile) {
          // Mobile: Simple vertical stacking with slight randomness
          left =
            margin + Math.random() * (BOARD_WIDTH - CARD_WIDTH - margin * 2);
          top = i * (CARD_HEIGHT + 20) + margin + (Math.random() - 0.5) * 30;

          // Ensure we don't go beyond board height
          if (top > BOARD_HEIGHT - CARD_HEIGHT - margin) {
            top =
              margin +
              Math.random() * (BOARD_HEIGHT - CARD_HEIGHT - margin * 2);
          }
        } else {
          // Desktop: การกระจายแบบสุ่มธรรมชาติมากขึ้น
          left =
            margin + Math.random() * (BOARD_WIDTH - CARD_WIDTH - margin * 2);
          top =
            margin + Math.random() * (BOARD_HEIGHT - CARD_HEIGHT - margin * 2);

          // สร้าง clusters เล็ก ๆ บางทีเพื่อให้ดูธรรมชาติ
          if (i > 0 && Math.random() < 0.3) {
            const prevCard =
              positions[Math.floor(Math.random() * positions.length)];
            const clusterDistance = 120 + Math.random() * 80;
            const clusterAngle = Math.random() * Math.PI * 2;

            left = prevCard.left + Math.cos(clusterAngle) * clusterDistance;
            top = prevCard.top + Math.sin(clusterAngle) * clusterDistance;
          }
        } // ตรวจสอบขอบเขต
        left = Math.max(
          margin,
          Math.min(BOARD_WIDTH - CARD_WIDTH - margin, left)
        );
        top = Math.max(
          margin,
          Math.min(BOARD_HEIGHT - CARD_HEIGHT - margin, top)
        );

        // ตรวจสอบระยะห่างจากการ์ดอื่น ๆ (ลดข้อกำหนด)
        const tooClose = positions.some((pos) => {
          const distance = Math.sqrt(
            Math.pow(left - pos.left, 2) + Math.pow(top - pos.top, 2)
          );
          return distance < minDistance;
        });

        if (!tooClose || attempts >= maxAttempts) break;
        attempts++;
      } while (attempts < maxAttempts);
      const rotate = isMobile
        ? (Math.random() - 0.5) * 10 // Mobile: ±5° (น้อยกว่า)
        : (Math.random() - 0.5) * 24; // Desktop: ±12°
      const z = Math.floor(Math.random() * 25) + 10;
      const scale = isMobile
        ? 0.98 + Math.random() * 0.04 // Mobile: 0.98-1.02 (น้อยกว่า)
        : 0.96 + Math.random() * 0.08; // Desktop: 0.96-1.04
      positions.push({ left, top, rotate, z, scale });
    }
    return positions;
  }, [posts, isMobile, BOARD_WIDTH, BOARD_HEIGHT, CARD_WIDTH, CARD_HEIGHT]);
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden font-fc-home"
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
        <header
          className={`flex justify-center z-20 ${
            isMobile ? "py-4 px-4" : "py-8"
          }`}
        >
          <form
            onSubmit={handleSearch}
            className={`w-full flex gap-2 ${
              isMobile ? "max-w-sm" : "max-w-lg"
            }`}
          >
            <div className="relative w-full">
              {" "}
              <input
                type="text"
                placeholder={isMobile ? "ค้นหา #tag" : "ค้นหา #tag หรือคำค้นหา"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`border-2 border-[#37EBF3]/50 rounded-lg px-4 focus:outline-none focus:border-[#37EBF3] focus:shadow-[0_0_20px_rgba(55,235,243,0.5)] w-full bg-black/70 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 ${
                  isMobile ? "py-3 text-lg" : "py-4 text-xl"
                }`}
              />
              {loading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div
                    className={`animate-spin border-2 border-[#37EBF3] border-t-transparent rounded-full ${
                      isMobile ? "h-4 w-4" : "h-5 w-5"
                    }`}
                  ></div>
                </div>
              )}
            </div>{" "}
            <button
              type="submit"
              className={`bg-gradient-to-r from-[#E456AE] to-[#37EBF3] text-white rounded-lg font-fc-home-black hover:from-[#E456AE]/80 hover:to-[#37EBF3]/80 transition-all duration-300 shadow-[0_0_20px_rgba(228,86,174,0.5)] hover:shadow-[0_0_30px_rgba(228,86,174,0.7)] ${
                isMobile ? "px-5 py-3 text-base" : "px-7 py-4 text-xl"
              }`}
            >
              ค้นหา
            </button>
          </form>{" "}
        </header>{" "}
        {/* Search Results Info */}{" "}
        {search && !loading && (
          <div className="text-center mb-4">
            <p className="text-[#37EBF3] text-base bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-[#37EBF3]/30">
              {posts.length > 0
                ? `พบ ${posts.length} โพสต์สำหรับ "${search}"`
                : `ไม่พบโพสต์สำหรับ "${search}"`}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="ml-2 text-[#E456AE] hover:text-[#E456AE]/80 hover:underline text-base transition-colors"
                >
                  แสดงทั้งหมด
                </button>
              )}
            </p>
          </div>
        )}{" "}
        {/* Scatter Board */}{" "}
        <main
          className={`relative flex-1 mx-auto w-full bg-transparent ${
            isMobile
              ? "overflow-y-auto max-w-full" // Allow scrolling on mobile
              : "overflow-hidden min-h-[1200px]"
          }`}
          style={{
            minHeight: isMobile
              ? `${posts.length * 100 + 300}px`
              : BOARD_HEIGHT,
            height: isMobile ? "auto" : BOARD_HEIGHT,
          }}
        >
          {" "}
          {loading ? (
            <div className="text-[#37EBF3] text-center pt-20">
              <div className="inline-flex items-center gap-3 bg-black/70 backdrop-blur-sm rounded-lg px-6 py-4 border border-[#37EBF3]/30">
                <div className="animate-spin h-6 w-6 border-2 border-[#37EBF3] border-t-transparent rounded-full"></div>
                <span className="text-xl">กำลังโหลดโพสต์...</span>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center pt-20">
              <div className="inline-block bg-black/70 backdrop-blur-sm rounded-lg px-6 py-4 border border-[#E456AE]/30">
                <span className="text-[#E456AE] text-xl">ไม่พบโพสต์</span>
              </div>
            </div>
          ) : isMobile ? (
            // Mobile: Natural scattered card layout
            <div className="pt-4 pb-20 px-2 relative">
              {posts.map((post, i) => {
                // More natural positioning algorithm
                const isLeft = i % 2 === 0;
                const baseVerticalSpacing = 100;
                const randomVerticalOffset = Math.sin(i * 2.5) * 20; // Natural variation
                const randomHorizontalOffset = Math.cos(i * 1.8) * 15; // Subtle horizontal drift

                // More natural rotation based on position and index
                const baseRotation = isLeft ? -2 : 2;
                const randomRotation = Math.sin(i * 1.2) * 3; // Natural rotation variation
                const totalRotation = baseRotation + randomRotation;

                // Natural horizontal positioning with some randomness
                const leftPosition = isLeft
                  ? Math.max(5, 15 + randomHorizontalOffset)
                  : "auto";
                const rightPosition = !isLeft
                  ? Math.max(5, 15 + Math.abs(randomHorizontalOffset))
                  : "auto";

                return (
                  <div
                    key={post.id}
                    className="absolute"
                    style={{
                      left:
                        leftPosition !== "auto" ? `${leftPosition}px` : "auto",
                      right:
                        rightPosition !== "auto"
                          ? `${rightPosition}px`
                          : "auto",
                      top: `${
                        i * baseVerticalSpacing + randomVerticalOffset
                      }px`,
                      zIndex: posts.length - i + 5,
                      transform: `rotate(${totalRotation}deg)`,
                    }}
                  >
                    <PostCard
                      post={post}
                      onClick={() => setSelectedPost(post)}
                      patternIndex={i}
                      style={{
                        width: "315px", // เพิ่มขึ้น
                        margin: "0",
                      }}
                      className="transition-all duration-300 cursor-pointer hover:scale-105 hover:z-[999] block shadow-lg"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            // Desktop: Absolute positioned scattered layout
            posts.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => setSelectedPost(post)}
                patternIndex={i} // Pass pattern index to create different Post-it styles
                style={{
                  position: "absolute",
                  left: cardPositions[i]?.left,
                  top: cardPositions[i]?.top,
                  width: CARD_WIDTH,
                  transform: `rotate(${cardPositions[i]?.rotate}deg) scale(${cardPositions[i]?.scale})`,
                  zIndex: cardPositions[i]?.z,
                }}
                className="transition-all duration-300 cursor-pointer"
              />
            ))
          )}
        </main>{" "}
        {/* Floating Action Button */}{" "}
        <button
          className={`fixed bg-gradient-to-r from-[#E456AE] to-[#710000] text-white rounded-full flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 z-50 font-bold shadow-[0_0_20px_rgba(228,86,174,0.6)] hover:shadow-[0_0_30px_rgba(228,86,174,0.8)] border border-[#E456AE]/30 ${
            isMobile
              ? "bottom-6 right-6 w-20 h-20 text-xl gap-0"
              : "bottom-8 right-8 w-24 h-24 text-2xl gap-1"
          }`}
          onClick={() => setShowModal(true)}
          aria-label="แปะโพสต์"
        >
          {" "}
          <span
            className={
              isMobile ? "text-3xl leading-none" : "text-4xl leading-none"
            }
          >
            +
          </span>
          {!isMobile && (
            <span className="text-sm font-fc-home-black">แปะโพสต์</span>
          )}
        </button>{" "}
        {/* Modal for Post Details */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
            <div
              className={`bg-white rounded-xl p-8 relative max-h-[90vh] overflow-y-auto border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.3)] ${
                isMobile ? "w-full max-w-sm mx-4" : "w-[600px] max-w-full"
              }`}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-3xl font-bold transition-colors z-10"
                onClick={() => setSelectedPost(null)}
                aria-label="Close"
              >
                ×
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4">
                  {" "}
                  <h2
                    className={`font-fc-home-black text-blue-600 mb-2 ${
                      isMobile ? "text-2xl" : "text-3xl"
                    }`}
                  >
                    {selectedPost.title}
                  </h2>
                  <p className="text-gray-600 text-base">
                    โดย {selectedPost.authorName} •{" "}
                    {new Date(selectedPost.createdAt).toLocaleDateString(
                      "th-TH"
                    )}
                  </p>
                  {selectedPost.expiresAt && (
                    <p className="text-orange-600 text-base mt-1 font-medium">
                      ⏰ {getTimeRemaining(selectedPost.expiresAt)}
                    </p>
                  )}
                </div>
                {/* Content */}
                <div className="text-gray-800 leading-relaxed">
                  {" "}
                  <h3 className="text-xl font-fc-home-black text-blue-600 mb-3">
                    เนื้อหา:
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="whitespace-pre-wrap text-base leading-relaxed">
                      {selectedPost.content}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                {/* {selectedPost.contactInfo && (
                  <div className="text-gray-800">
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">
                      ข้อมูลติดต่อ:
                    </h3>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 border-l-4 border-l-blue-500">
                      <p className="text-blue-800">
                        📞 {selectedPost.contactInfo}
                      </p>
                    </div>
                  </div>
                )} */}

                {/* Tags */}
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div>
                    {" "}
                    <h3 className="text-xl font-fc-home-black text-blue-600 mb-3">
                      แท็ก:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded-full text-base font-medium"
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
        )}{" "}
        {/* Modal for PostForm */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            {" "}
            <div
              className={`bg-black/80 backdrop-blur-lg rounded-xl p-8 relative border border-[#37EBF3]/30 shadow-[0_0_40px_rgba(55,235,243,0.3)] ${
                isMobile ? "w-full max-w-sm mx-4" : "w-[420px] max-w-full"
              }`}
            >
              <button
                className="absolute top-2 right-2 text-[#37EBF3] hover:text-[#E456AE] text-2xl font-bold transition-colors"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>{" "}
              <h2
                className={`font-fc-home-black mb-4 text-center text-[#37EBF3] ${
                  isMobile ? "text-xl" : "text-2xl"
                }`}
              >
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
