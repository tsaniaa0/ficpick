interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  username: string | null;
  onOpenLogin: () => void;
}

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  username,
  onOpenLogin,
}: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 py-2.5 px-6 flex justify-around items-center md:hidden z-40">
      <button
        onClick={() => setActiveTab("home")}
        className={`flex flex-col items-center gap-1 ${activeTab === "home" ? "text-pink-400 font-bold" : "text-slate-400"}`}
      >
        <span className="text-lg">🏠</span>
        <span className="text-[10px]">Home</span>
      </button>
      <button
        onClick={() => setActiveTab("binder")}
        className={`flex flex-col items-center gap-1 ${activeTab === "binder" ? "text-pink-400 font-bold" : "text-slate-400"}`}
      >
        <span className="text-lg">📚</span>
        <span className="text-[10px]">Binder</span>
      </button>
      <button
        onClick={() => setActiveTab("fav")}
        className={`flex flex-col items-center gap-1 ${activeTab === "fav" ? "text-pink-400 font-bold" : "text-slate-400"}`}
      >
        <span className="text-lg">❤️</span>
        <span className="text-[10px]">Favorit</span>
      </button>
      <button
        onClick={onOpenLogin}
        className={`flex flex-col items-center gap-1 ${username ? "text-pink-400" : "text-slate-400"}`}
      >
        <span className="text-lg">👤</span>
        <span className="text-[10px]">{username ? "Akun" : "Masuk"}</span>
      </button>
    </nav>
  );
}