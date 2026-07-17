"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function NavBar() {
    const pathname = usePathname();
    const linkStyle = (path: string) => 
        `transition ${pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`;

    return (
        <nav className="bg-white border-b border-gray-200 shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <img src="imagen/img5.png" alt="Logo" className="h-20 w-auto" />
                <div className="flex items-center gap-6 text-gray-600">
                    <Link href="/" className={linkStyle('/')}>
                        Inicio
                    </Link>
                    <Link href="/productos" className={linkStyle('/productos')}>
                        Productos
                    </Link>
                    <Link href="/about" className={linkStyle('/about')}>
                        Sobre nosotros
                    </Link>
                </div>
            </div>
        </nav>

    )
}
