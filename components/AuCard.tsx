import { AU } from "@/types/au";

interface AuCardProps {
  au: AU;
  onSelect: (au: AU) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export default function AuCard({ au, onSelect, onToggleFavorite }: AuCardProps) {
  const isFinished = au.status === "Finished";
  const isReading = au.status === "Reading";

  return (
    <div
      onClick={() => onSelect(au)}
      className="bg-[#ece9d8] border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex gap-3 items-center relative group select-none"
    >
      {/* Cover Mini (Ala Photocard) */}
      <div className="w-16 h-20 bg-white border-2 border-black shrink-0 relative overflow-hidden shadow-inner">
        <img
          src={au.coverUrl || "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80"}
          alt={au.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {au.hasNSFW && (
          <span className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-[8px] font-black text-center font-mono">
            18+
          </span>
        )}
      </div>

      {/* Info Ringkas */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-20 py-0.5">
        
        {/* Atas: Fandom & Tombol Favorit */}
        <div className="flex justify-between items-center gap-1">
          <span className="text-[9px] font-extrabold uppercase bg-white border border-black px-1.5 py-0.5 text-black font-mono truncate">
            {au.fandom}
          </span>
          <button
            onClick={(e) => onToggleFavorite(au.id, e)}
            className="text-xs text-amber-500 hover:scale-110 transition"
          >
            {au.isFavorite ? "★" : "☆"}
          </button>
        </div>

        {/* Tengah: Judul & Author */}
        <div className="space-y-0.5">
          <h3 className="text-xs font-black leading-tight text-black truncate">
            {au.title}
          </h3>
          <p className="text-[10px] font-bold text-slate-600 truncate">{au.author}</p>
        </div>

        {/* Bawah: Status Badge & Progress */}
        <div className="flex items-center justify-between gap-1 pt-1">
          <span
            className={`text-[9px] font-black px-1.5 py-0.5 border border-black font-mono shrink-0 truncate ${
              isFinished
                ? "bg-[#b5ff36] text-black"
                : isReading
                ? "bg-sky-200 text-black"
                : "bg-white text-slate-700"
            }`}
          >
            {au.status}
          </span>

          <span className="text-[9px] font-mono font-bold text-blue-800 bg-white px-1.5 py-0.5 border border-black truncate">
            📌 {au.lastChapter || "Part 1"}
          </span>
        </div>

      </div>
    </div>
  );
}