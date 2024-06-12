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

export const AddSessionFormSchema = z.object({
  patientId: z
    .string()
    .uuid("Id do paciente inválido.")
    .min(1, "Paciente obrigatório."),
  therapistId: z.string().uuid("Id do terapeuta inválido.").optional(),
  sessionDate: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date" ? "Data inválida." : defaultError,
      }),
    })
    .min(new Date(), "A data tem que ser posterior à atual."),
  sessionDuration: z.coerce
    .number()
    .min(15, "Duração mínima de uma sessão é 15 minutos."),
  isRemote: z.boolean().default(false),
  isAuthorized: z.boolean().default(false),
  token: z.string().optional(),
  authorizationDate: z
    .string()
    .transform((value) => (value === "" ? null : new Date(value)))
    .nullable()
    .refine((date) => date === null || !isNaN(date.getTime()), "Data inválida.")
    .optional(),
  hasPatientAttended: z.boolean().default(false),
  sessionValue: z.coerce
    .number()
    .min(40, "Valor mínimo de uma sessão é R$ 40,00"),
  isPaid: z.boolean().default(false),
  paymentDate: z
    .string()
    .transform((value) => (value === "" ? null : new Date(value)))
    .nullable()
    .refine((date) => date === null || !isNaN(date.getTime()), "Data inválida.")
    .optional(),
  isAccounted: z.boolean().default(false),
  accountDate: z
    .string()
    .transform((value) => (value === "" ? null : new Date(value)))
    .nullable()
    .refine((date) => date === null || !isNaN(date.getTime()), "Data inválida.")
    .optional(),
});
