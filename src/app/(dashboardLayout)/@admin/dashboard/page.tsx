"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminDashboardRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname !== "/admin-dashboard") {
      router.replace("/admin-dashboard");
    }
  }, [router, pathname]);

  if (pathname === "/admin-dashboard") return null;

  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
        Redirecting to Control Center...
      </div>
    </div>
  );
}
