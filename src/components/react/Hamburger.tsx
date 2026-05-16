import React, { useState } from "react";
import { URLS } from "@/consts";

const Hamburger: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="fixed bottom-0 z-50 max-w-screen left-0 w-full bg-white border-t flex flex-col md:hidden transition-all duration-500 ease-in-out">
      <nav
        className={`flex flex-col items-center w-full overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "h-dvh opacity-100 bg-white sticky"
            : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="my-auto flex flex-col gap-5 text-3xl text-center">
          {Object.entries(URLS).map(([key, value]) => (
            <li key={key}>
              <Link
                target="_self"
                href={value.href}
                rel="noopener noreferrer"
                text={value.text}
              />
            </li>
          ))}
        </ul>

        {/* ==========================================================================
           BLOQUE REEMPLAZADO: INSIGNIAS FORMATIVAS REALES EN EL MENÚ DESPLEGADO
           ========================================================================== */}
        <div className="flex flex-col items-center gap-2 pb-8 w-full">
          <span className="text-[9px] tracking-[0.2em] uppercase opacity-40 font-bold select-none text-neutral-800 mb-2">
            Cradle & Context
          </span>
          <div className="flex gap-4">
            {/* Badge Adalab */}
            <a
              href="https://adalab.es/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Adalab Tech Bootcamp"
              className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-neutral-200 transition-transform active:scale-95"
            >
              <img
                src="/adalab-logo.png"
                alt="Logo Adalab"
                className="w-9 h-9 object-contain"
              />
            </a>
            {/* Badge AWS */}
            <a
              href="https://aws.amazon.com/es/training/restart/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AWS re/Start Program"
              className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-neutral-200 transition-transform active:scale-95"
            >
              <img
                src="/aws-restart-logo.png"
                alt="Logo AWS re/Start"
                className="w-9 h-9 object-contain"
              />
            </a>
          </div>
        </div>
      </nav>

      {/* ELIMINADO EL TEXTO DE COPYRIGHT "ALL RIGHTS RESERVED" */}

      {/* Hamburger icon */}
      <div className="z-50 absolute right-4 bottom-4">
        <button
          aria-expanded={isOpen}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="p-1 text-black focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeDasharray="16"
              strokeDashoffset="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            >
              <path d="M5 5h14">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.2s"
                  values="16;0"
                />
              </path>
              <path d="M5 12h14">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.2s"
                  dur="0.2s"
                  values="16;0"
                />
              </path>
              <path d="M5 19h14">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.4s"
                  dur="0.2s"
                  values="16;0"
                />
              </path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hamburger;

const Link: React.FC<{
  href: string;
  target: string;
  rel: string;
  text: string;
}> = ({ href, target, rel, text }) => {
  const isCurrent =
    typeof window !== "undefined" && window.location.pathname === href;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`animated-link ${isCurrent ? "font-bold text-4xl" : ""}`}
      aria-current={isCurrent ? "page" : undefined}
    >
      {text}
    </a>
  );
};
