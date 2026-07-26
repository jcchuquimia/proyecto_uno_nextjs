"use client";

import { useState, useMemo, useEffect } from "react";
import Boton from "../ui/components/Boton";
import ProductCard from "../ui/components/ProductCard";
import BarraBusqueda from "../ui/components/BarraBusqueda";
import { productos } from "../data/productos";
import Image, { StaticImageData } from "next/image";

export default function Home() {
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Evita filtrar el array en cada render innecesario usando useMemo
  const productosFiltrados = useMemo(() => {
    return productos.filter((product) =>
      product.titulo.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
  }, [textoBusqueda]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>

      <BarraBusqueda
        valor={textoBusqueda}
        alCambiar={setTextoBusqueda}
        marcador="Buscar producto..."
      />

      <div className="mt-8">
        {/* Corregido: "justify=center" no es válido en Tailwind. Usamos flex, justify-center e items-center */}
        <Boton
          onClick={() => alert("¡Botón clickeado!")}
          className="bg-blue-500 hover:bg-blue-700 text-black px-4 py-2 rounded-md flex justify-center items-center gap-4 "
        >
          Haz clic aquí
        </Boton>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {productosFiltrados.map((product) => (
          <ProductCard
            key={product.id}
            titulo={product.titulo}
            descripcion={product.descripcion}
            precio={product.precio}
            imagen={product.imagen}
          />
        ))}
      </div>
    </div>
  );
}
