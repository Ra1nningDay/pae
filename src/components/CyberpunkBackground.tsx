import React from "react";

const CyberpunkBackground: React.FC = () => {
  return (
    <div className="cyberpunk-background">
      {/* Horizontal Lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className={`cyberpunk-line cyberpunk-line-horizontal cyberpunk-horizontal-${
            i % 3
          }`}
          style={{
            top: `${(i + 1) * 8.33}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${3 + i * 0.2}s`,
          }}
        />
      ))}

      {/* Vertical Lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className={`cyberpunk-line cyberpunk-line-vertical cyberpunk-vertical-${
            i % 3
          }`}
          style={{
            left: `${(i + 1) * 10}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + i * 0.3}s`,
          }}
        />
      ))}

      {/* Diagonal Lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`d-${i}`}
          className={`cyberpunk-line cyberpunk-line-diagonal cyberpunk-diagonal-${
            i % 2
          }`}
          style={{
            top: `${(i + 1) * 12.5}%`,
            transform: `rotate(${i % 2 === 0 ? "15deg" : "-15deg"})`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${5 + i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default CyberpunkBackground;
