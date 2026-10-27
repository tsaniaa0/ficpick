"use client";

import { useState } from "react";

// Data simulasi AU (Nanti data ini diambil dari Database)
const MOCK_AUS = [
  {
    id: "1",
    title: "Project: High School Romance",
    author: "@starryskies",
    fandom: "NCT / Jaemin",
    status: "Reading",
    lastChapter: "Part 42 - Berantem di Hujan",
    coverUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80",
    hasNSFW: true,
    hint: "Password: Tanggal ultah Mark (DDMMYY)",
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
  },
  {
    id: "3",
    title: "Dosen Killer & Mahasiswa Abadi",
    author: "@midnight_reads",
    fandom: "BTS / Jungkook",
    status: "Plan to Read",
    lastChapter: "Belum dibaca",
    coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80",
    hasNSFW: true,
    hint: "Password: Judul lagu debut",
  },
];

export default function Home() {
  const [filter, setFilter] = useState("All");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header / Navbar */}
      <header className="max-w-5xl mx-auto flex justify-between items-center py-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-pink-500 flex items-center gap-2">
          ✨ FicPick
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
            Alpha v0.1
          </span>
        </h1>
        <button className="px-4 py-2 text-sm font-medium bg-pink-600 hover:bg-pink-500 text-white rounded-full transition shadow-lg shadow-pink-500/20">
          Masuk / Akun
        </button>
      </header>

      {/* Hero & Input Section */}
      <section className="max-w-3xl mx-auto text-center py-10 space-y-4">
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
            placeholder="Paste link tweet AU di sini..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-pink-500 text-sm text-slate-200 placeholder-slate-500"
          />
          <button className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white rounded-xl hover:opacity-90 text-sm transition shrink-0">
            + Tambah AU
          </button>
        </div>
      </section>

      {/* Main Content: Shelf Binder */}
      <section className="max-w-5xl mx-auto space-y-6">
        {/* Filter Tab */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-200">Binder Bacaan Saya</h3>
          <div className="flex gap-2">
            {["All", "Reading", "Finished", "Plan to Read"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filter === status
                    ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                    : "text-slate-400 hover:bg-slate-900"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Kartu AU (Photocard Ratio 2:3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_AUS.filter((au) => filter === "All" || au.status === filter).map((au) => (
            <div
              key={au.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-pink-500/40 transition group flex flex-col justify-between"
            >
              {/* Cover Image (Photocard Style Aspect Ratio) */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-800">
                <img
                  src={au.coverUrl}
                  alt={au.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {/* Badge Status */}
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

                {/* Badge NSFW / Privatter jika ada */}
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

                {/* Penanda Jejak / Last Read */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs space-y-1">
                  <p className="text-slate-500 text-[10px] font-semibold">JEJAK BACA TERAKHIR:</p>
                  <p className="text-slate-300 font-medium truncate">{au.lastChapter}</p>
                </div>

                {/* Hint Password Box (jika ada) */}
                {au.hint && (
                  <div className="bg-pink-950/30 border border-pink-500/20 p-2 rounded-lg text-[11px] text-pink-300 flex items-center gap-1.5">
                    🔒 <span>{au.hint}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}