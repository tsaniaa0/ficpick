interface AddAuModalProps {
  isOpen: boolean;
  onClose: () => void;
  newForm: {
    title: string;
    author: string;
    fandom: string;
    linkUrl: string;
    hint: string;
    hasNSFW: boolean;
  };
  setNewForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      author: string;
      fandom: string;
      linkUrl: string;
      hint: string;
      hasNSFW: boolean;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddAuModal({
  isOpen,
  onClose,
  newForm,
  setNewForm,
  onSubmit,
}: AddAuModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-slate-100">Simpan AU Baru ✨</h3>

        <form onSubmit={onSubmit} className="space-y-3 pt-2">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Judul AU *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Project High School"
              value={newForm.title}
              onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Author / Username</label>
              <input
                type="text"
                placeholder="@starryskies"
                value={newForm.author}
                onChange={(e) => setNewForm({ ...newForm, author: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Fandom / Cast</label>
              <input
                type="text"
                placeholder="NCT / Jaemin"
                value={newForm.fandom}
                onChange={(e) => setNewForm({ ...newForm, fandom: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Link Tweet Twitter</label>
            <input
              type="url"
              placeholder="https://x.com/username/status/..."
              value={newForm.linkUrl}
              onChange={(e) => setNewForm({ ...newForm, linkUrl: e.target.value })}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-xs text-pink-400 block mb-1">
              🔒 Hint Password (Privatter/Telegraph)
            </label>
            <input
              type="text"
              placeholder="Contoh: Tanggal debut grup (DDMMYY)"
              value={newForm.hint}
              onChange={(e) => setNewForm({ ...newForm, hint: e.target.value })}
              className="w-full px-4 py-2 bg-slate-950 border border-pink-500/30 rounded-xl text-sm focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="nsfwCheck"
              checked={newForm.hasNSFW}
              onChange={(e) => setNewForm({ ...newForm, hasNSFW: e.target.checked })}
              className="rounded text-pink-600 focus:ring-pink-500"
            />
            <label htmlFor="nsfwCheck" className="text-xs text-slate-300">
              Ada Konten Dewasa / Privatter (18+)
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white rounded-xl text-sm hover:opacity-90 transition mt-3"
          >
            + Masukkan ke Binder
          </button>
        </form>
      </div>
    </div>
  );
}