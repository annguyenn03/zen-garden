"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="relative w-full h-full flex items-center justify-end pr-10 md:pr-32 overflow-hidden">
      
      {/* 1. THE MASCOT (Slides in from left) */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-[-10%] left-[-15%] w-[85%] max-w-[1000px] pointer-events-none"
      >
        <Image 
          src="/mascot_home.svg" 
          width={1000} 
          height={1000} 
          alt="Zen Mascot" 
          priority 
          className="object-contain"
        />
      </motion.div>

      {/* 2. LOGO & CTA (Anchored to the right) */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="z-10 flex flex-col items-end text-right"
      >
        <div className="mb-2">
          {/* Logo matches 'Home Page.png' positioning */}
          <Image 
            src="/zen_garden_logo.svg" 
            width={450} 
            height={200} 
            alt="zen garden" 
            className="drop-shadow-sm select-none"
          />
        </div>

        {/* This text block matches the spacing in your mockup */}
        <div className="max-w-[320px] mr-4">
          <p className="text-xl md:text-2xl text-[#4A4E7E] font-medium mb-10 leading-relaxed">
            take better care of yourself to grow your zen garden
          </p>
        </div>

        <Link href="/journal">
          <button className="bg-[#4A4E7E] text-white text-2xl font-bold px-14 py-4 rounded-[2rem] shadow-xl hover:bg-[#3b3f66] hover:scale-105 active:scale-95 transition-all">
            begin
          </button>
        </Link>
      </motion.div>
      
    </div>
  );
}