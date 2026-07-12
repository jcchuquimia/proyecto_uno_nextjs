import React from 'react'

type BarraBusquedaProps = {
    valor: string;
    alCambiar: (texto: string) => void;
    marcador?: string;
};

export default function BarraBusqueda({
    valor,
    alCambiar,
    marcador = "Buscar..."
}:BarraBusquedaProps) {
    return (
        <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <input
                type="text"
                value={valor}
                onChange={(e) => alCambiar(e.target.value)}
                placeholder={marcador}
                className="focus:outline-none"
             />
        </div>
    );
}
