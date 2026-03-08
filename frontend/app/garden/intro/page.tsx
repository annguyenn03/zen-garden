"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function GardenIntro() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if user has seen the garden before
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem("hasSeenGarden");
      if (seen === "true") {
        // Already seen, redirect immediately
        router.push("/write");
      } else {
        // First time, show the garden page
        setShouldShow(true);
        // Show modal after a short delay
        setTimeout(() => {
          setShowModal(true);
        }, 1000);
      }
    }
  }, [router]);

  const handleModalClose = () => {
    setShowModal(false);
    // Mark as seen and redirect after modal closes
    localStorage.setItem("hasSeenGarden", "true");
    setTimeout(() => {
      router.push("/write");
    }, 500);
  };

  // If already seen, don't render anything (will redirect)
  if (!shouldShow) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        {/* Purple flowers */}
        <Image src="/flower_purple.svg" className="absolute top-10 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} width={150} height={150} alt="" />
        <Image src="/flower_purple.svg" className="absolute top-[40%] left-[5%] animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} width={140} height={140} alt="" />
        <Image src="/flower_purple.svg" className="absolute bottom-[25%] right-[8%] animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.2s' }} width={160} height={160} alt="" />
        
        {/* Blue flowers */}
        <Image src="/flower_blue.svg" className="absolute top-[15%] right-[10%] animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.3s' }} width={180} height={180} alt="" />
        <Image src="/flower_blue.svg" className="absolute bottom-[30%] left-[50%] animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '2.4s' }} width={170} height={170} alt="" />
        
        {/* Pink flowers */}
        <Image src="/flower_pink.svg" className="absolute top-[25%] left-[45%] animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2.1s' }} width={160} height={160} alt="" />
        <Image src="/flower_pink.svg" className="absolute bottom-[20%] left-[15%] animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '2.6s' }} width={150} height={150} alt="" />
        
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

        {/* Modal Disclaimer */}
        <AnimatePresence>
          {showModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleModalClose}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative border-2 border-[#4A4E7E]/10">
                  {/* Close button */}
                  <button
                    onClick={handleModalClose}
                    className="absolute top-4 right-4 text-[#4A4E7E] opacity-60 hover:opacity-100 transition-opacity text-2xl font-bold"
                  >
                    ×
                  </button>
                  
                  {/* Modal content */}
                  <div className="text-center">
                    <div className="mb-4 text-4xl">🌸</div>
                    <h2 className="text-2xl font-black text-[#4A4E7E] mb-4">
                      welcome to your mind garden
                    </h2>
                    <p className="text-lg font-medium text-[#4A4E7E] opacity-80 leading-relaxed mb-6">
                      every journal entry you write helps your garden flourish. let's start your journey!
                    </p>
                    <button
                      onClick={handleModalClose}
                      className="bg-[#4A4E7E] text-white text-lg font-bold px-8 py-3 rounded-2xl hover:bg-[#3b3f66] transition-colors shadow-lg"
                    >
                      let's begin
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 w-full">
          <Image src="/grass_border.svg" width={1400} height={120} className="w-full h-auto max-h-[200px] object-contain" alt="" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
