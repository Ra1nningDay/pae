import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

const CyberpunkBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generate stars only on client side
    const generatedStars: Star[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 60,
      animationDelay: Math.random() * 3,
      animationDuration: 2 + Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Starfield Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-purple-900/30"></div>
        {/* Stars - only render on client */}
        {isClient &&
          stars.map((star) => (
            <div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full opacity-80 animate-pulse"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.animationDelay}s`,
                animationDuration: `${star.animationDuration}s`,
              }}
            />
          ))}
      </div>

      {/* Retro Sun */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Sun Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 shadow-2xl shadow-orange-500/50"></div>

          {/* Horizontal Lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-0.5 bg-black/40"
              style={{
                top: `${(i + 1) * 5}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-blue-900/30 to-transparent"></div>

        {/* 3D Grid Perspective Container */}
        <div className="absolute inset-0" style={{ perspective: "1000px" }}>
          {/* Grid Base */}
          <div
            className="absolute inset-0 transform-gpu"
            style={{
              transform: "rotateX(75deg)",
              transformOrigin: "bottom center",
            }}
          >
            {/* Vertical Grid Lines */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute w-px h-full bg-gradient-to-t from-cyan-400 via-purple-500 to-transparent opacity-70"
                style={{
                  left: `${(i * 100) / 30}%`,
                  background: `linear-gradient(to top, 
                    rgba(0, 255, 255, 0.8) 0%, 
                    rgba(147, 51, 234, 0.6) 50%, 
                    transparent 100%)`,
                }}
              />
            ))}

            {/* Horizontal Grid Lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px opacity-70"
                style={{
                  top: `${(i * 100) / 20}%`,
                  background: `linear-gradient(to right, 
                    transparent 0%, 
                    rgba(0, 255, 255, 0.8) 20%, 
                    rgba(147, 51, 234, 0.6) 50%, 
                    rgba(0, 255, 255, 0.8) 80%, 
                    transparent 100%)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Side Grid Walls */}
        <div className="absolute inset-0" style={{ perspective: "1500px" }}>
          {/* Left Wall */}
          <div
            className="absolute left-0 top-0 h-full w-1/2"
            style={{
              transform: "rotateY(60deg) translateZ(-200px)",
              transformOrigin: "left center",
            }}
          >
            {/* Left wall background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-blue-900/20 to-transparent"></div>

            {/* Horizontal lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`left-h-${i}`}
                className="absolute left-0 right-0 h-px"
                style={{
                  top: `${(i * 100) / 20}%`,
                  background: `linear-gradient(to right, 
                    rgba(147, 51, 234, 0.9) 0%, 
                    rgba(0, 255, 255, 0.7) 30%, 
                    rgba(147, 51, 234, 0.5) 60%, 
                    transparent 100%)`,
                  opacity: 0.8 - i * 0.02,
                }}
              />
            ))}

            {/* Vertical lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`left-v-${i}`}
                className="absolute w-px h-full"
                style={{
                  left: `${(i * 100) / 12}%`,
                  background: `linear-gradient(to bottom, 
                    transparent 0%, 
                    rgba(147, 51, 234, 0.9) 20%, 
                    rgba(0, 255, 255, 0.7) 40%, 
                    rgba(147, 51, 234, 0.6) 60%, 
                    rgba(0, 255, 255, 0.4) 80%, 
                    transparent 100%)`,
                  opacity: 0.8 - i * 0.05,
                }}
              />
            ))}

            {/* Glowing accent lines */}
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-transparent opacity-90"
              style={{ top: "20%" }}
            ></div>
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-transparent opacity-70"
              style={{ top: "40%" }}
            ></div>
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-transparent opacity-50"
              style={{ top: "60%" }}
            ></div>
          </div>

          {/* Right Wall */}
          <div
            className="absolute right-0 top-0 h-full w-1/2"
            style={{
              transform: "rotateY(-60deg) translateZ(-200px)",
              transformOrigin: "right center",
            }}
          >
            {/* Right wall background */}
            <div className="absolute inset-0 bg-gradient-to-l from-purple-900/40 via-blue-900/20 to-transparent"></div>

            {/* Horizontal lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`right-h-${i}`}
                className="absolute left-0 right-0 h-px"
                style={{
                  top: `${(i * 100) / 20}%`,
                  background: `linear-gradient(to left, 
                    rgba(147, 51, 234, 0.9) 0%, 
                    rgba(0, 255, 255, 0.7) 30%, 
                    rgba(147, 51, 234, 0.5) 60%, 
                    transparent 100%)`,
                  opacity: 0.8 - i * 0.02,
                }}
              />
            ))}

            {/* Vertical lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`right-v-${i}`}
                className="absolute w-px h-full"
                style={{
                  left: `${(i * 100) / 12}%`,
                  background: `linear-gradient(to bottom, 
                    transparent 0%, 
                    rgba(147, 51, 234, 0.9) 20%, 
                    rgba(0, 255, 255, 0.7) 40%, 
                    rgba(147, 51, 234, 0.6) 60%, 
                    rgba(0, 255, 255, 0.4) 80%, 
                    transparent 100%)`,
                  opacity: 0.8 - i * 0.05,
                }}
              />
            ))}

            {/* Glowing accent lines */}
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-l from-purple-500 via-cyan-400 to-transparent opacity-90"
              style={{ top: "20%" }}
            ></div>
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-l from-purple-500 via-cyan-400 to-transparent opacity-70"
              style={{ top: "40%" }}
            ></div>
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-l from-purple-500 via-cyan-400 to-transparent opacity-50"
              style={{ top: "60%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"></div>
    </div>
  );
};

export default CyberpunkBackground;
