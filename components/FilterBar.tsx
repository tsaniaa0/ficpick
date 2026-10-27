interface FilterBarProps {
  activeTab: string;
  filteredCount: number;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  fandomFilter: string;
  setFandomFilter: (val: string) => void;
  allFandoms: string[];
  sortBy: string;
  setSortBy: (val: string) => void;
  filter: string;
  setFilter: (val: string) => void;
}

export default function FilterBar({
  activeTab,
  filteredCount,
  searchQuery,
  setSearchQuery,
  fandomFilter,
  setFandomFilter,
  allFandoms,
  sortBy,
  setSortBy,
  filter,
  setFilter,
}: FilterBarProps) {
  return (
    <div className="bg-[#ece9d8] border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Label Kiri */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="bg-[#b5ff36] border border-black px-2.5 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-sm font-black text-black">
            {activeTab === "fav" ? "❤️ AU Favorit" : "📂 Binder Saya"}
          </h3>
        </div>
        <span className="text-xs bg-white border border-black text-black px-2 py-0.5 font-mono font-bold shadow-inner">
          {filteredCount} cerita
        </span>
      </div>

      {/* Kontrol Input & Filter */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        {/* Input Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Cari..."
          className="px-2.5 py-1 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none focus:ring-1 focus:ring-black shadow-inner w-36"
        />

        {/* Dropdown Fandom */}
        <select
          value={fandomFilter}
          onChange={(e) => setFandomFilter(e.target.value)}
          className="px-2 py-1 bg-white border-2 border-black text-xs font-bold text-black focus:outline-none shadow-inner"
        >
          <option value="All">🎭 Semua Fandom</option>
          {allFandoms.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        {/* Dropdown Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-2 py-1 bg-white border-2 border-black text-xs font-bold text-black focus:outline-none shadow-inner"
        >
          <option value="newest">🕒 Terbaru</option>
          <option value="rating">★ Rating Tertinggi</option>
          <option value="title">🔤 Judul (A-Z)</option>
        </select>

        {/* Tab Filter Status */}
        <div className="flex gap-1 overflow-x-auto pt-1 md:pt-0">
          {["All", "Favorites", "Reading", "Finished", "Plan to Read"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-2 py-1 text-[11px] font-bold border border-black transition shrink-0 ${
                filter === status
                  ? "bg-[#b5ff36] text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
            >
              {status === "Favorites" ? "❤️ Favorit" : status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}