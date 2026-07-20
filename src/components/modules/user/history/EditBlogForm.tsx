"use client";

import { useRouter } from "next/navigation";
import React, { useTransition, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { updatePostAction } from "@/actions/history.action";
import { uploadImagesAction } from "@/actions/blog.action";
import { toast } from "sonner";
import { Loader2, X, ImageIcon, Star } from "lucide-react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

interface EditBlogFormProps {
  post: {
    id: string;
    title: string;
    content: string;
    thumbnail: string | null;
    images: string[];
    tags: string[];
    isPrivate: boolean;
    allowComments: boolean;
  };
}

export default function EditBlogForm({ post }: EditBlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState<string[]>(post.tags || []);
  const [tagInput, setTagInput] = useState("");
  
  const [isPrivate, setIsPrivate] = useState(post.isPrivate ?? false);
  const [allowComments, setAllowComments] = useState(post.allowComments ?? true);

  // Images state
  const [existingImages, setExistingImages] = useState<string[]>(post.images || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  
  // Thumbnail index points to the combined array [..existingImages, ...newPreviews]
  const initialThumbnailIndex = post.images && post.thumbnail 
    ? post.images.indexOf(post.thumbnail) 
    : null;
    
  const [thumbnailIndex, setThumbnailIndex] = useState<number | null>(
    initialThumbnailIndex !== -1 ? initialThumbnailIndex : null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const addedFiles = Array.from(e.target.files);
      const addedPreviews = addedFiles.map((f) => URL.createObjectURL(f));

      setNewFiles((prev) => [...prev, ...addedFiles]);
      setNewPreviews((prev) => {
        const updated = [...prev, ...addedPreviews];
        // Auto-select first image as thumbnail if none selected
        if (thumbnailIndex === null && (existingImages.length + updated.length) > 0) {
          setThumbnailIndex(0);
        }
        return updated;
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    // Check if it's an existing image or a new file
    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setNewFiles((prev) => prev.filter((_, i) => i !== newIndex));
      setNewPreviews((prev) => prev.filter((_, i) => i !== newIndex));
    }

    // Adjust thumbnail index
    if (thumbnailIndex === index) {
      setThumbnailIndex((existingImages.length + newPreviews.length - 1) > 0 ? 0 : null);
    } else if (thumbnailIndex !== null && thumbnailIndex > index) {
      setThumbnailIndex(thumbnailIndex - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content must be filled out");
      return;
    }

    const totalImages = existingImages.length + newFiles.length;
    if (totalImages > 0 && thumbnailIndex === null) {
      toast.error("Please select a thumbnail image by clicking the star");
      return;
    }

    const toastId = toast.loading("Saving changes...");

    try {
      let finalImageUrls = [...existingImages];

      // Upload new files if any
      if (newFiles.length > 0) {
        toast.loading("Uploading new images...", { id: toastId });
        const formData = new FormData();
        newFiles.forEach((file) => {
          formData.append("images", file);
        });

        const uploadRes = await uploadImagesAction(formData);
        if (uploadRes.error || !uploadRes.data) {
          toast.error(uploadRes.error?.message || "Image upload failed", { id: toastId });
          return;
        }
        
        finalImageUrls = [...finalImageUrls, ...uploadRes.data];
      }

      const thumbnailUrl = thumbnailIndex !== null && finalImageUrls[thumbnailIndex]
        ? finalImageUrls[thumbnailIndex]
        : (finalImageUrls.length > 0 ? finalImageUrls[0] : null);

      startTransition(async () => {
        const response = await updatePostAction(post.id, {
          title,
          content,
          thumbnail: thumbnailUrl,
          images: finalImageUrls,
          tags,
          isPrivate,
          allowComments,
        });

        if (response?.error) {
          toast.error(response.error.message || "Failed to update post", {
            id: toastId,
          });
        } else {
          toast.success("Post updated successfully", { id: toastId });
          router.push("/dashboard/my-blogs");
          router.refresh();
        }
      });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const allPreviews = [...existingImages, ...newPreviews];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* IMAGES FIELD */}
      <div className="space-y-3">
        <label className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Blog Images
        </label>
        <div 
          className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-8 w-8 text-zinc-400 mb-3" />
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Click to upload new images</p>
          <p className="text-xs text-zinc-500 mt-1">JPEG, PNG, WEBP, AVIF supported</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            accept="image/jpeg, image/png, image/webp, image/avif"
            onChange={handleFileChange} 
            disabled={isPending}
          />
        </div>

        {allPreviews.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span>Images ({allPreviews.length})</span>
              <span className="text-xs text-zinc-500 font-normal">Click the star to set as thumbnail</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allPreviews.map((preview, idx) => (
                <div 
                  key={idx} 
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    thumbnailIndex === idx 
                      ? "border-amber-500 shadow-md ring-2 ring-amber-500/20" 
                      : "border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <Image src={preview} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setThumbnailIndex(idx)}
                      disabled={isPending}
                      className="p-1.5 bg-white/20 hover:bg-amber-500 text-white rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                      title="Set as Thumbnail"
                    >
                      <Star className={`h-4 w-4 ${thumbnailIndex === idx ? "fill-white" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      disabled={isPending}
                      className="p-1.5 bg-white/20 hover:bg-red-500 text-white rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                      title="Remove Image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {thumbnailIndex === idx && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white" />
                      THUMBNAIL
                    </div>
                  )}
                  {idx >= existingImages.length && (
                    <div className="absolute top-2 right-2 bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      NEW
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
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
                disabled={isPending}
                className="rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 p-0.5 cursor-pointer"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col gap-1.5">
           <label className="text-sm font-medium">Private Blog</label>
           <p className="text-xs text-muted-foreground">Only you will be able to see this post</p>
           <Switch checked={isPrivate} onCheckedChange={setIsPrivate} disabled={isPending} className="mt-2" />
        </div>
        <div className="flex flex-col gap-1.5">
           <label className="text-sm font-medium">Allow Comments</label>
           <p className="text-xs text-muted-foreground">Users can comment on this post</p>
           <Switch checked={allowComments} onCheckedChange={setAllowComments} disabled={isPending} className="mt-2" />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => router.push("/dashboard/my-blogs")}
          className="border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-medium px-6 rounded-xl transition-colors shadow-sm cursor-pointer"
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
