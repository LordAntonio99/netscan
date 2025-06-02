import { z } from "zod";

const assetSchema = z.object({
  assetName: z
    .string()
    .min(1, { message: "El nombre del asset es obligatorio" })
    .max(100),
  manufacturer: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  assetType: z.string().min(1, { message: "El tipo de asset es obligatorio" }),
  // Luego puedes usar z.enum([...]) si defines tipos fijos
  serialNumber: z.string().max(100).optional(),
  state: z.string().min(1, { message: "El estado es obligatorio" }),
  // Igual que con assetType, puedes usar z.enum([...])
  warrantyEndDate: z.coerce
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: "Fecha de garantía inválida",
    })
    .optional(),
  ipAddress: z
    .string()
    .refine((ip) => /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.|$)){4}$/.test(ip), {
      message: "Dirección IP inválida",
    })
    .optional(),
  systemSKU: z.string().optional(),
  macAddress: z
    .string()
    .refine((mac) => /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac), {
      message: "Dirección MAC inválida",
    })
    .optional(),
  description: z.string().optional(),
  domain: z
    .string()
    .regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Dominio inválido",
    })
    .optional(),
  dnsName: z
    .string()
    .max(100, {
      message: "El nombre DNS no puede ser superior a 100 caracteres",
    })
    .optional(),
  fqdn: z
    .string()
    .max(100, { message: "El FQDN no puede contener mas de 100 caracteres" })
    .optional(),
});

export default assetSchema;
