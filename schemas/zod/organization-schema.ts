import { z } from "zod";

const organizationSchema = z.object({
  name: z.string().min(1, "El nombre de la organización es obligatorio"),
  slug: z.string().min(1, "Es necesario un slug válido para la organización"),
  logo: z.string().url("Formato de url incorrecto"),
  disclaimerTitle: z
    .string()
    .max(100, "El mensaje no puede exceder de los 1000 caracteres")
    .optional(),
  disclaimerMessage: z
    .string()
    .max(1000, "El mensaje no puede exceder de los 1000 caracteres")
    .optional(),
});

export default organizationSchema;
