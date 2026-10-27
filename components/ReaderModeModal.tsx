import { AU } from "@/types/au";

interface ReaderModeModalProps {
  selectedAU: AU | null;
  isReaderMode: boolean;
  onClose: () => void;
}

export default function ReaderModeModal({
  selectedAU,
  isReaderMode,
  onClose,
}: ReaderModeModalProps) {
  if (!selectedAU || !isReaderMode) return null;

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 overflow-y-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6 py-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 sticky top-0 bg-slate-950/90 backdrop-blur-md pt-2">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-pink-400 hover:underline flex items-center gap-1"
          >
            ← Kembali ke Binder
          </button>
          <span className="text-xs text-slate-500">Mode Membaca Bebas Iklan ✨</span>
        </div>

        <div className="space-y-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <span className="text-xs font-semibold text-pink-400 uppercase">
            {selectedAU.fandom}
          </span>
          <h2 className="text-2xl font-bold text-slate-100">{selectedAU.title}</h2>
          <p className="text-xs text-slate-400 border-b border-slate-800 pb-4">
            Ditulis oleh {selectedAU.author} • {selectedAU.lastChapter}
          </p>

          <div className="py-4 text-slate-200 text-base leading-relaxed space-y-4 font-serif">
            <p>{selectedAU.contentSnippet}</p>
          </div>

          {selectedAU.hint && (
            <div className="bg-pink-950/40 border border-pink-500/30 p-4 rounded-2xl text-xs text-pink-200 space-y-1">
              <p className="font-bold text-pink-400">🔑 Hint Privatter/Telegraph:</p>
              <p className="italic">{selectedAU.hint}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}