"use client";

import { useEffect, useState } from "react";
import Boton from "./Boton";

export type ProductoFormValues = {
  id?: number;
  titulo: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
};

type AgregarProductoProps = {
  isOpen: boolean;
  onClose: () => void;
  onGuardar: (producto: ProductoFormValues) => void;
};

const valoresIniciales: ProductoFormValues = {
  titulo: "",
  descripcion: "",
  precio: 0,
  categoria: "",
  imagen: "/imagen/img1.png",
};

export default function AgregarProducto({ isOpen, onClose, onGuardar }: AgregarProductoProps) {
  const [form, setForm] = useState<ProductoFormValues>(valoresIniciales);

  useEffect(() => {
    if (isOpen) {
      setForm(valoresIniciales);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onGuardar({
      ...form,
      precio: Number(form.precio),
      categoria: form.categoria || "Sin categoría",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Agregar producto</h2>
          <button type="button" onClick={onClose} className="text-xl text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={form.titulo}
            onChange={(event) => setForm({ ...form, titulo: event.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
            placeholder="Nombre del producto"
            required
          />
          <textarea
            value={form.descripcion}
            onChange={(event) => setForm({ ...form, descripcion: event.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
            placeholder="Descripción"
            rows={3}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.precio}
              onChange={(event) => setForm({ ...form, precio: Number(event.target.value) })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
              placeholder="Precio"
              required
            />
            <input
              value={form.categoria}
              onChange={(event) => setForm({ ...form, categoria: event.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
              placeholder="Categoría"
              required
            />
          </div>
          <input
            value={form.imagen}
            onChange={(event) => setForm({ ...form, imagen: event.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
            placeholder="Ruta de imagen (por ejemplo /imagen/img1.png)"
          />

          <div className="flex justify-end gap-3 pt-2">
            <Boton type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700">
              Cancelar
            </Boton>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
