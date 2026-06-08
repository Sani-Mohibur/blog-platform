"use client";

import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { deletePostAction } from "@/actions/history.action";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BlogPost } from "@/types";
import Link from "next/link";

export default function HistoryTable({ posts }: { posts: BlogPost[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, title: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"?`,
    );
    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting blog post...");

    startTransition(async () => {
      const response = await deletePostAction(id);

      if (response?.error) {
        toast.error(response.error.message || "Failed to delete post", {
          id: toastId,
        });
      } else {
        toast.success("Post deleted successfully", { id: toastId });
      }
    });
  };

  return (
    <div className="border rounded-md overflow-hidden bg-background">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Title</TableHead>
            <TableHead className="w-[35%]">Tags</TableHead>
            <TableHead className="w-[10%] text-right">Views</TableHead>
            <TableHead className="w-[10%] text-right">Comments</TableHead>
            <TableHead className="w-[15%] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                No blog posts found
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="align-middle">
                  <div className="flex flex-col max-w-full">
                    <p className="font-medium truncate" title={post.title}>
                      {post.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {post.content}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="align-middle">
                  <div className="flex flex-wrap gap-1 max-w-full items-center">
                    {post.tags && post.tags.length > 0 ? (
                      <>
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="truncate max-w-[100px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground font-medium pl-1">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No tags
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right align-middle">
                  {post.views}
                </TableCell>
                <TableCell className="text-right align-middle">
                  {post._count?.comments ?? 0}
                </TableCell>
                <TableCell className="text-center align-middle">
                  <TooltipProvider delayDuration={200}>
                    <div className="flex items-center justify-center gap-2">
                      {/* Edit Tooltip */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/dashboard/history/edit/${post.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isPending}
                              className="h-8 w-8 text-primary cursor-pointer hover:bg-primary/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="bg-popover text-popover-foreground border px-2.5 py-1 text-xs font-medium rounded-md shadow-md"
                        >
                          Edit
                        </TooltipContent>
                      </Tooltip>

                      {/* Delete Tooltip */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isPending}
                            onClick={() =>
                              handleDelete(post.id as string, post.title)
                            }
                            className="h-8 w-8 text-destructive cursor-pointer hover:bg-destructive/10"
                          >
                            {isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="bg-destructive text-destructive-foreground px-2.5 py-1 text-xs font-medium rounded-md shadow-md"
                        >
                          Delete
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
