import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="mb-8 mt-2 h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="relative w-full h-[85vh] overflow-hidden rounded-2xl">
        <Image
          src="/hero-bg.png"
          fill
          priority
          alt="Hero"
          className="object-cover"
        />

        {/* Darker overlay to improve text contrast */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-medium text-white mb-6">
            ✨ Share Ideas & Stories
          </span>

          <h1 className="text-5xl md:text-7xl font-black text-white max-w-4xl leading-tight mb-6 tracking-tight">
            Welcome to Our Modern Blog Platform
          </h1>

          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Explore insightful articles, discover trending topics, and express
            your thoughts with the world.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 text-base font-semibold">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-base font-semibold bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
            >
              <Link href="/blogs">Explore Blogs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
