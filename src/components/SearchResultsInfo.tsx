import React from "react";
import { Post } from "./PostCard";

interface SearchResultsInfoProps {
  search: string;
  posts: Post[];
  loading: boolean;
  isMobile: boolean;
  onClearSearch: () => void;
}

export default function SearchResultsInfo({
  search,
  posts,
  loading,
  isMobile,
  onClearSearch,
}: SearchResultsInfoProps) {
  if (!search || loading) return null;

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 z-25 ${
        isMobile ? "top-20" : "top-24"
      }`}
    >
      <p className="text-[#37EBF3] text-base bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-[#37EBF3]/30">
        {posts.length > 0
          ? `พบ ${posts.length} โพสต์สำหรับ "${search}"`
          : `ไม่พบโพสต์สำหรับ "${search}"`}
        <button
          onClick={onClearSearch}
          className="ml-2 text-[#E456AE] hover:text-[#E456AE]/80 hover:underline text-base transition-colors"
        >
          แสดงทั้งหมด
        </button>
      </p>
    </div>
  );
}
