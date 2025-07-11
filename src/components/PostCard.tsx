import React from "react";

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
          "0 0 20px rgba(113, 0, 0, 0.4), inset 0 0 20px rgba(113, 0, 0, 0.1)",
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
          "0 0 20px rgba(253, 245, 0, 0.4), inset 0 0 20px rgba(253, 245, 0, 0.1)",
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
          "0 0 20px rgba(55, 235, 243, 0.4), inset 0 0 20px rgba(55, 235, 243, 0.1)",
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
          "0 0 20px rgba(228, 86, 174, 0.4), inset 0 0 20px rgba(228, 86, 174, 0.1)",
      },
    ];
    return patterns[index % 4];
  };

  const postItStyle = getPostItStyle(patternIndex);
  return (
    <div
      onClick={onClick}
      className={`card-hover border-2 rounded-xl shadow-md flex flex-col gap-2 w-full max-w-xl transition-all duration-300 font-fc-home ${
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
          className="text-lg md:text-xl font-fc-home-black break-words flex-1 mr-2"
          style={{ color: "#333333", lineHeight: "1.4" }}
        >
          {post.title}
        </h2>{" "}
        <div
          className="text-sm text-right flex-shrink-0"
          style={{ color: "#666666" }}
        >
          <div>{new Date(post.createdAt).toLocaleDateString("th-TH")}</div>
        </div>
      </div>{" "}
      <div
        className="text-sm md:text-base mb-3 whitespace-pre-line leading-relaxed flex-1"
        style={{ color: "#444444" }}
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
              className="px-2 py-1 rounded-full text-sm font-medium border"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                color: "#555555",
                borderColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              #{tag.name}
            </span>
          )
        )}
        {post.tags.length > 3 && (
          <span
            className="px-2 py-1 rounded-full text-sm font-medium"
            style={{ color: "#888888" }}
          >
            +{post.tags.length - 3}
          </span>
        )}
      </div>
      {/* Author */}{" "}
      <div
        className="text-sm mt-2 pt-2 flex-shrink-0"
        style={{
          color: "#777777",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        👤 {post.authorName}
        {showIpAddress && post.author_ipaddress && (
          <span className="ml-2 opacity-70" style={{ color: "#999999" }}>
            ({post.author_ipaddress})
          </span>
        )}{" "}
      </div>
    </div>
  );
}
