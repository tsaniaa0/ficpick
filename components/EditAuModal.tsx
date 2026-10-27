import { useState, useEffect } from "react";
import { AU } from "@/types/au";

interface EditAuModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAU: AU | null;
  onSaveEdit: (updatedAU: AU) => void;
}

const PRESET_COVERS = [
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
];

export default function EditAuModal({
  isOpen,
  onClose,
  selectedAU,
  onSaveEdit,
}: EditAuModalProps) {
  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    fandom: "",
    linkUrl: "",
    hint: "",
    coverUrl: "",
    hasNSFW: false,
  });

  useEffect(() => {
    if (selectedAU) {
      setEditForm({
        title: selectedAU.title || "",
        author: selectedAU.author || "",
        fandom: selectedAU.fandom || "",
        linkUrl: selectedAU.linkUrl || "",
        hint: selectedAU.hint || "",
        coverUrl: selectedAU.coverUrl || "",
        hasNSFW: selectedAU.hasNSFW || false,
      });
    }
  }, [selectedAU]);

  if (!isOpen || !selectedAU) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.title.trim()) return;

    const updated: AU = {
      ...selectedAU,
      title: editForm.title,
      author: editForm.author || "@author_au",
      fandom: editForm.fandom || "K-Pop AU",
      linkUrl: editForm.linkUrl || "https://twitter.com",
      hint: editForm.hint || "",
      coverUrl: editForm.coverUrl || selectedAU.coverUrl,
      hasNSFW: editForm.hasNSFW,
    };

    onSaveEdit(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-[#ece9d8] border-2 border-black rounded-t-lg max-w-md w-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#000080] text-white px-2.5 py-1 text-xs font-bold flex justify-between items-center border-b-2 border-black select-none sticky top-0 z-10">
          <span className="truncate flex items-center gap-1.5 font-mono">
            ✏️ Edit_AU_Data.exe
          </span>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-[#ece9d8] border border-black text-black text-[10px] font-black flex items-center justify-center hover:bg-red-500 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-3 font-sans text-black">
          <div className="inline-block bg-[#b5ff36] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-base font-black text-black">Edit Detail AU ✏️</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            <div>
              <label className="text-[10px] font-black text-slate-700 uppercase font-mono block mb-1">
                Judul AU *
              </label>
              <input
                type="text"
                required
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-black text-slate-700 uppercase font-mono block mb-1">
                  Author / Username
                </label>
                <input
                  type="text"
                  value={editForm.author}
                  onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-700 uppercase font-mono block mb-1">
                  Fandom / Cast
                </label>
                <input
                  type="text"
                  value={editForm.fandom}
                  onChange={(e) => setEditForm({ ...editForm, fandom: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-700 uppercase font-mono block mb-1">
                URL Foto Cover AU
              </label>
              <input
                type="url"
                value={editForm.coverUrl}
                onChange={(e) => setEditForm({ ...editForm, coverUrl: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
              />

              <div className="pt-1.5 space-y-1">
                <span className="text-[9px] font-bold text-slate-600 block">Preset Cepat:</span>
                <div className="flex gap-1.5">
                  {PRESET_COVERS.map((url, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setEditForm({ ...editForm, coverUrl: url })}
                      className={`w-9 h-9 border-2 border-black overflow-hidden hover:opacity-80 ${
                        editForm.coverUrl === url ? "ring-2 ring-[#b5ff36]" : ""
                      }`}
                    >
                      <img src={url} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-700 uppercase font-mono block mb-1">
                Link Tweet Twitter / X
              </label>
              <input
                type="url"
                value={editForm.linkUrl}
                onChange={(e) => setEditForm({ ...editForm, linkUrl: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-pink-700 uppercase font-mono block mb-1">
                🔒 Hint Password (Privatter/Telegraph)
              </label>
              <input
                type="text"
                value={editForm.hint}
                onChange={(e) => setEditForm({ ...editForm, hint: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-amber-50 border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="editNsfwCheck"
                checked={editForm.hasNSFW}
                onChange={(e) => setEditForm({ ...editForm, hasNSFW: e.target.checked })}
                className="accent-black"
              />
              <label htmlFor="editNsfwCheck" className="text-xs font-bold text-slate-800">
                Ada Konten Dewasa / Privatter (18+)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#b5ff36] hover:bg-[#a3eb25] text-black font-black border-2 border-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all mt-2"
            >
              💾 Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}