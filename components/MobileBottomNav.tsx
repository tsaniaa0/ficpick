interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
}: MobileBottomNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#ece9d8] border-t-2 border-black z-40 flex justify-around items-center px-2 font-mono select-none">
      <button
        onClick={() => setActiveTab("home")}
        className={`flex flex-col items-center justify-center flex-1 py-1 text-xs font-bold ${
          activeTab === "home" ? "text-blue-900 bg-white border border-black shadow-inner" : "text-black"
        }`}
      >
        <span className="text-sm">🏠</span>
        <span className="text-[9px]">Home</span>
      </button>

      <button
        onClick={() => setActiveTab("reading")}
        className={`flex flex-col items-center justify-center flex-1 py-1 text-xs font-bold ${
          activeTab === "reading" ? "text-blue-900 bg-white border border-black shadow-inner" : "text-black"
        }`}
      >
        <span className="text-sm">📖</span>
        <span className="text-[9px]">Reading</span>
      </button>

      <button
        onClick={() => setActiveTab("fav")}
        className={`flex flex-col items-center justify-center flex-1 py-1 text-xs font-bold ${
          activeTab === "fav" ? "text-blue-900 bg-white border border-black shadow-inner" : "text-black"
        }`}
      >
        <span className="text-sm">⭐</span>
        <span className="text-[9px]">Favorites</span>
      </button>
    </div>
  );
}