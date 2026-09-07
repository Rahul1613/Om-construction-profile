"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, X } from "lucide-react";

export default function QuickContactFloat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="flex flex-col gap-2.5 bg-white border border-gray-200 p-4 rounded-xl shadow-2xl animate-fade-in-up mb-2 min-w-56">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-800">Quick Contact</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Close contact menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/919158636465?text=Hello%20OM%20Construction%2C%20I%20would%20like%20to%20inquire%20about%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-bold transition-all group"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div>WhatsApp Inquiry</div>
              <div className="text-[10px] text-emerald-600 font-normal">+91 9158636465</div>
            </div>
          </a>

          {/* Direct Phone Call */}
          <a
            href="tel:+919158636465"
            className="flex items-center gap-3 p-2.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-900 rounded-lg text-xs font-bold transition-all group"
          >
            <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div>Direct Phone Call</div>
              <div className="text-[10px] text-orange-600 font-normal">+91 9158636465</div>
            </div>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
        aria-label="Toggle quick contact"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <Phone className="w-4 h-4" />
        <span>Quick Contact</span>
      </button>
    </div>
  );
}
