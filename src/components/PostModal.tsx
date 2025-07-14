import React from "react";
import { X } from "lucide-react";
import { Post } from "./PostCard";
import { getTimeRemaining } from "../lib/utils/timeHelpers";

interface PostModalProps {
  post: Post;
  isMobile: boolean;
  onClose: () => void;
}

export default function PostModal({ post, isMobile, onClose }: PostModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-fadeIn">
      <div
        className={`bg-white rounded-xl p-8 relative max-h-[90vh] overflow-y-auto border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-scaleIn ${
          isMobile ? "w-full max-w-sm mx-4" : "w-[600px] max-w-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-3xl font-bold transition-colors z-10 hover:rotate-90 duration-300"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <h2
              className={`font-fc-home-black text-blue-600 mb-2 ${
                isMobile ? "text-2xl" : "text-3xl"
              }`}
            >
              {post.title}
            </h2>
            <p className="text-gray-600 text-base">
              โดย {post.authorName} •{" "}
              {new Date(post.createdAt).toLocaleDateString("th-TH")}
            </p>
            {post.expiresAt && (
              <p className="text-orange-600 text-base mt-1 font-medium">
                ⏰ {getTimeRemaining(post.expiresAt)}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="text-gray-800 leading-relaxed">
            <h3 className="text-xl font-fc-home-black text-blue-600 mb-3">
              เนื้อหา:
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="whitespace-pre-wrap text-base leading-relaxed">
                {post.content}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          {/* {post.contactInfo && (
            <div className="text-gray-800">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">
                ข้อมูลติดต่อ:
              </h3>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 border-l-4 border-l-blue-500">
                <p className="text-blue-800">📞 {post.contactInfo}</p>
              </div>
            </div>
          )} */}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div>
              <h3 className="text-xl font-fc-home-black text-blue-600 mb-3">
                แท็ก:
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
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
  );
}
