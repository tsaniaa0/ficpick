interface HeaderProps {
  theme: string;
  changeTheme: (theme: string) => void;
  getAccentColor: () => string;
  username: string | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Header({
  username,
  onOpenLogin,
  onLogout,
}: HeaderProps) {
  return (
    <header className="max-w-5xl mx-auto mb-6 bg-[#ece9d8] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2.5 flex justify-between items-center">
      {/* Title Bar Left */}
      <div className="flex items-center gap-2">
        <div className="bg-[#b5ff36] border border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-lg font-black text-black tracking-tight">
            💻 FicPick.exe
          </h1>
        </div>
        <span className="text-[10px] font-mono bg-white border border-black px-2 py-0.5">
          v0.8-retro
        </span>
      </div>

      {/* Control Right */}
      <div className="flex items-center gap-3">
        {username ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-black bg-white border border-black px-2.5 py-1">
              👤 {username}
            </span>
            <button
              onClick={onLogout}
              className="px-3 py-1 text-xs bg-slate-200 hover:bg-slate-300 text-black font-bold border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
            >
              Exit
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="px-4 py-1.5 text-xs font-black bg-[#b5ff36] hover:bg-[#9de022] text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            🔑 LOG IN
          </button>
        )}
      </div>
    </header>
  );
}