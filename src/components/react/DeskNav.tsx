import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedIcon from "../OptimizedIcon";

// Definición de rutas limpias para abrir en páginas independientes
const navLinks = [
  { href: "/", text: "Project Overview" },
  { href: "/arquitectura", text: "Stack & Data Flow" },
  { href: "/blog", text: "Documentación Técnica" },
  { href: "/resultados", text: "Demo & Entrega" },
  { href: "/perfil", text: "Perfil Profesional" },
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
          className="z-50 text-2xl cursor-pointer p-2" 
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
            className="flex flex-col text-right justify-center gap-10 fixed top-0 right-0 p-10 h-screen bg-background border-l border-white/10 w-72 md:w-96 shadow-2xl"
          >
            <div className="mb-4">
              <h1 className="text-4xl font-bold leading-tight">
                Core Nexus <br /> Five
              </h1>
              <p className="text-xs tracking-widest uppercase opacity-40 mt-2">
                Data Pipeline Architecture: AWS S3 + Glue Architecture
              </p>
            </div>

            <ul className="text-xl flex flex-col gap-6 z-10">
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
                      target="_blank" 
                      rel="noopener noreferrer"
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
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
