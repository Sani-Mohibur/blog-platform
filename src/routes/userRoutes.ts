import { Route } from "@/types";
import { PenTool, LayoutList, User, Settings } from "lucide-react";

export const userRoutes: Route[] = [
  {
    title: "Blog Management",
    items: [
      {
        title: "Create Blog",
        url: "/dashboard/create-blog",
        icon: PenTool,
      },
      {
        title: "My Blogs",
        url: "/dashboard/my-blogs",
        icon: LayoutList,
      },
    ],
  },
  {
    title: "Profile Management",
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];
