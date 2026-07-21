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
import { updateBlog, deleteBlog } from "@/actions/admin.action";
import PaginationControls from "@/components/ui/pagination-controls";
import Link from "next/link";

export function BlogTable({ blogs, pagination, currentRole }: { blogs: any[], pagination: any, currentRole: string }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin-dashboard/blogs?search=${encodeURIComponent(search)}`);
  };

  const handleAction = async (blogId: string, action: string, payload?: any) => {
    setLoading(blogId);
    try {
      let res;
      if (action === "delete") {
        if (!confirm("Are you sure you want to delete this blog?")) {
          setLoading(null);
          return;
        }
        res = await deleteBlog(blogId);
      } else {
        res = await updateBlog(blogId, payload);
      }
      
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success(action === "delete" ? "Blog deleted" : "Blog updated");
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
            placeholder="Search blogs..." 
            className="pl-9" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium max-w-[200px] truncate">
                <Link href={`/blogs/${blog.id}`} className="hover:underline" target="_blank">
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell>{blog.authorName}</TableCell>
              <TableCell>
                <Badge variant={blog.status === "PUBLISHED" ? "default" : blog.status === "DRAFT" ? "secondary" : "outline"}>
                  {blog.status}
                </Badge>
              </TableCell>
              <TableCell>{blog.views}</TableCell>
              <TableCell>
                <Switch 
                  checked={blog.isFeatured}
                  disabled={loading === blog.id}
                  onCheckedChange={(checked) => handleAction(blog.id, "featured", { isFeatured: checked })}
                />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading === blog.id}>
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.preventDefault();
                        const newStatus = blog.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
                        const isPublished = newStatus === "PUBLISHED";
                        handleAction(blog.id, "status", { status: newStatus, published: isPublished });
                      }}
                    >
                      {blog.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAction(blog.id, "delete");
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {blogs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-zinc-500">
                No blogs found.
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
