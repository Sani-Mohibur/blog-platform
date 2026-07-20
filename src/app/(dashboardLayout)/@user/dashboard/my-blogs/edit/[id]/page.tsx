import EditBlogForm from "@/components/modules/user/history/EditBlogForm";
import { blogService } from "@/services/blog.service";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditPageProps) {
  const { id } = await params;

  const response = await blogService.getBlogById(id);
  const post = response?.data;

  if (!post) {
    notFound();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Modify Blog Post
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Update your post access configuration keys, thumbnail imagery, and
          core content values.
        </p>
      </div>

      <div className="border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-xl">
        <EditBlogForm post={post} />
      </div>
    </div>
  );
}
