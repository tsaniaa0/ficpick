"use client";

import { useState, useEffect } from "react";

export default function StickyNote() {
  const [noteText, setNoteText] = useState(
    "• Quote of the Day:\n\"Kalo semesta gak berpihak sama kita, kita bikin semestanya tunduk.\" ✨\n\n• Jgn lupa cek update AU malam ini!"
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem("ficpick_quick_note");
    if (savedNote) setNoteText(savedNote);
  }, []);

  const handleSave = (val: string) => {
    setNoteText(val);
    localStorage.setItem("ficpick_quick_note", val);
  };

  return (
    <div className="hidden xl:block absolute top-20 right-6 z-10 w-60 bg-[#ffffa0] border-2 border-black p-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rotate-1 select-none">
      <div className="border-b-2 border-black pb-1 mb-2 flex justify-between items-center">
        <span className="text-[10px] font-black font-mono uppercase text-black">
          📌 Quick_Notes.txt
        </span>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-[10px] font-bold text-blue-800 hover:underline cursor-pointer"
        >
          {isEditing ? "💾 Simpan" : "✏️ Edit"}
        </button>
      </div>

      {isEditing ? (
        <textarea
          value={noteText}
          onChange={(e) => handleSave(e.target.value)}
          rows={5}
          className="w-full bg-[#ffffe0] border border-black p-1 text-xs font-mono font-bold text-slate-900 focus:outline-none resize-none shadow-inner"
        />
      ) : (
        <p className="text-xs font-mono font-bold text-slate-800 leading-relaxed whitespace-pre-wrap">
          {noteText}
        </p>
      )}
    </div>
  );
}