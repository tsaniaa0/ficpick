"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

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
    hasNewUpdate: true,
    rating: 5,
    createdAt: 1700000000000,
    reviews: [
      { id: "r1", user: "@kpop_reader", rating: 5, text: "Baper banget part 40! Wajib baca!", isSpoiler: false },
      { id: "r2", user: "@nctzen_00", rating: 4, text: "Plot twist pas di ending part 42 bikin nangis 😭", isSpoiler: true },
    ],
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
    hasNewUpdate: false,
    rating: 4,
    createdAt: 1690000000000,
    reviews: [],
  },
];

export default function Home() {
  const [aus, setAus] = useState(INITIAL_AUS);
  const [filter, setFilter] = useState("All");
  const [fandomFilter, setFandomFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // newest, rating, title
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("home");

  // Modal States
  const [selectedAU, setSelectedAU] = useState<any>(null);
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [newProgress, setNewProgress] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Review Form State inside Modal
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const [isSpoilerReview, setIsSpoilerReview] = useState(false);
  const [showSpoilers, setShowSpoilers] = useState<{ [key: string]: boolean }>({});

  // Form State untuk Tambah AU Detail
  const [newForm, setNewForm] = useState({
    title: "",
    author: "",
    fandom: "",
    linkUrl: "",
    hint: "",
    hasNSFW: false,
  });

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

  const handleAddAU = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.title.trim()) return;

    const newAU = {
      id: Date.now().toString(),
      title: newForm.title,
      author: newForm.author || "@author_au",
      fandom: newForm.fandom || "K-Pop AU",
      status: "Plan to Read",
      lastChapter: "Part 1 - Baru Ditambahkan",
      coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80",
      hasNSFW: newForm.hasNSFW,
      hint: newForm.hint || "",
      linkUrl: newForm.linkUrl || "https://twitter.com",
      contentSnippet: "Cerita baru saja dimulai...",
      isFavorite: false,
      hasNewUpdate: true,
      rating: 5,
      createdAt: Date.now(),
      reviews: [],
    };

    // 1. Simpan ke LocalStorage agar langsung tampil di UI
    const updated = [newAU, ...aus];
    setAus(updated);
    localStorage.setItem("ficpick_aus", JSON.stringify(updated));

    // 2. Kirim data ke Supabase Cloud
    try {
      const { data, error } = await supabase.from("aus").insert([
        {
          id: newAU.id,
          title: newAU.title,
          author: newAU.author,
          fandom: newAU.fandom,
          status: newAU.status,
          last_chapter: newAU.lastChapter,
          cover_url: newAU.coverUrl,
          has_nsfw: newAU.hasNSFW,
          hint: newAU.hint,
          link_url: newAU.linkUrl,
          content_snippet: newAU.contentSnippet,
          is_favorite: newAU.isFavorite,
          has_new_update: newAU.hasNewUpdate,
          rating: newAU.rating,
          created_at: newAU.createdAt,
        },
      ]);

      if (error) {
        console.error("❌ ERROR DARI SUPABASE:", error.message, error.details);
        alert("Gagal simpan ke Supabase: " + error.message);
      } else {
        console.log("✅ BERHASIL SIMPAN KE SUPABASE!");
      }
    } catch (err) {
      console.error("❌ ERROR KONEKSI:", err);
    }

    setNewForm({ title: "", author: "", fandom: "", linkUrl: "", hint: "", hasNSFW: false });
    setIsAddModalOpen(false);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = aus.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    saveToStorage(updated);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAU || !newReviewText.trim()) return;

    const newRev = {
      id: Date.now().toString(),
      user: username || "@pembaca_anonim",
      rating: newRating,
      text: newReviewText,
      isSpoiler: isSpoilerReview,
    };

    const updatedReviews = [...(selectedAU.reviews || []), newRev];
    const updatedAus = aus.map((item) =>
      item.id === selectedAU.id ? { ...item, reviews: updatedReviews } : item
    );

    saveToStorage(updatedAus);
    setSelectedAU({ ...selectedAU, reviews: updatedReviews });
    setNewReviewText("");
    setIsSpoilerReview(false);
  };

  const handleUpdateChapter = () => {
    if (!selectedAU || !newProgress.trim()) return;

    const updatedAus = aus.map((item) =>
      item.id === selectedAU.id
        ? { ...item, lastChapter: newProgress, hasNewUpdate: false }
        : item
    );

    saveToStorage(updatedAus);
    setSelectedAU({ ...selectedAU, lastChapter: newProgress, hasNewUpdate: false });
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

  // Backup & Restore Logic
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(aus, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ficpick_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("💾 File Backup Binder Berhasil Diunduh!");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsedData)) {
            saveToStorage(parsedData);
            showToast("📥 Binder Berhasil Dipulihkan!");
          } else {
            alert("Format file JSON tidak valid.");
          }
        } catch (err) {
          alert("Gagal membaca file backup.");
        }
      };
    }
  };

  const handleShareBinder = () => {
    const titles = aus.map((a, i) => `${i + 1}. ${a.title} (${a.fandom}) - ${a.status}`).join("\n");
    const textToCopy = `✨ Rak Buku AU FicPick Saya ✨\n\n${titles}\n\nDisimpan rapi di FicPick ✨`;
    navigator.clipboard.writeText(textToCopy);
    showToast("📋 Ringkasan Binder Berhasil Disalin!");
  };

  const showToast = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(""), 3000);
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

  // Filter, Fandom, & Sorting Logic
  const allFandoms = Array.from(new Set(aus.map((a) => a.fandom.split("/")[0].trim())));

  const filteredAus = aus
    .filter((au) => {
      const matchesStatus =
        activeTab === "fav"
          ? au.isFavorite
          : filter === "All"
          ? true
          : filter === "Favorites"
          ? au.isFavorite
          : au.status === filter;

      const matchesFandom =
        fandomFilter === "All" || au.fandom.toLowerCase().includes(fandomFilter.toLowerCase());

      const matchesSearch =
        au.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        au.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        au.fandom.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesFandom && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return (b.createdAt || 0) - (a.createdAt || 0); // newest default
    });

  // Stats calculation
  const totalAU = aus.length;
  const readingCount = aus.filter((a) => a.status === "Reading").length;
  const finishedCount = aus.filter((a) => a.status === "Finished").length;
  const hintCount = aus.filter((a) => a.hint && a.hint.trim() !== "").length;

  return (
    <main className={`min-h-screen ${getThemeBg()} text-slate-100 p-4 md:p-8 pb-24 md:pb-8 font-sans transition-colors duration-300`}>
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold animate-bounce flex items-center gap-2">
          {copiedNotification}
        </div>
      )}

      {/* Header / Navbar */}
      <header className="max-w-5xl mx-auto flex justify-between items-center py-4 border-b border-slate-800">
        <h1 className={`text-2xl font-bold tracking-tight ${getAccentColor()} flex items-center gap-2`}>
          ✨ FicPick
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            Alpha v0.8
          </span>
        </h1>

        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
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

      {/* Dashboard Ringkasan / Stats */}
      <section className="max-w-5xl mx-auto my-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center space-y-0.5">
          <p className="text-slate-400 text-[11px] font-semibold">TOTAL AU</p>
          <p className="text-2xl font-black text-slate-100">{totalAU}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center space-y-0.5">
          <p className="text-amber-400 text-[11px] font-semibold">SEDANG DIBACA</p>
          <p className="text-2xl font-black text-amber-300">{readingCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center space-y-0.5">
          <p className="text-emerald-400 text-[11px] font-semibold">TAMAT</p>
          <p className="text-2xl font-black text-emerald-300">{finishedCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-center space-y-0.5">
          <p className="text-pink-400 text-[11px] font-semibold">HINT PRIVATTER</p>
          <p className="text-2xl font-black text-pink-300">{hintCount}</p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center py-4 space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Rak Buku AU Twitter & Fiksi Favoritmu
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Tandai jejak bacaan, simpan *hint password*, dan lanjut baca tanpa pusing ketumpuk!
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-white rounded-xl hover:opacity-90 text-sm transition shadow-lg shadow-pink-500/20 active:scale-95"
          >
            ✨ + Simpan AU Baru
          </button>
          <button
            onClick={handleShareBinder}
            className="px-4 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 font-semibold text-slate-200 rounded-xl text-xs transition"
          >
            📤 Share Binder
          </button>
          <button
            onClick={handleExportJSON}
            className="px-4 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 font-semibold text-slate-200 rounded-xl text-xs transition"
          >
            💾 Backup JSON
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 font-semibold text-slate-200 rounded-xl text-xs transition"
          >
            📥 Import Backup
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJSON}
            accept=".json"
            className="hidden"
          />
        </div>
      </section>

      {/* Main Content: Shelf Binder */}
      <section className="max-w-5xl mx-auto space-y-6 pt-4">
        {/* Search, Sort, & Fandom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <h3 className="text-lg font-bold text-slate-200">
              {activeTab === "fav" ? "❤️ AU Favorit Saya" : "Binder Saya"}
            </h3>
            <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full">
              {filteredAus.length} cerita
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Cari..."
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-pink-500 w-36"
            />

            {/* Dropdown Fandom */}
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

            {/* Dropdown Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-pink-500"
            >
              <option value="newest">🕒 Terbaru</option>
              <option value="rating">★ Rating Tertinggi</option>
              <option value="title">🔤 Judul (A-Z)</option>
            </select>

            {/* Filter Status Tabs */}
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

        {/* Grid Kartu AU */}
        {filteredAus.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm space-y-2">
            <p>😴 Belum ada AU yang cocok di binder kamu.</p>
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

                  {au.hasNewUpdate && (
                    <span className="absolute bottom-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-0.5 rounded-md text-[9px] font-black tracking-wider animate-pulse shadow-lg">
                      NEW UPDATE! 🔥
                    </span>
                  )}

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
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider">
                        {au.fandom}
                      </span>
                      <span className="text-amber-400 text-xs font-bold">
                        ★ {au.rating || 5}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-100 text-base leading-snug line-clamp-1 group-hover:text-pink-400 transition mt-0.5">
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

      {/* MODAL: Form Tambah AU Detail */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-slate-100">Simpan AU Baru ✨</h3>

            <form onSubmit={handleAddAU} className="space-y-3 pt-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Judul AU *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Project High School"
                  value={newForm.title}
                  onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Author / Username</label>
                  <input
                    type="text"
                    placeholder="@starryskies"
                    value={newForm.author}
                    onChange={(e) => setNewForm({ ...newForm, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Fandom / Cast</label>
                  <input
                    type="text"
                    placeholder="NCT / Jaemin"
                    value={newForm.fandom}
                    onChange={(e) => setNewForm({ ...newForm, fandom: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Link Tweet Twitter</label>
                <input
                  type="url"
                  placeholder="https://x.com/username/status/..."
                  value={newForm.linkUrl}
                  onChange={(e) => setNewForm({ ...newForm, linkUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-xs text-pink-400 block mb-1">🔒 Hint Password (Privatter/Telegraph)</label>
                <input
                  type="text"
                  placeholder="Contoh: Tanggal debut grup (DDMMYY)"
                  value={newForm.hint}
                  onChange={(e) => setNewForm({ ...newForm, hint: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-pink-500/30 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="nsfwCheck"
                  checked={newForm.hasNSFW}
                  onChange={(e) => setNewForm({ ...newForm, hasNSFW: e.target.checked })}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                <label htmlFor="nsfwCheck" className="text-xs text-slate-300">
                  Ada Konten Dewasa / Privatter (18+)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white rounded-xl text-sm hover:opacity-90 transition mt-3"
              >
                + Masukkan ke Binder
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL Detail AU */}
      {selectedAU && !isReaderMode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto py-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative my-auto">
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

            {selectedAU.hint && (
              <div className="bg-pink-950/40 border border-pink-500/30 p-3 rounded-xl text-xs text-pink-200 space-y-1">
                <p className="font-bold flex items-center gap-1 text-pink-400">
                  🔒 Hint Password (Privatter / Eksternal):
                </p>
                <p className="italic">{selectedAU.hint}</p>
              </div>
            )}

            {/* SEKSI REVIEWS & RATING */}
            <div className="border-t border-slate-800 pt-3 space-y-3">
              <h4 className="text-xs font-bold text-slate-300">Ulasan Pembaca ({selectedAU.reviews?.length || 0})</h4>

              <form onSubmit={handleAddReview} className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-400">Beri Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className={`text-sm ${star <= newRating ? "text-amber-400" : "text-slate-700"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Tulis ulasan singkat..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-pink-500"
                />

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-1.5 text-[10px] text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSpoilerReview}
                      onChange={(e) => setIsSpoilerReview(e.target.checked)}
                      className="rounded text-pink-600 focus:ring-pink-500"
                    />
                    Mengandung Spoiler!
                  </label>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-pink-600 text-white text-xs font-semibold rounded-lg hover:bg-pink-500 transition"
                  >
                    Kirim Review
                  </button>
                </div>
              </form>

              <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                {selectedAU.reviews?.map((rev: any) => (
                  <div key={rev.id} className="bg-slate-950/60 p-2.5 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-pink-400">{rev.user}</span>
                      <span className="text-amber-400 text-[10px]">{"★".repeat(rev.rating)}</span>
                    </div>

                    {rev.isSpoiler ? (
                      <div>
                        {showSpoilers[rev.id] ? (
                          <p className="text-slate-300 italic">{rev.text}</p>
                        ) : (
                          <button
                            onClick={() => setShowSpoilers({ ...showSpoilers, [rev.id]: true })}
                            className="text-[10px] text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-500/30 hover:underline"
                          >
                            ⚠️ Mengandung Spoiler! (Klik untuk lihat)
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-slate-300">{rev.text}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

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

      {/* MODAL Reader Mode */}
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

      {/* MODAL Login */}
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

      {/* MOBILE BOTTOM NAVIGATION BAR */}
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
          onClick={() => setIsLoginOpen(true)}
          className={`flex flex-col items-center gap-1 ${username ? "text-pink-400" : "text-slate-400"}`}
        >
          <span className="text-lg">👤</span>
          <span className="text-[10px]">{username ? "Akun" : "Masuk"}</span>
        </button>
      </nav>
    </main>
  );
}