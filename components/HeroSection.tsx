import { RefObject } from "react";

interface HeroSectionProps {
  onOpenAddModal: () => void;
  onShareBinder: () => void;
  onExportJSON: () => void;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export default function HeroSection({
  onOpenAddModal,
  onShareBinder,
  onExportJSON,
  onImportJSON,
  fileInputRef,
}: HeroSectionProps) {
  return (
    <section className="max-w-3xl mx-auto my-6 bg-[#ece9d8] border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-t-lg overflow-hidden text-center">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#000080] text-white px-2.5 py-1 text-xs font-bold flex justify-between items-center border-b-2 border-black select-none">
        <span className="font-mono">🗂️ Main_Menu.sys</span>
        <div className="flex gap-1">
          <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center">
            _
          </button>
          <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center">
            ◽
          </button>
          <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center">
            ✕
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 space-y-4">
        <div className="inline-block bg-[#b5ff36] border-2 border-black px-4 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
            Rak Buku AU Twitter & Fiksi Favoritmu
          </h2>
        </div>

        <p className="text-slate-800 text-xs md:text-sm font-semibold max-w-lg mx-auto leading-relaxed bg-white/80 border border-black p-2 shadow-inner">
          Tandai jejak bacaan, simpan *hint password*, dan lanjut baca tanpa pusing ketumpuk!
        </p>

        {/* Action Buttons Retro 3D */}
        <div className="pt-2 flex flex-wrap justify-center gap-2.5">
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2.5 bg-[#b5ff36] hover:bg-[#a3eb25] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
          >
            ✨ + Simpan AU Baru
          </button>

          <button
            onClick={onShareBinder}
            className="px-3.5 py-2.5 bg-[#ece9d8] hover:bg-[#dedab8] text-black font-bold text-xs border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            📤 Share Binder
          </button>

          <button
            onClick={onExportJSON}
            className="px-3.5 py-2.5 bg-[#ece9d8] hover:bg-[#dedab8] text-black font-bold text-xs border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            💾 Backup JSON
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2.5 bg-[#ece9d8] hover:bg-[#dedab8] text-black font-bold text-xs border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            📥 Import Backup
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={onImportJSON}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>
    </section>
  );
}