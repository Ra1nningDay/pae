"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CyberpunkBackground from "@/components/CyberpunkBackground";
import CyberpunkWatermark from "@/components/CyberpunkWatermark";

export default function WelcomePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pae_name");
      if (stored) {
        router.replace("/");
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("pae_name", name.trim());
      router.replace("/");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cyberpunk Background */}
      <CyberpunkBackground />

      {/* Cyberpunk Watermark */}
      <CyberpunkWatermark />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-4">
        <form
          onSubmit={handleSubmit}
          className="relative backdrop-blur-sm bg-black/40 p-8 rounded-lg border border-cyan-400/30 shadow-2xl flex flex-col gap-6 w-full max-w-md"
          style={{
            boxShadow: `
              0 0 20px rgba(0, 255, 255, 0.3),
              0 0 40px rgba(255, 0, 255, 0.2),
              inset 0 0 20px rgba(0, 255, 255, 0.1)
            `,
          }}
        >
          <h1
            className="text-3xl font-bold mb-2 text-center text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text"
            style={{
              textShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
              filter: "drop-shadow(0 0 10px rgba(0, 255, 255, 0.7))",
            }}
          >
            Welcome to #Pae
          </h1>

          <input
            type="text"
            placeholder="กรอกชื่อของคุณ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black/60 border-2 border-cyan-400/50 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
            style={{
              boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)",
            }}
            required
          />

          <button
            type="submit"
            className="relative bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded px-6 py-3 font-semibold transition-all duration-300 hover:from-cyan-400 hover:to-pink-400 transform hover:scale-105 active:scale-95"
            style={{
              boxShadow: `
                0 0 20px rgba(0, 255, 255, 0.4),
                0 0 40px rgba(255, 0, 255, 0.3)
              `,
            }}
          >
            <span className="relative z-10">Continue</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded"></div>
          </button>
        </form>
      </div>
    </div>
  );
}
