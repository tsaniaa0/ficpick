"use client";

import { useState, useEffect } from "react";

interface TaskbarProps {
  currentWallpaper: string;
  onWallpaperChange: (url: string) => void;
  wallpapers: { name: string; url: string }[];
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  onOpenStats: () => void;
}

export default function Taskbar({
  currentWallpaper,
  onWallpaperChange,
  wallpapers,
  currentTheme,
  onThemeChange,
  onOpenStats,
}: TaskbarProps) {
  const [time, setTime] = useState("");
  const [isWallpaperMenuOpen, setIsWallpaperMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="hidden md:flex fixed bottom-0 left-0 right-0 h-10 bg-[#ece9d8] border-t-2 border-black z-50 justify-between items-center px-1.5 font-mono select-none">
      {/* Start Button & Active Window */}
      <div className="flex items-center gap-2 relative">
        <button
          onClick={onOpenStats}
          className="px-2.5 py-1 bg-[#ece9d8] hover:bg-slate-200 text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
        >
          <span className="bg-[#b5ff36] border border-black px-1 text-[9px]">❖</span>
          <b>Start</b>
        </button>

        <div className="h-5 w-[2px] bg-slate-400 border-r border-white mx-1" />

        {/* Tab Aktif */}
        <div className="px-3 py-1 bg-white border-2 border-black text-xs font-bold text-black flex items-center gap-1.5 shadow-inner">
          <span>💻</span>
          <span className="truncate max-w-[120px] md:max-w-none">FicPick.exe</span>
        </div>

        {/* Tombol Wallpaper Vibe */}
        <div className="relative">
          <button
            onClick={() => {
              setIsWallpaperMenuOpen(!isWallpaperMenuOpen);
              setIsThemeMenuOpen(false);
            }}
            className="px-2.5 py-1 bg-[#ece9d8] hover:bg-slate-200 text-black font-bold text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1"
          >
            <span>🖼️</span>
            <span>Wallpaper</span>
          </button>

          {isWallpaperMenuOpen && (
            <div className="absolute bottom-12 left-0 w-56 bg-[#ece9d8] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1.5 space-y-1 z-50">
              <div className="bg-[#000080] text-white px-2 py-0.5 text-[10px] font-bold flex justify-between items-center mb-1">
                <span>Pilih Vibe Wallpaper</span>
                <button
                  onClick={() => setIsWallpaperMenuOpen(false)}
                  className="hover:text-red-300 font-black px-1"
                >
                  ✕
                </button>
              </div>
              {wallpapers.map((wp) => (
                <button
                  key={wp.name}
                  onClick={() => {
                    onWallpaperChange(wp.url);
                    setIsWallpaperMenuOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 text-xs font-bold border border-black truncate transition ${
                    currentWallpaper === wp.url
                      ? "bg-[#b5ff36] text-black shadow-inner"
                      : "bg-white text-black hover:bg-slate-100"
                  }`}
                >
                  {currentWallpaper === wp.url ? "✓ " : "• "} {wp.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tombol Tema Windows */}
        <div className="relative">
          <button
            onClick={() => {
              setIsThemeMenuOpen(!isThemeMenuOpen);
              setIsWallpaperMenuOpen(false);
            }}
            className="px-2.5 py-1 bg-[#ece9d8] hover:bg-slate-200 text-black font-bold text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1"
          >
            <span>🎨</span>
            <span>Tema OS</span>
          </button>

          {isThemeMenuOpen && (
            <div className="absolute bottom-12 left-0 w-48 bg-[#ece9d8] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1.5 space-y-1 z-50">
              <div className="bg-[#000080] text-white px-2 py-0.5 text-[10px] font-bold flex justify-between items-center mb-1">
                <span>Pilih Tema Windows</span>
                <button
                  onClick={() => setIsThemeMenuOpen(false)}
                  className="hover:text-red-300 font-black px-1"
                >
                  ✕
                </button>
              </div>
              {[
                { id: "classic", name: "Classic Teal (95)" },
                { id: "rose", name: "Rose Pink" },
                { id: "lavender", name: "Lavender Dream" },
              ].map((th) => (
                <button
                  key={th.id}
                  onClick={() => {
                    onThemeChange(th.id);
                    setIsThemeMenuOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 text-xs font-bold border border-black truncate transition ${
                    currentTheme === th.id
                      ? "bg-[#b5ff36] text-black shadow-inner"
                      : "bg-white text-black hover:bg-slate-100"
                  }`}
                >
                  {currentTheme === th.id ? "✓ " : "• "} {th.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* System Tray & Clock */}
      <div className="bg-white border-2 border-black px-3 py-0.5 text-xs font-bold text-black shadow-inner flex items-center gap-2">
        <span title="Volume">🔊</span>
        <span 
          onClick={onOpenStats} 
          title="Klik untuk Statistik" 
          className="cursor-pointer hover:scale-110 transition"
        >
          📊
        </span>
        <span>{time || "12:00"}</span>
      </div>
    </footer>
  );
}