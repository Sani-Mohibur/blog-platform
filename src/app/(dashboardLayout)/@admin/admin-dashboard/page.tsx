import {
  FileText,
  Eye,
  Users,
  MessageCircle,
  ShieldCheck,
  Archive,
  Activity,
  ArrowUpRight,
} from "lucide-react";

import { adminService } from "@/services/admin.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { data: stats, error } = await adminService.getStats();

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f7fa] via-[#f1ecf7] to-[#e8def5] text-zinc-900 flex items-center justify-center p-6">
        <div className="relative p-8 rounded-2xl bg-white/60 border border-white/80 backdrop-blur-xl max-w-sm text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Dashboard Unavailable
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Failed to establish secure connection to platform metrics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f7fa] via-[#f1ecf7] to-[#e8def5] text-zinc-900 selection:bg-purple-100 selection:text-purple-900">
      <div className="relative mx-auto max-w-7xl space-y-12 px-6 py-12 sm:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200/60 pb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Control Center
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500">
              Real-time platform intelligence, content integrity, and node
              configurations.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium border border-zinc-200/80 backdrop-blur-md text-zinc-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync Active
          </div>
        </div>

        {/* HERO METRICS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Views",
              value: stats.totalViews,
              icon: Eye,
              color: "from-blue-500/5",
            },
            {
              title: "Total Posts",
              value: stats.totalPosts,
              icon: FileText,
              color: "from-purple-500/5",
            },
            {
              title: "Total Members",
              value: stats.totalMembers,
              icon: Users,
              color: "from-emerald-500/5",
            },
            {
              title: "Total Comments",
              value: stats.totalComments,
              icon: MessageCircle,
              color: "from-amber-500/5",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl bg-white/70 border border-white/80 p-6 transition-all duration-300 hover:border-purple-300/50 hover:-translate-y-0.5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(120,119,198,0.08)]"
              >
                <div
                  className={`absolute top-0 left-0 w-32 h-32 bg-gradient-to-br ${item.color} to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                    {item.title}
                  </p>
                  <Icon className="h-4 w-4 text-zinc-400 group-hover:text-purple-500 transition-colors" />
                </div>
                <div className="relative mt-4 flex items-baseline justify-between">
                  <h2 className="text-4xl font-semibold tracking-tight text-zinc-900">
                    {item.value?.toLocaleString() ?? 0}
                  </h2>
                  <ArrowUpRight className="h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT SIDE METRICS */}
          <div className="space-y-10 lg:col-span-2">
            {/* CONTENT OVERVIEW */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-3.5 w-3.5 text-zinc-400" />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Content Infrastructure
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Published",
                    value: stats.publishedPosts,
                    icon: FileText,
                  },
                  { title: "Drafts", value: stats.draftPosts, icon: FileText },
                  {
                    title: "Archived",
                    value: stats.archivedPosts,
                    icon: Archive,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl bg-white/50 border border-white/60 p-5 hover:bg-white/80 transition-colors shadow-sm"
                    >
                      <div className="flex items-center justify-between text-zinc-400">
                        <p className="text-xs font-medium">{item.title}</p>
                        <Icon className="h-3.5 w-3.5 opacity-60" />
                      </div>
                      <p className="mt-3 text-xl font-medium text-zinc-800">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* COMMUNITY ACTIVITY */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Moderation Queue
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Approved Interactions",
                    value: stats.approvedComments,
                    icon: ShieldCheck,
                    text: "text-emerald-600",
                  },
                  {
                    title: "Flagged & Rejected",
                    value: stats.rejectComments,
                    icon: MessageCircle,
                    text: "text-rose-600",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl bg-white/50 border border-white/60 p-5 hover:bg-white/80 transition-colors shadow-sm"
                    >
                      <div className="flex items-center justify-between text-zinc-400">
                        <p className="text-xs font-medium">{item.title}</p>
                        <Icon className="h-3.5 w-3.5 opacity-60" />
                      </div>
                      <p className={`mt-3 text-xl font-medium ${item.text}`}>
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* USERS */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-3.5 w-3.5 text-zinc-400" />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Identity Registry
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Total Accounts", value: stats.totalUsers },
                  { title: "Privileged Admins", value: stats.totalAdmins },
                  { title: "Active Members", value: stats.totalMembers },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl bg-white/50 border border-white/60 p-5 hover:bg-white/80 transition-colors shadow-sm"
                  >
                    <p className="text-xs font-medium text-zinc-400">
                      {item.title}
                    </p>
                    <p className="mt-3 text-xl font-medium text-zinc-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE SNAPSHOT */}
          <div className="rounded-2xl bg-white/70 border border-white/90 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] h-fit lg:sticky lg:top-8">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              System Telemetry
            </h3>

            <div className="divide-y divide-zinc-100 text-xs">
              <div className="flex justify-between py-3.5">
                <span className="text-zinc-500">Ingested Posts Today</span>
                <span className="font-medium text-zinc-800">
                  {stats.publishedPosts}
                </span>
              </div>

              <div className="flex justify-between py-3.5">
                <span className="text-zinc-500">Actionable Backlog</span>
                <span
                  className={`font-medium ${stats.totalComments - stats.approvedComments > 0 ? "text-amber-600 font-semibold" : "text-zinc-500"}`}
                >
                  {stats.totalComments - stats.approvedComments} pending
                </span>
              </div>

              <div className="flex justify-between py-3.5">
                <span className="text-zinc-500">
                  Active Node Administrators
                </span>
                <span className="font-medium text-zinc-800">
                  {stats.totalAdmins}
                </span>
              </div>

              <div className="flex justify-between py-3.5 items-center">
                <span className="text-zinc-500">Cluster Status</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
