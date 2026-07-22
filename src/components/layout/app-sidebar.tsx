"use client"

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { moderatorRoutes } from "@/routes/moderatorRoutes";
import { Route } from "@/types";
import { Roles } from "@/constants/roles";
import { cn } from "@/lib/utils";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string; name?: string; email?: string; image?: string };
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  let routes: Route[] = [];

  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.moderator:
      routes = moderatorRoutes;
      break;
    case Roles.user:
      routes = userRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-border/50 px-6 flex items-center justify-center pt-5">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary hover:opacity-90 transition-opacity">
          <img src="/thought_space_logo.svg" className="max-h-8 dark:invert" alt="ThoughtSpace logo" />
          <span>ThoughtSpace</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="mb-6">
            <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "transition-all duration-200 h-10 px-3 rounded-lg flex items-center gap-3 w-full",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-primary/5 hover:text-primary text-zinc-600 dark:text-zinc-400"
                        )}
                      >
                        <Link href={item.url}>
                          {item.icon && <item.icon className="w-4 h-4 shrink-0" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={user.image} alt={user.name || "User"} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium leading-none truncate">{user.name || "User"}</span>
            <span className="text-xs text-muted-foreground mt-1.5 capitalize truncate">{user.role}</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
