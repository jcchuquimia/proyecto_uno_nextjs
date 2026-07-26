"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
// 1. Importamos los iconos que necesitamos
import { Home as IconInicio, ShoppingBag as IconProductos, Info as IconAbout } from 'lucide-react';

export default function NavBar() {
    const pathname = usePathname();

    // Función para manejar las clases activas del menú
    const linkStyle = (path: string) => 
        `flex items-center gap-2 transition px-3 py-2 rounded-lg ${
            pathname === path 
                ? 'text-blue-600 font-semibold bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
        }`;

    // 2. Definimos las rutas del menú con sus respectivos iconos
    const menuItems = [
        { name: 'Inicio', path: '/', icon: <IconInicio className="w-5 h-5" /> },
        { name: 'Productos', path: '/productos', icon: <IconProductos className="w-5 h-5" /> },
        { name: 'Sobre nosotros', path: '/about', icon: <IconAbout className="w-5 h-5" /> },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <img src="/imagen/img5.png" alt="Logo" className="h-16 w-auto" />
                
                {/* Enlaces de navegación */}
                <div className="flex items-center gap-4">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.path} 
                            href={item.path} 
                            className={linkStyle(item.path)}
                        >
                            {/* Renderizamos el icono al lado del texto */}
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}