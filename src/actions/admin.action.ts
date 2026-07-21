"use server";

import { adminService } from "@/services/admin.service";
import { revalidatePath } from "next/cache";

export const updateUser = async (userId: string, payload: any) => {
  const res = await adminService.updateUser(userId, payload);
  if (!res.error) {
    revalidatePath("/admin-dashboard/users");
  }
  return res;
};

export const updateBlog = async (blogId: string, payload: any) => {
  const res = await adminService.updateBlog(blogId, payload);
  if (!res.error) {
    revalidatePath("/admin-dashboard/blogs");
  }
  return res;
};

export const deleteBlog = async (blogId: string) => {
  const res = await adminService.deleteBlog(blogId);
  if (!res.error) {
    revalidatePath("/admin-dashboard/blogs");
  }
  return res;
};

export const deleteComment = async (commentId: string) => {
  const res = await adminService.deleteComment(commentId);
  if (!res.error) {
    revalidatePath("/admin-dashboard/comments");
  }
  return res;
};

export const createCategory = async (name: string) => {
  const res = await adminService.createCategory(name);
  if (!res.error) {
    revalidatePath("/admin-dashboard/categories");
  }
  return res;
};

export const updateCategory = async (categoryId: string, name: string) => {
  const res = await adminService.updateCategory(categoryId, name);
  if (!res.error) {
    revalidatePath("/admin-dashboard/categories");
  }
  return res;
};

export const deleteCategory = async (categoryId: string) => {
  const res = await adminService.deleteCategory(categoryId);
  if (!res.error) {
    revalidatePath("/admin-dashboard/categories");
  }
  return res;
};

export const updateSettings = async (payload: any) => {
  const res = await adminService.updateSettings(payload);
  if (!res.error) {
    revalidatePath("/admin-dashboard/settings");
  }
  return res;
};
