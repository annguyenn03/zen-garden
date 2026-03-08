"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Flower {
  id: number;
  type: "purple" | "pink" | "blue";
  top: number;
  left: number;
  size: number;
  animationDelay: number;
  animationDuration: number;
}

export default function ZenGarden() {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    // Generate random flowers
    const flowerTypes: ("purple" | "pink" | "blue")[] = ["purple", "pink", "blue"];
    const numFlowers = 10; // Number of flowers to generate
    
    const newFlowers: Flower[] = [];
    for (let i = 0; i < numFlowers; i++) {
      newFlowers.push({
        id: i,
        type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
        top: Math.random() * 80 + 5, // Random top position (5% to 85%)
        left: Math.random() * 90 + 5, // Random left position (5% to 95%)
        size: Math.random() * 100 + 80, // Random size between 80-180px
        animationDelay: Math.random() * 2, // Random delay 0-2s
        animationDuration: Math.random() * 1 + 2, // Random duration 2-3s
      });
    }
    
    setFlowers(newFlowers);
  }, []);

  const getFlowerSrc = (type: string) => {
    switch (type) {
      case "purple":
        return "/flower_purple.svg";
      case "pink":
        return "/flower_pink.svg";
      case "blue":
        return "/flower_blue.svg";
      default:
        return "/flower_purple.svg";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full flex flex-col items-center justify-center"
    >
      {/* Dynamically generated flowers */}
      {flowers.map((flower) => (
        <Image
          key={flower.id}
          src={getFlowerSrc(flower.type)}
          className="absolute animate-bounce pointer-events-none"
          style={{
            top: `${flower.top}%`,
            left: `${flower.left}%`,
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            animationDelay: `${flower.animationDelay}s`,
            animationDuration: `${flower.animationDuration}s`,
          }}
          width={flower.size}
          height={flower.size}
          alt=""
        />
      ))}

      {/* MAIN TEXT */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center z-10"
      >
        <h1 className="text-6xl font-black mb-4 text-[#4A4E7E]">this is your mind garden.</h1>
        <p className="text-2xl font-bold opacity-80 text-[#4A4E7E]">
          healthy habits help your garden grow 🌸 🌿 🍂
        </p>
      </motion.div>

      {/* Grass border */}
      <div className="absolute bottom-0 left-0 w-full">
        <Image src="/grass_border.svg" width={1400} height={120} className="w-full h-auto max-h-[200px] object-contain" alt="" />
      </div>
    </motion.div>
  );
}
