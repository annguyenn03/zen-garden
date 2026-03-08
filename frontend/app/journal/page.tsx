"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NameEntry() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start justify-start pt-20 pl-10"
    >
      <h1 className="text-7xl text-[#4A4E7E] tracking-tight mb-4">hi there!</h1>
      <p className="text-2xl text-[#4A4E7E] font-medium max-w-md leading-snug">
        looks like we’re meeting for the first time! what is your name?
      </p>

      <div className="mt-40 w-full flex flex-col items-center">
        <input 
          type="text" 
          placeholder="type here..."
          className="bg-transparent border-none text-4xl text-center focus:outline-none w-full placeholder-[#4A4E7E]/20 font-bold"
        />

        <div className="w-[500px] h-20 mt-[-20px] pointer-events-none">
          <Image src="/squiggle_line.svg" width={500} height={80} alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="absolute bottom-10 right-10">
        <Link href="/journal/write">
          <button className="bg-[#2D2D2D] text-white px-10 py-3 rounded-2xl text-xl font-bold hover:scale-105 transition-transform">
            next
          </button>
        </Link>
      </div>
    </motion.div>
  );
}