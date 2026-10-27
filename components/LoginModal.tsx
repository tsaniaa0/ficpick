interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginModal({ isOpen, onClose, onSubmit }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-100">Masuk ke FicPick ✨</h3>
          <p className="text-xs text-slate-400">
            Simpan rak buku AU favoritmu secara permanen
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 pt-2">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Username / Email</label>
            <input
              type="text"
              required
              placeholder="KpopLover123"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-pink-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white rounded-xl text-sm hover:opacity-90 transition mt-2"
          >
            Masuk Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}