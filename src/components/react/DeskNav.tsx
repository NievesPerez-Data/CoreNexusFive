import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Importación de tus imágenes reales para que React las compile bien
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
      if (window.location.pathname === "/CoreNexusFive" || window.location.pathname === "/CoreNexusFive/") {
        setOpen(true);
      }
      
      // Escuchamos el evento personalizado del botón móvil (Hamburger)
      const handleToggle = () => setOpen((prev) => !prev);
      window.addEventListener("toggle-mobile-menu", handleToggle);
      return () => window.removeEventListener("toggle-mobile-menu", handleToggle);
    }
  }, []);

  return (
    <div className="flex flex-col items-end absolute top-1/2 right-0">
      {/* Botón de cerrar (Solo visible cuando el menú está abierto) */}
      {isOpen && (
        <button 
          className="z-50 text-2xl cursor-pointer p-2 fixed top-6 right-6 text-white md:text-white" 
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

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
            <div className="mb-4 mt-10">
              <h1 className="text-4xl font-bold leading-tight text-white">
                Core Nexus <br /> Five
              </h1>
              <p className="text-xs tracking-widest uppercase opacity-40 mt-2">
                Data Pipeline Architecture: AWS S3 + Glue Architecture
              </p>
            </div>

            {/* Bloque Medio */}
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
                        ? "font-bold text-3xl text-white border-r-4 border-white pr-4" 
                        : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {link.text}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* Bloque Inferior: Tus Insignias */}
            <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-6 w-full mt-auto">
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold select-none text-white">
                Cradle & Context
              </span>
              <div className="flex items-center justify-center gap-4 mt-2">
                <a href="https://adalab.es/" target="_blank" rel="noopener noreferrer" class="w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-md">
                  <img src={adalabLogo.src} alt="Logo Adalab" className="w-10 h-10 object-contain" />
                </a>
                <a href="https://aws.amazon.com/es/training/restart/" target="_blank" rel="noopener noreferrer" class="w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-md">
                  <img src={awsRestartLogo.src} alt="Logo AWS" className="w-10 h-10 object-contain" />
                </a>
              </div>
            </div>

          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
