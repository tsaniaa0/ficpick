"use client";

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
  theme: string; // <-- Tambahkan ini
}

export default function FilterBar({
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
  theme, // <-- Tangkap prop theme di sini
}: FilterBarProps) {
  // Menentukan warna aksen tombol aktif berdasarkan tema
  const activeColorBg =
    theme === "rose"
      ? "bg-[#ffb3c6] text-black"
      : theme === "lavender"
      ? "bg-[#d8b4fe] text-black"
      : "bg-[#b5ff36] text-black";

  return (
    <div className="bg-[#ece9d8] border-2 border-black p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3 font-mono">
      
      {/* Baris 1: Judul Binder & Tombol Status Filter Utama */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
        
        {/* Kiri: Judul & Jumlah Cerita */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={`${activeColorBg} border-2 border-black px-3 py-1 font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5`}>
            <span>📁</span>
            <span>Binder Saya</span>
          </div>
          <span className="bg-white border-2 border-black px-2.5 py-1 text-xs font-bold text-slate-700 shadow-inner">
            {filteredCount} cerita
          </span>
        </div>

        {/* Kanan: Tombol Status (All, Favorites, Reading, dll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
          {["All", "Favorites", "Reading", "Finished", "Plan to Read"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 border-2 border-black text-xs font-black shrink-0 transition ${
                filter === st
                  ? `${activeColorBg} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`
                  : "bg-white text-slate-800 hover:bg-slate-100 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Garis Pembatas Tipis ala Windows */}
      <div className="border-t border-slate-400 w-full" />

      {/* Baris 2: Kolom Pencarian, Fandom, & Urutan */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <input
          type="text"
          placeholder="🔍 Cari judul atau author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 bg-white border-2 border-black text-xs font-bold text-black focus:outline-none shadow-inner flex-1"
        />

        <div className="flex items-center gap-2">
          <select
            value={fandomFilter}
            onChange={(e) => setFandomFilter(e.target.value)}
            className="px-3 py-1 bg-white border-2 border-black text-xs font-bold text-black focus:outline-none shadow-inner cursor-pointer flex-1 sm:flex-none"
          >
            <option value="All">Semua Fandom</option>
            {allFandoms.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 bg-white border-2 border-black text-xs font-bold text-black focus:outline-none shadow-inner cursor-pointer flex-1 sm:flex-none"
          >
            <option value="newest">🕒 Terbaru</option>
            <option value="rating">⭐ Rating</option>
            <option value="title">🔤 Judul (A-Z)</option>
          </select>
        </div>
      </div>

    </div>
  );
}