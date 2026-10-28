"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { AU } from "@/types/au";
import { INITIAL_AUS } from "@/data/initialAus";

import Header from "@/components/Header";
import DashboardStats from "@/components/DashboardStats";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import AuCard from "@/components/AuCard";
import AddAuModal from "@/components/AddAuModal";
import AuDetailModal from "@/components/AuDetailModal";
import EditAuModal from "@/components/EditAuModal";
import LoginModal from "@/components/LoginModal";
import Taskbar from "@/components/Taskbar";
import StickyNote from "@/components/StickyNote";
import ReadingStatsModal from "@/components/ReadingStatsModal";

const WALLPAPERS = [
  { name: "Piksel Langit Biru", url: "https://i.pinimg.com/736x/7e/38/1b/7e381b9e7d0030c92a1102fae47b1dba.jpg" },
  { name: "Malam Kota / Kamar", url: "https://i.pinimg.com/736x/89/65/52/8965529f55e55e8c150c95ef37be9328.jpg" },
  { name: "Senja Syahdu", url: "https://i.pinimg.com/736x/e2/e5/27/e2e5270665b45a28a1fe676f63ff3d9a.jpg" },
  { name: "Lanskap Piksel Artsy", url: "https://i.pinimg.com/1200x/09/88/03/098803d0fa866444a3494ad0ad3bb5ff.jpg" },
];

