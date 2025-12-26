import { cookies } from "next/headers";

export async function GET() {
const apiUrl = process.env.NEXT_API_URL;
const token= (await cookies()).get("auth_token");
    try {
        const backendRes = await fetch(`${apiUrl}/friends/get-list`, {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token.value}` } : {},
            cache: "no-store",
        }); 
        if (!backendRes.ok) {
            return new Response(JSON.stringify({ success: false, message: "Failed to fetch friends" }), { status: backendRes.status });
        }
        const backendJson = await backendRes.json();
        console.log("Friends fetched:", backendJson);
        return new Response(JSON.stringify({ success: true, friends: backendJson.data || [] }), { status: 200 });
    } catch (err) {
        console.error("Get friends error:", err);
        return new Response(JSON.stringify({ success: false, message: "Internal server error" }), { status: 500 });
    }
}