import { MessageCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type CommentCardProps = {
  name: string;
  comment: string;
  createdAt: string;
  avatarUrl?: string;
  onReply?: () => void;
  isReply?: boolean;
};

export default function CommentCard({
  name,
  comment,
  createdAt,
  avatarUrl,
  onReply,
  isReply = false,
}: CommentCardProps) {
  const fallbackName = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`group relative flex gap-4 rounded-2xl p-4 transition-all duration-200 
        ${
          isReply
            ? "bg-zinc-50/60 dark:bg-zinc-900/30 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            : "border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-md"
        }`}
    >
      <Avatar className="h-9 w-9 border border-zinc-200/50 dark:border-zinc-800 shadow-sm">
        <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
          {fallbackName}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {name}
            </span>
            {isReply && (
              <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                Reply
              </span>
            )}
          </div>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            {createdAt}
          </span>
        </div>

        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
          {comment}
        </p>

        {onReply && (
          <div className="pt-0.5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-1 text-xs font-medium text-zinc-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              onClick={onReply}
            >
              <MessageCircle className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:scale-105" />
              Reply
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
