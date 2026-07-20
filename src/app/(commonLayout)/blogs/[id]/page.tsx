import CommentsSection from "@/components/modules/homepage/CommentsSection";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { blogService } from "@/services/blog.service";
import ReadTimeTracker from "@/components/modules/blog/ReadTimeTracker";
import BlogImageSlider from "@/components/modules/blog/BlogImageSlider";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await blogService.getBlogById(id);
  const blog = response?.data?.data || response?.data;

  if (response.error || !blog) {
    notFound();
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Premium Featured Banner Above Title */}
      {blog.isFeatured && (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-amber-500 uppercase mb-3">
          ✦ Featured Post
        </span>
      )}

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 text-zinc-900 dark:text-zinc-50">
          {blog.title}
        </h1>

        {/* Polished Meta Metadata Bar */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-zinc-500 dark:text-zinc-400 text-sm border-y border-zinc-100 dark:border-zinc-800/60 py-3.5">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            By {blog.authorName || "Anonymous"}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span>{formattedDate}</span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <ReadTimeTracker postId={id} initialSeconds={blog.readTime || 0} />
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>{blog.views ?? 0} views</span>
        </div>
      </header>

      {/* Premium Aspect-Ratio Thumbnail / Image Slider */}
      {(blog.images && blog.images.length > 0) ? (
        <BlogImageSlider images={blog.images} title={blog.title} />
      ) : blog.thumbnail ? (
        <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-100 dark:bg-zinc-900 shadow-md">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full max-h-[500px] object-contain object-center hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      ) : null}

      {/* Content Body with Editorial Drop Cap */}
      <div className="prose prose-zinc prose-lg dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200">
        <p className="whitespace-pre-wrap text-base md:text-lg leading-8 first-letter:text-5xl first-letter:font-extrabold first-letter:mr-3 first-letter:float-left first-letter:text-zinc-900 dark:first-letter:text-zinc-50 first-letter:leading-none">
          {blog.content}
        </p>
      </div>

      <Separator className="my-8" />

      {/* Footer tags and counts */}
      <footer className="space-y-6">
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-3 py-1 text-xs md:text-sm font-normal rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 transition-colors border-none"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span className="font-medium">
            {blog._count?.comments ?? 0} comments
          </span>
        </div>
      </footer>

      <Separator className="my-8" />

      {blog.allowComments ? (
        <CommentsSection postId={id} comments={blog.comments || []} />
      ) : (
        <div className="py-8 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">Comments are disabled for this post.</p>
        </div>
      )}
    </article>
  );
}
