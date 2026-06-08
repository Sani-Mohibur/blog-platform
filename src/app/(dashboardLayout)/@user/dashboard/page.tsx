import { userService } from "@/services/user.service";
import { blogService } from "@/services/blog.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileText,
  Eye,
  MessageSquare,
  PenTool,
  History,
  Star,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface DashboardPost {
  id: string;
  title: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  readTime: number;
  isFeatured: boolean;
  createdAt: string;
  views: number;
  _count?: {
    comments: number;
  };
}

export default async function UserDashboard() {
  // 1. Fetch user session
  const { data: sessionData } = await userService.getSession();
  const userName = sessionData?.user?.name || "Creator";

  // 2. Fetch all user-specific posts
  const statsResponse = await blogService.getMyBlogPosts();

  // Extract array safely from response structure
  const rawBlogs = statsResponse?.data?.data || statsResponse?.data || [];
  const blogList: DashboardPost[] = Array.isArray(rawBlogs) ? rawBlogs : [];

  // 3. Perform accurate mathematical aggregations on the array
  const totalPosts = blogList.length;

  const totalViews = blogList.reduce((sum, post) => sum + (post.views || 0), 0);

  const totalCommentsCount = blogList.reduce(
    (sum, post) => sum + (post._count?.comments || 0),
    0,
  );

  // Take the last 3 recent posts for the activity list display
  const recentPosts = blogList.slice(0, 3);

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* Welcome Hero Area */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Welcome back, {userName}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here is how your publication ecosystem is performing today.
        </p>
      </div>

      {/* 1. Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border border-zinc-200/60 dark:border-zinc-800/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Articles
            </CardTitle>
            <FileText className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {totalPosts}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Published entries
            </p>
          </CardContent>
        </Card>

        <Card className="border border-zinc-200/60 dark:border-zinc-800/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Readers
            </CardTitle>
            <Eye className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Cumulative page views
            </p>
          </CardContent>
        </Card>

        <Card className="border border-zinc-200/60 dark:border-zinc-800/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Engagement
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {totalCommentsCount}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Discussion comments received
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Content Spatial Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity (70% Width) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-zinc-200/60 dark:border-zinc-800/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your last 3 generated or published blog posts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentPosts.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No blogs created yet. Click "Write Blog" to start your engine!
                </div>
              ) : (
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0">
                        <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate max-w-[300px] md:max-w-[450px]">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" },
                            )}
                          </span>
                          <span>·</span>
                          <span>
                            {Math.ceil((post.readTime || 0) / 60)} min read
                          </span>
                          {post.isFeatured && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-500 uppercase">
                              <Star className="h-2.5 w-2.5 fill-amber-500" />{" "}
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50"
                            : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions (30% Width) */}
        <div className="space-y-6">
          <Card className="border border-zinc-200/60 dark:border-zinc-800/50 shadow-sm bg-zinc-50/50 dark:bg-zinc-900/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Quick Actions
              </CardTitle>
              <CardDescription>
                Shortcut workflows to build out modules.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                asChild
                className="w-full justify-start gap-2.5 h-10 shadow-sm"
                variant="default"
              >
                <Link href="/dashboard/create-blog">
                  <PenTool className="h-4 w-4" />
                  <span>Write Blog Article</span>
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start gap-2.5 h-10 bg-background hover:bg-zinc-50 text-zinc-800 border dark:text-zinc-200 dark:hover:bg-zinc-900"
                variant="outline"
              >
                <Link href="/dashboard/history">
                  <History className="h-4 w-4" />
                  <span>View Post History</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
