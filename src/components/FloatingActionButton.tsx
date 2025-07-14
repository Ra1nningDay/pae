import React from "react";

interface FloatingActionButtonProps {
  isMobile: boolean;
  onClick: () => void;
}

export default function FloatingActionButton({
  isMobile,
  onClick,
}: FloatingActionButtonProps) {
  return (
    <button
      className={`fixed bg-gradient-to-r from-[#E456AE] to-[#710000] text-white rounded-full flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 z-50 font-bold shadow-[0_0_20px_rgba(228,86,174,0.6)] hover:shadow-[0_0_30px_rgba(228,86,174,0.8)] border border-[#E456AE]/30 ${
        isMobile
          ? "bottom-6 right-6 w-20 h-20 text-xl gap-0"
          : "bottom-8 right-8 w-24 h-24 text-2xl gap-1"
      }`}
      onClick={onClick}
      aria-label="แปะโพสต์"
    >
      <span
        className={isMobile ? "text-3xl leading-none" : "text-4xl leading-none"}
      >
        +
      </span>
      {!isMobile && (
        <span className="text-sm font-fc-home-black">แปะโพสต์</span>
      )}
    </button>
  );
}
