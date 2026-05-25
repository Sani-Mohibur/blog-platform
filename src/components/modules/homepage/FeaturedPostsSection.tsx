"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types";

type Props = {
  featuredPosts: BlogPost[];
};

export default function FeaturedPostsSection({ featuredPosts }: Props) {
  const [visiblePosts, setVisiblePosts] = useState(4);

  return (
    <>
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Featured Blogs
              </h2>
              <p className="text-muted-foreground mt-1">
                Explore our most trending and highlighted articles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.slice(0, visiblePosts).map((post: BlogPost) => (
              <Link key={post.id} href={`/blogs/${post.id}`}>
                <Card className="p-0 group overflow-hidden border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl cursor-pointer h-full">
                  <div className="relative overflow-hidden">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center p-4 text-center">
                        <span className="text-zinc-400 font-medium text-lg line-clamp-2">
                          {post.title}
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-5 pt-0">
                    <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.content}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {featuredPosts.length > visiblePosts && (
            <div className="flex justify-center mt-8">
              <Button onClick={() => setVisiblePosts((p) => p + 4)}>
                Show More
              </Button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
