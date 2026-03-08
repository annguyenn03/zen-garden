"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NameEntry() {
  const [name, setName] = useState("");
  const [showNameEntry, setShowNameEntry] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if name exists in localStorage
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        // Name exists, redirect to write page
        router.push("/journal/write");
      } else {
        // No name found, show name entry form
        setShowNameEntry(true);
      }
    }
  }, [router]);

  const handleNext = () => {
    if (name.trim()) {
      // Save name to localStorage
      localStorage.setItem("userName", name.trim());
      // Redirect to write page
      router.push("/journal/write");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name.trim()) {
      handleNext();
    }
  };

  // Don't render anything until we've checked localStorage
  if (!showNameEntry) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start justify-start pt-20 pl-10"
    >
      <h1 className="text-7xl text-[#4A4E7E] tracking-tight mb-4">hi there!</h1>
      <p className="text-2xl text-[#4A4E7E] font-medium max-w-md leading-snug">
        looks like we're meeting for the first time! what is your name?
      </p>

      <div className="mt-40 w-full flex flex-col items-center">
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="type here..."
          className="bg-transparent border-none text-4xl text-center focus:outline-none w-full placeholder-[#4A4E7E]/20 font-bold"
        />

        <div className="w-[500px] h-20 mt-[-20px] pointer-events-none">
          <Image src="/squiggle_line.svg" width={500} height={80} alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="absolute bottom-10 right-10">
        <button 
          onClick={handleNext}
          disabled={!name.trim()}
          className="bg-[#2D2D2D] text-white px-10 py-3 rounded-2xl text-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          next
        </button>
      </div>
    </motion.div>
  );
}