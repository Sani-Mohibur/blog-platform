"use server";

import { blogService } from "@/services/blog.service";
import { revalidatePath } from "next/cache";

export async function deletePostAction(id: string) {
  const response = await blogService.deleteBlogPost(id);

  if (!response.error) {
    revalidatePath("/dashboard/my-blogs");
  }

  return response;
}

export async function updatePostAction(
  id: string,
  blogData: {
    title?: string;
    content?: string;
    thumbnail?: string | null;
    images?: string[];
    tags?: string[];
    isPrivate?: boolean;
    allowComments?: boolean;
  },
) {
  const response = await blogService.updateBlogPost(id, blogData as any);

  if (!response.error) {
    revalidatePath("/dashboard/my-blogs");
    revalidatePath(`/dashboard/my-blogs/edit/${id}`);
  }

  return response;
}
