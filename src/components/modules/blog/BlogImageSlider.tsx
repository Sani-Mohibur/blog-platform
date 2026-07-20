"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogImageSliderProps {
  images: string[];
  title: string;
}

export default function BlogImageSlider({ images, title }: BlogImageSliderProps) {
  const [current, setCurrent] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-100 dark:bg-zinc-900 shadow-md">
        <img
          src={images[0]}
          alt={title}
          className="w-full max-h-[500px] object-contain object-center hover:scale-[1.01] transition-transform duration-500"
        />
      </div>
    );
  }

  const nextSlide = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-100 dark:bg-zinc-900 shadow-md group">
      <div className="relative w-full max-h-[500px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${title} - Image ${current + 1}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, zIndex: 10 }}
            exit={{ opacity: 1, x: -30, zIndex: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-h-[500px] object-contain object-center"
          />
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-black/50 text-black dark:text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black shadow-md cursor-pointer z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-black/50 text-black dark:text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black shadow-md cursor-pointer z-10"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-2 rounded-full bg-black/20 backdrop-blur-sm z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              current === idx ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
