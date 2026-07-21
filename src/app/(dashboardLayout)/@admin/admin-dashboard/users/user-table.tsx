"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search } from "lucide-react";
import { toast } from "sonner";
import { updateUser } from "@/actions/admin.action";
import { Roles } from "@/constants/roles";
import PaginationControls from "@/components/ui/pagination-controls";

export function UserTable({ users, pagination, currentRole }: { users: any[], pagination: any, currentRole: string }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin-dashboard/users?search=${encodeURIComponent(search)}`);
  };

  const checkPermission = (action: string, targetRole?: string) => {
    if (currentRole === Roles.moderator) {
      if (action === "role") return false;
      if (action === "suspend" && (targetRole === Roles.admin || targetRole === Roles.moderator)) return false;
    }
    return true;
  };

  const handleAction = async (userId: string, action: string, payload: any, targetRole?: string) => {
    if (!checkPermission(action, targetRole)) {
      toast.error("You don't have permission to perform this action.");
      return;
    }

    setLoading(userId);
    try {
      const res = await updateUser(userId, payload);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("User updated successfully");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/60">
      <div className="flex justify-between items-center">
        <form onSubmit={handleSearch} className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Search users..." 
            className="pl-9" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured Author</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === Roles.admin ? "default" : user.role === Roles.moderator ? "secondary" : "outline"}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Switch 
                  checked={user.isFeatured}
                  disabled={loading === user.id}
                  onCheckedChange={(checked) => handleAction(user.id, "featured", { isFeatured: checked })}
                />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading === user.id}>
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className={!checkPermission("role") ? "opacity-50 cursor-not-allowed" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAction(user.id, "role", { role: Roles.admin });
                      }}
                    >
                      Make Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={!checkPermission("role") ? "opacity-50 cursor-not-allowed" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAction(user.id, "role", { role: Roles.moderator });
                      }}
                    >
                      Make Moderator
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={!checkPermission("role") ? "opacity-50 cursor-not-allowed" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAction(user.id, "role", { role: Roles.user });
                      }}
                    >
                      Make User
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={!checkPermission("suspend", user.role) ? "opacity-50 cursor-not-allowed text-red-600" : "text-red-600"}
                      onClick={(e) => {
                        e.preventDefault();
                        const newStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
                        handleAction(user.id, "suspend", { status: newStatus }, user.role);
                      }}
                    >
                      {user.status === "ACTIVE" ? "Suspend User" : "Activate User"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-zinc-500">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {pagination.totalPages > 1 && (
        <PaginationControls meta={pagination} />
      )}
    </div>
  );
}
