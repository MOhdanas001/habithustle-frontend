import { cookies } from "next/headers";

export async function GET(req: Request) {
  const apiUrl = process.env.NEXT_API_URL;
  const token = (await cookies()).get("auth_token")?.value;

  const { searchParams } = new URL(req.url);
  const betId = searchParams.get("betId");

  if (!betId) {
    return new Response(
      JSON.stringify({ message: "betId is required" }),
      { status: 400 }
    );
  }

  const response = await fetch(
    `${apiUrl}/bet/viewBet?betId=${betId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  console.log('API Response Status:', response);
  return response;
}
