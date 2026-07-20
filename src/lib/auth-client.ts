import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`, // Points to Render
  fetchOptions: {
    credentials: "include", // 🔑 CRITICAL: Forces the browser to send cookies cross-domain
  },
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          required: false,
          defaultValue: "USER",
        },
        phone: {
          type: "string",
          required: false,
        },
        status: {
          type: "string",
          required: false,
          defaultValue: "ACTIVE",
        },
        bio: {
          type: "string",
          required: false,
        },
        dateOfBirth: {
          type: "date",
          required: false,
        },
        gender: {
          type: "string",
          required: false,
        },
      }
    }),
  ],
});
