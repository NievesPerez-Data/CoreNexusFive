import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

interface ImageData {
  file: string;
  alt: string;
}

interface VerticalCarouselProps {
  imageCount: number;
  basePath?: string;
  scrollSpeed?: number; // px per step
  interval?: number; // ms per step
  linkIndex?: number; // posición (1-indexada) que se convierte en enlace, ej: 2 = "city2"
  linkHref?: string; // ruta relativa a la base del sitio, ej: "blog/creacion-buckets-s3"
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  imageCount,
  scrollSpeed = 3,
  interval = 50,
  basePath,
  linkIndex = 2,
  linkHref,
}) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastTsRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  // Base real del sitio (ej: "/CoreNexusFive/"). Si se pasa basePath se respeta ese,
  // si no, se usa la que Astro inyecta en build según `base` de astro.config.mjs.
  const siteBase = (basePath ?? import.meta.env.BASE_URL ?? "/").replace(/\/?$/, "/");
  const assetUrl = (file: string) => `${siteBase}assets/${file}`;
  const linkUrl = linkHref ? `${siteBase}${linkHref.replace(/^\//, "")}` : null;

  useEffect(() => {
    // Detecta si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Genera nombres determinísticos de /public/assets (servidos como {base}assets/*)
    const MAX_AVAILABLE = 6; // número de archivos cityN.webp disponibles en public/assets
    const count = Math.min(Math.max(0, imageCount), MAX_AVAILABLE);
    const prepared: ImageData[] = Array.from({ length: count }, (_, i) => {
      const index = i + 1;
      return {
        file: `city${index}.webp`,
        alt: `City artwork ${index}`,
      };
    });

    setImages(prepared);
  }, [imageCount]);

  useEffect(() => {
    // reinicia posición al cambiar imágenes o velocidad
    y.set(0);
    x.set(0);
    lastTsRef.current = null;
  }, [images, scrollSpeed, interval, y, x]);

  useAnimationFrame((t, delta) => {
    const container = carouselRef.current;
    const content = contentRef.current;
    if (!container || !content || images.length === 0) return;

    const pixelsPerSecond = (scrollSpeed * 1000) / Math.max(1, interval);
    const distance = (pixelsPerSecond * delta) / 1000; // px por frame

    if (isMobile) {
      // Scroll horizontal en mobile
      const maxScroll = Math.max(
        0,
        content.scrollWidth - container.clientWidth,
      );
      if (maxScroll <= 0) return;

      let nextX = x.get() - distance; // desplazamiento hacia la izquierda
      if (Math.abs(nextX) >= maxScroll - 1) {
        nextX = 0; // reinicio de bucle
      }
      x.set(nextX);
    } else {
      // Scroll vertical en desktop
      const maxScroll = Math.max(
        0,
        content.scrollHeight - container.clientHeight,
      );
      if (maxScroll <= 0) return;

      let nextY = y.get() - distance; // desplazamiento hacia arriba
      if (Math.abs(nextY) >= maxScroll - 1) {
        nextY = 0; // reinicio de bucle
      }
      y.set(nextY);
    }
  });

  if (images.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100 gap-2">
        {["#d991c2", "#9869b8", "#6756cc"].map((color, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full animate-bounce`}
            style={{
              backgroundColor: color,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden relative" ref={carouselRef}>
      <motion.div
        ref={contentRef}
        style={{
          y: isMobile ? 0 : y,
          x: isMobile ? x : 0,
          willChange: "transform",
        }}
        className="h-full flex gap-10 flex-row items-center md:flex-col"
      >
        {images.map(({ file, alt }, index) => {
          const url = assetUrl(file);
          const isLinkSlot = linkUrl && index + 1 === linkIndex;

          const picture = (
            <picture>
              {/* Mobile: solo 400w (suficiente para ~90vw en móviles) */}
              <source media="(max-width: 768px)" srcSet={url} type="image/webp" />
              {/* Desktop: 800w (suficiente para max-h-[80vh]) */}
              <source media="(min-width: 769px)" srcSet={url} type="image/webp" />
              {/* Fallback */}
              <img
                src={url}
                alt={isLinkSlot ? "Fase 1: Creación de Buckets S3" : alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                fetchPriority={index === 0 ? "high" : "low"}
                className="object-contain max-h-[80vh] max-w-[90vw] md:max-w-full"
              />
            </picture>
          );

          return (
            <div
              key={index}
              className="relative flex grow justify-center h-full min-w-screen md:w-full md:min-w-0 md:h-auto"
            >
              {isLinkSlot ? (
                <a
                  href={linkUrl}
                  className="relative flex justify-center items-center group"
                  aria-label="Ir al post: Fase 1, Creación de Buckets S3"
                >
                  {picture}
                  <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs uppercase tracking-wide px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    Blog · Fase 1: Creación de Buckets S3
                  </span>
                </a>
              ) : (
                picture
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default VerticalCarousel;
