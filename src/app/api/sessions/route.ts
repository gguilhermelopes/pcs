import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = cookies().get("token");

  if (!token) {
    return new NextResponse("Não autorizado.", { status: 401 });
  }

  console.log(body);

  const response = await fetch(`${process.env.API_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify(body),
  });

  return new NextResponse(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
