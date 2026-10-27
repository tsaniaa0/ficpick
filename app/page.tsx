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
import LoginModal from "@/components/LoginModal";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function Home() {
  const [aus, setAus] = useState<AU[]>(INITIAL_AUS);
  const [filter, setFilter] = useState("All");
  const [fandomFilter, setFandomFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("home");

  // Modal States
  const [selectedAU, setSelectedAU] = useState<AU | null>(null);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [newProgress, setNewProgress] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const [isSpoilerReview, setIsSpoilerReview] = useState(false);
  const [showSpoilers, setShowSpoilers] = useState<{ [key: string]: boolean }>({});

  // Form State
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

  const saveToStorage = (newAus: AU[]) => {
    setAus(newAus);
    localStorage.setItem("ficpick_aus", JSON.stringify(newAus));
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

    const updated = [newAU, ...aus];
    saveToStorage(updated);

    try {
      const { error } = await supabase.from("aus").insert([
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
        console.error("❌ ERROR DARI SUPABASE:", error.message);
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
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#7cb9e8] via-[#a2d2ff] via-70% to-[#4e9f3d] text-slate-900 p-4 md:p-8 pb-24 md:pb-8 font-sans selection:bg-[#b5ff36]">
      {copiedNotification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold animate-bounce flex items-center gap-2">
          {copiedNotification}
        </div>
      )}

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
        />

        {/* Grid Kartu AU */}
        {filteredAus.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm space-y-2">
            <p>😴 Belum ada AU yang cocok di binder kamu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSubmit={handleLoginSubmit}
      />

      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        username={username}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
    </main>
  );
}