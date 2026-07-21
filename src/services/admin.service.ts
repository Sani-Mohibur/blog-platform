import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    "Content-Type": "application/json",
    Cookie: cookieStore.toString(),
  };
};

export const adminService = {
  getStats: async function () {
    try {
      const res = await fetch(`${API_URL}/admin/dashboard/stats`, {
        headers: await getAuthHeaders(),
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to get stats" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getAllUsers: async function (page = 1, limit = 10, search = "", role = "", status = "") {
    try {
      const query = new URLSearchParams({ page: page.toString(), limit: limit.toString(), search, role, status });
      const res = await fetch(`${API_URL}/admin/users?${query.toString()}`, {
        headers: await getAuthHeaders(),
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to get users" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateUser: async function (userId: string, payload: any) {
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: "PATCH",
        headers: await getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to update user" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getAllBlogs: async function (page = 1, limit = 10, search = "") {
    try {
      const query = new URLSearchParams({ page: page.toString(), limit: limit.toString(), search });
      const res = await fetch(`${API_URL}/admin/blogs?${query.toString()}`, {
        headers: await getAuthHeaders(),
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to get blogs" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateBlog: async function (blogId: string, payload: any) {
    try {
      const res = await fetch(`${API_URL}/admin/blogs/${blogId}`, {
        method: "PATCH",
        headers: await getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to update blog" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  deleteBlog: async function (blogId: string) {
    try {
      const res = await fetch(`${API_URL}/admin/blogs/${blogId}`, {
        method: "DELETE",
        headers: await getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to delete blog" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getAllComments: async function (page = 1, limit = 10) {
    try {
      const query = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
      const res = await fetch(`${API_URL}/admin/comments?${query.toString()}`, {
        headers: await getAuthHeaders(),
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to get comments" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  deleteComment: async function (commentId: string) {
    try {
      const res = await fetch(`${API_URL}/admin/comments/${commentId}`, {
        method: "DELETE",
        headers: await getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to delete comment" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getAllCategories: async function () {
    try {
      const res = await fetch(`${API_URL}/admin/categories`, {
        headers: await getAuthHeaders(),
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to get categories" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  createCategory: async function (name: string) {
    try {
      const res = await fetch(`${API_URL}/admin/categories`, {
        method: "POST",
        headers: await getAuthHeaders(),
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to create category" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateCategory: async function (categoryId: string, name: string) {
    try {
      const res = await fetch(`${API_URL}/admin/categories/${categoryId}`, {
        method: "PATCH",
        headers: await getAuthHeaders(),
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to update category" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  deleteCategory: async function (categoryId: string) {
    try {
      const res = await fetch(`${API_URL}/admin/categories/${categoryId}`, {
        method: "DELETE",
        headers: await getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to delete category" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getSettings: async function () {
    try {
      const res = await fetch(`${API_URL}/admin/settings`, {
        headers: await getAuthHeaders(),
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to get settings" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  updateSettings: async function (payload: any) {
    try {
      const res = await fetch(`${API_URL}/admin/settings`, {
        method: "PATCH",
        headers: await getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return { data: null, error: { message: data?.message || "Failed to update settings" } };
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  }
};
