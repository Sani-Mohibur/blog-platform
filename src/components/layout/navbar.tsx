"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client"; // Import the auth client
import { useRouter } from "next/navigation";
import { Roles } from "@/constants/roles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/UserAvatar";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/thought_space_logo.svg",
    alt: "logo",
    title: "ThoughtSpace",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Blogs", url: "/blogs" },
    { title: "About", url: "/about" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // 1. Fetch live session state hook from Better-Auth
  const { data: session, isPending } = authClient.useSession();

  // 2. Trigger natively tracked signout routine
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // Route safely out of protected views
          router.refresh();
        },
      },
    });
  };

  return (
    <section className={cn("sticky top-0 z-50 py-2 md:py-0 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            <a href={logo.url} className="flex items-center gap-3">
              <img
                src={logo.src}
                className="max-h-17 dark:invert"
                alt={logo.alt}
              />
              <span className="text-2xl font-bold tracking-tight">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => {
                    let url = item.url;
                    if (item.title === "Dashboard" && session && ((session.user as any)?.role === Roles.admin || (session.user as any)?.role === Roles.moderator)) {
                      url = "/admin-dashboard";
                    }
                    return renderMenuItem({ ...item, url });
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            {/* Conditional Authentication rendering blocks */}
            {!isPending &&
              (session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 flex items-center justify-center border hover:opacity-80 transition-opacity cursor-pointer">
                      <UserAvatar user={{ name: session.user.name, image: session.user.image }} />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user.name}
                        </p>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href={session.user && ((session.user as any).role === Roles.admin || (session.user as any).role === Roles.moderator) ? "/admin-dashboard/profile" : "/dashboard/profile"}>View Profile</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href={session.user && ((session.user as any).role === Roles.admin || (session.user as any).role === Roles.moderator) ? "/admin-dashboard/settings" : "/dashboard/settings"}>Settings</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground flex items-center justify-between">
                      <span>Role</span>
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">
                        {(session.user as any).role}
                      </span>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={auth.login.url}>{auth.login.title}</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                  </Button>
                </div>
              ))}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-10 dark:invert"
                alt={logo.alt}
              />
              <span className="text-xl font-bold tracking-tight">
                {logo.title}
              </span>
            </a>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <img
                        src={logo.src}
                        className="max-h-10 dark:invert"
                        alt={logo.alt}
                      />
                      <span className="text-xl font-bold tracking-tight">
                        {logo.title}
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => {
                      let url = item.url;
                      if (item.title === "Dashboard" && session && ((session.user as any)?.role === Roles.admin || (session.user as any)?.role === Roles.moderator)) {
                        url = "/admin-dashboard";
                      }
                      return renderMobileMenuItem({ ...item, url }, () => setIsOpen(false));
                    })}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {/* Conditional Mobile Button Viewports */}
                    {/* Conditional Mobile Button Viewports */}
                    {!isPending &&
                      (session ? (
                        <div className="flex flex-col space-y-4 border-t pt-4 mt-2">
                          {/* Profile Details Block */}
                          <div className="flex flex-col space-y-1 px-1">
                            <div className="flex items-center gap-3">
                              <UserAvatar user={{ name: session.user.name, image: session.user.image }} className="h-10 w-10" />
                              <div className="flex flex-col flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-semibold">
                                    {session.user.name}
                                  </p>
                                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">
                                    {(session.user as any).role}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button asChild variant="secondary" className="w-full justify-start cursor-pointer" onClick={() => setIsOpen(false)}>
                              <Link href={session.user && ((session.user as any).role === Roles.admin || (session.user as any).role === Roles.moderator) ? "/admin-dashboard/profile" : "/dashboard/profile"}>View Profile</Link>
                            </Button>
                            <Button asChild variant="secondary" className="w-full justify-start cursor-pointer" onClick={() => setIsOpen(false)}>
                              <Link href={session.user && ((session.user as any).role === Roles.admin || (session.user as any).role === Roles.moderator) ? "/admin-dashboard/settings" : "/dashboard/settings"}>Settings</Link>
                            </Button>
                          </div>

                          <Button
                            onClick={() => {
                              handleLogout();
                              setIsOpen(false);
                            }}
                            variant="destructive"
                            className="w-full"
                          >
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3 mt-2">
                          <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                            <Link href={auth.login.url}>
                              {auth.login.title}
                            </Link>
                          </Button>
                          <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                            <Link href={auth.signup.url}>
                              {auth.signup.title}
                            </Link>
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-base font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, onClick?: () => void) => {
  return (
    <Link key={item.title} href={item.url} className="text-lg font-semibold" onClick={onClick}>
      {item.title}
    </Link>
  );
};

export { Navbar };
