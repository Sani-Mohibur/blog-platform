import { userService } from "@/services/user.service";
import { blogService } from "@/services/blog.service";
import AuthorProfileView from "@/components/modules/authors/AuthorProfileView";
import { notFound } from "next/navigation";

export default async function AuthorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authorRes = await userService.getAuthorById(id);

  if (!authorRes?.data) {
    notFound();
  }

  // Fetch published blogs by this author
  const blogsRes = await blogService.getBlogPosts({
    authorId: id,
    limit: "12",
    status: "PUBLISHED"
  });

  return (
    <AuthorProfileView 
      author={authorRes.data} 
      blogs={blogsRes?.data?.data || []} 
    />
  );
}
