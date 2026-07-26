"use client";

import { useEffect, useMemo, useState } from "react";
import { Producto, ProductoFormValues } from "@/types/producto";
import { fetchProductosApi, getFallbackProductos, getPersistedProductos, persistProductos } from "../services/productService";
import { validateProducto } from "../Validaciones/product.schema";

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarProductos = async () => {
      setCargando(true);
      setError(null);

      try {
        const productosGuardados = getPersistedProductos();
        if (productosGuardados?.length) {
          setProductos(productosGuardados);
        } else {
          const productosApi = await fetchProductosApi();
          if (activo) {
            setProductos(productosApi);
          }
        }
      } catch (error) {
        console.error(error);
        if (activo) {
          setError("No se pudieron cargar los productos desde la API. Se muestran productos locales.");
          setProductos(getFallbackProductos());
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    if (!cargando) {
      persistProductos(productos);
    }
  }, [cargando, productos]);

  const categorias = useMemo(
    () => ["Todos", ...Array.from(new Set(productos.map((producto) => producto.category)))],
    [productos]
  );

  const productosFiltrados = useMemo(() => {
    const termino = search.trim().toLowerCase();

    return productos.filter((producto) => {
      const cumpleCategoria = categoriaSeleccionada === "Todos" || producto.category === categoriaSeleccionada;
      const cumpleBusqueda =
        termino === "" ||
        producto.titulo.toLowerCase().includes(termino) ||
        producto.descripcion.toLowerCase().includes(termino) ||
        producto.category.toLowerCase().includes(termino);

      return cumpleCategoria && cumpleBusqueda;
    });
  }, [productos, categoriaSeleccionada, search]);

  const agregarProducto = (producto: ProductoFormValues) => {
    const resultado = validateProducto(producto);
    if (!resultado.success) {
      throw new Error(resultado.issues.map((issue) => issue.message).join(". "));
    }

    const nuevoProducto: Producto = {
      id: Date.now(),
      titulo: producto.titulo,
      descripcion: producto.descripcion,
      precio: Number(producto.precio),
      imagen: producto.imagen,
      rate: { rate: 0, count: 0 },
      category: producto.categoria,
    };

    setProductos((prev) => [nuevoProducto, ...prev]);
  };

  const editarProducto = (productoId: number, producto: ProductoFormValues) => {
    const resultado = validateProducto(producto);
    if (!resultado.success) {
      throw new Error(resultado.issues.map((issue) => issue.message).join(". "));
    }

    setProductos((prev) =>
      prev.map((item) =>
        item.id === productoId
          ? {
              ...item,
              titulo: producto.titulo,
              descripcion: producto.descripcion,
              precio: Number(producto.precio),
              imagen: producto.imagen,
              category: producto.categoria,
            }
          : item
      )
    );
  };

  return {
    productos,
    productosFiltrados,
    categorias,
    cargando,
    error,
    categoriaSeleccionada,
    search,
    setCategoriaSeleccionada,
    setSearch,
    agregarProducto,
    editarProducto,
  };
}
