import BlogCard from "@/components/modules/homepage/BlogCard";
import FeaturedPostsSection from "@/components/modules/homepage/FeaturedPostsSection";
import HeroSection from "@/components/modules/homepage/HeroSection";
import TopAuthorsSection from "@/components/modules/homepage/TopAuthorsSection";
import FAQSection from "@/components/modules/homepage/FAQSection";
import NewsletterSection from "@/components/modules/homepage/NewsletterSection";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const featuredPostsPromise = blogService.getBlogPosts({ isFeatured: true });
  const postsPromise = blogService.getBlogPosts(
    { limit: "09" },
    { revalidate: 10 },
  );
  const authorsPromise = userService.getFeaturedAuthors();

  const [featuredPosts, posts, authorsRes] = await Promise.all([
    featuredPostsPromise,
    postsPromise,
    authorsPromise,
  ]);

  return (
    <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden min-h-screen">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[40%] -right-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24 relative z-10 space-y-16 md:space-y-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Posts */}
        <FeaturedPostsSection featuredPosts={featuredPosts?.data?.data || []} />

        {/* Top Authors */}
        <TopAuthorsSection topAuthors={authorsRes?.data || []} />

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

        {/* FAQ Section */}
        <FAQSection />

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </div>
  );
}
