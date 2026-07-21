import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { CommentTable } from "./comment-table";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminCommentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");

  const { data: session } = await userService.getSession();
  if (!session || !session.user) redirect("/login");

  const { data, error } = await adminService.getAllComments(page, 15);

  if (error || !data) {
    return (
      <div className="p-8 text-center text-zinc-500">
        Failed to load comments.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Comment Management</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Moderate community discussions and remove inappropriate comments.
        </p>
      </div>

      <CommentTable 
        comments={data.data} 
        pagination={data.pagination} 
      />
    </div>
  );
}
