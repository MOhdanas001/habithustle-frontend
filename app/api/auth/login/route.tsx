import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const apiUrl = process.env.NEXT_API_URL || "http://localhost:8081/api";
        const bodyText = await request.text();

        const backendRes = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: bodyText,
        });

        const text = await backendRes.text();
        // Proxy status and headers (including Set-Cookie) back to the client
        return new Response(text, {
            status: backendRes.status,
            headers: backendRes.headers,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
}