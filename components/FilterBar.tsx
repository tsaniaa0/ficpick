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
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <h3 className="text-lg font-bold text-slate-200">
          {activeTab === "fav" ? "❤️ AU Favorit Saya" : "Binder Saya"}
        </h3>
        <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full">
          {filteredCount} cerita
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Cari..."
          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-pink-500 w-36"
        />

        <select
          value={fandomFilter}
          onChange={(e) => setFandomFilter(e.target.value)}
          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-pink-500"
        >
          <option value="All">🎭 Semua Fandom</option>
          {allFandoms.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-pink-500"
        >
          <option value="newest">🕒 Terbaru</option>
          <option value="rating">★ Rating Tertinggi</option>
          <option value="title">🔤 Judul (A-Z)</option>
        </select>

        <div className="flex gap-1 overflow-x-auto">
          {["All", "Favorites", "Reading", "Finished", "Plan to Read"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                filter === status
                  ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                  : "text-slate-400 hover:bg-slate-900"
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