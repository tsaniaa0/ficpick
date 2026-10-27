import { AU } from "@/types/au";

interface AuDetailModalProps {
  selectedAU: AU | null;
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
  onDeleteAU: (id: string) => void;
}

export default function AuDetailModal({
  selectedAU,
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
  onDeleteAU,
}: AuDetailModalProps) {
  if (!selectedAU) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto py-8">
      <div className="bg-[#ece9d8] border-2 border-black rounded-t-lg max-w-md w-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative my-auto overflow-hidden">
        
        {/* Retro Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#000080] text-white px-2.5 py-1 text-xs font-bold flex justify-between items-center border-b-2 border-black select-none">
          <span className="truncate flex items-center gap-1.5 font-mono">
            💾 AU_Properties.exe
          </span>
          <div className="flex gap-1">
            <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center">
              _
            </button>
            <button className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center">
              ◽
            </button>
            <button 
              onClick={onClose}
              className="w-3.5 h-3.5 bg-[#ece9d8] border border-black text-black text-[9px] font-black flex items-center justify-center hover:bg-red-500 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 font-sans text-black">
          {/* Header Info */}
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-white border border-black px-2 py-0.5 text-black font-mono">
              {selectedAU.fandom}
            </span>
            <div className="mt-2 inline-block bg-[#b5ff36] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-w-full">
              <h3 className="text-lg font-black leading-tight text-black truncate">
                {selectedAU.title}
              </h3>
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">Karya oleh {selectedAU.author}</p>
          </div>

          {/* Ubah Status Bacaan */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-700 uppercase font-mono">
              UBAH STATUS BACAAN:
            </label>
            <div className="flex gap-1.5">
              {["Reading", "Finished", "Plan to Read"].map((st) => (
                <button
                  key={st}
                  onClick={() => onChangeStatus(st)}
                  className={`flex-1 py-1.5 border-2 border-black text-xs font-black transition ${
                    selectedAU.status === st
                      ? "bg-[#b5ff36] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-slate-800 hover:bg-slate-100 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Jejak Baca Terakhir */}
          <div className="bg-white border-2 border-black p-3 shadow-inner space-y-1.5">
            <div className="flex justify-between items-center">
              <p className="text-slate-600 text-[10px] font-black uppercase font-mono">
                JEJAK BACA TERAKHIR:
              </p>
              <button
                onClick={() => setIsEditingProgress(!isEditingProgress)}
                className="text-xs font-black text-blue-700 hover:underline"
              >
                {isEditingProgress ? "Batal" : "✏️ Edit"}
              </button>
            </div>

            {isEditingProgress ? (
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  defaultValue={selectedAU.lastChapter}
                  onChange={(e) => setNewProgress(e.target.value)}
                  placeholder="Contoh: Part 45 - Berantem lagi"
                  className="flex-1 px-2.5 py-1 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none"
                />
                <button
                  onClick={onUpdateChapter}
                  className="px-3 py-1 bg-[#b5ff36] border-2 border-black text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  Simpan
                </button>
              </div>
            ) : (
              <p className="text-black text-xs font-bold font-mono truncate">{selectedAU.lastChapter}</p>
            )}
          </div>

          {/* Hint Privatter */}
          {selectedAU.hint && (
            <div className="bg-amber-100 border-2 border-black p-2.5 text-xs text-black space-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-black flex items-center gap-1 font-mono text-[10px] text-amber-900 uppercase">
                🔒 Hint Password (Privatter / Eksternal):
              </p>
              <p className="italic font-bold">{selectedAU.hint}</p>
            </div>
          )}

          {/* Seksi Review & Rating */}
          <div className="border-t-2 border-black pt-3 space-y-2.5">
            <h4 className="text-xs font-black text-black font-mono uppercase">
              Ulasan Pembaca ({selectedAU.reviews?.length || 0})
            </h4>

            <form onSubmit={onAddReview} className="space-y-2 bg-white p-3 border-2 border-black shadow-inner">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-700 uppercase font-mono">Beri Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className={`text-sm ${star <= newRating ? "text-amber-500" : "text-slate-300"}`}
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
                className="w-full px-2.5 py-1 bg-white border-2 border-black text-xs font-medium text-black focus:outline-none"
              />

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSpoilerReview}
                    onChange={(e) => setIsSpoilerReview(e.target.checked)}
                    className="accent-black"
                  />
                  Mengandung Spoiler!
                </label>
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#ece9d8] hover:bg-slate-200 text-black border-2 border-black text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  Kirim Review
                </button>
              </div>
            </form>

            <div className="max-h-32 overflow-y-auto space-y-2 pr-1">
              {selectedAU.reviews?.map((rev) => (
                <div key={rev.id} className="bg-white p-2 border border-black text-xs space-y-0.5">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-black">{rev.user}</span>
                    <span className="text-amber-500 text-[10px]">{"★".repeat(rev.rating)}</span>
                  </div>

                  {rev.isSpoiler ? (
                    <div>
                      {showSpoilers[rev.id] ? (
                        <p className="text-slate-800 italic">{rev.text}</p>
                      ) : (
                        <button
                          onClick={() => setShowSpoilers({ ...showSpoilers, [rev.id]: true })}
                          className="text-[10px] text-red-700 bg-red-100 px-1.5 py-0.5 border border-black font-bold hover:underline"
                        >
                          ⚠️ Mengandung Spoiler! (Klik untuk lihat)
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-800 font-medium">{rev.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Langsung */}
          <div className="pt-2 flex gap-2">
            <a
              href={selectedAU.linkUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 text-center bg-[#b5ff36] hover:bg-[#a3eb25] text-black font-black border-2 border-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5"
            >
              🚀 Buka Link Twitter / X
            </a>
            <button
              onClick={() => onDeleteAU(selectedAU.id)}
              className="px-3.5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-black border-2 border-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              🗑️ Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}