"use client";

import { useState } from "react";
import ProductCard from "@/ui/components/ProductCard";
import BarraBusqueda from "@/ui/components/BarraBusqueda";
import AgregarProducto from "@/ui/components/AgregarProducto";
import EditarProducto from "@/ui/components/EditarProducto";
import { Producto } from "@/types/producto";
import { useProductos } from "./hooks/useProductos";

export default function Productos() {
  const {
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
  } = useProductos();

  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const handleAgregarProducto = (producto: Parameters<typeof agregarProducto>[0]) => {
    try {
      agregarProducto(producto);
      setMostrarAgregar(false);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Error al guardar el producto");
    }
  };

  const handleEditarProducto = (producto: Parameters<typeof editarProducto>[1]) => {
    if (!productoSeleccionado) return;

    try {
      editarProducto(productoSeleccionado.id, producto);
      setMostrarEditar(false);
      setProductoSeleccionado(null);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Error al actualizar el producto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="mt-2 text-gray-600">Gestiona tus productos, busca y filtra por categoría.</p>
        </div>
        <button
          onClick={() => setMostrarAgregar(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          + Agregar producto
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <BarraBusqueda valor={search} alCambiar={setSearch} marcador="Buscar productos..." />
        <div className="flex flex-wrap gap-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                categoriaSeleccionada === categoria
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 shadow-sm hover:bg-gray-100"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">
          Mostrando <span className="font-semibold text-gray-900">{productosFiltrados.length}</span> productos en la categoría <span className="font-semibold text-gray-900">{categoriaSeleccionada}</span>.
        </p>
      </div>

      {cargando && (
        <div className="mb-6 rounded-2xl bg-blue-50 p-4 text-center text-sm font-medium text-blue-700">
          Cargando productos desde la API...
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl bg-amber-50 p-4 text-center text-sm font-medium text-amber-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-8">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="flex flex-col items-center gap-3">
            <ProductCard
              titulo={producto.titulo}
              descripcion={producto.descripcion}
              precio={producto.precio}
              imagen={producto.imagen}
            />
            <button
              type="button"
              onClick={() => {
                setProductoSeleccionado(producto);
                setMostrarEditar(true);
              }}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              Editar producto
            </button>
          </div>
        ))}
      </div>

      <AgregarProducto
        isOpen={mostrarAgregar}
        onClose={() => setMostrarAgregar(false)}
        onGuardar={handleAgregarProducto}
      />

      <EditarProducto
        isOpen={mostrarEditar}
        producto={
          productoSeleccionado
            ? {
                id: productoSeleccionado.id,
                titulo: productoSeleccionado.titulo,
                descripcion: productoSeleccionado.descripcion,
                precio: productoSeleccionado.precio,
                categoria: productoSeleccionado.category,
                imagen: typeof productoSeleccionado.imagen === "string" ? productoSeleccionado.imagen : "/imagen/img1.png",
              }
            : undefined
        }
        onClose={() => {
          setMostrarEditar(false);
          setProductoSeleccionado(null);
        }}
        onGuardar={handleEditarProducto}
      />
    </div>
  );
}