import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiUrl = process.env.NEXT_API_URL || "http://localhost:8081/api";

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || !query.trim()) {
      return NextResponse.json(
        { success: true, data: [] },
        { status: 200 }
      );
    }

    // forward cookie for auth/session
    const cookie = request.headers.get("cookie");
    const token = cookie?.split("auth_token=")?.[1];

    const backendRes = await fetch(`${apiUrl}/search/users?val=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: cookie ? { cookie } : {},
        cache: "no-store",
        credentials: "include", 
    });

    const raw = await backendRes.text();
    console.log("Search users backend response:", raw);
    let backendJson: any = null;
    try {
      backendJson = raw ? JSON.parse(raw) : null;
    } catch {
      backendJson = null;
    }

    if (!backendRes.ok) {
      const message = backendJson?.message || raw || "Backend error";
      return NextResponse.json(
        {
          success: false,
          message,
        },
        { status: backendRes.status }
      );
    }

    const data = backendJson?.data ?? backendJson ?? [];

    return NextResponse.json(
      {
        success: true,
        data: Array.isArray(data) ? data : [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Search users API error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
