import Link from "next/link";
import { Search } from "lucide-react";

import { blogService } from "@/services/blog.service";

import { BlogPost } from "@/types";
import PaginationControls from "@/components/ui/pagination-controls";
import BlogCard from "@/components/modules/homepage/BlogCard";

type SearchParams = Promise<{
  page?: string;
  title?: string;
  tags?: string;
}>;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, title, tags } = await searchParams;

  const response = await blogService.getBlogPosts({
    page,
    search: title,
    ...(tags ? { tags } : {}),
  });

  const posts = response.data?.data || [];

  const pagination = response.data?.pagination || {
    limit: 9,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  const currentFilter = tags ? "tags" : "title";
  const currentValue = tags || title || "";

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-4xl border border-border/50 bg-gradient-to-b from-muted/40 to-background p-8 md:p-14">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(2,132,199,0.15),transparent_200%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.12),transparent_45%)]" />

          <div className="relative z-10 max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-primary">
              Explore Articles
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
              Discover Ideas,
              <br />
              Stories & Insights
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Browse all published blogs featuring thoughtful discussions,
              technical tutorials, development insights, and curated knowledge.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-10 rounded-3xl border border-border/50 bg-background/70 p-5 shadow-sm backdrop-blur">
          <form className="flex flex-col gap-4 md:flex-row">
            {/* Search Type */}
            <select
              name="filter"
              defaultValue={currentFilter}
              className="h-12 rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:ring-2 focus:ring-primary/20"
            >
              <option value="title">Search by Title</option>
              <option value="tags">Search by Tag</option>
            </select>

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                name={currentFilter}
                defaultValue={currentValue}
                placeholder={
                  currentFilter === "tags"
                    ? "Search by tag..."
                    : "Search blog titles..."
                }
                className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-12 w-32 rounded-2xl bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Search
            </button>
          </form>
        </div>

        {/* Section Header */}
        <div className="mt-14 mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">All Blogs</h2>

            <p className="mt-3 max-w-2xl text-muted-foreground leading-7">
              Explore our newest articles featuring thoughtful insights, and
              engaging discussions.
            </p>
          </div>

          {/* <div className="rounded-2xl border border-border/50 px-5 py-3 text-sm text-muted-foreground">
            {pagination.total} Articles Found
          </div> */}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-border text-center">
            <h3 className="text-2xl font-semibold tracking-tight">
              No blogs found
            </h3>

            <p className="mt-3 max-w-md text-muted-foreground">
              Try searching with different keywords or explore other topics.
            </p>

            <Link
              href="/blogs"
              className="mt-6 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Clear Search
            </Link>
          </div>
        )}

        {/* Blogs Grid */}
        {posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-14">
              <PaginationControls meta={pagination} />
            </div>
          </>
        )}
      </section>
    </main>
  );
}
