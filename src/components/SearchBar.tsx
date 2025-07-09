import React from "react";
import { Search, Sparkles } from "lucide-react";

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
  loading: boolean;
  isMobile: boolean;
}

export default function SearchBar({
  search,
  setSearch,
  loading,
  isMobile,
}: SearchBarProps) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submit จะไม่ต้องทำอะไรเพราะมี useEffect handle แล้ว
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 flex justify-center z-30 ${
        isMobile ? "py-4 px-4" : "py-6"
      }  border-white/10 animate-slideDown`}
    >
      <form
        onSubmit={handleSearch}
        className={`w-full flex gap-2 ${isMobile ? "max-w-sm" : "max-w-lg"}`}
      >
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5 z-10 group-focus-within:scale-110 group-focus-within:text-[#37EBF3] transition-all duration-300 drop-shadow-lg" />
          <input
            type="text"
            placeholder={isMobile ? "ค้นหา #tag" : "ค้นหา #tag หรือคำค้นหา"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`border-2 border-[#37EBF3]/50 rounded-lg pl-10 pr-4 focus:outline-none focus:border-[#37EBF3] focus:shadow-[0_0_20px_rgba(55,235,243,0.5)] w-full bg-black/70 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-[#37EBF3]/70 relative z-0 ${
              isMobile ? "py-3 text-lg" : "py-4 text-xl"
            }`}
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div
                className={`animate-spin border-2 border-[#37EBF3] border-t-transparent rounded-full ${
                  isMobile ? "h-4 w-4" : "h-5 w-5"
                }`}
              ></div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`bg-gradient-to-r from-[#E456AE] to-[#37EBF3] text-white rounded-lg font-fc-home-black hover:from-[#E456AE]/80 hover:to-[#37EBF3]/80 transition-all duration-300 shadow-[0_0_20px_rgba(228,86,174,0.5)] hover:scale-105 group flex items-center justify-center cursor-pointer ${
            isMobile
              ? "px-4 py-3 text-base min-w-[80px]"
              : "px-6 py-4 text-xl min-w-[120px]"
          }`}
        >
          <Sparkles
            className={`group-hover:animate-pulse ${
              isMobile ? "w-4 h-4 mr-1" : "w-5 h-5 mr-2"
            }`}
          />
          <span className="whitespace-nowrap">ค้นหา</span>
        </button>
      </form>
    </header>
  );
}
