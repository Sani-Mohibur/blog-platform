import CommentsSection from "@/components/modules/homepage/CommentsSection";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { blogService } from "@/services/blog.service";
import { notFound } from "next/navigation"; // Added for error safety

// CRITICAL: Forces Next.js to fetch fresh on every single click, triggering your backend view counter
export const dynamic = "force-dynamic";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: blog, error } = await blogService.getBlogById(id);

  // Safely redirect if the post doesn't exist instead of throwing a 500 error
  if (error || !blog) {
    notFound();
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="container mx-auto px-4 py-12 max-w-2xl">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <span>{formattedDate}</span>
          <span>·</span>
          <span>{readingTime} min read</span>
          <span>·</span>
          <span>{blog.views ?? 0} views</span>
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-foreground">
        <p className="whitespace-pre-wrap text-lg leading-8">{blog.content}</p>
      </div>

      <Separator className="my-8" />

      {/* Footer */}
      <footer className="space-y-6">
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-3 py-1 text-sm font-normal rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{blog._count?.comments ?? 0} comments</span>
          {blog.isFeatured && (
            <Badge variant="outline" className="rounded-full">
              Featured
            </Badge>
          )}
        </div>
      </footer>

      <Separator className="my-8" />

      <CommentsSection postId={id} comments={blog.comments || []} />
    </article>
  );
}
