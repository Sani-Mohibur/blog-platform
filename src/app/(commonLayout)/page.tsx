import BlogCard from "@/components/modules/homepage/BlogCard";
import FeaturedPostsSection from "@/components/modules/homepage/FeaturedPostsSection";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import Image from "next/image";

export default async function Home() {
  const featuredPostsPromise = blogService.getBlogPosts({ isFeatured: true });
  const postsPromise = blogService.getBlogPosts(
    { limit: "12" },
    { revalidate: 10 },
  );

  const [featuredPosts, posts] = await Promise.all([
    featuredPostsPromise,
    postsPromise,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="mb-12 mt-8 h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="relative w-full h-[85vh] overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=100"
            fill
            priority
            alt="Hero"
            className="object-cover rounded-md"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="px-4 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm text-white mb-5">
              ✨ Share Ideas & Stories
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white max-w-4xl leading-tight mb-6">
              Welcome to Our Modern Blog Platform
            </h1>

            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-8">
              Explore insightful articles, discover trending topics, and express
              your thoughts with the world.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      <FeaturedPostsSection featuredPosts={featuredPosts?.data?.data || []} />

      {/* Latest Blogs */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>

        <div className="grid grid-cols-3 gap-5">
          {posts?.data?.data?.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
