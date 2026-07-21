"use client";

import { motion } from "framer-motion";
import { User, Calendar, BookOpen } from "lucide-react";
import BlogCard from "@/components/modules/homepage/BlogCard";
import { BlogPost } from "@/types";

type AuthorProfileViewProps = {
  author: any;
  blogs: BlogPost[];
};

export default function AuthorProfileView({ author, blogs }: AuthorProfileViewProps) {
  // Format join date
  const joinDate = author?.createdAt 
    ? new Date(author.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        
        {/* Abstract background blobs for premium feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10 text-center md:text-left">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 rounded-full border-4 border-white dark:border-zinc-950 shadow-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
          >
            {author?.image ? (
              <img src={author.image} alt={author?.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-20 h-20 text-zinc-400" />
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 pt-2"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              {author?.name}
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed max-w-2xl">
              {author?.bio || "Enthusiastic writer and contributor to the platform."}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-full text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>{author?._count?.posts || 0} Published Articles</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-full text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Joined {joinDate}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Blogs Section */}
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Published by {author?.name}</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">Read the latest thoughts and articles.</p>
            </div>
          </div>

          {blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, idx) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (idx * 0.1) }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl bg-white dark:bg-zinc-900">
              <BookOpen className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">No Articles Yet</h3>
              <p className="text-zinc-500 dark:text-zinc-400">This author hasn't published any articles at the moment.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
