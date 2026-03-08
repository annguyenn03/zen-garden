"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function JournalWrite() {
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
    </motion.div>
  );
}
