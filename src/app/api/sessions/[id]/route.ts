import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(req: NextRequest, context: { params: Params }) {
  const { id } = context.params;
  const token = cookies().get("token");

  if (!id) {
    return NextResponse.json(
      { error: "Sessão não encontrada." },
      { status: 404 }
    );
  }

  try {
    const response = await fetch(`${process.env.API_URL}/sessions/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    const session = await response.json();
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao carregar sessão." },
      { status: 500 }
    );
  }
}
