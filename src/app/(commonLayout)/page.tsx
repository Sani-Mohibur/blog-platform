import BlogCard from "@/components/modules/homepage/BlogCard";
import FeaturedPostsSection from "@/components/modules/homepage/FeaturedPostsSection";
import HeroSection from "@/components/modules/homepage/HeroSection";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const featuredPostsPromise = blogService.getBlogPosts({ isFeatured: true });
  const postsPromise = blogService.getBlogPosts(
    { limit: "09" },
    { revalidate: 10 },
  );

  const [featuredPosts, posts] = await Promise.all([
    featuredPostsPromise,
    postsPromise,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 mb-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Posts */}
      <FeaturedPostsSection featuredPosts={featuredPosts?.data?.data || []} />

      {/* Latest Blogs */}
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Latest Blogs</h2>

          <p className="mt-1 text-muted-foreground">
            Explore our newest articles featuring thoughtful insights and
            engaging discussions.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {posts?.data?.data?.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
