import React from "react";
import { Zap } from "lucide-react";

interface LoadingSpinnerProps {
  loading: boolean;
}

export default function LoadingSpinner({ loading }: LoadingSpinnerProps) {
  if (!loading) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center animate-fadeIn">
      <div className="inline-flex items-center gap-3 bg-black/70 backdrop-blur-sm rounded-lg px-6 py-4 border border-[#37EBF3]/30 animate-pulse">
        <Zap className="w-6 h-6 text-[#37EBF3] animate-spin" />
        <span className="text-xl text-[#37EBF3]">กำลังโหลดโพสต์...</span>
      </div>
    </div>
  );
}
