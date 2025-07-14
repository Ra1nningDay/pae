"use client";
import React, { useState } from "react";
import api from "@/lib/axios";
import { getUserIpAddress } from "@/lib/utils/getIpAddress";
import { Send, AlertCircle, Loader } from "lucide-react";

export default function PostForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check if title and content are provided
    try {
      const textToModerate = `${title}\n\n${content}`;
      //**
      // เปลี่ยน Api call จากใช้งานด้วยการเรียกผ่าน cilent component ย้ายไปไว้ใน server component **/lib/api/postRequest.ts
      //  */
      const moderateRes = await api.post("/api/moderate", {
        text: textToModerate,
      });

      const moderationResult = await moderateRes.data;

      if (moderationResult.flagged) {
        setError("ตรวจพบเนื้อหาที่ไม่เหมาะสม ไม่สามารถโพสต์ได้");
        setLoading(false);
        return;
      }
    } catch (err: unknown) {
      // Handle moderation request error
      console.error("Moderation request Failed:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Moderation request failed";
      setError(errorMessage);
      setLoading(false);
      return;
    }

    const authorName =
      typeof window !== "undefined" ? localStorage.getItem("pae_name") : "";
    if (!authorName) {
      setError("Author name missing.");
      setLoading(false);
      return;
    } // Get user's IP address
    let userIpAddress = "";
    try {
      userIpAddress = await getUserIpAddress();
    } catch (ipError) {
      console.error("Failed to get IP address:", ipError);
      userIpAddress = "unknown";
    }

    // Call api to create the post
    //**
    // เปลี่ยน Api call จากใช้งานด้วยการเรียกผ่าน cilent component ย้ายไปไว้ใน server component **/lib/api/postRequest.ts
    //  */
    const res = await api.post("/api/posts", {
      title,
      content,
      contactInfo,
      tags,
      authorName,
      authorIpaddress: userIpAddress,
    });
    if (res) {
      setTitle("");
      setContent("");
      setContactInfo("");
      setTags("");
      onSuccess();
    } else {
      setError("Failed to post.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-[var(--card)] p-8 flex flex-col gap-5 relative animate-scaleIn"
    >
      {/* ... ส่วน JSX ที่เหลือเหมือนเดิมทั้งหมด ... */}
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-[var(--primary)] flex items-center gap-2"
          htmlFor="title"
        >
          <span className="w-2 h-2 bg-[#37EBF3] rounded-full animate-pulse"></span>
          หัวข้อ
        </label>
        <input
          id="title"
          className="text-base px-3 py-2 rounded border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-transparent transition-all duration-300 hover:border-[#37EBF3]/50 focus:scale-105"
          placeholder="ใส่หัวข้อโพสต์"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-[var(--primary)] flex items-center gap-2"
          htmlFor="content"
        >
          <span className="w-2 h-2 bg-[#E456AE] rounded-full animate-pulse"></span>
          เนื้อหา
        </label>
        <textarea
          id="content"
          className="resize-none px-3 py-2 rounded border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-transparent min-h-[80px] transition-all duration-300 hover:border-[#37EBF3]/50 focus:scale-105"
          placeholder="เขียนเนื้อหาโพสต์..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-[var(--primary)]"
          htmlFor="contactInfo"
        >
          ช่องทางติดต่อ{" "}
          <span className="text-[var(--accent)] font-normal">(ไม่บังคับ)</span>
        </label>
        <input
          id="contactInfo"
          className="text-base px-3 py-2 rounded border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-transparent"
          placeholder="Email, Line, ฯลฯ"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-[var(--primary)] flex items-center gap-2"
          htmlFor="tags"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          แท็ก
        </label>
        <input
          id="tags"
          className="text-base px-3 py-2 rounded border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-transparent transition-all duration-300 hover:border-[#37EBF3]/50 focus:scale-105"
          placeholder="คั่นด้วย , เช่น event,news"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm text-center mt-2 flex items-center justify-center gap-2 animate-fadeIn bg-red-50 p-3 rounded-lg border border-red-200">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      <button
        type="submit"
        className="mt-2 bg-[var(--button)] text-white rounded-lg px-6 py-2 font-semibold shadow hover:brightness-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 btn-ripple flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            กำลังโพสต์...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            แปะโพสต์
          </>
        )}
      </button>
    </form>
  );
}
