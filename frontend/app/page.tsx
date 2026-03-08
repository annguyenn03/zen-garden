"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="relative w-full h-full flex items-center justify-end pr-10 md:pr-24 overflow-hidden">
      
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-[-10%] left-[-15%] w-[90%] max-w-[1100px] pointer-events-none"
      >
        <Image 
          src="/mascot_home.svg" 
          width={1100} 
          height={1100} 
          alt="Zen Mascot" 
          priority 
          className="object-contain"
        />
      </motion.div>

      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="z-10 flex flex-col items-end text-right max-w-lg"
      >
        <div className="mb-4">
          <Image 
            src="/zen_mode_logo.svg" 
            width={500} 
            height={200} 
            alt="zen garden" 
            className="select-none"
          />
        </div>

        <p className="text-2xl md:text-3xl text-[#4A4E7E] font-medium mb-12 leading-snug max-w-sm">
          take better care of yourself to grow your zen garden
        </p>

        <Link href="/garden">
          <button className="bg-[#4A4E7E] text-white text-3xl font-bold px-16 py-5 rounded-[2.5rem] shadow-2xl hover:bg-[#3b3f66] hover:scale-105 active:scale-95 transition-all">
            begin
          </button>
        </Link>
      </motion.div>
      
    </div>
  );
}