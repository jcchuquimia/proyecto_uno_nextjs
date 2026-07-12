"use client";
import Boton from "./components/Boton";
import Image from "next/image";
import ProductCard from "./components/ProductCard";
import { productos } from "./data/productos";
import { useState } from "react";
import BarraBusqueda from "./components/BarraBusqueda";

export default function Home() {
  const [showProducts, setShowProducts] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const productosFiltrados = productos.filter((product) =>
    product.titulo
      .toLowerCase()
      .includes(textoBusqueda.toLowerCase())
  );
  return (
    <div className="p-10">
      <h1>Bienvenidos a mi proyecto con con NextJs</h1>
      <BarraBusqueda
        valor={textoBusqueda}
        alCambiar={setTextoBusqueda}
        marcador="Buscar producto..."
      />
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {productosFiltrados.map((product) => (
          <ProductCard
            key={product.id}
            titulo={product.titulo}
            descripcion={product.descripcion}
            precio={product.precio}
            image={product.image}
          />
        ))}
      </div>
      <Boton onClick={() => alert("¡Botón clickeado")}>Haz clic aqui</Boton>

      <ProductCard
        titulo="Producto de ejemplo"
        descripcion="Esta es una descripción de ejemplo para el producto."
        precio={49.99}
        image="https://static.vecteezy.com/system/resources/previews/038/016/534/non_2x/jc-blue-logo-design-logo-design-for-business-free-vector.jpg"
      />
      {showProducts && (
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {productos.map((product) => (
            <ProductCard
              key={product.id}
              titulo={product.titulo}
              descripcion={product.descripcion}
              precio={product.precio}
              image={product.image}
            />
          ))}
        </div>
      )}
      <div>
        <Boton onClick={() => setShowProducts(!showProducts)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md mb-20">
          {showProducts ? "Ocultar Productos" : "Mostrar Productos"}
        </Boton>

      </div>

    </div>
  );
}
