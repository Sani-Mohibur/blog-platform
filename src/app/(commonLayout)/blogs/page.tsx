"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Tag, X, FileText, RefreshCw } from "lucide-react";
import PaginationControls from "@/components/ui/pagination-controls";
import BlogCard from "@/components/modules/homepage/BlogCard";
import { BlogPost } from "@/types";

function BlogsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL params safely on the client side
  const urlFilter = searchParams.get("filter") || "title";
  const urlTitle = searchParams.get("title") || "";
  const urlTags = searchParams.get("tags") || "";
  const urlPage = searchParams.get("page") || "1";

  // Manage live filter state
  const [selectedFilter, setSelectedFilter] = useState(urlFilter);
  const [searchQuery, setSearchQuery] = useState(
    urlFilter === "tags" ? urlTags : urlTitle,
  );

  // Data state management
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 9,
    page: 1,
    total: 0,
    totalPages: 1,
  });

  // Sync state cleanly if the URL changes directly
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = new URL(`${baseUrl}/posts`);

      url.searchParams.append("page", urlPage);
      url.searchParams.append("limit", "9");

      if (urlFilter === "title" && urlTitle) {
        url.searchParams.append("title", urlTitle);
      }
      if (urlFilter === "tags" && urlTags) {
        url.searchParams.append("tags", urlTags);
      }

      try {
        const res = await fetch(url.toString(), { cache: "no-store" });
        if (!res.ok) {
          const errorText = await res.text();
          console.error(`Server returned status ${res.status}:`, errorText);
          return;
        }
        const result = await res.json();

        setPosts(result?.data || []);
        setPagination(
          result?.pagination || { limit: 9, page: 1, total: 0, totalPages: 1 },
        );
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false); // 🔑 Turn off loading when network operation finishes
      }
    };

    fetchBlogs();
  }, [urlPage, urlFilter, urlTitle, urlTags]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("filter", selectedFilter);
    params.set("page", "1"); // Reset to page 1 on new search

    if (searchQuery.trim()) {
      if (selectedFilter === "tags") {
        params.set("tags", searchQuery.trim());
      } else {
        params.set("title", searchQuery.trim());
      }
    }

    router.push(`/blogs?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    router.push("/blogs");
  };

  const hasActiveFilters = !!urlTitle || !!urlTags;

  return (
    <main className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/20">
      <section className="mx-auto max-w-7xl px-6 py-10">
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

        {/* SEARCH PANEL */}
        <div className="mt-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/60 p-4 shadow-sm">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-3 md:flex-row"
          >
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 text-sm font-medium outline-none cursor-pointer"
            >
              <option value="title">Search by Title</option>
              <option value="tags">Search by Tag</option>
            </select>

            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  selectedFilter === "tags"
                    ? "Search by tag (e.g. backend, react)..."
                    : "Search blog titles..."
                }
                className="h-11 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              className="h-11 rounded-xl bg-zinc-900 dark:bg-zinc-50 px-6 text-sm font-medium text-white dark:text-zinc-950 transition active:scale-95"
            >
              Search
            </button>
          </form>
        </div>

        {/* PREMIUM ACTIVE CONTEXT BANNER */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm bg-primary/5 border border-primary/20 rounded-xl p-3">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">
              Active Search:
            </span>

            {urlTitle && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white dark:bg-zinc-900 border px-2.5 py-1 text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-sm">
                <FileText className="h-3 w-3 text-primary" />
                Title matches:{" "}
                <strong className="text-primary">
                  "{urlTitle}"
                </strong>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-0.5 rounded-md"
                >
                  <X className="h-3 w-3 text-zinc-400" />
                </button>
              </span>
            )}

            {urlTags && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white dark:bg-zinc-900 border px-2.5 py-1 text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-sm">
                <Tag className="h-3 w-3 text-emerald-500" />
                Tag matches:{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">
                  #{urlTags}
                </strong>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-0.5 rounded-md"
                >
                  <X className="h-3 w-3 text-zinc-400" />
                </button>
              </span>
            )}

            <button
              onClick={clearFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-primary underline"
            >
              <RefreshCw className="h-3 w-3" /> Clear filters
            </button>
          </div>
        )}

        {/* HEADER SECTION */}
        <div className="mt-10 mb-6 flex items-center justify-between border-b pb-4 border-zinc-200/60 dark:border-zinc-800/60">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            All Publications
          </h2>

          {/* <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/50 px-3 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {pagination.total} Articles Found
          </div> */}
        </div>

        {/* IS LOADING STATE */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 w-full animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && posts.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center p-8">
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
              No matching records found
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Try adjusting your search criteria or tags.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-zinc-950 dark:bg-zinc-50 px-4 py-2 text-xs font-medium text-white dark:text-zinc-950"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* CONTENT GRID */}
        {posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <PaginationControls meta={pagination} />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <BlogsContent />
    </Suspense>
  );
}
