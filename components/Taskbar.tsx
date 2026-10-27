import { useState, useEffect } from "react";

export default function Taskbar() {
  const [time, setTime] = useState("");

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
    <footer className="fixed bottom-0 left-0 right-0 h-10 bg-[#ece9d8] border-t-2 border-black z-50 flex justify-between items-center px-1.5 font-mono select-none">
      {/* Start Button & Active Window */}
      <div className="flex items-center gap-2">
        <button className="px-2.5 py-1 bg-[#ece9d8] hover:bg-slate-200 text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5">
          <span className="bg-[#b5ff36] border border-black px-1 text-[9px]">❖</span>
          <b>Start</b>
        </button>

        <div className="h-5 w-[2px] bg-slate-400 border-r border-white mx-1" />

        {/* Tab Aktif */}
        <div className="px-3 py-1 bg-white border-2 border-black text-xs font-bold text-black flex items-center gap-1.5 shadow-inner">
          <span>💻</span>
          <span className="truncate max-w-[120px] md:max-w-none">FicPick.exe</span>
        </div>
      </div>

      {/* System Tray & Clock */}
      <div className="bg-white border-2 border-black px-3 py-0.5 text-xs font-bold text-black shadow-inner flex items-center gap-2">
        <span title="Volume">🔊</span>
        <span title="Supabase Sync">⚡</span>
        <span>{time || "12:00"}</span>
      </div>
    </footer>
  );
}