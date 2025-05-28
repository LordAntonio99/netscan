import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "El nombre completo es obligatorio")
      .max(100, "El nombre completo no debe exceder los 100 caracteres"),

    email: z.string().email("Correo electrónico no válido"),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        passwordRegex,
        "La contraseña debe incluir mayúsculas, minúsculas, números y un carácter especial"
      ),

    confirmPassword: z.string().min(1, "Debes confirmar la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export default registerSchema;
