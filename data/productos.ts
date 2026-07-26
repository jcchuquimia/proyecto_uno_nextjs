import img1 from "../public/imagen/img1.png";
import img2 from "../public/imagen/img2.png";
import img3 from "../public/imagen/img3.png";
import { StaticImageData } from "next/image";

export type Producto = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string | StaticImageData;
  rate: {
    rate: number;
    count: number;
  };
  category: string;
};

export interface FakeStoreProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const productos: Producto[] = [
  {
    id: 1,
    titulo: "Producto 1",
    descripcion: "Descripción del producto 1",
    precio: 19.99,
    imagen: img1,
    rate: {
      rate: 4.5,
      count: 120,
    },
    category: "Categoria 1",
  },
  {
    id: 2,
    titulo: "Producto 2",
    descripcion: "Descripción del producto 2",
    precio: 29.99,
    imagen: img2,
    rate: {
      rate: 4.5,
      count: 95,
    },
    category: "Categoria 2",
  },
  {
    id: 3,
    titulo: "Producto 3",
    descripcion: "Descripción del producto 3",
    precio: 39.99,
    imagen: img3,
    rate: {
      rate: 4.5,
      count: 95,
    },
    category: "Categoria 3",
  },
];