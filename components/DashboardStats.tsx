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
    <section className="max-w-5xl mx-auto my-6 grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center space-y-0.5">
        <p className="text-slate-400 text-[11px] font-semibold">TOTAL AU</p>
        <p className="text-2xl font-black text-slate-100">{totalAU}</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center space-y-0.5">
        <p className="text-amber-400 text-[11px] font-semibold">SEDANG DIBACA</p>
        <p className="text-2xl font-black text-amber-300">{readingCount}</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center space-y-0.5">
        <p className="text-emerald-400 text-[11px] font-semibold">TAMAT</p>
        <p className="text-2xl font-black text-emerald-300">{finishedCount}</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center space-y-0.5">
        <p className="text-pink-400 text-[11px] font-semibold">HINT PRIVATTER</p>
        <p className="text-2xl font-black text-pink-300">{hintCount}</p>
      </div>
    </section>
  );
}