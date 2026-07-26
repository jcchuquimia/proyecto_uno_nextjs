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

export type ProductoFormValues = {
  id?: number;
  titulo: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
};
