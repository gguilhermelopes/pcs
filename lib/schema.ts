import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Forneça seu email.")
    .email("Forneça um email válido."),
  password: z.string().min(1, "Forneça sua senha."),
});

export const SessionFormSchema = z.object({
  patientId: z
    .string({ message: "Paciente é obrigatório." })
    .min(1, "Paciente é obrigatório."),
  therapistId: z.string().uuid("Id do terapeuta inválido.").optional(),
  sessionDate: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? "Data inválida." : defaultError,
    }),
  }),
  sessionDuration: z.coerce
    .number({ message: "Duração da sessão é obrigatória." })
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
    .number({ message: "Valor da sessão é obrigatório." })
    .min(40, "Valor mínimo de uma sessão é R$ 40,00."),
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
