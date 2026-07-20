"use server";

import { BlogData, blogService } from "@/services/blog.service";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogService.getBlogPosts();
};

export const createBlogPost = async (data: BlogData) => {
  const res = await blogService.createBlogPost(data);
  updateTag("blogPosts");

  return res;
};

export const uploadImagesAction = async (formData: FormData) => {
  return await blogService.uploadImages(formData);
};

export const getMyBlogPostsAction = async (query?: { page?: string, limit?: string }) => {
  return await blogService.getMyBlogPosts(query);
};
