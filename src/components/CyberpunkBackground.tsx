import React from "react";

const CyberpunkBackground: React.FC = () => {
  return (
    <div className="gradient-background">
      {/* Beautiful gradient background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/bg.jpeg)",
          filter: "brightness(0.8) contrast(1.1)",
        }}
      />

      {/* Subtle animated overlay for depth */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 animate-pulse"
        style={{
          animationDuration: "4s",
        }}
      />
    </div>
  );
};

export default CyberpunkBackground;
