import { FakeStoreProduct, Producto } from "@/types/producto";
import { productos as productosLocales } from "@/data/productos";

const STORAGE_KEY = "productos-persistidos";

export const mapearProductoApi = (producto: FakeStoreProduct): Producto => ({
  id: producto.id,
  titulo: producto.title,
  descripcion: producto.description,
  precio: producto.price,
  imagen: producto.image,
  rate: {
    rate: producto.rating?.rate ?? 0,
    count: producto.rating?.count ?? 0,
  },
  category: producto.category,
});

export async function fetchProductosApi(): Promise<Producto[]> {
  const respuesta = await fetch("https://fakestoreapi.com/products");

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los productos desde la API");
  }

  const data = (await respuesta.json()) as FakeStoreProduct[];
  return data.map(mapearProductoApi);
}

export function getPersistedProductos(): Producto[] | null {
  if (typeof window === "undefined") return null;
  const guardado = window.localStorage.getItem(STORAGE_KEY);
  return guardado ? (JSON.parse(guardado) as Producto[]) : null;
}

export function persistProductos(productos: Producto[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
  } catch (error) {
    console.error("No se pudo guardar los productos en localStorage", error);
  }
}

export function getFallbackProductos(): Producto[] {
  return productosLocales;
}
