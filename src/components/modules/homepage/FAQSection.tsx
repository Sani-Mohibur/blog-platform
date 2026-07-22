"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus, MessageSquareQuoteIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I publish my first blog post?",
    answer: "Getting started is easy! Once logged in, navigate to your Dashboard and click 'Create Post'. Use our rich text editor to draft your content, add a featured image, and hit 'Publish' when you're ready to share it with the world."
  },
  {
    question: "How do author profiles work?",
    answer: "Every writer gets a dedicated public profile showcasing their bio, profile picture, and all published articles. It acts as your personal portfolio on the platform, helping readers discover more of your work."
  },
  {
    question: "Can I edit or delete my published posts?",
    answer: "Yes, you have full control over your content. From your Dashboard, you can edit the text, update tags, change the thumbnail, or delete the post entirely at any time."
  },
  {
    question: "How are 'Featured Authors' selected?",
    answer: "Featured authors are selected by our editorial team based on the quality, consistency, and engagement of their articles. Publishing insightful, original content regularly increases your chances of being featured."
  },
  {
    question: "Who can comment on my articles?",
    answer: "Any registered user can leave comments on your articles. As the author, you have the ability to read, reply to, and engage with your readers directly in the comments section."
  },
  {
    question: "Is my personal information secure?",
    answer: "Absolutely. We take privacy seriously. Your email and private data are never shared publicly. Only the information you explicitly add to your public bio is visible to other readers."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-24 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">

        {/* Left Side: Heading & Description */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary w-max">
              <MessageSquareQuoteIcon className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">FAQ</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Common questions. <br />
              <span className="text-zinc-500 dark:text-zinc-400">Clear answers.</span>
            </h2>

            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Everything you need to know about publishing, reading, and interacting on our platform. Can't find the answer you're looking for? Reach out to our support team.
            </p>

            <div className="hidden lg:block pt-8 text-zinc-300 dark:text-zinc-800">
              <HelpCircle className="w-32 h-32 opacity-50" strokeWidth={1} />
            </div>
          </motion.div>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={cn(
                    "border rounded-2xl overflow-hidden transition-colors duration-300",
                    isOpen
                      ? "border-primary/50 bg-primary/5 dark:bg-primary/5"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 hover:border-zinc-300 dark:hover:border-zinc-700"
                  )}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex items-center justify-between w-full text-left p-5 md:p-6 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className={cn(
                      "text-lg font-medium transition-colors duration-300 pr-8",
                      isOpen ? "text-primary" : "text-zinc-900 dark:text-zinc-100"
                    )}>
                      {faq.question}
                    </span>

                    <div className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
                      isOpen ? "bg-primary text-primary-foreground" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                    )}>
                      <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 md:px-6 pb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
