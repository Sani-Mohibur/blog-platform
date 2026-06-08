import { CreateBlogFormClient } from "@/components/modules/user/createBlog/CreateBlogFormClient";
import { blogService } from "@/services/blog.service";

export const dynamic = "force-dynamic";

export default async function CreateBlogPage() {
  const { data } = await blogService.getBlogPosts({}, { cache: "no-store" });

  return (
    <div>
      <CreateBlogFormClient />
    </div>
  );
}
