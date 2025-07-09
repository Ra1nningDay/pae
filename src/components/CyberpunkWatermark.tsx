import React from "react";

const CyberpunkWatermark: React.FC = () => {
  return (
    <h1
      className="absolute top-20 left-1/2 -translate-x-1/2 text-[8vw] md:text-[6vw] font-extrabold select-none pointer-events-none z-10 whitespace-nowrap"
      style={{
        background:
          "linear-gradient(45deg, #ff0080, #00ff88, #0088ff, #ff0080)",
        backgroundSize: "300% 300%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textShadow:
          "0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)",
        filter:
          "drop-shadow(0 0 10px rgba(255, 0, 128, 0.7)) drop-shadow(0 0 20px rgba(0, 255, 136, 0.5))",
        animation:
          "synthwave-glow 3s ease-in-out infinite alternate, gradient-shift 4s ease-in-out infinite",
      }}
    >
      แปะ!
      <style jsx>{`
        @keyframes synthwave-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 10px rgba(255, 0, 128, 0.7))
              drop-shadow(0 0 20px rgba(0, 255, 136, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 0, 128, 0.9))
              drop-shadow(0 0 30px rgba(0, 255, 136, 0.7));
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </h1>
  );
};

export default CyberpunkWatermark;
