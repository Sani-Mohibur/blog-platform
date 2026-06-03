import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://blog-post-khaki.vercel.app",
});
