import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedIcon from "../OptimizedIcon";

// Enlaces adaptados EXACTAMENTE a los archivos de tu carpeta src/pages
const navLinks = [
  { href: "/CoreNexusFive/", text: "Project Overview" },
  { href: "/CoreNexusFive/arquitectura", text: "Stack & Data Flow" },
  { href: "/CoreNexusFive/blog", text: "Documentación Técnica" },
  { href: "/CoreNexusFive/about", text: "Demo & Entrega" },
  { href: "/CoreNexusFive/contact", text: "Perfil Profesional" },
];

export default function Navigation() {
  const [isOpen, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
      // Abrimos el menú por defecto solo en la Home
      if (window.location.pathname === "/") {
        setOpen(true);
      }
    }
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-end absolute top-1/2 right-0">
      {!isOpen ? (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <button 
            className="cursor-pointer p-2" 
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <OptimizedIcon name="menu" className="w-10 h-10" />
          </button>
        </motion.div>
      ) : (
        <button 
          className="z-50 text-2xl cursor-pointer p-2 fixed top-10 right-6" 
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <OptimizedIcon name="close" className="w-8 h-8" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col text-right justify-between fixed top-0 right-0 p-10 h-screen bg-neutral-900 text-white border-l border-white/10 w-72 md:w-96 shadow-2xl z-40"
          >
            {/* Bloque Superior: Título */}
            <div className="mb-4 mt-10">
              <h1 className="text-4xl font-bold leading-tight text-white">
                Core Nexus <br /> Five
              </h1>
              <p className="text-xs tracking-widest uppercase opacity-40 mt-2">
                Data Pipeline Architecture: AWS S3 + Glue Architecture
              </p>
            </div>

            {/* Bloque Medio: Enlaces de navegación */}
            <ul className="text-xl flex flex-col gap-6 z-10 my-auto">
              {navLinks.map((link) => {
                const isCurrent = currentPath === link.href;
                return (
                  <motion.li 
                    key={link.href} 
                    whileHover={{ x: -5 }}
                    onClick={handleLinkClick}
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

            {/* ==========================================================================
               BLOQUE INFERIOR REEMPLAZADO: LOGOS PROFESIONALES (SIN INSTAGRAM/PINTEREST Y SIN COPYRIGHT)
               ========================================================================== */}
            <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-6 w-full mt-auto">
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold select-none text-white">
                Cradle & Context
              </span>
              
              <div className="flex items-center justify-center gap-4 mt-2">
                {/* Badge Adalab */}
                <a 
                  href="https://adalab.es/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md border border-neutral-800 transition-transform active:scale-95"
                  title="Adalab Tech Bootcamp"
                >
                  <img 
                    src="/adalab-logo.png" 
                    alt="Logo Adalab" 
                    className="w-8 h-8 object-contain" 
                  />
                </a>

                {/* Badge AWS */}
                <a 
                  href="https://aws.amazon.com/es/training/restart/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md border border-neutral-800 transition-transform active:scale-95"
                  title="AWS re/Start Program"
                >
                  <img 
                    src="/aws-restart-logo.png" 
                    alt="Logo AWS re/Start" 
                    className="w-8 h-8 object-contain" 
                  />
                </a>
              </div>
            </div>

          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
