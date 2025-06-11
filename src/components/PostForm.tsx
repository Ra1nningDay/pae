"use client";
import React, { useState } from "react";
import api from "@/lib/axios";

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
      authorIpaddress: "",
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
      className="w-full max-w-md mx-auto bg-[var(--card)] p-8 flex flex-col gap-5 relative"
    >
      {/* ... ส่วน JSX ที่เหลือเหมือนเดิมทั้งหมด ... */}
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-[var(--primary)]"
          htmlFor="title"
        >
          หัวข้อ
        </label>
        <input
          id="title"
          className="text-base px-3 py-2 rounded border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-transparent"
          placeholder="ใส่หัวข้อโพสต์"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-[var(--primary)]"
          htmlFor="content"
        >
          เนื้อหา
        </label>
        <textarea
          id="content"
          className="resize-none px-3 py-2 rounded border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-transparent min-h-[80px]"
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
          className="text-sm font-medium text-[var(--primary)]"
          htmlFor="tags"
        >
          แท็ก
        </label>
        <input
          id="tags"
          className="text-base px-3 py-2 rounded border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-transparent"
          placeholder="คั่นด้วย , เช่น event,news"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm text-center mt-2">{error}</div>
      )}
      <button
        type="submit"
        className="mt-2 bg-[var(--button)] text-white rounded-lg px-6 py-2 font-semibold shadow hover:brightness-110 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "กำลังโพสต์..." : "แปะโพสต์"}
      </button>
    </form>
  );
}
