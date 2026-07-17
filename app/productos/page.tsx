"use client";
import React from 'react';
import{productos} from "../../data/productos";
import ProductCard from "../../ui/components/ProductCard";

export default function page() {
  return (
    <div className='p-8'>
        <h1>Productos</h1>
        <p>Lista de productos disponibles.</p>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
            {productos.map((product) => (
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
  )
}
