import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Importación estable de tus logos
import adalabLogo from "../../../public/adalab-logo.png";
import awsRestartLogo from "../../../public/aws-restart-logo.png";

const navLinks = [
  { href: "/CoreNexusFive/", text: "Project Overview" },
  { href: "/CoreNexusFive/arquitectura", text: "Stack & Data Flow" },
  { href: "/CoreNexusFive/blog", text: "Documentación Técnica" },
  { href: "/CoreNexusFive/about", text: "Demo & Entrega" },
  { href: "/CoreNexusFive/contact", text: "Perfil Profesional" },
];

export default function DeskNav() {
  const [isOpen, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
      // Si está en la home de escritorio, se abre por defecto como en la plantilla original
      if (window.location.pathname === "/CoreNexusFive" || window.location.pathname === "/CoreNexusFive/") {
        setOpen(true);
      }
    }
  }, []);

  return (
    <>
      {/* BOTÓN FLOTANTE: Solo visible en móviles (md:hidden). Cambia su icono según esté abierto o cerrado */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!isOpen)}
          className="w-14 h-14 bg-neutral-950 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform border border-white/20 focus:outline-none"
        >
          {isOpen ? (
            // Icono de Aspa (X) si está abierto
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Icono de Hamburguesa (三) si está cerrado
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* BOTÓN DE CERRAR EXCLUSIVO PARA ESCRITORIO */}
      {isOpen && (
        <button 
          className="z-50 text-2xl cursor-pointer p-2 fixed top-6 right-6 text-white hidden md:block focus:outline-none" 
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* PANEL DEL MENÚ DESPLEGABLE (NEGRO) */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col text-right justify-between fixed top-0 right-0 p-10 h-screen bg-neutral-950 text-white border-l border-white/10 w-72 md:w-96 shadow-2xl z-40"
          >
            {/* Bloque Superior */}
            <div className="mb-4 mt-10 text-right">
              <h1 className="text-4xl font-bold leading-tight text-white font-fugaz">
                Core Nexus <br /> Five
              </h1>
              <p className="text-[10px] tracking-widest uppercase opacity-40 mt-2">
                Data Pipeline Architecture: AWS S3 + Glue
              </p>
            </div>

            {/* Bloque Medio: Enlaces */}
            <ul className="text-xl flex flex-col gap-6 z-10 my-auto">
              {navLinks.map((link) => {
                const isCurrent = currentPath === link.href;
                return (
                  <motion.li 
                    key={link.href} 
                    whileHover={{ x: -5 }}
                    onClick={() => setOpen(false)}
                  >
                    <a
                      href={link.href}
                      className={`block transition-all ${
                        isCurrent 
                        ? "font-bold text-2xl text-white border-r-4 border-white pr-4" 
                        : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {link.text}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* Bloque Inferior: Insignias con rutas compiladas */}
            <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-6 w-full mt-auto mb-16 md:mb-0">
              <span className="text-[9px] tracking-[0.3em] uppercase opacity-40 font-bold select-none text-white">
                Cradle & Context
              </span>
              <div className="flex items-center justify-center gap-4 mt-1">
                <a 
                  href="https://adalab.es/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img src={adalabLogo.src} alt="Logo Adalab" className="w-9 h-9 object-contain" />
                </a>
                <a 
                  href="https://aws.amazon.com/es/training/restart/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img src={awsRestartLogo.src} alt="Logo AWS" className="w-9 h-9 object-contain" />
                </a>
              </div>
            </div>

          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
