interface DashboardStatsProps {
  totalAU: number;
  readingCount: number;
  finishedCount: number;
  hintCount: number;
}

export default function DashboardStats({
  totalAU,
  readingCount,
  finishedCount,
  hintCount,
}: DashboardStatsProps) {
  return (
    <section className="max-w-5xl mx-auto my-6 bg-[#ece9d8] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-t-lg overflow-hidden">
      {/* Title Bar Jendela Stats */}
      <div className="bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#000080] text-white px-2.5 py-1 text-xs font-bold flex justify-between items-center border-b-2 border-black select-none">
        <span className="flex items-center gap-1.5 font-mono">
          📊 System_Statistics.exe
        </span>
        <div className="flex gap-1">
          <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
            _
          </button>
          <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
            ◽
          </button>
          <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
            ✕
          </button>
        </div>
      </div>

      {/* Grid 4 Kotak Status */}
      <div className="p-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border-2 border-black p-2.5 text-center shadow-inner space-y-0.5">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-wider font-mono">
            TOTAL AU
          </p>
          <p className="text-2xl font-black text-black font-mono">{totalAU}</p>
        </div>

        <div className="bg-white border-2 border-black p-2.5 text-center shadow-inner space-y-0.5">
          <p className="text-amber-600 text-[10px] font-black uppercase tracking-wider font-mono">
            SEDANG DIBACA
          </p>
          <p className="text-2xl font-black text-amber-500 font-mono">
            {readingCount}
          </p>
        </div>

        <div className="bg-white border-2 border-black p-2.5 text-center shadow-inner space-y-0.5">
          <p className="text-emerald-600 text-[10px] font-black uppercase tracking-wider font-mono">
            TAMAT
          </p>
          <p className="text-2xl font-black text-emerald-600 font-mono">
            {finishedCount}
          </p>
        </div>

        <div className="bg-white border-2 border-black p-2.5 text-center shadow-inner space-y-0.5">
          <p className="text-pink-600 text-[10px] font-black uppercase tracking-wider font-mono">
            HINT PRIVATTER
          </p>
          <p className="text-2xl font-black text-pink-500 font-mono">
            {hintCount}
          </p>
        </div>
      </div>
    </section>
  );
}