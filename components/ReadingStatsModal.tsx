"use client";

import { AU } from "@/types/au";

interface ReadingStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  aus: AU[];
  theme: string; // <-- Tambahkan ini
}

export default function ReadingStatsModal({
  isOpen,
  onClose,
  aus,
  theme, // <-- Tangkap prop theme di sini
}: ReadingStatsModalProps) {
  if (!isOpen) return null;

  const totalCompleted = aus.filter((a) => a.status === "Finished").length;
  const totalReading = aus.filter((a) => a.status === "Reading").length;
  const totalPlan = aus.filter((a) => a.status === "Plan to Read").length;

  // Hitung fandom terbanyak
  const fandomCounts: { [key: string]: number } = {};
  aus.forEach((a) => {
    const mainFandom = a.fandom.split("/")[0].trim();
    fandomCounts[mainFandom] = (fandomCounts[mainFandom] || 0) + 1;
  });
  const topFandom = Object.entries(fandomCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  // Menentukan warna title bar berdasarkan tema aktif
  const titleBarBg =
    theme === "rose"
      ? "bg-[#800040]"
      : theme === "lavender"
      ? "bg-[#483d8b]"
      : "bg-[#000080]";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 font-mono select-none">
      <div className="bg-[#ece9d8] border-2 border-black w-full max-w-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Windows Title Bar */}
        <div className={`${titleBarBg} text-white px-2 py-1.5 flex justify-between items-center text-xs font-bold`}>
          <span className="flex items-center gap-1.5">📊 Reading_Insights.exe</span>
          <button
            onClick={onClose}
            className="bg-[#ece9d8] text-black px-1.5 py-0.5 border border-black text-[10px] font-black hover:bg-red-600 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div className="border-2 border-black bg-white p-3 shadow-inner space-y-2">
            <h4 className="text-xs font-black uppercase text-blue-900 border-b border-black pb-1">
              ✨ Ringkasan Aktivitas Membaca
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
              <div className="bg-[#ece9d8] p-2 border border-black">
                <p className="text-[10px] text-slate-600">Total Selesai:</p>
                <p className="text-base font-black text-emerald-700">{totalCompleted} Cerita</p>
              </div>
              <div className="bg-[#ece9d8] p-2 border border-black">
                <p className="text-[10px] text-slate-600">Sedang Dibaca:</p>
                <p className="text-base font-black text-blue-700">{totalReading} Cerita</p>
              </div>
              <div className="bg-[#ece9d8] p-2 border border-black">
                <p className="text-[10px] text-slate-600">Plan to Read:</p>
                <p className="text-base font-black text-amber-700">{totalPlan} Cerita</p>
              </div>
              <div className="bg-[#ece9d8] p-2 border border-black">
                <p className="text-[10px] text-slate-600">Fandom Terfavorit:</p>
                <p className="text-xs font-black truncate text-purple-700 mt-1">{topFandom}</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-100 border-2 border-black p-2.5 text-[11px] font-bold text-amber-900">
            💡 <i>Tips: Semakin rajin memperbarui progress bacaan, semakin akurat statistik binder kamu!</i>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#ece9d8] hover:bg-slate-200 border-2 border-black text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}