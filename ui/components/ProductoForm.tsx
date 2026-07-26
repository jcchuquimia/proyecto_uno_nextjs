"use client";

import { useEffect, useState } from "react";
import Boton from "./Boton";
import { ProductoFormValues } from "@/types/producto";
import { validateProducto } from "@/app/productos/Validaciones/product.schema";

type ProductoFormProps = {
  title: string;
  valoresIniciales: ProductoFormValues;
  onCancel: () => void;
  onSubmit: (producto: ProductoFormValues) => void;
};

export default function ProductoForm({ title, valoresIniciales, onCancel, onSubmit }: ProductoFormProps) {
  const [form, setForm] = useState<ProductoFormValues>(valoresIniciales);
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    setForm(valoresIniciales);
    setErrores([]);
  }, [valoresIniciales]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultado = validateProducto(form);

    if (!resultado.success) {
      setErrores(resultado.error.issues.map((issue) => issue.message));
      return;
    }

    onSubmit({
      ...form,
      precio: Number(form.precio),
      categoria: form.categoria || "Sin categoría",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errores.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-semibold">Hay errores en el formulario:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errores.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

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
        required
      />

      <div className="flex justify-end gap-3 pt-2">
        <Boton type="button" onClick={onCancel} className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700">
          Cancelar
        </Boton>
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
          Guardar
        </button>
      </div>
    </form>
  );
}
