import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: {
    name?: string | null;
    image?: string | null;
  };
  className?: string;
  fallbackClassName?: string;
}

export function UserAvatar({ user, className, fallbackClassName }: UserAvatarProps) {
  const name = user?.name || "User";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <Avatar className={cn("h-9 w-9 border border-zinc-200 dark:border-zinc-800 shadow-sm", className)}>
      <AvatarImage
        src={(user?.image && user.image !== "null" && user.image !== "undefined") ? user.image : undefined}
        alt={name}
        className="object-cover"
      />
      <AvatarFallback
        className={cn(
          "bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 font-semibold",
          fallbackClassName
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
