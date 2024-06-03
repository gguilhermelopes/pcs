"use client";

import Link from "next/link";
import { Button } from "../UI/Button";
import { DefaultInput } from "../UI/DefaultInput";

const LoginForm = () => {
  return (
    <form className="mt-8 flex flex-col gap-3 items-center justify-center">
      <DefaultInput.Root>
        <DefaultInput.Label
          label="Usuário"
          id="username-label"
          htmlFor="username"
        />
        <DefaultInput.Content id="username" placeholder="Usuário" />
      </DefaultInput.Root>
      <DefaultInput.Root>
        <DefaultInput.Label
          label="Senha"
          id="password-label"
          htmlFor="password"
        />
        <DefaultInput.Content
          id="password"
          type="password"
          placeholder="Senha"
        />
      </DefaultInput.Root>
      <Link
        href="/"
        className="block self-end text-xs text-neutral-500 font-semibold underline"
      >
        Esqueceu a senha?
      </Link>
      <Button.Root type="submit">Entrar</Button.Root>
      <span className="block text-xs text-neutral-500 font-semibold mt-4">
        Não consegue entrar?{" "}
        <Link className="text-primary" href="/login">
          Entre em contato
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
