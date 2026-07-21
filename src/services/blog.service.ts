import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
  limit?: string;
  authorId?: string;
  status?: string;
}

export interface BlogData {
  title: string;
  content: string;
  thumbnail?: string | null;
  images?: string[];
  tag?: string[];
}

export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      // Initialize with default no-store fallback cleanly
      const config: RequestInit = {
        ...(options?.revalidate ? {} : { cache: options?.cache || "no-store" }),
      };

      // Set up next properties only if explicitly required or fallback to tags safely
      config.next = {
        ...(options?.revalidate ? { revalidate: options.revalidate } : {}),
        tags: ["blogPosts"],
      };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getBlogById: async function (id: string) {
    try {
      // CRITICAL FIX: Explicitly pass cache: "no-store" here
      const res = await fetch(`${API_URL}/posts/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  uploadImages: async function (formData: FormData) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: formData,
      });
      const data = await res.json();
      if (data.error || data.status === "Error") {
        const errObj = data.error;
        let errorMessage = "Upload failed";
        if (typeof errObj === "string") {
          errorMessage = errObj;
        } else if (errObj && typeof errObj === "object" && typeof errObj.message === "string") {
          errorMessage = errObj.message;
        } else if (data.message && typeof data.message === "string") {
          errorMessage = data.message;
        }
        
        return { data: null, error: { message: errorMessage } };
      }
      return { data: data.data as string[], error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  createBlogPost: async (blogData: BlogData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Post not created." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateReadTime: async function (id: string, secondsSpent: number) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}/read-time`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secondsSpent }),
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: "Failed to sync time" };
    }
  },

  getMyBlogPosts: async function (params?: { page?: string; limit?: string }) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/posts/my-posts`);

      if (params?.page) url.searchParams.append("page", params.page);
      if (params?.limit) url.searchParams.append("limit", params.limit);

      const res = await fetch(url.toString(), {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(), // Passes the session token securely to the backend
        },
      });

      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  deleteBlogPost: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to delete post" } };
    }
  },

  updateBlogPost: async function (id: string, blogData: Partial<BlogData>) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to update post" } };
    }
  },
};
