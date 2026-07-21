"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function ClientRedirect({ to }: { to: string }) {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname !== to) {
      router.replace(to);
    }
  }, [router, pathname, to]);

  // If we are already on the target path (but this component was preserved by Next.js parallel routing),
  // we just return null so it doesn't show the "Redirecting..." UI.
  if (pathname === to) return null;

  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
        Redirecting...
      </div>
    </div>
  );
}
