"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteComment } from "@/actions/admin.action";
import PaginationControls from "@/components/ui/pagination-controls";
import Link from "next/link";

export function CommentTable({ comments, pagination }: { comments: any[], pagination: any }) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    
    setLoading(commentId);
    try {
      const res = await deleteComment(commentId);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Comment deleted successfully");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/60">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Comment</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Post</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell className="font-medium max-w-[300px] truncate" title={comment.content}>
                {comment.content}
              </TableCell>
              <TableCell>{comment.authorName}</TableCell>
              <TableCell className="max-w-[150px] truncate text-zinc-500">
                <Link href={`/blogs/${comment.postId}`} className="hover:underline" target="_blank">
                  {comment.post?.title || "Unknown Post"}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant={comment.status === "APPROVED" ? "default" : "destructive"}>
                  {comment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" 
                  disabled={loading === comment.id}
                  onClick={() => handleDelete(comment.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {comments.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                No comments found.
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
