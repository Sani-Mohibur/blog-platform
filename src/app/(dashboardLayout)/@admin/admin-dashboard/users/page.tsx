import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { UserTable } from "./user-table";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";

  const { data: session } = await userService.getSession();
  if (!session || !session.user) redirect("/login");

  const { data, error } = await adminService.getAllUsers(page, 10, search);

  if (error || !data) {
    return (
      <div className="p-8 text-center text-zinc-500">
        Failed to load users.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">User Management</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Manage member accounts, roles, and featured authors.
        </p>
      </div>

      <UserTable 
        users={data.data} 
        pagination={data.pagination} 
        currentRole={session.user.role as string} 
      />
    </div>
  );
}
