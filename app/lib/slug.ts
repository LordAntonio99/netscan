export function generateSlug(name: string): string {
  return name
    .toLowerCase() // convertir a minúsculas
    .normalize("NFD") // descomponer acentos
    .replace(/[\u0300-\u036f]/g, "") // eliminar marcas diacríticas
    .replace(/[^a-z0-9\s-]/g, "") // eliminar caracteres no alfanuméricos excepto espacios y guiones
    .trim() // quitar espacios al inicio y al final
    .replace(/\s+/g, "-") // reemplazar espacios por guiones
    .replace(/-+/g, "-"); // colapsar múltiples guiones en uno solo
}
