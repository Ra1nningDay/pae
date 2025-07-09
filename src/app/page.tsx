"use client";
import React, { useEffect, useState } from "react";
import { Post } from "../components/PostCard";
import CyberpunkBackground from "../components/CyberpunkBackground";
import CyberpunkWatermark from "../components/CyberpunkWatermark";
import SearchBar from "../components/SearchBar";
import FloatingParticles from "../components/FloatingParticles";
import PostBoard from "../components/PostBoard";
import PostModal from "../components/PostModal";
import CreatePostModal from "../components/CreatePostModal";
import FloatingActionButton from "../components/FloatingActionButton";
import SearchResultsInfo from "../components/SearchResultsInfo";
import { useRouter } from "next/navigation";
import { useResponsive } from "../hooks/useResponsive";
import { usePosts } from "../hooks/usePosts";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const router = useRouter();

  const { isMobile, isClient } = useResponsive();
  const { posts, loading, search, setSearch, fetchPosts } = usePosts();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("pae_name");
      if (!name) {
        router.replace("/welcome");
      }
    }
  }, [router]);

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden font-fc-home"
      style={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%)",
      }}
    >
      {/* Beautiful Gradient Background */}
      <CyberpunkBackground />

      {/* Floating particles animation */}
      <FloatingParticles isClient={isClient} />

      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-purple-900/5 to-blue-900/10 backdrop-blur-[0.5px]" />

      {/* Watermark "แปะ!" */}
      <CyberpunkWatermark />

      {/* Search Bar - Fixed Position */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        loading={loading}
        isMobile={isMobile}
      />

      {/* Content */}
      <div className="relative z-20">
        {/* Search Results Info */}
        <SearchResultsInfo
          search={search}
          posts={posts}
          loading={loading}
          isMobile={isMobile}
          onClearSearch={() => setSearch("")}
        />

        {/* Post Board */}
        <PostBoard
          posts={posts}
          loading={loading}
          isMobile={isMobile}
          onPostClick={setSelectedPost}
        />

        {/* Floating Action Button */}
        <FloatingActionButton
          isMobile={isMobile}
          onClick={() => setShowModal(true)}
        />

        {/* Modal for Post Details */}
        {selectedPost && (
          <PostModal
            post={selectedPost}
            isMobile={isMobile}
            onClose={() => setSelectedPost(null)}
          />
        )}

        {/* Modal for PostForm */}
        {showModal && (
          <CreatePostModal
            isMobile={isMobile}
            onClose={() => setShowModal(false)}
            onSuccess={() => fetchPosts()}
          />
        )}
      </div>
    </div>
  );
}
