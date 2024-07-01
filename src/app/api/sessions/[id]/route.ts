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

  if (!token) {
    return new NextResponse("Não autenticado.", { status: 401 });
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

export async function PUT(req: NextRequest, context: { params: Params }) {
  const { id } = context.params;
  const body = await req.json();
  const token = cookies().get("token");

  if (!id) {
    return NextResponse.json(
      { error: "Sessão não encontrada." },
      { status: 404 }
    );
  }

  if (!token) {
    return new NextResponse("Não autorizado.", { status: 401 });
  }

  const response = await fetch(`${process.env.API_URL}/sessions/${id}`, {
    method: "PUT",
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
