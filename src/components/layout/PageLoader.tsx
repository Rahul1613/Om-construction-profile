"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fixed inset-0 z-[100] bg-brand-navy-deep flex items-center justify-center"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 blueprint-grid opacity-20" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-20 h-20 bg-brand-charcoal border-2 border-brand-orange flex items-center justify-center mb-8"
            >
              <span className="font-display font-black text-3xl text-brand-orange">OM</span>
              {/* Corner decorations */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-brand-gold" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-brand-gold" />
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-brand-charcoal overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-orange to-brand-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center gap-3"
            >
              <span className="text-xs font-extrabold tracking-widest text-brand-gold uppercase">
                Loading Experience
              </span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-brand-orange"
              >
                ...
              </motion.span>
            </motion.div>

            {/* Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 font-display font-black text-4xl text-white"
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-brand-navy-light" />
          <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-brand-navy-light" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-brand-navy-light" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-brand-navy-light" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
