import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { CategoryTable } from "./category-table";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const { data: session } = await userService.getSession();
  if (!session || !session.user) redirect("/login");

  const { data, error } = await adminService.getAllCategories();

  if (error || !data) {
    return (
      <div className="p-8 text-center text-zinc-500">
        Failed to load categories.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Category Management</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Organize blog topics and tags.
        </p>
      </div>

      <CategoryTable 
        categories={data} 
      />
    </div>
  );
}
