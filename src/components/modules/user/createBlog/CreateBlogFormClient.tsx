"use client";

import { createBlogPost } from "@/actions/blog.action";
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
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { toast } from "sonner";
import { z } from "zod";

const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be less than 5000 characters"),
  thumbnail: z.string().url("Please enter a valid image URL").or(z.literal("")),
  tags: z.string(),
});

export function CreateBlogFormClient() {
  const router = useRouter(); // 2. Initialize router

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      tags: "",
    },
    validators: {
      onSubmit: blogSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating....");

      const blogData = {
        title: value.title,
        content: value.content,
        thumbnail: value.thumbnail || null,
        tags: value.tags
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
      };

      try {
        const res = await createBlogPost(blogData);

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success("Post Created", { id: toastId });

        // 3. Clear form values and send user to history page layout
        form.reset();
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

            <form.Field
              name="thumbnail"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Thumbnail Image URL
                    </FieldLabel>
                    <Input
                      type="url"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

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
        <Button form="blog-post" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
