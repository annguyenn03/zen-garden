"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function JournalAnalysis() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Set current date
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(date.toLocaleDateString('en-US', options));

    // Simulate API call/analysis
    const timer = setTimeout(() => {
      // Get journal data from localStorage
      if (typeof window !== "undefined") {
        const journalText = localStorage.getItem("currentJournalText") || "";
        const sleepHours = localStorage.getItem("currentSleepHours") || "0";
        const workHours = localStorage.getItem("currentWorkHours") || "0";
        
        // For now, use placeholder data - backend will replace this
        setAnalysisData({
          burnoutLevel: "Severe",
          burnoutProbability: 96,
          zenSuggestions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce est leo, ultricies ut nibh vitae, varius vulputate risus. Aliquam porttitor, felis sed congue tincidunt, nulla arcu rutrum dolor, viverra rutrum risus tortor quis augue. Morbi quis odio congue, feugiat tortor sit amet, venenatis nisl. Proin sit amet augue blandit, suscipit risus vel, feugiat quam. Suspendisse ut augue nibh. Aenean eleifend risus semper feugiat mollis. Quisque sit amet purus metus.",
          subtitle: "Lorem Ipsum Solor Dit",
          additionalText: "lorem ipsum solor sit"
        });
      }
      setIsLoading(false);
    }, 2000); // 2 second loading animation

    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    // Save analysis to localStorage
    if (typeof window !== "undefined" && analysisData) {
      const existingEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
      const journalText = localStorage.getItem("currentJournalText") || "";
      const sleepHours = localStorage.getItem("currentSleepHours") || "0";
      const workHours = localStorage.getItem("currentWorkHours") || "0";
      
      const newEntry = {
        text: journalText,
        sleepHours: parseFloat(sleepHours) || 0,
        workHours: parseFloat(workHours) || 0,
        timestamp: new Date().toISOString(),
        analysis: analysisData,
        date: currentDate,
      };
      
      existingEntries.push(newEntry);
      localStorage.setItem("journalEntries", JSON.stringify(existingEntries));
      
      // Clear temporary data
      localStorage.removeItem("currentJournalText");
      localStorage.removeItem("currentSleepHours");
      localStorage.removeItem("currentWorkHours");
      
      // Redirect to journal
      router.push("/journal");
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start pt-10 px-10 mb-8">
        <div>
          <h1 className="text-5xl font-black text-[#4A4E7E] mb-2">your analysis</h1>
          <p className="text-lg text-[#4A4E7E] opacity-70">{currentDate}</p>
        </div>
        <Link href="/journal">
          <button className="w-10 h-10 rounded-full bg-[#4A4E7E] text-white flex items-center justify-center hover:bg-[#3b3f66] transition-colors">
            <span className="text-xl font-bold">×</span>
          </button>
        </Link>
      </div>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-white"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-[#4A4E7E] border-t-transparent rounded-full"
              />
              <p className="text-xl text-[#4A4E7E] font-medium">analyzing your journal...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Content */}
      <AnimatePresence>
        {!isLoading && analysisData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 px-10 pb-10 flex gap-6"
          >
            {/* Left Section - Zen Suggestions */}
            <div className="flex-1 bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-4xl font-black text-[#4A4E7E] mb-2">Zen Suggestions</h2>
              <p className="text-lg text-[#4A4E7E] opacity-70 mb-6">{analysisData.subtitle}</p>
              <p className="text-base text-[#4A4E7E] opacity-80 leading-relaxed">
                {analysisData.zenSuggestions}
              </p>
            </div>

            {/* Right Section - Burnout Info */}
            <div className="w-80 flex flex-col gap-6">
              {/* Burnout Warning Panel */}
              <div className="bg-[#F2C1D1] rounded-3xl p-8 shadow-lg">
                <h3 className="text-5xl font-black text-[#4A4E7E] mb-2">
                  {analysisData.burnoutLevel}
                </h3>
                <p className="text-lg text-[#4A4E7E] opacity-70">Burnout Warning</p>
              </div>

              {/* Burnout Probability Panel */}
              <div className="bg-[#E6D9F0] rounded-3xl p-8 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-5xl font-black text-[#4A4E7E] mb-2">
                    {analysisData.burnoutProbability}%
                  </h3>
                  <p className="text-lg text-[#4A4E7E] opacity-70 mb-4">Burnout Probability</p>
                </div>
                <p className="text-sm text-[#4A4E7E] opacity-60">{analysisData.additionalText}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Buttons */}
      {!isLoading && (
        <div className="absolute bottom-10 left-10 right-10 flex justify-between">
          <Link href="/write/metadata">
            <button className="bg-[#2D2D2D] text-white text-xl font-bold px-8 py-3 rounded-2xl hover:bg-[#1a1a1a] transition-colors">
              back
            </button>
          </Link>
          <button
            onClick={handleFinish}
            className="bg-[#2D2D2D] text-white text-xl font-bold px-8 py-3 rounded-2xl hover:bg-[#1a1a1a] transition-colors"
          >
            finish
          </button>
        </div>
      )}
    </div>
  );
}
