"use client";

import { useState, useEffect } from "react";

const INITIAL_AUS = [
  {
    id: "1",
    title: "Project: High School Romance",
    author: "@starryskies",
    fandom: "NCT / Jaemin",
    status: "Reading",
    lastChapter: "Part 42 - Berantem di Hujan",
    coverUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80",
    hasNSFW: true,
    hint: "Tanggal ultah Mark (DDMMYY)",
    linkUrl: "https://twitter.com",
    contentSnippet: "Hujan makin deras di luar gerbang sekolah. Jaemin natap gue dingin sambil ngelipat tangannya di dada. 'Kan udah gue bilang, jangan nungguin gue...' ucapnya pelan tapi menohok.",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Tetangga Sebelah Kosan",
    author: "@sunflower_au",
    fandom: "Seventeen / Mingyu",
    status: "Finished",
    lastChapter: "TAMAT (Epilog)",
    coverUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
    hasNSFW: false,
    hint: "",
    linkUrl: "https://twitter.com",
    contentSnippet: "Pagi-pagi pintu kosan udah digedor sama Mingyu yang cuma pake kaos oblong sambil nenteng mangkok isi bubur ayam. 'Nih, dimakan biar gak pingsan pas kuliah,' katanya acuh tak acuh.",
    isFavorite: false,
  },
];

