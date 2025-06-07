"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md flex flex-col gap-4 w-80"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Welcome to #Pae</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 dark:border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="submit"
          className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
