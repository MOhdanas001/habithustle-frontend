import { cookies } from "next/headers";

export async function GET() {
const apiUrl = process.env.NEXT_API_URL;
const token= (await cookies()).get("auth_token");
    try {
        const backendRes = await fetch(`${apiUrl}/bet/getUsersBet`, {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token.value}` } : {},
            cache: "no-store",
        });
        console.log("Backend response status:");
        if (!backendRes.ok) {
            return new Response(JSON.stringify({ success: false, message: "Failed to fetch bets" }), { status: backendRes.status });
        }
        const backendJson = await backendRes.json();
        console.log("Bets fetched:", backendJson);
        return new Response(JSON.stringify({ success: true, bets: backendJson.data || [] }), { status: 200 });
    } catch (err) {
        console.error("Get bets error:", err);
        return new Response(JSON.stringify({ success: false, message: "Internal server error" }), { status: 500 });
    }
}

