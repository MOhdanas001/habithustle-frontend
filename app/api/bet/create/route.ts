import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
  const apiUrl = process.env.NEXT_API_URL;
      const body = await req.json();
      console.log("Create Bet API request body:", body);
      if (!body) {
        return NextResponse.json(
          { success: false, message: "Request body is required" },
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
    const result = await fetch(`${apiUrl}/bet/create`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization:  `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const data = await result.json();

  console.log("Create Bet API response:", {
        status: result.status,
        ok: result.ok,
        data,
      });
    return NextResponse.json(data, { status: result.status });
  } catch (e: any) {
    const message = e?.message || "Failed to create bet";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
