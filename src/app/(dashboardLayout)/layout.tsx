import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import Link from "next/link"; // 1. Import Link
import { Home } from "lucide-react"; // 2. Import Home Icon
import { DashboardBreadcrumbs } from "@/components/layout/dashboard-breadcrumbs";

export default async function DashboardLayout({
  admin,
  user,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userInfo = data.user;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 bg-background">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-[1px] bg-border" /> <DashboardBreadcrumbs />
          </div>

          {/* Quick Exit Action Link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border rounded-lg px-2.5 py-1.5 transition-colors bg-zinc-50 dark:bg-zinc-950/40"
          >
            <Home className="h-3.5 w-3.5" />
            <span>View Site</span>
          </Link>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Roles.admin ? admin : user}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
