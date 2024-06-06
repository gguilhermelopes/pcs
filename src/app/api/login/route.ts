import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { username, password } = await req.json();

  const formBody = new URLSearchParams();
  formBody.append("username", username);
  formBody.append("password", password);
  formBody.append("grant_type", "password");

  const clientId = process.env.LOGIN_CLIENT_ID;
  const clientSecret = process.env.LOGIN_CLIENT_SECRET;
  const encodedCredentials = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const tokenEndpoint = `${process.env.API_URL}/oauth2/token`;

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      body: formBody.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      cookies().delete("token");
      return NextResponse.json(
        { error: data.error || "Erro de autenticação" },
        { status: 400 }
      );
    }

    if (data.access_token) {
      cookies().set("token", data.access_token);
    }

    return NextResponse.json(
      { message: "Login bem sucedido!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
