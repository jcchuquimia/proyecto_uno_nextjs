import { object, string, pipe, minLength, number, minValue, safeParse } from "valibot";
import { ProductoFormValues } from "@/types/producto";

export const productSchema = object({
  titulo: pipe(
    string(),
    minLength(3, "El título debe tener al menos 3 caracteres")
  ),
  descripcion: pipe(
    string(),
    minLength(10, "La descripción debe tener al menos 10 caracteres")
  ),
  precio: pipe(
    number(),
    minValue(0, "El precio debe ser un número mayor o igual a 0")
  ),
  categoria: pipe(
    string(),
    minLength(2, "La categoría debe tener al menos 2 caracteres")
  ),
  imagen: pipe(
    string(),
    minLength(5, "La ruta de la imagen debe ser válida")
  ),
});

export function validateProducto(producto: ProductoFormValues) {
  return safeParse(productSchema, producto);
}
