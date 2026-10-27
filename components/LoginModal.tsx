interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginModal({ isOpen, onClose, onSubmit }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-[#ece9d8] border-2 border-black rounded-t-lg max-w-sm w-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        
        {/* Retro Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#000080] text-white px-2.5 py-1 text-xs font-bold flex justify-between items-center border-b-2 border-black select-none">
          <span className="truncate flex items-center gap-1.5 font-mono">
            🔑 User_Login.exe
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
          <div className="text-center space-y-1">
            <div className="inline-block bg-[#b5ff36] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-base font-black text-black">Masuk ke FicPick ✨</h3>
            </div>
            <p className="text-xs font-bold text-slate-700 pt-1">
              Simpan rak buku AU favoritmu secara permanen
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-3 pt-1">
            <div>
              <label className="text-[10px] font-black text-slate-700 uppercase font-mono block mb-1">
                Username / Email
              </label>
              <input
                type="text"
                required
                placeholder="KpopLover123"
                className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-700 uppercase font-mono block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[#b5ff36] hover:bg-[#a3eb25] text-black font-black border-2 border-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all mt-2"
            >
              🔑 Masuk Sekarang
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}