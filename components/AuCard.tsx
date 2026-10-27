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
      className="bg-[#ece9d8] border-2 border-black rounded-t-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Retro Window Header Bar */}
      <div className="bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#000080] text-white px-2 py-1 text-xs font-bold flex justify-between items-center border-b-2 border-black select-none">
        <span className="truncate flex items-center gap-1">
          📁 {au.fandom}
        </span>
        <div className="flex gap-1">
          <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
            _
          </button>
          <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
            ◽
          </button>
          <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] hover:bg-red-500 hover:text-white">
            ✕
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-3 space-y-3">
        {/* Cover Image dengan Frame Stamp / Cutout */}
        <div className="relative aspect-[2/3] w-full bg-white border-2 border-black p-1 shadow-inner overflow-hidden">
          <img
            src={au.coverUrl}
            alt={au.title}
            className="w-full h-full object-cover"
          />

          {/* Badge Status OS Style */}
          <span
            className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
              au.status === "Reading"
                ? "bg-amber-300 text-black"
                : au.status === "Finished"
                ? "bg-emerald-300 text-black"
                : "bg-sky-300 text-black"
            }`}
          >
            {au.status}
          </span>

          <button
            onClick={(e) => onToggleFavorite(au.id, e)}
            className="absolute bottom-2 right-2 p-1.5 bg-white border border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition"
          >
            {au.isFavorite ? "❤️" : "🤍"}
          </button>

          {au.hasNSFW && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-1.5 py-0.5 text-[9px] font-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              18+
            </span>
          )}
        </div>

        {/* Title dengan Lime Highlight Box */}
        <div className="space-y-1">
          <div className="inline-block bg-[#b5ff36] border border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-w-full">
            <h4 className="font-extrabold text-black text-sm leading-tight truncate">
              {au.title}
            </h4>
          </div>
          <p className="text-xs font-bold text-slate-700">{au.author}</p>
        </div>

        {/* Info Progress Chapter Retro Box */}
        <div className="bg-white border border-black p-2 shadow-inner text-xs space-y-0.5 font-mono">
          <p className="text-[9px] text-slate-500 font-bold uppercase">LAST READ:</p>
          <p className="text-black font-semibold truncate">{au.lastChapter}</p>
        </div>
      </div>
    </div>
  );
}