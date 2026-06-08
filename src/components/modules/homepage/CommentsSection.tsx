"use client";

import { useState } from "react";
import { Send, X, MessageSquare } from "lucide-react";

import { createComment } from "@/actions/comment.action";
import CommentCard from "@/components/modules/homepage/CommentCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type Comment = {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  postId: string;
  parentId: string | null;
  status: "APPROVED" | "REJECT";
  createdAt: string;
  updatedAt: string;
  replies: Comment[];
};

type CommentsSectionProps = {
  postId: string;
  comments: Comment[];
};

export default function CommentsSection({
  postId,
  comments,
}: CommentsSectionProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles standalone master comments
  const handleMasterSubmit = async () => {
    if (!commentText.trim()) return;

    if (!session?.user) {
      toast.error("Authentication required", {
        description: "Please log in to share your thoughts on this article.",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    setIsSubmitting(true);
    const result = await createComment({
      postId,
      content: commentText,
      parentId: undefined,
    });

    if (!result.error) {
      setCommentText("");
    }
    setIsSubmitting(false);
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim() || !replyTo) return;

    if (!session?.user) {
      toast.error("Authentication required", {
        description: "Please log in to reply to this conversation.",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    setIsSubmitting(true);
    const result = await createComment({
      postId,
      content: replyText,
      parentId: replyTo.id,
    });

    if (!result.error) {
      setReplyText("");
      setReplyTo(null);
    }
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section
      id="comments"
      className="scroll-mt-24 max-w-4xl mx-auto rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-950/60 shadow-sm"
    >
      {/* HEADER */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-100 dark:border-zinc-800/50 px-6 py-5 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Discussion
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            Share thoughts and engage with the community
          </p>
        </div>

        {/* Premium badge */}
        {/* <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/40 dark:border-zinc-700/40 shadow-sm">
          <MessageSquare className="h-3.5 w-3.5 text-zinc-500" />
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {comments.length} comments
          </span>
        </div> */}
      </div>

      <div className="p-6 space-y-8">
        {/* MAIN COMMENT BOX (unchanged logic) */}
        <div className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-4 shadow-sm">
          <Textarea
            placeholder="What are your thoughts on this article?"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            className="min-h-24 resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0 text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400"
          />

          <div className="mt-3 flex justify-end border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
            <Button
              type="button"
              onClick={handleMasterSubmit}
              disabled={isSubmitting || !commentText.trim()}
              className="h-9 px-4 text-xs font-semibold rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950"
            >
              <Send className="mr-1.5 h-3 w-3" />
              {isSubmitting ? "Posting..." : "Publish Comment"}
            </Button>
          </div>
        </div>

        {/* THREAD LIST */}
        <div className="space-y-10">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="relative">
                {/* Timeline line */}
                <div className="absolute left-3 top-10 bottom-0 w-px bg-gradient-to-b from-zinc-200/80 to-transparent dark:from-zinc-800/80" />

                {/* Parent comment */}
                <div className="relative pl-10 space-y-4">
                  <CommentCard
                    name={comment.authorName || "Anonymous User"}
                    comment={comment.content}
                    createdAt={formatDate(comment.createdAt)}
                    onReply={() => {
                      setReplyTo(comment);
                      setReplyText("");
                    }}
                  />

                  {/* Reply box (kept unchanged logic) */}
                  {replyTo?.id === comment.id && (
                    <div className="ml-2 rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/30 dark:bg-indigo-950/20 p-3 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          Replying to {comment.authorName}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setReplyTo(null)}
                          className="h-5 w-5"
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="min-h-16 border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
                      />

                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setReplyTo(null)}
                          className="h-8 text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleReplySubmit}
                          disabled={isSubmitting || !replyText.trim()}
                          className="h-8 text-xs bg-indigo-600 text-white"
                        >
                          {isSubmitting ? "Posting..." : "Reply"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Nested replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-5 space-y-4 pl-2 border-l border-zinc-100 dark:border-zinc-800/70">
                      {comment.replies.map((reply) => (
                        <CommentCard
                          key={reply.id}
                          name={reply.authorName || "Anonymous User"}
                          comment={reply.content}
                          createdAt={formatDate(reply.createdAt)}
                          isReply={true}
                          onReply={() => {
                            setReplyTo(comment);
                            setReplyText("");
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-14 text-center text-sm text-zinc-500">
              No comments yet. Be the first to start the discussion.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
