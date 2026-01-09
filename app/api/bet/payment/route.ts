import { cookies } from "next/headers";

export async function POST( req: Request) {
    const apiUrl = process.env.NEXT_API_URL;
    const token = (await cookies()).get("auth_token")?.value;
    const body = await req.json();
   const response = await fetch(`${apiUrl}/bet/markUserPaid`, {
      method: 'POST', 
     headers: {
        Authorization:  `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      cache: 'no-store',
        body: JSON.stringify(body),
    });
      return response;

}