"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JournalMetadata() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [workHours, setWorkHours] = useState("");

  useEffect(() => {
    // Get name from localStorage
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setName(storedName);
      }
    }
  }, []);

  const handleSubmit = () => {
    // Save metadata to localStorage
    if (typeof window !== "undefined") {
      const metadata = {
        sleepHours: parseFloat(sleepHours) || 0,
        workHours: parseFloat(workHours) || 0,
        timestamp: new Date().toISOString(),
      };
      
      // Get existing journal entries or create new array
      const existingEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
      const journalText = localStorage.getItem("currentJournalText") || "";
      
      // Add the new entry with metadata
      const newEntry = {
        text: journalText,
        ...metadata,
      };
      
      existingEntries.push(newEntry);
      localStorage.setItem("journalEntries", JSON.stringify(existingEntries));
      
      // Clear current journal text
      localStorage.removeItem("currentJournalText");
      
      // Redirect to dashboard or garden
      router.push("/dashboard");
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
        tell us about your day...
      </p>

      <div className="w-full max-w-2xl space-y-8">
        {/* Sleep Hours Input */}
        <div className="flex flex-col">
          <label className="text-xl text-[#4A4E7E] font-medium mb-3">
            how many hours of sleep did you get?
          </label>
          <input
            type="number"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            placeholder="e.g., 7.5"
            min="0"
            max="24"
            step="0.5"
            className="bg-transparent border-none text-4xl text-[#4A4E7E] focus:outline-none placeholder-[#4A4E7E]/20 font-bold w-full"
          />
        </div>

        {/* Work Hours Input */}
        <div className="flex flex-col">
          <label className="text-xl text-[#4A4E7E] font-medium mb-3">
            how many hours did you work?
          </label>
          <input
            type="number"
            value={workHours}
            onChange={(e) => setWorkHours(e.target.value)}
            placeholder="e.g., 8"
            min="0"
            max="24"
            step="0.5"
            className="bg-transparent border-none text-4xl text-[#4A4E7E] focus:outline-none placeholder-[#4A4E7E]/20 font-bold w-full"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-10 right-10 flex gap-4">
        <Link href="/journal/write">
          <button className="bg-[#4A4E7E] text-white text-3xl font-bold px-16 py-5 rounded-[2.5rem] shadow-2xl hover:bg-[#3b3f66] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
            back
          </button>
        </Link>
        <button
          onClick={handleSubmit}
          disabled={!sleepHours && !workHours}
          className="bg-[#4A4E7E] text-white text-3xl font-bold px-16 py-5 rounded-[2.5rem] shadow-2xl hover:bg-[#3b3f66] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          finish
        </button>
      </div>
    </motion.div>
  );
}
