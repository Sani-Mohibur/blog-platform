import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`, // Points to Render
  fetchOptions: {
    credentials: "include", // 🔑 CRITICAL: Forces the browser to send cookies cross-domain
  },
});
