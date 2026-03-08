"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface JournalEntry {
  text: string;
  sleepHours: number;
  workHours: number;
  timestamp: string;
  date?: string;
  analysis?: {
    burnoutLevel: string;
    burnoutProbability: number;
    zenSuggestions: string;
    subtitle: string;
    additionalText: string;
  };
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
      setEntries(savedEntries.reverse()); // Show most recent first
    }
  }, []);

  const handleEntryClick = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEntry(null);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-4xl font-black mb-8 text-[#4A4E7E]">Your Insights</h1>
        
        {entries.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-[#4A4E7E] opacity-60 mb-4">No journal entries yet</p>
            <Link href="/write">
              <button className="bg-[#4A4E7E] text-white text-xl font-bold px-8 py-3 rounded-2xl hover:bg-[#3b3f66] transition-colors">
                Start Journaling
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6 pb-8">
            {entries.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleEntryClick(entry)}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-black text-[#4A4E7E] mb-1">
                      {entry.date || new Date(entry.timestamp).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h2>
                    <p className="text-sm text-[#4A4E7E] opacity-60">
                      Sleep: {entry.sleepHours}h • Work: {entry.workHours}h
                    </p>
                  </div>
                  {entry.analysis && (
                    <div className="text-right">
                      <p className="text-3xl font-black text-[#E98B8B]">
                        {entry.analysis.burnoutProbability}%
                      </p>
                      <p className="text-sm text-[#4A4E7E] opacity-60">Burnout Risk</p>
                    </div>
                  )}
                </div>
                
                {entry.analysis && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-lg font-bold text-[#4A4E7E] mb-2">Zen Suggestions</p>
                    <p className="text-base text-[#4A4E7E] opacity-80 line-clamp-2">
                      {entry.analysis.zenSuggestions}
                    </p>
                  </div>
                )}

                <p className="text-lg font-bold text-[#4A4E7E] mb-2">Journal Entry</p>
                <p className="text-base text-[#4A4E7E] opacity-70 mt-4 line-clamp-2">
                  {entry.text}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Analysis Modal */}
      <AnimatePresence>
        {showModal && selectedEntry && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative m-4">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#4A4E7E] text-white flex items-center justify-center hover:bg-[#3b3f66] transition-colors z-10"
                >
                  <span className="text-xl font-bold">×</span>
                </button>

                {/* Modal Content */}
                <div className="p-10">
                  {/* Header */}
                  <div className="mb-8">
                    <h1 className="text-5xl font-black text-[#4A4E7E] mb-2">your analysis</h1>
                    <p className="text-lg text-[#4A4E7E] opacity-70">
                      {selectedEntry.date || new Date(selectedEntry.timestamp).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>

                  {/* Analysis Content */}
                  {selectedEntry.analysis ? (
                    <div className="flex gap-6 mb-8">
                      {/* Left Section - Zen Suggestions */}
                      <div className="flex-1 bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                        <h2 className="text-4xl font-black text-[#4A4E7E] mb-2">Zen Suggestions</h2>
                        <p className="text-lg text-[#4A4E7E] opacity-70 mb-6">{selectedEntry.analysis.subtitle}</p>
                        <p className="text-base text-[#4A4E7E] opacity-80 leading-relaxed">
                          {selectedEntry.analysis.zenSuggestions}
                        </p>
                      </div>

                      {/* Right Section - Burnout Info */}
                      <div className="w-80 flex flex-col gap-6">
                        {/* Burnout Warning Panel */}
                        <div className="bg-[#F2C1D1] rounded-3xl p-8 shadow-lg">
                          <h3 className="text-5xl font-black text-[#4A4E7E] mb-2">
                            {selectedEntry.analysis.burnoutLevel}
                          </h3>
                          <p className="text-lg text-[#4A4E7E] opacity-70">Burnout Warning</p>
                        </div>

                        {/* Burnout Probability Panel */}
                        <div className="bg-[#E6D9F0] rounded-3xl p-8 shadow-lg flex flex-col justify-between">
                          <div>
                            <h3 className="text-5xl font-black text-[#4A4E7E] mb-2">
                              {selectedEntry.analysis.burnoutProbability}%
                            </h3>
                            <p className="text-lg text-[#4A4E7E] opacity-70 mb-4">Burnout Probability</p>
                          </div>
                          <p className="text-sm text-[#4A4E7E] opacity-60">{selectedEntry.analysis.additionalText}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-8 p-8 bg-gray-50 rounded-3xl">
                      <p className="text-lg text-[#4A4E7E] opacity-60">No analysis available for this entry.</p>
                    </div>
                  )}

                  {/* Journal Entry Details */}
                  <div className="bg-gray-50 rounded-3xl p-8">
                    <h3 className="text-2xl font-black text-[#4A4E7E] mb-4">Journal Entry</h3>
                    <div className="mb-4">
                      <p className="text-sm text-[#4A4E7E] opacity-60 mb-2">Sleep: {selectedEntry.sleepHours}h • Work: {selectedEntry.workHours}h</p>
                    </div>
                    <p className="text-base text-[#4A4E7E] opacity-80 leading-relaxed whitespace-pre-wrap">
                      {selectedEntry.text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
