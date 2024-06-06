import { cookies } from "next/headers";

export async function getUser() {
  const token = cookies().get("token");

  if (!token) {
    return { status: "invalid", message: "Token não encontrado." };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/token/validate`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      return { status: "invalid", message: "Erro de autenticação.", data };
    }

    if (data.status === "valid") {
      return {
        status: "valid",
        username: data.claims.username,
        authority: data.claims.authority,
        data,
      };
    }
  } catch (error) {
    return { status: "invalid", message: "Erro de autenticação.", error };
  }
}
