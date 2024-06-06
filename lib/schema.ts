import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Forneça seu email.")
    .email("Forneça um email válido."),
  password: z
    .string()
    .min(1, "Forneça sua senha.")
    .min(7, "A senha deve ter no mínimo 7 caracteres."),
});
