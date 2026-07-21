import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      // console.log(cookieStore.toString());

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }
      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  getFeaturedAuthors: async function () {
    try {
      const res = await fetch(`${env.API_URL}/users/featured-authors`, {
        next: { revalidate: 60 },
      });
      const data = await res.json();
      return { data: data.data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Failed to fetch featured authors" } };
    }
  },
  getAuthorById: async function (id: string) {
    try {
      const res = await fetch(`${env.API_URL}/users/${id}`, {
        next: { revalidate: 60 },
      });
      const data = await res.json();
      if (!data.success) {
        return { data: null, error: { message: data.message } };
      }
      return { data: data.data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Failed to fetch author profile" } };
    }
  },
};
