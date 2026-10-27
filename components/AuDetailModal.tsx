import { AU } from "@/types/au";

interface AuDetailModalProps {
  selectedAU: AU | null;
  isReaderMode: boolean;
  onClose: () => void;
  onChangeStatus: (status: string) => void;
  isEditingProgress: boolean;
  setIsEditingProgress: (editing: boolean) => void;
  newProgress: string;
  setNewProgress: (val: string) => void;
  onUpdateChapter: () => void;
  newRating: number;
  setNewRating: (rating: number) => void;
  newReviewText: string;
  setNewReviewText: (text: string) => void;
  isSpoilerReview: boolean;
  setIsSpoilerReview: (spoiler: boolean) => void;
  onAddReview: (e: React.FormEvent) => void;
  showSpoilers: { [key: string]: boolean };
  setShowSpoilers: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  onOpenReaderMode: () => void;
  onDeleteAU: (id: string) => void;
}

export default function AuDetailModal({
  selectedAU,
  isReaderMode,
  onClose,
  onChangeStatus,
  isEditingProgress,
  setIsEditingProgress,
  newProgress,
  setNewProgress,
  onUpdateChapter,
  newRating,
  setNewRating,
  newReviewText,
  setNewReviewText,
  isSpoilerReview,
  setIsSpoilerReview,
  onAddReview,
  showSpoilers,
  setShowSpoilers,
  onOpenReaderMode,
  onDeleteAU,
}: AuDetailModalProps) {
  if (!selectedAU || isReaderMode) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto py-8">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <span className="text-xs font-semibold text-pink-400 uppercase">
          {selectedAU.fandom}
        </span>
        <h3 className="text-xl font-bold text-slate-100">{selectedAU.title}</h3>
        <p className="text-xs text-slate-400">Karya oleh {selectedAU.author}</p>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase">
            Ubah Status Bacaan:
          </label>
          <div className="flex gap-2">
            {["Reading", "Finished", "Plan to Read"].map((st) => (
              <button
                key={st}
                onClick={() => onChangeStatus(st)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedAU.status === st
                    ? "bg-pink-600 text-white"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-slate-500 text-[11px] font-semibold">JEJAK BACA TERAKHIR:</p>
            <button
              onClick={() => setIsEditingProgress(!isEditingProgress)}
              className="text-xs text-pink-400 hover:underline"
            >
              {isEditingProgress ? "Batal" : "✏️ Edit"}
            </button>
          </div>

          {isEditingProgress ? (
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue={selectedAU.lastChapter}
                onChange={(e) => setNewProgress(e.target.value)}
                placeholder="Contoh: Part 45 - Berantem lagi"
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:outline-none focus:border-pink-500"
              />
              <button
                onClick={onUpdateChapter}
                className="px-3 py-1.5 bg-pink-600 text-white text-xs rounded-lg font-semibold"
              >
                Simpan
              </button>
            </div>
          ) : (
            <p className="text-slate-200 text-sm font-medium">{selectedAU.lastChapter}</p>
          )}
        </div>

        {selectedAU.hint && (
          <div className="bg-pink-950/40 border border-pink-500/30 p-3 rounded-xl text-xs text-pink-200 space-y-1">
            <p className="font-bold flex items-center gap-1 text-pink-400">
              🔒 Hint Password (Privatter / Eksternal):
            </p>
            <p className="italic">{selectedAU.hint}</p>
          </div>
        )}

        {/* Ulasan & Rating */}
        <div className="border-t border-slate-800 pt-3 space-y-3">
          <h4 className="text-xs font-bold text-slate-300">
            Ulasan Pembaca ({selectedAU.reviews?.length || 0})
          </h4>

          <form onSubmit={onAddReview} className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-400">Beri Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewRating(star)}
                    className={`text-sm ${star <= newRating ? "text-amber-400" : "text-slate-700"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Tulis ulasan singkat..."
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-pink-500"
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-1.5 text-[10px] text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSpoilerReview}
                  onChange={(e) => setIsSpoilerReview(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                Mengandung Spoiler!
              </label>
              <button
                type="submit"
                className="px-3 py-1 bg-pink-600 text-white text-xs font-semibold rounded-lg hover:bg-pink-500 transition"
              >
                Kirim Review
              </button>
            </div>
          </form>

          <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
            {selectedAU.reviews?.map((rev) => (
              <div key={rev.id} className="bg-slate-950/60 p-2.5 rounded-lg text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-pink-400">{rev.user}</span>
                  <span className="text-amber-400 text-[10px]">{"★".repeat(rev.rating)}</span>
                </div>

                {rev.isSpoiler ? (
                  <div>
                    {showSpoilers[rev.id] ? (
                      <p className="text-slate-300 italic">{rev.text}</p>
                    ) : (
                      <button
                        onClick={() => setShowSpoilers({ ...showSpoilers, [rev.id]: true })}
                        className="text-[10px] text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-500/30 hover:underline"
                      >
                        ⚠️ Mengandung Spoiler! (Klik untuk lihat)
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-300">{rev.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={onOpenReaderMode}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl text-sm transition hover:opacity-90 flex items-center justify-center gap-2"
          >
            📖 Buka Mode Baca (Reader Mode)
          </button>

          <div className="flex gap-2">
            <a
              href={selectedAU.linkUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 text-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-xs transition"
            >
              🔗 Link Twitter Asli
            </a>
            <button
              onClick={() => onDeleteAU(selectedAU.id)}
              className="px-4 py-2.5 bg-red-950/60 border border-red-500/30 text-red-400 hover:bg-red-900/60 rounded-xl text-xs font-semibold transition"
            >
              🗑️ Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}