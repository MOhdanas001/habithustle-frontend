import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiUrl = process.env.NEXT_API_URL;

    const toUserId = await request.json().then((body) => body.toUserId);

    if (!toUserId) {
      return NextResponse.json(
        { success: false, message: "toUserId is required" },
        { status: 400 }
      );
    }
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const backendRes = await fetch(
      `${apiUrl}/friends/send?toUserId=${encodeURIComponent(toUserId)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const backendJson = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          success: false,
          message: backendJson?.message || "Request failed",
        },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: backendJson.message || "Friend request sent",
    });
  } catch (err) {
    console.error("Send request error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
