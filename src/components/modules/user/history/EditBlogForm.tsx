"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { updatePostAction } from "@/actions/history.action";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";

interface EditBlogFormProps {
  post: {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
  };
}

export default function EditBlogForm({ post }: EditBlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [thumbnail, setThumbnail] = useState(post.thumbnail || "");
  const [tags, setTags] = useState<string[]>(post.tags || []);
  const [tagInput, setTagInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = tagInput.trim().toLowerCase().replace(/,/g, "");

      if (!trimmedValue) return;
      if (tags.includes(trimmedValue)) {
        toast.error("Tag already exists");
        return;
      }

      setTags([...tags, trimmedValue]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !thumbnail.trim()) {
      toast.error("All required text fields must be filled out");
      return;
    }

    const toastId = toast.loading("Updating blog post...");

    startTransition(async () => {
      const response = await updatePostAction(post.id, {
        title,
        content,
        thumbnail,
        tags,
      });

      if (response?.error) {
        toast.error(response.error.message || "Failed to update post", {
          id: toastId,
        });
      } else {
        toast.success("Post updated successfully", { id: toastId });
        router.push("/dashboard/history");
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* TITLE FIELD */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Blog Title
        </label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          disabled={isPending}
          className="bg-zinc-50/50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-purple-500/20"
        />
      </div>

      {/* THUMBNAIL FIELD */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Thumbnail Image URL
        </label>
        <Input
          type="url"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="https://example.com/image.jpg"
          disabled={isPending}
          className="bg-zinc-50/50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-purple-500/20"
        />
      </div>

      {/* TAGS FIELD */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Tags (Press Enter or Comma to add)
        </label>
        <div className="flex flex-wrap gap-2 p-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 min-h-[42px] items-center">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 py-1 pl-2 pr-1"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 p-0.5"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
            </Badge>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isPending}
            placeholder={tags.length === 0 ? "e.g., prisma, nextjs" : ""}
            className="flex-1 bg-transparent border-0 outline-none p-0.5 text-sm placeholder:text-muted-foreground focus:ring-0"
          />
        </div>
      </div>

      {/* CONTENT FIELD */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
          disabled={isPending}
          rows={6}
          className="flex w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => router.push("/dashboard/history")}
          className="border-zinc-200 dark:border-zinc-800 rounded-xl"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-medium px-6 rounded-xl transition-colors shadow-sm"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving Changes
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
