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
    <section className="max-w-3xl mx-auto text-center py-4 space-y-4">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        Rak Buku AU Twitter & Fiksi Favoritmu
      </h2>
      <p className="text-slate-400 text-sm md:text-base">
        Tandai jejak bacaan, simpan *hint password*, dan lanjut baca tanpa pusing ketumpuk!
      </p>

      <div className="pt-2 flex flex-wrap justify-center gap-2">
        <button
          onClick={onOpenAddModal}
          className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-white rounded-xl hover:opacity-90 text-sm transition shadow-lg shadow-pink-500/20 active:scale-95"
        >
          ✨ + Simpan AU Baru
        </button>
        <button
          onClick={onShareBinder}
          className="px-4 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 font-semibold text-slate-200 rounded-xl text-xs transition"
        >
          📤 Share Binder
        </button>
        <button
          onClick={onExportJSON}
          className="px-4 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 font-semibold text-slate-200 rounded-xl text-xs transition"
        >
          💾 Backup JSON
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 font-semibold text-slate-200 rounded-xl text-xs transition"
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
    </section>
  );
}