import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import adalabLogo from "../../../public/adalab-logo.png";
import awsRestartLogo from "../../../public/aws-restart-logo.png";
import miLogoPropio from "../../../public/mi-logo-propio.jpg";

// rutas navegación
const navLinks = [
  { href: "/CoreNexusFive/", text: "Home" },
  { href: "/CoreNexusFive/overview", text: "Project Overview" },
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
    }
  }, []);

  const normalizePath = (path) => {
    if (!path) return "";
    return path.endsWith("/") ? path.slice(0, -1) : path;
  };

  return (
    <>
      {/* HEADER MOBILE */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white/95 backdrop-blur-md border-b border-neutral-200 z-[100] flex items-center justify-between px-5 md:hidden shadow-sm">
        <a
          href="/CoreNexusFive/"
          className="flex items-center gap-2 active:scale-95 transition-transform"
        >
          <img
            src={miLogoPropio.src}
            alt="Logo Proyecto"
            className="h-9 w-auto object-contain"
          />

          <span className="font-fugaz uppercase text-base tracking-tight text-neutral-900">
            Core Nexus 5
          </span>
        </a>

        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="w-10 h-10 bg-neutral-950 text-white rounded-lg flex items-center justify-center active:scale-95 transition-transform focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* BOTÓN DESKTOP */}
      {!isOpen && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-6 right-6 z-[110] hidden md:flex items-center gap-2 bg-neutral-950 text-white px-4 py-2.5 rounded-xl border border-white/10 shadow-lg hover:bg-neutral-900 transition-all active:scale-95 group"
          aria-label="Abrir menú de navegación"
        >
          <span className="font-fugaz uppercase text-xs tracking-wider">
            Menú
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* BOTÓN CERRAR DESKTOP */}
      {isOpen && (
        <button
          className="z-[120] text-2xl cursor-pointer p-2 fixed top-6 right-6 text-white hidden md:block focus:outline-none hover:text-gray-300 transition-colors"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      )}

      {/* PANEL MENÚ */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col text-right justify-between fixed top-0 right-0 p-10 h-screen bg-neutral-950 text-white border-l border-white/10 w-72 md:w-96 shadow-2xl z-[100]"
          >
            {/* título */}
            <div className="mb-4 mt-16 md:mt-10 text-right">
              <h1 className="text-4xl font-bold leading-tight text-white font-fugaz">
                Core Nexus <br />
                Five
              </h1>

              <p className="text-[10px] tracking-widest uppercase opacity-40 mt-2">
                Data Pipeline Architecture: AWS S3 + Glue
              </p>
            </div>

            {/* navegación */}
            <ul className="text-xl flex flex-col gap-6 z-10 my-auto">
              {navLinks.map((link) => {
                const isActive =
                  normalizePath(currentPath) === normalizePath(link.href);

                return (
                  <li
                    key={link.href}
                    className="transition-transform hover:-translate-x-1"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block transition-all ${
                        isActive
                          ? "font-bold text-2xl text-white border-r-4 border-neutral-500 pr-4"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {link.text}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* footer logos */}
            <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-6 w-full mt-auto">
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
                  <img
                    src={adalabLogo.src}
                    alt="Logo Adalab"
                    className="w-9 h-9 object-contain"
                  />
                </a>

                <a
                  href="https://aws.amazon.com/es/training/restart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    src={awsRestartLogo.src}
                    alt="Logo AWS"
                    className="w-9 h-9 object-contain"
                  />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
