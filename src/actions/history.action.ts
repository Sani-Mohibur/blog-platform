"use server";

import { blogService } from "@/services/blog.service";
import { revalidatePath } from "next/cache";

export async function deletePostAction(id: string) {
  const response = await blogService.deleteBlogPost(id);

  if (!response.error) {
    revalidatePath("/dashboard/history");
  }

  return response;
}

export async function updatePostAction(
  id: string,
  blogData: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
  },
) {
  const response = await blogService.updateBlogPost(id, blogData);

  if (!response.error) {
    revalidatePath("/dashboard/history");
    revalidatePath(`/dashboard/history/edit/${id}`);
  }

  return response;
}