export default function Home() {
  const [aus, setAus] = useState(INITIAL_AUS);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [theme, setTheme] = useState("dark"); // dark, seventeen, nct, bts

  // Modal States
  const [selectedAU, setSelectedAU] = useState<any>(null);
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [newProgress, setNewProgress] = useState("");

  // Login State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedAus = localStorage.getItem("ficpick_aus");
    if (savedAus) {
      try {
        setAus(JSON.parse(savedAus));
      } catch (e) {
        console.error("Gagal muat data", e);
      }
    }
    const savedUser = localStorage.getItem("ficpick_user");
    if (savedUser) setUsername(savedUser);

    const savedTheme = localStorage.getItem("ficpick_theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const saveToStorage = (newAus: typeof INITIAL_AUS) => {
    setAus(newAus);
    localStorage.setItem("ficpick_aus", JSON.stringify(newAus));
  };

  const handleAddAU = () => {
    if (!inputUrl.trim()) return;

    const newAU = {
      id: Date.now().toString(),
      title: inputUrl.includes("http") ? "AU Baru dari Twitter" : inputUrl,
      author: "@author_ficpick",
      fandom: "K-Pop / AU",
      status: "Plan to Read",
      lastChapter: "Part 1 - Baru Ditambahkan",
      coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80",
      hasNSFW: inputUrl.toLowerCase().includes("privatter") || false,
      hint: "Password / Hint dari Tweet",
      linkUrl: inputUrl,
      contentSnippet: "Chapter pertama baru saja dimulai...",
      isFavorite: false,
    };

    const updated = [newAU, ...aus];
    saveToStorage(updated);
    setInputUrl("");
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = aus.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    saveToStorage(updated);
  };

  const handleUpdateChapter = () => {
    if (!selectedAU || !newProgress.trim()) return;

    const updatedAus = aus.map((item) =>
      item.id === selectedAU.id ? { ...item, lastChapter: newProgress } : item
    );

    saveToStorage(updatedAus);
    setSelectedAU({ ...selectedAU, lastChapter: newProgress });
    setIsEditingProgress(false);
    setNewProgress("");
  };

  const handleChangeStatus = (newStatus: string) => {
    if (!selectedAU) return;

    const updatedAus = aus.map((item) =>
      item.id === selectedAU.id ? { ...item, status: newStatus } : item
    );

    saveToStorage(updatedAus);
    setSelectedAU({ ...selectedAU, status: newStatus });
  };

  const handleDeleteAU = (id: string) => {
    if (confirm("Yakin mau hapus AU ini dari binder kamu?")) {
      const updatedAus = aus.filter((item) => item.id !== id);
      saveToStorage(updatedAus);
      setSelectedAU(null);
      setIsReaderMode(false);
    }
  };

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("ficpick_theme", newTheme);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser = "Tsania (K-pop Fan)";
    setUsername(mockUser);
    localStorage.setItem("ficpick_user", mockUser);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("ficpick_user");
  };

  // Dynamic Class sesuai tema
  const getThemeBg = () => {
    if (theme === "seventeen") return "bg-slate-950 border-pink-300/20";
    if (theme === "nct") return "bg-slate-950 border-lime-400/20";
    if (theme === "bts") return "bg-slate-950 border-purple-500/20";
    return "bg-slate-950 border-slate-800";
  };

  const getAccentColor = () => {
    if (theme === "seventeen") return "text-pink-300";
    if (theme === "nct") return "text-lime-400";
    if (theme === "bts") return "text-purple-400";
    return "text-pink-500";
  };

  // Filter & Search Logic
  const filteredAus = aus.filter((au) => {
    const matchesStatus =
      filter === "All"
        ? true
        : filter === "Favorites"
        ? au.isFavorite
        : au.status === filter;

    const matchesSearch =
      au.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      au.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      au.fandom.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <main className={`min-h-screen ${getThemeBg()} text-slate-100 p-4 md:p-8 font-sans transition-colors duration-300`}>
      {/* Header / Navbar */}
      <header className="max-w-5xl mx-auto flex justify-between items-center py-4 border-b border-slate-800">
        <h1 className={`text-2xl font-bold tracking-tight ${getAccentColor()} flex items-center gap-2`}>
          ✨ FicPick
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            Alpha v0.5
          </span>
        </h1>

        <div className="flex items-center gap-3">
          {/* Theme Palette Switcher */}
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
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white rounded-full transition shadow-lg"
            >
              Masuk / Akun
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center py-8 space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Rak Buku AU Twitter & Fiksi Favoritmu
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Tandai jejak bacaan, simpan *hint password*, dan lanjut baca tanpa pusing ketumpuk!
        </p>

        {/* Input Bar */}
        <div className="pt-2 max-w-xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Ketik judul atau paste link tweet AU..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-pink-500 text-sm text-slate-200 placeholder-slate-500"
          />
          <button
            onClick={handleAddAU}
            className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white rounded-xl hover:opacity-90 text-sm transition shrink-0 active:scale-95"
          >
            + Tambah AU
          </button>
        </div>
      </section>

      {/* Main Content: Shelf Binder */}
      <section className="max-w-5xl mx-auto space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <h3 className="text-lg font-bold text-slate-200">Binder Saya</h3>
            <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full">
              {filteredAus.length} cerita
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Cari judul, author, fandom..."
              className="w-full sm:w-52 px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-pink-500"
            />

            {/* Filter Tabs */}
            <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto">
              {["All", "Favorites", "Reading", "Finished", "Plan to Read"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
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

        {/* Grid Kartu AU */}
        {filteredAus.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm space-y-2">
            <p>😴 Belum ada AU yang cocok dengan pencarianmu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAus.map((au) => (
              <div
                key={au.id}
                onClick={() => setSelectedAU(au)}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-pink-500/40 transition group flex flex-col justify-between cursor-pointer relative"
              >
                {/* Cover Image */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-800">
                  <img
                    src={au.coverUrl}
                    alt={au.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-md ${
                      au.status === "Reading"
                        ? "bg-amber-500/80 text-white"
                        : au.status === "Finished"
                        ? "bg-emerald-500/80 text-white"
                        : "bg-blue-500/80 text-white"
                    }`}
                  >
                    {au.status}
                  </span>

                  {/* Tombol Favorit Heart */}
                  <button
                    onClick={(e) => toggleFavorite(au.id, e)}
                    className="absolute bottom-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-full text-sm hover:scale-110 transition"
                  >
                    {au.isFavorite ? "❤️" : "🤍"}
                  </button>

                  {au.hasNSFW && (
                    <span className="absolute top-3 right-3 bg-red-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider">
                      18+ / PRIVATTER
                    </span>
                  )}
                </div>

                {/* Detail AU */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider">
                      {au.fandom}
                    </span>
                    <h4 className="font-bold text-slate-100 text-base leading-snug line-clamp-1 group-hover:text-pink-400 transition">
                      {au.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{au.author}</p>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs space-y-1">
                    <p className="text-slate-500 text-[10px] font-semibold">JEJAK BACA TERAKHIR:</p>
                    <p className="text-slate-300 font-medium truncate">{au.lastChapter}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        )}
      </section>

      {/* MODAL 1: Detail AU */}
      {selectedAU && !isReaderMode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => {
                setSelectedAU(null);
                setIsEditingProgress(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <span className="text-xs font-semibold text-pink-400 uppercase">
              {selectedAU.fandom}
            </span>
            <h3 className="text-xl font-bold text-slate-100">{selectedAU.title}</h3>
            <p className="text-xs text-slate-400">Karya oleh {selectedAU.author}</p>

            {/* Ubah Status Bacaan */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 uppercase">
                Ubah Status Bacaan:
              </label>
              <div className="flex gap-2">
                {["Reading", "Finished", "Plan to Read"].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleChangeStatus(st)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedAU.status === st
                        ? "bg-pink-600 text-white"
                        : "bg-slate-950 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Box Jejak Baca */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-slate-500 text-[11px] font-semibold">JEJAK BACA TERAKHIR:</p>
                <button
                  onClick={() => setIsEditingProgress(!isEditingProgress)}
                  className="text-xs text-pink-400 hover:underline"
                >
                  {isEditingProgress ? "Batal" : "✏️ Edit"}
                </button>
              </div>

              {isEditingProgress ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue={selectedAU.lastChapter}
                    onChange={(e) => setNewProgress(e.target.value)}
                    placeholder="Contoh: Part 45 - Berantem lagi"
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:outline-none focus:border-pink-500"
                  />
                  <button
                    onClick={handleUpdateChapter}
                    className="px-3 py-1.5 bg-pink-600 text-white text-xs rounded-lg font-semibold"
                  >
                    Simpan
                  </button>
                </div>
              ) : (
                <p className="text-slate-200 text-sm font-medium">{selectedAU.lastChapter}</p>
              )}
            </div>

            {/* Hint Password Box */}
            {selectedAU.hint && (
              <div className="bg-pink-950/40 border border-pink-500/30 p-3 rounded-xl text-xs text-pink-200 space-y-1">
                <p className="font-bold flex items-center gap-1 text-pink-400">
                  🔒 Hint Password (Privatter / Eksternal):
                </p>
                <p className="italic">{selectedAU.hint}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setIsReaderMode(true)}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl text-sm transition hover:opacity-90 flex items-center justify-center gap-2"
              >
                📖 Buka Mode Baca (Reader Mode)
              </button>

              <div className="flex gap-2">
                <a
                  href={selectedAU.linkUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 text-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-xs transition"
                >
                  🔗 Link Twitter Asli
                </a>
                <button
                  onClick={() => handleDeleteAU(selectedAU.id)}
                  className="px-4 py-2.5 bg-red-950/60 border border-red-500/30 text-red-400 hover:bg-red-900/60 rounded-xl text-xs font-semibold transition"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Reader Mode */}
      {selectedAU && isReaderMode && (
        <div className="fixed inset-0 bg-slate-950 z-50 overflow-y-auto p-4 md:p-8">
          <div className="max-w-2xl mx-auto space-y-6 py-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 sticky top-0 bg-slate-950/90 backdrop-blur-md pt-2">
              <button
                onClick={() => setIsReaderMode(false)}
                className="text-xs font-semibold text-pink-400 hover:underline flex items-center gap-1"
              >
                ← Kembali ke Binder
              </button>
              <span className="text-xs text-slate-500">Mode Membaca Bebas Iklan ✨</span>
            </div>

            <div className="space-y-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <span className="text-xs font-semibold text-pink-400 uppercase">
                {selectedAU.fandom}
              </span>
              <h2 className="text-2xl font-bold text-slate-100">{selectedAU.title}</h2>
              <p className="text-xs text-slate-400 border-b border-slate-800 pb-4">
                Ditulis oleh {selectedAU.author} • {selectedAU.lastChapter}
              </p>

              <div className="py-4 text-slate-200 text-base leading-relaxed space-y-4 font-serif">
                <p>{selectedAU.contentSnippet}</p>
              </div>

              {selectedAU.hint && (
                <div className="bg-pink-950/40 border border-pink-500/30 p-4 rounded-2xl text-xs text-pink-200 space-y-1">
                  <p className="font-bold text-pink-400">🔑 Hint Privatter/Telegraph:</p>
                  <p className="italic">{selectedAU.hint}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Login */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsLoginOpen(false)}
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

            <form onSubmit={handleLoginSubmit} className="space-y-3 pt-2">
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
      )}
    </main>
  );
}