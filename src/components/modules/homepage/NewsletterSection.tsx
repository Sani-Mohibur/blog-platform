"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Sparkles, Send } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();

    // 1. If empty
    if (!trimmedEmail) {
      toast.error("Email required", {
        description: "Please enter an email address.",
      });
      return;
    }

    // 2. Simple regex for validation checking
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Invalid email address", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    // 3. Success condition
    toast.success("Successfully subscribed!", {
      description:
        "Thank you for tuning in to our weekly updates.",
    });
    setEmail(""); // Clean input field after success
  };

  const benefits = [
    "Weekly curated articles",
    "Exclusive author insights",
    "New posts delivered first",
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 shadow-sm backdrop-blur-sm">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-400/10 dark:bg-zinc-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center p-8 md:p-12 lg:p-16 relative z-10">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Stay Inspired</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Get the best ideas, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                delivered directly.
              </span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Join thousands of readers who receive our curated selection of top articles and thought-provoking insights every week.
            </p>
          </div>

          <ul className="space-y-3">
            {benefits.map((benefit, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium"
              >
                <CheckCircle2 className="w-5 h-5 text-primary" />
                {benefit}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Side: Form & Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative lg:pl-10"
        >
          {/* Floating Envelope Illustration Container */}
          <div className="hidden lg:flex justify-end mb-8 relative pr-4">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl"
            >
              <Mail className="w-16 h-16 text-zinc-400 dark:text-zinc-500" strokeWidth={1} />
            </motion.div>
            
            {/* Small decorative floating dots */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute bottom-4 right-20 w-2 h-2 bg-zinc-400 rounded-full"
            />
          </div>

          <form onSubmit={handleSubmit} className="bg-zinc-50/50 dark:bg-zinc-900/30 p-6 md:p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">Subscribe to the newsletter</h3>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-400" />
                </div>
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  className="pl-10 h-12 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="h-12 px-6 shadow-md hover:shadow-lg transition-shadow">
                Subscribe
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-4 text-center sm:text-left">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