export default function Home() {
  const [aus, setAus] = useState<AU[]>(INITIAL_AUS);
  const [filter, setFilter] = useState("All");
  const [fandomFilter, setFandomFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("classic");
  const [activeTab, setActiveTab] = useState("home");

  // States Tambahan
  const [currentWallpaper, setCurrentWallpaper] = useState(WALLPAPERS[0].url);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  // Modal States
  const [selectedAU, setSelectedAU] = useState<AU | null>(null);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [newProgress, setNewProgress] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState("");
  const [newProgressUrl, setNewProgressUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Review & Login States
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const [isSpoilerReview, setIsSpoilerReview] = useState(false);
  const [showSpoilers, setShowSpoilers] = useState<{ [key: string]: boolean }>({});
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const [newForm, setNewForm] = useState({
    title: "",
    author: "",
    fandom: "",
    linkUrl: "",
    hint: "",
    coverUrl: "",
    hasNSFW: false,
  });

  // Load dari localStorage & Supabase saat pertama kali dibuka
  useEffect(() => {
    const fetchSupabaseAus = async () => {
      try {
        const { data, error } = await supabase.from("aus").select("*");
        if (!error && data && data.length > 0) {
          const formattedSupabaseData: AU[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            author: item.author,
            fandom: item.fandom,
            status: item.status,
            lastChapter: item.last_chapter,
            coverUrl: item.cover_url,
            hasNSFW: item.has_nsfw,
            hint: item.hint,
            linkUrl: item.link_url,
            contentSnippet: item.content_snippet,
            isFavorite: item.is_favorite,
            hasNewUpdate: item.has_new_update,
            rating: item.rating,
            createdAt: item.created_at,
            reviews: item.reviews || [],
          }));
          setAus(formattedSupabaseData);
          localStorage.setItem("ficpick_aus", JSON.stringify(formattedSupabaseData));
          return;
        }
      } catch (err) {
        console.log("Menggunakan data lokal localStorage.");
      }

      const savedAus = localStorage.getItem("ficpick_aus");
      if (savedAus) {
        try {
          setAus(JSON.parse(savedAus));
        } catch (e) {
          console.error("Gagal muat data", e);
        }
      }
    };

    fetchSupabaseAus();

    const savedUser = localStorage.getItem("ficpick_user");
    if (savedUser) setUsername(savedUser);

    const savedTheme = localStorage.getItem("ficpick_theme");
    if (savedTheme) setTheme(savedTheme);

    const savedWallpaper = localStorage.getItem("ficpick_wallpaper");
    if (savedWallpaper) setCurrentWallpaper(savedWallpaper);
  }, []);

  const saveToStorage = (newAus: AU[]) => {
    setAus(newAus);
    localStorage.setItem("ficpick_aus", JSON.stringify(newAus));
  };

  const handleWallpaperChange = (url: string) => {
    setCurrentWallpaper(url);
    localStorage.setItem("ficpick_wallpaper", url);
    showToast("🖼️ Wallpaper Vibe Berhasil Diganti!");
  };

  const handleThemeChange = (newTh: string) => {
    setTheme(newTh);
    localStorage.setItem("ficpick_theme", newTh);
    showToast("🎨 Tema Windows Berhasil Diperbarui!");
  };

  const handleAddAU = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.title.trim()) return;

    const newAU: AU = {
      id: Date.now().toString(),
      title: newForm.title,
      author: newForm.author || "@author_au",
      fandom: newForm.fandom || "K-Pop AU",
      status: "Plan to Read",
      lastChapter: "Part 1 - Baru Ditambahkan",
      coverUrl:
        newForm.coverUrl ||
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80",
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

    const updated = [newAU, ...aus];
    saveToStorage(updated);

    try {
      await supabase.from("aus").insert([
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
      showToast("✨ AU Berhasil Disimpan ke Cloud!");
    } catch (err) {
      console.error("Gagal sinkron ke Supabase", err);
    }

    setNewForm({
      title: "",
      author: "",
      fandom: "",
      linkUrl: "",
      hint: "",
      coverUrl: "",
      hasNSFW: false,
    });
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
        ? {
            ...item,
            lastChapter: newProgress,
            lastChapterUrl: newProgressUrl || item.lastChapterUrl || "",
            hasNewUpdate: false,
          }
        : item
    );

    saveToStorage(updatedAus);
    setSelectedAU({
      ...selectedAU,
      lastChapter: newProgress,
      lastChapterUrl: newProgressUrl || selectedAU.lastChapterUrl || "",
      hasNewUpdate: false,
    });
    setIsEditingProgress(false);
    setNewProgress("");
    setNewProgressUrl("");
    showToast("📌 Progress Bacaan Diperbarui!");
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
      showToast("🗑️ AU Berhasil Dihapus.");
    }
  };

  const handleSaveEditAU = async (updatedAU: AU) => {
    const updatedAus = aus.map((item) => (item.id === updatedAU.id ? updatedAU : item));
    saveToStorage(updatedAus);
    setSelectedAU(updatedAU);
    showToast("✏️ AU Berhasil Diperbarui!");
  };

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(aus, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ficpick_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("💾 Backup Binder Berhasil Diunduh!");
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
          }
        } catch (err) {
          alert("Gagal membaca file backup.");
        }
      };
    }
  };

  const handleShareBinder = () => {
    const titles = aus
      .map((a, i) => `${i + 1}. ${a.title} (${a.fandom}) - ${a.status}`)
      .join("\n");
    const textToCopy = `✨ Rak Buku AU FicPick Saya ✨\n\n${titles}\n\nDisimpan rapi di FicPick ✨`;
    navigator.clipboard.writeText(textToCopy);
    showToast("📋 Ringkasan Binder Berhasil Disalin!");
  };

  const showToast = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification("3000"), 2000);
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
    showToast(`👋 Selamat datang kembali, ${mockUser}!`);
  };

  const getAccentColor = () => {
    if (theme === "rose") return "text-pink-400";
    if (theme === "lavender") return "text-purple-400";
    return "text-blue-500";
  };

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
        fandomFilter === "All" ||
        au.fandom.toLowerCase().includes(fandomFilter.toLowerCase());

      const matchesSearch =
        au.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        au.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        au.fandom.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesFandom && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

  // Tambahkan fungsi helper di dalam page.tsx untuk menentukan warna tema
  const getThemeColors = (currentTheme: string) => {
    switch (currentTheme) {
      case "rose":
        return {
          windowBg: "bg-[#fff0f3]", // Pink muda pastel ala Windows 95 Rose
          titleBar: "bg-[#800040]", // Ungu/Pink tua klasik
          accentBtn: "bg-[#ffb3c6] hover:bg-[#ff99b1]",
          badge: "bg-[#ffb3c6]",
        };
      case "lavender":
        return {
          windowBg: "bg-[#f3f0ff]", // Lavender muda pastel
          titleBar: "bg-[#483d8b]", // Dark Slate Blue / Ungu klasik
          accentBtn: "bg-[#d8b4fe] hover:bg-[#c084fc]",
          badge: "bg-[#d8b4fe]",
        };
      default: // classic (Teal)
        return {
          windowBg: "bg-[#ece9d8]", // Krem klasik Windows 95
          titleBar: "bg-[#000080]", // Biru klasik Windows 95
          accentBtn: "bg-[#b5ff36] hover:bg-[#a3eb25]",
          badge: "bg-[#b5ff36]",
        };
    }
  };

  return (
    <main
      className={`min-h-screen bg-cover bg-center bg-fixed text-slate-900 p-4 md:p-8 pb-24 md:pb-16 font-sans relative overflow-x-hidden selection:bg-[#b5ff36] ${
        theme === "rose" 
          ? "theme-rose" 
          : theme === "lavender" 
          ? "theme-lavender" 
          : "theme-classic"
      }`}
      style={{ backgroundImage: `url('${currentWallpaper}')` }}
    >
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold animate-bounce flex items-center gap-2">
          {copiedNotification}
        </div>
      )}

      {/* DESKTOP SHORTCUTS */}
      <div className="hidden xl:flex flex-col gap-6 absolute top-8 left-6 z-10 select-none">
        <div className="flex flex-col items-center gap-1 cursor-pointer group w-20 text-center">
          <div className="w-12 h-12 bg-[#ece9d8] border-2 border-black flex items-center justify-center text-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#b5ff36]">
            🖥️
          </div>
          <span className="text-[11px] font-bold text-black bg-white/90 border border-black px-1">
            My Computer
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer group w-20 text-center">
          <div className="w-12 h-12 bg-[#ece9d8] border-2 border-black flex items-center justify-center text-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#b5ff36]">
            📁
          </div>
          <span className="text-[11px] font-bold text-black bg-white/90 border border-black px-1">
            Bookmark_AU
          </span>
        </div>

        <div 
          onClick={() => setIsStatsOpen(true)}
          className="flex flex-col items-center gap-1 cursor-pointer group w-20 text-center"
        >
          <div className="w-12 h-12 bg-[#ece9d8] border-2 border-black flex items-center justify-center text-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#b5ff36]">
            📊
          </div>
          <span className="text-[11px] font-bold text-black bg-white/90 border border-black px-1">
            Statistics
          </span>
        </div>
      </div>

      {/* STICKY NOTE WIDGET INTERAKTIF */}
      <StickyNote />

      {/* KOMPONEN UTAMA WEBSITE */}
      <Header
        theme={theme}
        changeTheme={changeTheme}
        getAccentColor={getAccentColor}
        username={username}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={() => {
          setUsername(null);
          localStorage.removeItem("ficpick_user");
        }}
      />

      <DashboardStats
        totalAU={aus.length}
        readingCount={aus.filter((a) => a.status === "Reading").length}
        finishedCount={aus.filter((a) => a.status === "Finished").length}
        hintCount={aus.filter((a) => a.hint && a.hint.trim() !== "").length}
      />

      <HeroSection
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onShareBinder={handleShareBinder}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        fileInputRef={fileInputRef}
      />

      <section className="max-w-5xl mx-auto space-y-6 pt-4">
        <FilterBar
          activeTab={activeTab}
          filteredCount={filteredAus.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          fandomFilter={fandomFilter}
          setFandomFilter={setFandomFilter}
          allFandoms={allFandoms}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filter={filter}
          setFilter={setFilter}
          theme={theme}
        />

        {/* Grid Kartu AU / Empty State */}
        {filteredAus.length === 0 ? (
          <div className="bg-[#ece9d8] border-2 border-black p-8 text-center max-w-md mx-auto my-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-3">
            <div className="w-16 h-16 bg-[#b5ff36] border-2 border-black mx-auto flex items-center justify-center text-3xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              📁
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-black text-base">Binder Masih Kosong!</h4>
              <p className="text-xs font-bold text-slate-700">
                Belum ada AU yang disimpan. Klik tombol di bawah untuk menambah bacaan pertamamu.
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-[#b5ff36] hover:bg-[#a3eb25] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              ✨ + Simpan AU Baru
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAus.map((au) => (
              <AuCard
                key={au.id}
                au={au}
                onSelect={(selected) => setSelectedAU(selected)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modals */}
      <AddAuModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        newForm={newForm}
        setNewForm={setNewForm}
        onSubmit={handleAddAU}
      />

      <AuDetailModal
        selectedAU={selectedAU}
        onClose={() => {
          setSelectedAU(null);
          setIsEditingProgress(false);
        }}
        onChangeStatus={handleChangeStatus}
        isEditingProgress={isEditingProgress}
        setIsEditingProgress={setIsEditingProgress}
        newProgress={newProgress}
        setNewProgress={setNewProgress}
        newProgressUrl={newProgressUrl}
        setNewProgressUrl={setNewProgressUrl}
        onUpdateChapter={handleUpdateChapter}
        newRating={newRating}
        setNewRating={setNewRating}
        newReviewText={newReviewText}
        setNewReviewText={setNewReviewText}
        isSpoilerReview={isSpoilerReview}
        setIsSpoilerReview={setIsSpoilerReview}
        onAddReview={handleAddReview}
        showSpoilers={showSpoilers}
        setShowSpoilers={setShowSpoilers}
        onDeleteAU={handleDeleteAU}
        onOpenEdit={() => setIsEditModalOpen(true)}
      />

      <EditAuModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        selectedAU={selectedAU}
        onSaveEdit={handleSaveEditAU}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSubmit={handleLoginSubmit}
      />

      <ReadingStatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        aus={aus}
        theme={theme} // <-- Tambahkan baris ini agar error garis merahnya hilang
      />

      {/* TASKBAR BOTTOM DENGAN MENU WALLPAPER & TEMA OS */}
      <Taskbar
        currentWallpaper={currentWallpaper}
        onWallpaperChange={handleWallpaperChange}
        wallpapers={WALLPAPERS}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        onOpenStats={() => setIsStatsOpen(true)}
      />

      {/* Floating Action Button (Khusus Mobile di Pojok Bawah) */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="md:hidden fixed bottom-5 right-5 z-40 w-14 h-14 bg-[#b5ff36] border-2 border-black rounded-full flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
        title="Simpan AU Baru"
      >
        ✨
      </button>
    </main>
  );
}