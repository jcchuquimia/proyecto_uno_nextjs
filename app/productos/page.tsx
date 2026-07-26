"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../ui/components/ProductCard";
import AgregarProducto, { ProductoFormValues } from "../../ui/components/AgregarProducto";
import EditarProducto from "../../ui/components/EditarProducto";
import { productos as productosBase, Producto, FakeStoreProduct } from "../../data/productos";

const mapearProductoApi = (producto: FakeStoreProduct): Producto => ({
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

const STORAGE_KEY = "productos-persistidos";

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [datosCargados, setDatosCargados] = useState(false);

  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        const productosGuardados = JSON.parse(guardado) as Producto[];
        setProductos(productosGuardados);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDatosCargados(true);
    }
  }, []);

  useEffect(() => {
    if (!datosCargados) return;

    let activo = true;

    const cargarProductos = async () => {
      try {
        setCargando(true);
        setError(null);

        const guardado = window.localStorage.getItem(STORAGE_KEY);
        if (guardado) {
          const productosGuardados = JSON.parse(guardado) as Producto[];
          if (activo) {
            setProductos(productosGuardados);
            setCargando(false);
            return;
          }
        }

        const respuesta = await fetch("https://fakestoreapi.com/products");

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los productos");
        }

        const data: FakeStoreProduct[] = await respuesta.json();

        if (!activo) return;

        const productosApi = data.map(mapearProductoApi);
        setProductos(productosApi);
      } catch (error) {
        if (!activo) return;

        console.error(error);
        setError("No se pudieron cargar los productos desde la API. Se muestran los productos locales.");
        setProductos(productosBase);
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
  }, [datosCargados]);

  useEffect(() => {
    if (!datosCargados) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
    } catch (error) {
      console.error(error);
    }
  }, [productos, datosCargados]);

  const categorias = ["Todos", ...Array.from(new Set(productos.map((producto) => producto.category)))];

  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter((producto) => producto.category === categoriaSeleccionada);

  const handleAgregarProducto = (producto: ProductoFormValues) => {
    const nuevoProducto: Producto = {
      id: Date.now(),
      titulo: producto.titulo,
      descripcion: producto.descripcion,
      precio: Number(producto.precio),
      imagen: producto.imagen,
      rate: { rate: 0, count: 0 },
      category: producto.categoria || "Sin categoría",
    };

    setProductos((prev) => [nuevoProducto, ...prev]);
  };

  const handleEditarProducto = (producto: ProductoFormValues) => {
    if (!productoSeleccionado) return;

    setProductos((prev) =>
      prev.map((item) =>
        item.id === productoSeleccionado.id
          ? {
              ...item,
              titulo: producto.titulo,
              descripcion: producto.descripcion,
              precio: Number(producto.precio),
              category: producto.categoria || "Sin categoría",
              imagen: producto.imagen,
            }
          : item
      )
    );
    setProductoSeleccionado(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="mt-2 text-gray-600">Gestiona tus productos y explora la lista por categoría.</p>
        </div>
        <button
          onClick={() => setMostrarAgregar(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          + Agregar producto
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categorias.map((categoria) => (
          <button
            key={categoria}
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
        producto={productoSeleccionado ? {
          id: productoSeleccionado.id,
          titulo: productoSeleccionado.titulo,
          descripcion: productoSeleccionado.descripcion,
          precio: productoSeleccionado.precio,
          categoria: productoSeleccionado.category,
          imagen: productoSeleccionado.imagen as string,
        } : undefined}
        onClose={() => {
          setMostrarEditar(false);
          setProductoSeleccionado(null);
        }}
        onGuardar={handleEditarProducto}
      />
    </div>
  );
}