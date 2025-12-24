import { NextResponse } from "next/server";
import { backendfetch } from "../../_utils/backendfetch";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Forward to backend API; adjust endpoint to match your backend
    // e.g., POST /api/bets
    const result = await backendfetch("/bet/create", {
      method: "POST",
      body,
    });

    return NextResponse.json(result);
  } catch (e: any) {
    const message = e?.message || "Failed to create bet";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
