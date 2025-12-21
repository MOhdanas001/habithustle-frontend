export async function GET(request: Request) {
  try {
    const apiUrl = process.env.NEXT_API_URL || "http://localhost:8081/api";

    // forward incoming cookie so backend can validate session
    const cookie = request.headers.get("cookie") || undefined;
    const backendRes = await fetch(`${apiUrl}/auth/me`, {
      method: "GET",
      headers: cookie ? { cookie } : undefined,
      cache: "no-store",
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