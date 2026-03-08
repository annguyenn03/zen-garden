"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JournalWrite() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    // Get name from localStorage
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setName(storedName);
      }
    }
  }, []);

  const handleNext = () => {
    // Save journal text temporarily to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("currentJournalText", text);
      router.push("/write/metadata");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start justify-start pt-20 pl-10 w-full"
    >
      <h1 className="text-7xl text-[#4A4E7E] tracking-tight mb-4">
        {name ? `hi ${name}!` : "hi there!"}
      </h1>
      <p className="text-2xl text-[#4A4E7E] font-medium max-w-md leading-snug mb-10">
        start journaling...
      </p>

      <div className="w-full max-w-4xl">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="write your thoughts here..."
          className="w-full h-64 bg-transparent border-none text-2xl text-[#4A4E7E] focus:outline-none resize-none placeholder-[#4A4E7E]/20"
        />
      </div>

      {/* Navigation Button */}
      <div className="absolute bottom-10 right-10">
        <button
          onClick={handleNext}
          className="bg-[#4A4E7E] text-white text-3xl font-bold px-16 py-5 rounded-[2.5rem] shadow-2xl hover:bg-[#3b3f66] hover:scale-105 active:scale-95 transition-all"
        >
          next
        </button>
      </div>
    </motion.div>
  );
}
