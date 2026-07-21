"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "✨ Discover New Perspectives",
    headline: "Unleash Your Creativity Through Words",
    subtitle:
      "Join a thriving community of writers and readers. Share your stories, explore insightful articles, and engage with diverse perspectives from around the globe.",
    primaryCta: { label: "Start Reading", href: "/blogs" },
    secondaryCta: { label: "Write a Story", href: "/dashboard/create-blog" },
    image: "/hero-1.png",
  },
  {
    id: 2,
    badge: "🚀 Elevate Your Reach",
    headline: "Build Your Audience, One Post at a Time",
    subtitle:
      "Leverage powerful analytics and SEO-optimized tools to ensure your voice is heard. Grow your personal brand and connect with an engaged audience.",
    primaryCta: { label: "Create Account", href: "/register" },
    secondaryCta: { label: "View Analytics", href: "/dashboard" },
    image: "/hero-2.png",
  },
  {
    id: 3,
    badge: "💬 Meaningful Interactions",
    headline: "Engage in Deep and Meaningful Discussions",
    subtitle:
      "Foster a loyal community around your content. Our advanced commenting and moderation systems make it easy to interact with your most passionate readers.",
    primaryCta: { label: "Join the Community", href: "/register" },
    secondaryCta: { label: "Read Guidelines", href: "/about" },
    image: "/hero-3.png",
  },
  {
    id: 4,
    badge: "📚 Personalized Experience",
    headline: "Curated Content Just For You",
    subtitle:
      "Experience a tailored reading journey. Our smart algorithms learn your preferences to recommend the most relevant and inspiring articles every day.",
    primaryCta: { label: "Explore Topics", href: "/blogs" },
    secondaryCta: { label: "Customize Feed", href: "/dashboard" },
    image: "/hero-4.png",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full flex items-center justify-center pt-24 pb-0 lg:pt-32 lg:pb-0">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start w-full">
            <div className="h-[420px] sm:h-[350px] lg:h-[380px] w-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-start w-full"
                >
                  <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 shadow-sm mb-6">
                    {slide.badge}
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                    {slide.headline}
                  </h1>

                  <p className="text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mb-8">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link href={slide.primaryCta.href}>
                      <Button
                        size="lg"
                        className="cursor-pointer rounded-full px-8 font-semibold shadow-md hover:shadow-lg transition-all"
                      >
                        {slide.primaryCta.label}
                      </Button>
                    </Link>
                    <Link href={slide.secondaryCta.href}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="cursor-pointer rounded-full px-8 font-semibold border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                      >
                        {slide.secondaryCta.label}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-6 mt-12 lg:mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 w-full max-w-md">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="cursor-pointer rounded-full h-10 w-10 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="cursor-pointer rounded-full h-10 w-10 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex gap-2 items-center">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className="relative py-2 px-1 cursor-pointer group"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <div
                      className={`cursor-pointer h-1.5 rounded-full transition-all duration-300 ${current === index
                        ? "w-8 bg-primary"
                        : "w-2 bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 border border-white/40 dark:border-zinc-700/60 lg:mt-0 mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  fill
                  priority
                  alt={slide.headline}
                  className="object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
