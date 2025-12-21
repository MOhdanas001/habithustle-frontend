import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiUrl = process.env.NEXT_API_URL || "http://localhost:8081/api";

    // Forward cookies from the incoming request so backend can clear session
    const cookie = request.headers.get("cookie") || undefined;

    const backendRes = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      headers: cookie ? { cookie } : undefined,
    });

    const text = await backendRes.text();
    return new Response(text, {
      status: backendRes.status,
      headers: backendRes.headers,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
}
