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
  changeTheme,
  getAccentColor,
  username,
  onOpenLogin,
  onLogout,
}: HeaderProps) {
  return (
    <header className="max-w-5xl mx-auto flex justify-between items-center py-4 border-b border-slate-800">
      <h1 className={`text-2xl font-bold tracking-tight ${getAccentColor()} flex items-center gap-2`}>
        ✨ FicPick
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          Alpha v0.8
        </span>
      </h1>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-1 rounded-full border border-slate-800">
          <button
            onClick={() => changeTheme("dark")}
            title="Default Dark"
            className={`w-5 h-5 rounded-full bg-pink-500 ${theme === "dark" ? "ring-2 ring-white" : ""}`}
          />
          <button
            onClick={() => changeTheme("seventeen")}
            title="Rose Quartz & Serenity (SVT)"
            className={`w-5 h-5 rounded-full bg-gradient-to-r from-pink-300 to-sky-300 ${theme === "seventeen" ? "ring-2 ring-white" : ""}`}
          />
          <button
            onClick={() => changeTheme("nct")}
            title="Pearl Neo Champagne (NCT)"
            className={`w-5 h-5 rounded-full bg-lime-400 ${theme === "nct" ? "ring-2 ring-white" : ""}`}
          />
          <button
            onClick={() => changeTheme("bts")}
            title="Borahae Purple (BTS)"
            className={`w-5 h-5 rounded-full bg-purple-500 ${theme === "bts" ? "ring-2 ring-white" : ""}`}
          />
        </div>

        {username ? (
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${getAccentColor()}`}>🌸 {username}</span>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition"
            >
              Keluar
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white rounded-full transition shadow-lg"
          >
            Masuk / Akun
          </button>
        )}
      </div>
    </header>
  );
}