"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BookOpen, User, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Author = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  bio?: string;
  _count?: {
    posts: number;
  };
};

type Props = {
  topAuthors: Author[];
};

export default function TopAuthorsSection({ topAuthors }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Safety check to ensure we have authors
  const validAuthors = topAuthors?.length > 0 ? topAuthors : [];

  useEffect(() => {
    if (topAuthors) {
      setIsLoading(false);
    }
  }, [topAuthors]);

  // Autoplay logic
  useEffect(() => {
    if (validAuthors.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % validAuthors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [validAuthors.length, isHovered]);

  const handleNext = () => {
    if (validAuthors.length <= 1) return;
    setActiveIndex((current) => (current + 1) % validAuthors.length);
  };

  const handlePrev = () => {
    if (validAuthors.length <= 1) return;
    setActiveIndex((current) => (current - 1 + validAuthors.length) % validAuthors.length);
  };

  if (isLoading) {
    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Top Authors</h2>
            <p className="text-muted-foreground mt-1">
              Discover the brilliant minds behind our best articles.
            </p>
          </div>
        </div>
        <div className="h-[400px] w-full animate-pulse rounded-3xl bg-zinc-100 dark:bg-zinc-800/50" />
      </section>
    );
  }

  if (validAuthors.length === 0) return null;

  const activeAuthor = validAuthors[activeIndex];

  return (
    <section className="mb-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Top Authors</h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Voices shaping the conversation.
          </p>
        </div>
        {validAuthors.length > 1 && (
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Previous author"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Next author"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left: Carousel Showcase */}
        <div className="lg:col-span-7 relative h-[450px] md:h-[550px] w-full flex items-center justify-center overflow-hidden rounded-3xl">
          <AnimatePresence initial={false}>
            {validAuthors.map((author, index) => {
              // Determine relative position to active index
              let offset = index - activeIndex;
              if (offset < -1) offset += validAuthors.length;
              if (offset > 1) offset -= validAuthors.length;
              
              // Only render adjacent and active images for performance and visual clarity
              if (Math.abs(offset) > 1) return null;
              
              const isActive = offset === 0;
              
              // Positioning map
              const xPos = offset === 0 ? "0%" : offset < 0 ? "-70%" : "70%";
              const scale = isActive ? 1 : 0.8;
              const zIndex = isActive ? 10 : 5;
              const opacity = isActive ? 1 : 0.6;

              return (
                <motion.div
                  key={author.id}
                  className="absolute w-[80%] md:w-[70%] h-full flex flex-col justify-end overflow-hidden rounded-3xl cursor-pointer shadow-2xl"
                  initial={{ x: offset > 0 ? "100%" : "-100%", scale: 0.8, opacity: 0 }}
                  animate={{ x: xPos, scale, zIndex, opacity }}
                  exit={{ x: offset > 0 ? "100%" : "-100%", scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
                  onClick={() => {
                    if (offset > 0) handleNext();
                    if (offset < 0) handlePrev();
                  }}
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800">
                    {author.image ? (
                      <img 
                        src={author.image} 
                        alt={author.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-32 h-32 text-zinc-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay Gradient on Active Image */}
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative z-20 w-full p-8 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col"
                    >
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        {author.name}
                      </h3>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right: Author Info */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full px-4 lg:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAuthor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                  <BookOpen className="w-4 h-4" />
                  <span>{activeAuthor._count?.posts || 0} Articles Published</span>
                </div>
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight">
                {activeAuthor.name}
              </h3>
              
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed max-w-lg">
                {activeAuthor.bio || "Dedicated to exploring new ideas and sharing thoughtful perspectives with our community."}
              </p>
              
              <Link 
                href={`/authors/${activeAuthor.id}`}
                className="group flex items-center gap-3 text-lg font-medium text-zinc-900 dark:text-white pb-2 border-b-2 border-zinc-200 dark:border-zinc-800 hover:border-primary dark:hover:border-primary transition-colors"
              >
                <span>Read Full Profile</span>
                <motion.span 
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation Controls */}
          {validAuthors.length > 1 && (
            <div className="flex md:hidden items-center gap-4 mt-10">
              <button 
                onClick={handlePrev}
                className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
