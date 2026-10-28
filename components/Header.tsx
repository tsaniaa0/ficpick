interface HeaderProps {
  theme: string;
  changeTheme: (theme: string) => void;
  getAccentColor: () => string;
  username: string | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Header({
  theme,
  username,
  onOpenLogin,
  onLogout,
}: HeaderProps) {
  // Menentukan warna background title bar berdasarkan tema aktif
  const titleBarBg =
    theme === "rose"
      ? "bg-[#800040]"
      : theme === "lavender"
      ? "bg-[#483d8b]"
      : "bg-[#000080]";

  return (
    <header className="max-w-5xl mx-auto mb-6 bg-[#ece9d8] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2 flex justify-between items-center font-mono">
      {/* Title Bar Left ala Windows 95 */}
      <div className="flex items-center gap-2 w-full">
        <div
          className={`${titleBarBg} text-white px-3 py-1 flex justify-between items-center w-full border border-black shadow-inner`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">💻</span>
            <h1 className="text-xs md:text-sm font-black tracking-wide text-white">
              FicPick.exe
            </h1>
          </div>
          <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 border border-white/40">
            v0.8-retro
          </span>
        </div>
      </div>

      {/* Control Right (Login / User Profile) */}
      <div className="flex items-center gap-3 pl-3 shrink-0">
        {username ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-black bg-white border-2 border-black px-2.5 py-1 shadow-inner truncate max-w-[120px] md:max-w-none">
              👤 {username}
            </span>
            <button
              onClick={onLogout}
              className="px-3 py-1 text-xs bg-[#ece9d8] hover:bg-slate-200 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
            >
              Exit
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="px-4 py-1.5 text-xs font-black bg-[#b5ff36] hover:bg-[#a3eb25] text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            🔑 LOG IN
          </button>
        )}
      </div>
    </header>
  );
}