import Image from "next/image";
type ProductCardProps = {
    titulo: string;
    descripcion: string;
    precio: number;
    image: string;
};

export default function ProductCard({
    titulo,
    descripcion,
    precio,
    image
}: ProductCardProps) {
    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden w-72 hover:shadow-lg transition">
            <Image width={50} height={50} src={image} alt={titulo} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-gray-800 font-semibold mt-4">{titulo}</h2>
                <p className="text-gray-600 mt-2">{descripcion}</p>
                <p className="text-gray-800 font-bold mt-4">${precio.toFixed(2)}</p>
            </div>
        </div>
    );
}
