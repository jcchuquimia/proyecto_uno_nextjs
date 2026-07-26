import Image, {StaticImageData} from "next/image";
type ProductCardProps = {
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string | StaticImageData;
};

export default function ProductCard({
    titulo,
    descripcion,
    precio,
    imagen
}: ProductCardProps) {
    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden w-72 hover:shadow-lg transition">
            {/* 1. Creamos un contenedor relativo con el alto deseado (h-48) */}
            <div className="relative w-full h-48 bg-gray-50">
                <Image 
                    src={imagen} 
                    alt={titulo} 
                    fill // 2. Hace que la imagen llene el contenedor automáticamente
                    sizes="288px" // 3. Le dice a Next.js que optimice la imagen para el ancho de la tarjeta (w-72 = 288px)
                    className="object-cover" // 4. Ajusta la imagen para que no se deforme (recorta excedentes de forma armoniosa)
                    priority={true} // 5. Carga rápida sin retrasos ni parpadeos
                    
                />
            </div>
            <div className="p-4">
                <h2 className="text-gray-800 font-semibold mt-4">{titulo}</h2>
                <p className="text-gray-600 mt-2">{descripcion}</p>
                <p className="text-gray-800 font-bold mt-4">Bs.{precio.toFixed(2)}</p>
            </div>
        </div>
    );
}
