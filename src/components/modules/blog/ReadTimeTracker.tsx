"use client";

import { useEffect, useState } from "react";

interface TrackerProps {
  postId: string;
  initialSeconds: number;
}

export default function ReadTimeTracker({
  postId,
  initialSeconds,
}: TrackerProps) {
  // Combine historical database seconds with current live session seconds
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  useEffect(() => {
    // 1. Live Ticking Counter (Updates UI every 1 second)
    const timer = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
      setSessionSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 2. Periodic Database Sync (Pushes data to backend every 10 seconds)
    if (sessionSeconds > 0 && sessionSeconds % 10 === 0) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://prisma-blog-server.onrender.com"}/posts/${postId}/read-time`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secondsSpent: 10 }),
        },
      ).catch((err) => console.error("Sync error:", err));
    }
  }, [sessionSeconds, postId]);

  // Format total cumulative time into readable "Xmin Ysec" string
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <span>
      {minutes > 0 ? `${minutes}min ` : ""}
      {seconds}sec read
    </span>
  );
}
