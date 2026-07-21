import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Overview",
        url: "/admin-dashboard",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Blogs",
        url: "/admin-dashboard/blogs",
      },
      {
        title: "Comments",
        url: "/admin-dashboard/comments",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        url: "/admin-dashboard/settings",
      },
    ],
  },
];
