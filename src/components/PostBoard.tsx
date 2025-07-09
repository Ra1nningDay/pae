import React, { useMemo } from "react";
import PostCard, { Post } from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import {
  BOARD_WIDTH_DESKTOP,
  BOARD_HEIGHT_DESKTOP,
  BOARD_WIDTH_MOBILE,
  BOARD_HEIGHT_MOBILE,
  CARD_WIDTH_DESKTOP,
  CARD_HEIGHT_DESKTOP,
  CARD_WIDTH_MOBILE,
  CARD_HEIGHT_MOBILE,
  LAYOUT_MARGINS,
  POSITIONING,
} from "../constants/dimensions";

interface PostBoardProps {
  posts: Post[];
  loading: boolean;
  isMobile: boolean;
  onPostClick: (post: Post) => void;
}

export default function PostBoard({
  posts,
  loading,
  isMobile,
  onPostClick,
}: PostBoardProps) {
  // Dynamic dimensions based on screen size
  const BOARD_WIDTH = isMobile ? BOARD_WIDTH_MOBILE : BOARD_WIDTH_DESKTOP;
  const BOARD_HEIGHT = isMobile ? BOARD_HEIGHT_MOBILE : BOARD_HEIGHT_DESKTOP;
  const CARD_WIDTH = isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;
  const CARD_HEIGHT = isMobile ? CARD_HEIGHT_MOBILE : CARD_HEIGHT_DESKTOP;

  const cardPositions = useMemo(() => {
    const positions: {
      left: number;
      top: number;
      rotate: number;
      z: number;
      scale: number;
    }[] = [];

    const margin = isMobile ? LAYOUT_MARGINS.MOBILE : LAYOUT_MARGINS.DESKTOP;
    const minDistance = isMobile
      ? POSITIONING.MIN_DISTANCE_MOBILE
      : POSITIONING.MIN_DISTANCE_DESKTOP;

    for (let i = 0; i < posts.length; i++) {
      let left: number, top: number;
      let attempts = 0;
      const maxAttempts = isMobile
        ? POSITIONING.MAX_ATTEMPTS_MOBILE
        : POSITIONING.MAX_ATTEMPTS_DESKTOP;

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
          if (i > 0 && Math.random() < POSITIONING.CLUSTER_PROBABILITY) {
            const prevCard =
              positions[Math.floor(Math.random() * positions.length)];
            const clusterDistance =
              POSITIONING.CLUSTER_DISTANCE_BASE +
              Math.random() * POSITIONING.CLUSTER_DISTANCE_RANDOM;
            const clusterAngle = Math.random() * Math.PI * 2;

            left = prevCard.left + Math.cos(clusterAngle) * clusterDistance;
            top = prevCard.top + Math.sin(clusterAngle) * clusterDistance;
          }
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
    <main
      className={`relative mx-auto w-full bg-transparent ${
        isMobile
          ? "h-screen overflow-hidden pt-24" // Remove scrolling and set fixed height for mobile
          : "overflow-hidden h-screen"
      }`}
      style={{
        height: "100vh",
      }}
    >
      <LoadingSpinner loading={loading} />

      {!loading && posts.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center animate-fadeIn">
          <div className="inline-block bg-black/70 backdrop-blur-sm rounded-lg px-6 py-4 border border-[#E456AE]/30">
            <span className="text-[#E456AE] text-xl">ไม่พบโพสต์</span>
          </div>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <>
          {isMobile ? (
            // Mobile: Absolute positioned scattered layout like desktop
            <div className="absolute inset-0 w-full h-full">
              {posts.map((post, i) => {
                const position = cardPositions[i];
                if (!position) return null;

                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    onClick={() => onPostClick(post)}
                    patternIndex={i}
                    style={{
                      position: "absolute",
                      left: position.left,
                      top: position.top,
                      width: CARD_WIDTH,
                      transform: `rotate(${position.rotate}deg) scale(${position.scale})`,
                      zIndex: position.z,
                    }}
                    className="transition-all duration-300 cursor-pointer hover:scale-105 hover:z-[999]"
                  />
                );
              })}
            </div>
          ) : (
            // Desktop: Absolute positioned scattered layout
            posts.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => onPostClick(post)}
                patternIndex={i}
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
        </>
      )}
    </main>
  );
}
