import { NextRequest, NextResponse } from "next/server";

// Ensure this matches your EXACT backend URL base path up to /api/auth
const BACKEND_URL = "https://prisma-blog-server-a55e.onrender.com";

async function proxyHandler(req: NextRequest) {
  const url = new URL(req.url);

  // Maps https://blog-post-khaki.vercel.app/api/auth/... to https://prisma-blog-server-a55e.onrender.com/api/auth/...
  const targetUrl = `${BACKEND_URL}${url.pathname}${url.search}`;

  const headers = new Headers(req.headers);
  headers.set("host", "prisma-blog-server-a55e.onrender.com");

  // FIX: Force the backend to send raw text/json instead of gzip/brotli streams
  headers.delete("accept-encoding");

  try {
    let body: any = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = await req.blob();
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: body,
      cache: "no-store",
    });

    // Extract headers safely
    const responseHeaders = new Headers(response.headers);

    return new NextResponse(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy failure:", error);
    return NextResponse.json(
      { error: "Authentication proxy failed" },
      { status: 500 },
    );
  }
}

export { proxyHandler as GET, proxyHandler as POST };
