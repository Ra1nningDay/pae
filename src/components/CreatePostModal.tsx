import React from "react";
import { X } from "lucide-react";
import PostForm from "./PostForm";

interface CreatePostModalProps {
  isMobile: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreatePostModal({
  isMobile,
  onClose,
  onSuccess,
}: CreatePostModalProps) {
  const handleSuccess = () => {
    onClose();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div
        className={`bg-black/80 backdrop-blur-lg rounded-xl p-8 relative border border-[#37EBF3]/30 shadow-[0_0_40px_rgba(55,235,243,0.3)] animate-scaleIn ${
          isMobile ? "w-full max-w-sm mx-4" : "w-[420px] max-w-full"
        }`}
      >
        <button
          className="absolute top-2 right-2 text-[#37EBF3] hover:text-[#E456AE] text-2xl font-bold transition-colors hover:rotate-90 duration-300"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2
          className={`font-fc-home-black mb-4 text-center ${
            isMobile ? "text-xl" : "text-2xl"
          }`}
          style={{ color: "#ffffff" }}
        >
          แปะโพสต์ใหม่
        </h2>

        <PostForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
