import { useState, useEffect } from "react";
import { BREAKPOINTS } from "../constants/dimensions";

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side only rendering for particles
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ตรวจสอบ Mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return { isMobile, isClient };
}
