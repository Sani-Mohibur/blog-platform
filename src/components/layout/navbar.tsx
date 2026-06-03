"use client";

import { Menu } from "lucide-react";
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
    url: "https://sani-mohibur.github.io/portfolio/",
    src: "thought_space_logo.svg",
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
    <section className={cn("py-4", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center">
              <img
                src={logo.src}
                className="max-h-16 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />

            {/* Conditional Authentication rendering blocks */}
            {!isPending &&
              (session ? (
                <Button onClick={handleLogout} variant="destructive" size="sm">
                  Logout
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link href={auth.login.url}>{auth.login.title}</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                  </Button>
                </>
              ))}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {/* Conditional Mobile Button Viewports */}
                    {!isPending &&
                      (session ? (
                        <Button
                          onClick={handleLogout}
                          variant="destructive"
                          className="w-full"
                        >
                          Logout
                        </Button>
                      ) : (
                        <>
                          <Button asChild variant="outline" className="w-full">
                            <Link href={auth.login.url}>
                              {auth.login.title}
                            </Link>
                          </Button>
                          <Button asChild className="w-full">
                            <Link href={auth.signup.url}>
                              {auth.signup.title}
                            </Link>
                          </Button>
                        </>
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
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar };
