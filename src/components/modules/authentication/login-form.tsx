"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum length is 8 characters"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Capture the previous URL from the search params, fallback to dashboard
  const callbackUrl = searchParams.get("callbackUrl") || "/#";

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl, // Dynamically routes Google users too
      });
    } catch (err) {
      toast.error("Google authentication failed");
    }
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Verifying credentials...");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Logged in Successfully", { id: toastId });

        console.log("Redirecting to:", callbackUrl);

        // Execute the smart dynamic redirect here
        window.location.href = callbackUrl;
        router.refresh();
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card
      className="border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-xl transition-all duration-300 max-w-md w-full mx-auto"
      {...props}
    >
      <CardHeader className="space-y-1.5 pb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Welcome back
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400 text-sm">
          Enter your terminal access keys below to authenticate your session
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            {/* EMAIL FIELD */}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !!field.state.meta.errors.length;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      placeholder="name@example.com"
                      value={field.state.value}
                      className="bg-zinc-50/50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-purple-500/20"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError
                        className="text-xs text-rose-500 mt-1"
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            />

            {/* PASSWORD FIELD */}
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !!field.state.meta.errors.length;
                return (
                  <Field data-invalid={isInvalid} className="space-y-1.5">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
                    >
                      Password
                    </FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      placeholder="••••••••"
                      value={field.state.value}
                      className="bg-zinc-50/50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-purple-500/20"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError
                        className="text-xs text-rose-500 mt-1"
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-4">
        <Button
          form="login-form"
          type="submit"
          className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-medium py-2.5 rounded-xl transition-colors shadow-sm"
        >
          Execute Login
        </Button>

        <div className="relative w-full flex items-center justify-center my-1 text-xs uppercase">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <span className="relative bg-white dark:bg-zinc-900 px-3 text-zinc-400 font-medium">
            Or log in with
          </span>
        </div>

        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/60 font-medium py-2.5 rounded-xl transition-all"
        >
          <svg className="h-4 w-4 mr-2 inline" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google Identity
        </Button>
      </CardFooter>
    </Card>
  );
}
