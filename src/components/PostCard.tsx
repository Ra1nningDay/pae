import React from "react";
import { Clock, User, Hash, Eye } from "lucide-react";

export type Post = {
  id: string;
  title: string;
  content: string;
  contactInfo?: string | null;
  authorName: string;
  author_ipaddress?: string;
  expiresAt?: string | null; // วันที่หมดอายุ
  tags: { id: number; name: string }[];
  createdAt: string;
};

export default function PostCard({
  post,
  style,
  className,
  showIpAddress = false,
  onClick,
  patternIndex = 0,
}: {
  post: Post;
  style?: React.CSSProperties;
  className?: string;
  showIpAddress?: boolean;
  onClick?: () => void;
  patternIndex?: number;
}) {
  // Post-it styles patterns with CyberPunk 2077 Palette colors
  const getPostItStyle = (index: number) => {
    const patterns = [
      // Pattern 1: Blood Red (#710000)
      {
        borderRadius: "8px",
        transform: "rotate(0deg)",
        clipPath: "none",
        borderWidth: "2px",
        borderColor: "#710000", // Blood red
        backgroundColor: "#ffffff", // White background
        boxShadow:
          "0 4px 20px rgba(113, 0, 0, 0.5), inset 0 0 20px rgba(113, 0, 0, 0.1), 0 0 0 1px rgba(113, 0, 0, 0.2)",
      },
      // Pattern 2: Electric Yellow (#FDF500) - Top-right folded corner
      {
        borderRadius: "8px 0px 8px 8px",
        transform: "rotate(0deg)",
        clipPath: "polygon(0% 0%, 90% 0%, 100% 10%, 100% 100%, 0% 100%)",
        borderWidth: "2px",
        borderColor: "#FDF500", // Electric yellow
        backgroundColor: "#ffffff", // White background
        boxShadow:
          "0 4px 20px rgba(253, 245, 0, 0.5), inset 0 0 20px rgba(253, 245, 0, 0.1), 0 0 0 1px rgba(253, 245, 0, 0.3)",
      },
      // Pattern 3: Electric Blue (#37EBF3) - Bottom-left folded corner
      {
        borderRadius: "8px 8px 0px 8px",
        transform: "rotate(0deg)",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 90%)",
        borderWidth: "2px",
        borderColor: "#37EBF3", // Electric blue
        backgroundColor: "#ffffff", // White background
        boxShadow:
          "0 4px 20px rgba(55, 235, 243, 0.5), inset 0 0 20px rgba(55, 235, 243, 0.1), 0 0 0 1px rgba(55, 235, 243, 0.3)",
      },
      // Pattern 4: Magenta Pink (#E456AE)
      {
        borderRadius: "8px",
        transform: "rotate(0deg)",
        clipPath: "none",
        borderWidth: "2px",
        borderColor: "#E456AE", // Magenta pink
        backgroundColor: "#ffffff", // White background
        boxShadow:
          "0 4px 20px rgba(228, 86, 174, 0.5), inset 0 0 20px rgba(228, 86, 174, 0.1), 0 0 0 1px rgba(228, 86, 174, 0.3)",
      },
    ];
    return patterns[index % 4];
  };

  const postItStyle = getPostItStyle(patternIndex);
  return (
    <div
      onClick={onClick}
      className={`card-hover  border-2 rounded-xl shadow-md flex flex-col gap-2 w-full max-w-xl transition-all duration-300 font-fc-home hover:scale-105 hover:shadow-2xl hover:z-50 cursor-pointer group ${
        className || ""
      }`}
      style={{
        ...style,
        margin: 8,
        padding: "18px", // Responsive padding - เพิ่มขึ้น
        backgroundColor: postItStyle.backgroundColor,
        borderRadius: postItStyle.borderRadius,
        transform: `${style?.transform || ""} ${postItStyle.transform}`,
        clipPath: postItStyle.clipPath,
        borderWidth: postItStyle.borderWidth,
        borderColor: postItStyle.borderColor,
        boxShadow: postItStyle.boxShadow,
        backdropFilter: "blur(10px)",
        minHeight: "180px", // Ensure consistent card height - เพิ่มขึ้น
        maxWidth: style?.width || "280px", // Responsive width
      }}
    >
      {" "}
      <div className="flex items-start justify-between mb-2">
        {" "}
        <h2
          className="text-lg md:text-xl font-fc-home-black break-words flex-1 mr-2 group-hover:scale-105 transition-transform duration-300"
          style={{ color: "#000000", lineHeight: "1.4", fontWeight: "700" }}
        >
          {post.title}
        </h2>{" "}
        <div
          className="text-sm text-right flex-shrink-0 flex items-center gap-1"
          style={{ color: "#333333", fontWeight: "500" }}
        >
          <Clock className="w-4 h-4 text-gray-500" />
          <div>{new Date(post.createdAt).toLocaleDateString("th-TH")}</div>
        </div>
      </div>
      <div
        className="text-sm md:text-base mb-3 whitespace-pre-line leading-relaxed flex-1"
        style={{ color: "#222222", fontWeight: "400" }}
      >
        {post.content.length > 120
          ? `${post.content.substring(0, 120)}...`
          : post.content}
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-auto">
        {post.tags.slice(0, 3).map(
          (
            tag // Limit tags for mobile
          ) => (
            <span
              key={tag.id}
              className="px-2 py-1 rounded-full text-sm font-medium border flex items-center gap-1 hover:scale-105 transition-transform duration-200"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                color: "#333333",
                borderColor: "rgba(0, 0, 0, 0.3)",
                fontWeight: "500",
              }}
            >
              <Hash className="w-3 h-3" />
              {tag.name}
            </span>
          )
        )}
        {post.tags.length > 3 && (
          <span
            className="px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1"
            style={{ color: "#666666", fontWeight: "500" }}
          >
            <Eye className="w-3 h-3" />+{post.tags.length - 3}
          </span>
        )}
      </div>
      {/* Author */}{" "}
      <div
        className="text-sm mt-2 pt-2 flex-shrink-0 flex items-center gap-1 group-hover:text-blue-600 transition-colors duration-300"
        style={{
          color: "#555555",
          borderTop: "1px solid rgba(0, 0, 0, 0.15)",
          fontWeight: "500",
        }}
      >
        <User className="w-4 h-4" />
        {post.authorName}
        {showIpAddress && post.author_ipaddress && (
          <span className="ml-2 opacity-70" style={{ color: "#777777" }}>
            ({post.author_ipaddress})
          </span>
        )}{" "}
      </div>
    </div>
  );
}
