import React from "react";

interface FloatingParticlesProps {
  isClient: boolean;
}

export default function FloatingParticles({
  isClient,
}: FloatingParticlesProps) {
  if (!isClient) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating particles animation */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full opacity-20 animate-float ${
            i % 3 === 0 ? "w-1 h-1" : i % 3 === 1 ? "w-2 h-2" : "w-3 h-3"
          }`}
          style={{
            background:
              i % 2 === 0
                ? "linear-gradient(45deg, #37EBF3, #E456AE)"
                : "linear-gradient(45deg, #E456AE, #37EBF3)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        />
      ))}

      {/* Larger glowing orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute w-20 h-20 rounded-full opacity-5 animate-float"
          style={{
            background: "radial-gradient(circle, #37EBF3 0%, transparent 70%)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
            filter: "blur(2px)",
          }}
        />
      ))}
    </div>
  );
}
