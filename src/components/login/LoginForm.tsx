"use client";

import Link from "next/link";
import { useEffect } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import notify from "@/helpers/notify";
import { Button } from "../UI/Button";
import { DefaultInput } from "../UI/DefaultInput";
import { LoginFormSchema } from "../../../lib/schema";
import { useRedirected } from "@/hooks/useRedirected";
import useLogin from "@/hooks/useLogin";
import { Loader } from "../UI/Loader";

export type LoginFormData = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginFormSchema) });

  const { mutate, isPending } = useLogin();
  const { isRedirected } = useRedirected();

  useEffect(() => {
    if (isRedirected) {
      notify("Faça o login para continuar.", "warning");
    }
  }, [isRedirected]);

  const submitFormHandler: SubmitHandler<LoginFormData> = async (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitFormHandler)}
      className="mt-8 flex flex-col gap-3 items-center justify-center"
    >
      <DefaultInput.Root>
        <DefaultInput.Label id="username-label" htmlFor="username" />
        <DefaultInput.Content
          id="username"
          placeholder="Usuário"
          {...register("username")}
        />
        {errors.username?.message && (
          <DefaultInput.ErrorMessage message={errors.username.message} />
        )}
      </DefaultInput.Root>
      <DefaultInput.Root>
        <DefaultInput.Label id="password-label" htmlFor="password" />
        <DefaultInput.Content
          id="password"
          type="password"
          placeholder="Senha"
          {...register("password")}
        />
        {errors.password?.message && (
          <DefaultInput.ErrorMessage message={errors.password.message} />
        )}
      </DefaultInput.Root>
      <Link
        href="/"
        className="block self-end text-xs text-neutral-500 font-semibold underline hover:text-neutral-800 dark:hover:text-neutral-300"
      >
        Esqueceu a senha?
      </Link>
      <Button.Root
        className="flex flex-col justify-center items-center"
        type="submit"
      >
        {isPending ? <Loader.Root className="w-5 h-5" /> : "Entrar"}
      </Button.Root>
      <span className="block text-xs text-neutral-500 font-semibold mt-4">
        Não consegue entrar?{" "}
        <Link
          className="text-primary hover:text-primary200 dark:hover:text-primary100"
          href="/login"
        >
          Entre em contato
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
