export type Producto = {
  id: number;
  titulo: string;
    descripcion: string;
    precio: number;
    image: string;
    rate: {
        rate: number;
        count: number;
    }
    category: string
};
export const productos: Producto[] = [
  {
    id: 1,
    titulo: "Producto 1",
    descripcion: "Descripción del producto 1",
    precio: 19.99,
    image: "/image/logo1.png",
    rate: {
      rate: 4.5,
        count: 120,
    },
    category: "Categoria 1"
  },
  {
    id: 2,
    titulo: "Producto 2",
    descripcion: "Descripción del producto 2",
    precio: 29.99,
    image: "https://static.vecteezy.com/system/resources/previews/038/016/534/non_2x/jc-blue-logo-design-logo-design-for-business-free-vector.jpg",
    rate: {
      rate: 4.5,
        count: 95,
    },
    category: "Categoria 2"
  },
  {
    id: 3,
    titulo: "Producto 3",
    descripcion: "Descripción del producto 3",
    precio: 39.99,
    image: "https://static.vecteezy.com/system/resources/previews/038/016/534/non_2x/jc-blue-logo-design-logo-design-for-business-free-vector.jpg",
    rate: {
      rate: 4.5,
        count: 95,
    },
    category: "Categoria 3"
  },
]