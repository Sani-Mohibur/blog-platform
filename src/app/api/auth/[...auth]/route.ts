import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://prisma-blog-server-a55e.onrender.com";

async function proxyHandler(req: NextRequest) {
  const url = new URL(req.url);
  // Reconstruct the target path to hit your Render backend endpoint
  const targetUrl = `${BACKEND_URL}${url.pathname}${url.search}`;

  const headers = new Headers(req.headers);
  // Ensure the host header accurately reflects the target backend server
  headers.set("host", "prisma-blog-server-a55e.onrender.com");

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? await req.blob()
          : undefined,
      cache: "no-store",
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication proxy failed" },
      { status: 500 },
    );
  }
}

export { proxyHandler as GET, proxyHandler as POST };
