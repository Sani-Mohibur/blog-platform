"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardBreadcrumbs() {
  const pathname = usePathname();

  // Check which sub-page we are on
  const isRootDashboard = pathname === "/dashboard" || pathname === "/admin-dashboard";
  
  const lastSegment = pathname.split('/').pop() || "";
  const dynamicTitle = lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const rootHref = pathname.startsWith("/admin-dashboard") ? "/admin-dashboard" : "/dashboard";

  return (
    <nav className="flex items-center gap-2 text-sm font-medium">
      {/* Dashboard Item */}
      <Link
        href={rootHref}
        className={`transition-colors custom-transition ${
          isRootDashboard
            ? "text-foreground font-semibold cursor-default pointer-events-none"
            : "text-muted-foreground/80 hover:text-foreground cursor-pointer"
        }`}
      >
        Dashboard
      </Link>

      {/* Dynamic Sub-Page Slash & Title */}
      {!isRootDashboard && (
        <>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-foreground font-semibold">
            {dynamicTitle}
          </span>
        </>
      )}

      {/* Workspace Fallback (If you still want it displayed on the default screen) */}
      {isRootDashboard && (
        <>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-muted-foreground/60 hover:text-foreground">
            Workspace
          </span>
        </>
      )}
    </nav>
  );
}
