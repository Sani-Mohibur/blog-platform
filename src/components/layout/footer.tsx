"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Github, Twitter, Linkedin, Phone } from "lucide-react";

export default function Footer() {
  const pathname = usePathname(); // 2. Paste this here

  // 3. Paste the helper logic function right here:
  const handleNavigation = (e: React.MouseEvent, targetPath: string) => {
    if (pathname === targetPath) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/100 bg-background mt-4">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_2fr_1.5fr] gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-5">ThoughtSpace</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A simple and modern space to read, share, and discover blogs on
              ideas, experiences, and everyday knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  onClick={(e) => handleNavigation(e, "/")}
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  onClick={(e) => handleNavigation(e, "/blogs")}
                  className="hover:text-foreground transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={(e) => handleNavigation(e, "/about")}
                  className="hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  onClick={(e) => handleNavigation(e, "/dashboard")}
                  className="hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="group flex items-start gap-3 hover:text-foreground transition-colors duration-200 cursor-default">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col pt-1.5">
                  <span>123 Innovation Drive, Tech District</span>
                  <span>San Francisco, CA 94105</span>
                </div>
              </li>
              <li>
                <a href="mailto:hello@thoughtspace.com" className="group flex items-center gap-3 hover:text-foreground transition-colors duration-200">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>hello@thoughtspace.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="group flex items-center gap-3 hover:text-foreground transition-colors duration-200">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Follow Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with our latest news and announcements.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground text-zinc-600 dark:text-zinc-400 transition-all duration-200" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground text-zinc-600 dark:text-zinc-400 transition-all duration-200" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground text-zinc-600 dark:text-zinc-400 transition-all duration-200" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-border/100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="text-xs md:text-sm">
            © {new Date().getFullYear()} ThoughtSpace. All rights reserved.
          </p>

          <p className="font-bold text-xs md:text-sm text-center italic">
            Every idea deserves a place to be shared
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors duration-200"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors duration-200"
            >
              Privacy
            </Link>

            <Link
              href="/content-policy"
              className="hover:text-foreground transition-colors duration-200"
            >
              Content Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
