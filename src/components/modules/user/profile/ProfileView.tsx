"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { UserAvatar } from "@/components/shared/UserAvatar";
import Link from "next/link";
import { Loader2, CalendarDays, Mail, User2, Info, Clock } from "lucide-react";
import { getMyBlogPostsAction } from "@/actions/blog.action";
import { Badge } from "@/components/ui/badge";

export default function ProfileView() {
  const { data: session, isPending } = authClient.useSession();
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchStats = async () => {
        try {
          const response = await getMyBlogPostsAction({ page: "1" });
          
          let count = 0;
          if (Array.isArray(response?.data)) {
            count = response.data.length;
          } else if (response?.data?.pagination?.total) {
            count = response.data.pagination.total;
          }
          
          setTotalBlogs(count);
        } catch (error) {
          console.error("Failed to fetch blog stats");
        } finally {
          setStatsLoading(false);
        }
      };
      fetchStats();
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!session?.user) {
    return <div>User not found</div>;
  }

  const user = session.user as any;

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Header Card */}
      <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-8 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />

        <UserAvatar 
          user={{ name: user.name, image: user.image }} 
          className="h-32 w-32 text-4xl shadow-md border-4 border-white dark:border-zinc-950 z-10" 
        />
        
        <div className="flex flex-col flex-1 items-center md:items-start text-center md:text-left z-10 space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {user.name}
            </h2>
            <Badge variant="secondary" className="uppercase text-[10px] tracking-wider font-bold">
              {user.role || "USER"}
            </Badge>
          </div>
          
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-sm leading-relaxed">
            {user.bio || "No bio provided yet."}
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 mt-2 border-t border-zinc-200 dark:border-zinc-800/60 w-full">
            <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-300">
              <Mail className="h-4 w-4 opacity-70" />
              <span>{user.email}</span>
            </div>
            {user.dateOfBirth && (
              <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                <CalendarDays className="h-4 w-4 opacity-70" />
                <span>{new Date(user.dateOfBirth).toLocaleDateString()}</span>
              </div>
            )}
            {user.gender && (
              <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                <User2 className="h-4 w-4 opacity-70" />
                <span>{user.gender}</span>
              </div>
            )}
            {user.createdAt && (
              <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                <Clock className="h-4 w-4 opacity-70" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/my-blogs" className="block group">
          <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md flex flex-col items-center justify-center text-center h-full transition-all group-hover:border-zinc-300 dark:group-hover:border-zinc-700 group-hover:shadow-lg cursor-pointer">
            <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-400 mb-2 group-hover:text-zinc-500 transition-colors">Total Blogs Published</h3>
            {statsLoading ? (
               <Loader2 className="h-8 w-8 animate-spin text-zinc-400 my-2" />
            ) : (
               <p className="text-5xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                 {totalBlogs}
               </p>
            )}
          </div>
        </Link>

        <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md flex flex-col items-center justify-center text-center md:col-span-2">
           <Info className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mb-3" />
           <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-400 mb-1">More Stats Coming Soon</h3>
           <p className="text-xs text-zinc-500 max-w-sm">We are working on bringing you advanced analytics like total views, comment interactions, and read times.</p>
        </div>
      </div>
    </div>
  );
}
