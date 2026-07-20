import HistoryTable from "@/components/modules/user/history/HistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blog.service";

export const dynamic = "force-dynamic";

export default async function MyBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const response = await blogService.getMyBlogPosts({ page });

  const posts = Array.isArray(response.data)
    ? response.data
    : response.data?.data || [];
  const pagination = response.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Blogs</h1>
      <HistoryTable posts={posts} />

      <PaginationControls meta={pagination} />
    </div>
  );
}
