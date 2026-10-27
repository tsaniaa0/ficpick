import { AU } from "@/types/au";

interface AuCardProps {
  au: AU;
  onSelect: (au: AU) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export default function AuCard({ au, onSelect, onToggleFavorite }: AuCardProps) {
  return (
    <div
      onClick={() => onSelect(au)}
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-pink-500/40 transition group flex flex-col justify-between cursor-pointer relative"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-800">
        <img
          src={au.coverUrl}
          alt={au.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-md ${
            au.status === "Reading"
              ? "bg-amber-500/80 text-white"
              : au.status === "Finished"
              ? "bg-emerald-500/80 text-white"
              : "bg-blue-500/80 text-white"
          }`}
        >
          {au.status}
        </span>

        {au.hasNewUpdate && (
          <span className="absolute bottom-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-0.5 rounded-md text-[9px] font-black tracking-wider animate-pulse shadow-lg">
            NEW UPDATE! 🔥
          </span>
        )}

        <button
          onClick={(e) => onToggleFavorite(au.id, e)}
          className="absolute bottom-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-full text-sm hover:scale-110 transition"
        >
          {au.isFavorite ? "❤️" : "🤍"}
        </button>

        {au.hasNSFW && (
          <span className="absolute top-3 right-3 bg-red-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider">
            18+ / PRIVATTER
          </span>
        )}
      </div>

      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider">
              {au.fandom}
            </span>
            <span className="text-amber-400 text-xs font-bold">
              ★ {au.rating || 5}
            </span>
          </div>
          <h4 className="font-bold text-slate-100 text-base leading-snug line-clamp-1 group-hover:text-pink-400 transition mt-0.5">
            {au.title}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">{au.author}</p>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs space-y-1">
          <p className="text-slate-500 text-[10px] font-semibold">JEJAK BACA TERAKHIR:</p>
          <p className="text-slate-300 font-medium truncate">{au.lastChapter}</p>
        </div>
      </div>
    </div>
  );
}