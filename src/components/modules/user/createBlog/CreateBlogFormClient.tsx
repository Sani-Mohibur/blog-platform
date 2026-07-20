"use client";

import React, { useState, useRef } from "react";
import { createBlogPost, uploadImagesAction } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { ImageIcon, X, Star } from "lucide-react";
import Image from "next/image";

const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be less than 5000 characters"),
  tags: z.string(),
});

export function CreateBlogFormClient() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setFiles((prev) => [...prev, ...newFiles]);
      setPreviews((prev) => {
        const updated = [...prev, ...newPreviews];
        // Auto-select first image as thumbnail if none selected
        if (thumbnailIndex === null && updated.length > 0) {
          setThumbnailIndex(0);
        }
        return updated;
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // Adjust thumbnail index
      if (thumbnailIndex === index) {
        setThumbnailIndex(updated.length > 0 ? 0 : null);
      } else if (thumbnailIndex !== null && thumbnailIndex > index) {
        setThumbnailIndex(thumbnailIndex - 1);
      }
      return updated;
    });
  };

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
    validators: {
      onSubmit: blogSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Processing images...");

      try {
        let imageUrls: string[] = [];
        let thumbnailUrl: string | null = null;

        if (files.length > 0) {
          const formData = new FormData();
          files.forEach((file) => {
            formData.append("images", file);
          });

          const uploadRes = await uploadImagesAction(formData);
          
          if (uploadRes.error || !uploadRes.data) {
            toast.error(uploadRes.error?.message || "Image upload failed", { id: toastId });
            return;
          }

          imageUrls = uploadRes.data;
          if (thumbnailIndex !== null && imageUrls[thumbnailIndex]) {
            thumbnailUrl = imageUrls[thumbnailIndex];
          }
        }

        toast.loading("Publishing blog...", { id: toastId });

        const blogData = {
          title: value.title,
          content: value.content,
          thumbnail: thumbnailUrl,
          images: imageUrls,
          tags: value.tags
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== ""),
        };

        const res = await createBlogPost(blogData);

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success("Post Created", { id: toastId });
        form.reset();
        setFiles([]);
        setPreviews([]);
        setThumbnailIndex(null);
        
        router.push("/dashboard/history");
        router.refresh();
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Blog Post</CardTitle>
        <CardDescription>
          Fill out the details below to publish a new blog entry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="blog-post"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Blog Title"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <div className="space-y-3">
              <FieldLabel>Images (Optional)</FieldLabel>
              <div 
                className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-10 w-10 text-zinc-400 mb-3" />
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Click to upload images</p>
                <p className="text-xs text-zinc-500 mt-1">JPEG, PNG, WEBP, AVIF supported</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  multiple 
                  accept="image/jpeg, image/png, image/webp, image/avif"
                  onChange={handleFileChange} 
                />
              </div>

              {previews.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                    <span>Uploaded Images ({previews.length})</span>
                    <span className="text-xs text-zinc-500 font-normal">Click the star to set as thumbnail</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {previews.map((preview, idx) => (
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
                            className="p-1.5 bg-white/20 hover:bg-amber-500 text-white rounded-full backdrop-blur-sm transition-colors"
                            title="Set as Thumbnail"
                          >
                            <Star className={`h-4 w-4 ${thumbnailIndex === idx ? "fill-white" : ""}`} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="p-1.5 bg-white/20 hover:bg-red-500 text-white rounded-full backdrop-blur-sm transition-colors"
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form.Field
              name="content"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Write your blog"
                      className="min-h-[150px]"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="tags"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Tags (comma separated)
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="nextjs, web"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button form="blog-post" type="submit" className="w-full cursor-pointer">
          Publish Post
        </Button>
      </CardFooter>
    </Card>
  );
}
