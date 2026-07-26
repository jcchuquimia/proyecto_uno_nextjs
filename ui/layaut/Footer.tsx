import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
   <footer className="bg-gray-900 text-gray-300 py-8 px-4 mt-auto border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Marca / Logo */}
        <div className="flex flex-col items-center md:items-start">
          <img src="imagen/img7.png" alt="Logo" className="h-20 w-auto" />
          <p className="text-xs text-gray-500 mt-1">© {currentYear} Todos los derechos reservados.</p>
        </div>

        {/* Enlaces de Navegación */}
        <nav className="flex gap-6 text-sm">
          <a href="#about" className="hover:text-white transition-colors">Sobre nosotros</a>
          <a href="#privacy" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#contact" className="hover:text-white transition-colors">Contacto</a>
        </nav>

        {/* Redes Sociales */}
        <div className="flex gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
            𝕏
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
            GitHub
          </a>
        </div>

      </div>
    </footer>
  )
}
