import Link from "next/link";
import Image from "next/image";
import { Eye, MessageCircle, ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="p-0 group flex h-full flex-col overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <Link
        href={`/blogs/${post.id}`}
        className="relative block aspect-[16/9] w-full overflow-hidden"
      >
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50 text-muted-foreground">
            No Image
          </div>
        )}
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div>
          <div className="mb-4 flex items-center justify-between">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-secondary/50 text-xs font-medium backdrop-blur-md transition-colors hover:bg-secondary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {post.isFeatured && (
              <Badge className="border-amber-500/20 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                Featured
              </Badge>
            )}
          </div>

          <Link href={`/blogs/${post.id}`}>
            <h3 className="mb-2 line-clamp-2 text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
              {post.title}
            </h3>
          </Link>

          <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-muted-foreground/80">
            {post.content}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5 transition-colors hover:text-foreground cursor-default">
              <Eye className="h-4 w-4" />
              {post.views}
            </span>

            <Link
              href={`/blogs/${post.id}#comments`}
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              {post._count?.comments || 0}
            </Link>
          </div>

          <Link
            href={`/blogs/${post.id}`}
            className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
          >
            Read <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
