interface AddAuModalProps {
  isOpen: boolean;
  onClose: () => void;
  newForm: {
    title: string;
    author: string;
    fandom: string;
    linkUrl: string;
    hint: string;
    coverUrl: string;
    hasNSFW: boolean;
  };
  setNewForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      author: string;
      fandom: string;
      linkUrl: string;
      hint: string;
      coverUrl: string;
      hasNSFW: boolean;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
}

// Preset Cover Retro / Aesthetic Cepat
const PRESET_COVERS = [
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
];

export default function AddAuModal({
  isOpen,
  onClose,
  newForm,
  setNewForm,
  onSubmit,
}: AddAuModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-[#ece9d8] border-2 border-black rounded-t-lg max-w-md w-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#000080] text-white px-2.5 py-1 text-xs font-bold flex justify-between items-center border-b-2 border-black select-none sticky top-0 z-10">
          <span className="truncate flex items-center gap-1.5 font-mono">
            ✨ Add_New_AU.exe
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
            <h3 className="text-base font-black text-black">Simpan AU Baru ✨</h3>
          </div>

          <form onSubmit={onSubmit} className="space-y-3 pt-1">
            <div>
              <label className="text-[10px] font-black text-slate-700 uppercase font-mono block mb-1">
                Judul AU *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Private Bodyguard"
                value={newForm.title}
                onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
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
                  placeholder="@dailyccaca"
                  value={newForm.author}
                  onChange={(e) => setNewForm({ ...newForm, author: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-700 uppercase font-mono block mb-1">
                  Fandom / Cast
                </label>
                <input
                  type="text"
                  placeholder="NCT DREAM 00"
                  value={newForm.fandom}
                  onChange={(e) => setNewForm({ ...newForm, fandom: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
                />
              </div>
            </div>

            {/* INPUT URL COVER FOTO */}
            <div>
              <label className="text-[10px] font-black text-slate-700 uppercase font-mono block mb-1">
                URL Foto Cover / Gambar AU
              </label>
              <input
                type="url"
                placeholder="https://... (Tempel URL Gambar)"
                value={newForm.coverUrl || ""}
                onChange={(e) => setNewForm({ ...newForm, coverUrl: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
              />
              
              {/* Opsi Preset Cover Cepat */}
              <div className="pt-1.5 space-y-1">
                <span className="text-[9px] font-bold text-slate-600 block">Atau pilih preset cepat:</span>
                <div className="flex gap-1.5">
                  {PRESET_COVERS.map((url, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setNewForm({ ...newForm, coverUrl: url })}
                      className={`w-9 h-9 border-2 border-black overflow-hidden hover:opacity-80 ${
                        newForm.coverUrl === url ? "ring-2 ring-[#b5ff36]" : ""
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
                placeholder="https://x.com/username/status/..."
                value={newForm.linkUrl}
                onChange={(e) => setNewForm({ ...newForm, linkUrl: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-pink-700 uppercase font-mono block mb-1">
                🔒 Hint Password (Privatter/Telegraph)
              </label>
              <input
                type="text"
                placeholder="Contoh: Tanggal debut (DDMMYY)"
                value={newForm.hint}
                onChange={(e) => setNewForm({ ...newForm, hint: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-amber-50 border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="nsfwCheck"
                checked={newForm.hasNSFW}
                onChange={(e) => setNewForm({ ...newForm, hasNSFW: e.target.checked })}
                className="accent-black"
              />
              <label htmlFor="nsfwCheck" className="text-xs font-bold text-slate-800">
                Ada Konten Dewasa / Privatter (18+)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#b5ff36] hover:bg-[#a3eb25] text-black font-black border-2 border-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all mt-2"
            >
              + Masukkan ke Binder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}