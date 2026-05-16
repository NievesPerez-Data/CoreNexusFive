import React from "react";

const Hamburger: React.FC = () => {
  const toggleMenu = () => {
    // Lanzamos un evento para comunicarnos con DeskNav de forma limpia
    const event = new CustomEvent("toggle-mobile-menu");
    window.dispatchEvent(event);
  };

  return (
    /* Quitamos los fondos blancos y bordes de la barra inferior. 
       Ahora es un contenedor invisible que solo posiciona el botón de tres líneas en la esquina del móvil */
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <button
        aria-label="Abrir menú"
        onClick={toggleMenu}
        className="w-14 h-14 bg-neutral-950 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform border border-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          >
            <path d="M5 6h14M5 12h14M5 18h14" />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Hamburger;
