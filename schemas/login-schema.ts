import { passwordRegex } from "@/lib/regex";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      passwordRegex,
      "La contraseña debe incluir mayúsculas, minúsculas, números y un carácter especial"
    ),
  rememberMe: z.boolean(),
});

export default loginSchema;
