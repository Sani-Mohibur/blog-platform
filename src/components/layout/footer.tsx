"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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

  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-border/100 bg-background mt-4">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">ThoughtSpace</h2>

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

          {/* Newsletter */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Get latest posts and insights weekly.
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-9 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                className="h-9 px-5"
                onClick={() => {
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
                }}
              >
                Subscribe
              </Button>
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
