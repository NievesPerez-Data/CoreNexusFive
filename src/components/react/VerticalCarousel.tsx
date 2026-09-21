import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

interface ImageData {
  file: string;
  alt: string;
}

interface VerticalCarouselProps {
  imageCount: number;
  basePath?: string;
  scrollSpeed?: number;
  interval?: number;
  linkIndex?: number;
  linkHref?: string;
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

  const siteBase = (basePath ?? import.meta.env.BASE_URL ?? "/").replace(
    /\/?$/,
    "/",
  );

  const assetUrl = (file: string) => `${siteBase}assets/${file}`;

  const linkUrl = linkHref
    ? `${siteBase}${linkHref.replace(/^\//, "")}`
    : null;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const MAX_AVAILABLE = 6;
    const count = Math.min(Math.max(0, imageCount), MAX_AVAILABLE);

    const prepared: ImageData[] = Array.from(
      { length: count },
      (_, i) => {
        const index = i + 1;

        return {
          file: `city${index}.webp`,
          alt: `City artwork ${index}`,
        };
      },
    );

    setImages(prepared);
  }, [imageCount]);

  useEffect(() => {
    y.set(0);
    x.set(0);
    lastTsRef.current = null;
  }, [images, scrollSpeed, interval, y, x]);

  useAnimationFrame((t, delta) => {
    const container = carouselRef.current;
    const content = contentRef.current;

    if (!container || !content || images.length === 0) return;

    const pixelsPerSecond =
      (scrollSpeed * 1000) / Math.max(1, interval);

    const distance = (pixelsPerSecond * delta) / 1000;

    if (isMobile) {
      const maxScroll = Math.max(
        0,
        content.scrollWidth - container.clientWidth,
      );

      if (maxScroll <= 0) return;

      let nextX = x.get() - distance;

      if (Math.abs(nextX) >= maxScroll - 1) {
        nextX = 0;
      }

      x.set(nextX);
    } else {
      const maxScroll = Math.max(
        0,
        content.scrollHeight - container.clientHeight,
      );

      if (maxScroll <= 0) return;

      let nextY = y.get() - distance;

      if (Math.abs(nextY) >= maxScroll - 1) {
        nextY = 0;
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
            className="w-5 h-5 rounded-full animate-bounce"
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
    <div
      className="h-screen w-full overflow-hidden relative"
      ref={carouselRef}
    >
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

          const isLinkSlot =
            linkUrl && index + 1 === linkIndex;

          const isFirstSlide = index === 0;

          /*
           * PRIMER SLIDE:
           * iframe compacto + enlace a Arquitectura
           */
          const mediaContent = isFirstSlide ? (
            <div
              className="
                relative
                w-full
                max-w-[1080px]
                h-[220px]
                overflow-hidden
                rounded-lg
                bg-black
                shadow-2xl
              "
            >
              <iframe
                src={assetUrl("ochoretratos.html")}
                title="Ocho retratos"
                className="absolute inset-0 w-full h-full border-none pointer-events-none"
                loading="eager"
              />

              {/* Texto sobre la imagen */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-10
                  px-5
                  py-3
                  bg-gradient-to-t
                  from-black/85
                  via-black/45
                  to-transparent
                  pointer-events-none
                "
              >
                <span
                  className="
                    text-white
                    text-sm
                    md:text-base
                    font-medium
                    tracking-wide
                  "
                >
                  Stack &amp; Data Flow
                </span>
              </div>

              {/* Capa clicable */}
              {isLinkSlot && linkUrl && (
                <a
                  href={linkUrl}
                  className="absolute inset-0 z-20"
                  aria-label="Stack & Data Flow"
                >
                  <span className="sr-only">
                    Stack &amp; Data Flow
                  </span>
                </a>
              )}
            </div>
          ) : (
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={url}
                type="image/webp"
              />

              <source
                media="(min-width: 769px)"
                srcSet={url}
                type="image/webp"
              />

              <img
                src={url}
                alt={
                  isLinkSlot
                    ? "Fase 1: Creación de Buckets S3"
                    : alt
                }
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
              className="
                relative
                flex
                grow
                justify-center
                items-center
                h-full
                min-w-screen
                md:w-full
                md:min-w-0
                md:h-auto
              "
            >
              {isLinkSlot && !isFirstSlide ? (
                <a
                  href={linkUrl ?? "#"}
                  className="relative flex justify-center items-center group"
                  aria-label="Ir al post: Fase 1, Creación de Buckets S3"
                >
                  {mediaContent}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      bottom-4
                      left-1/2
                      -translate-x-1/2
                      bg-black/70
                      text-white
                      text-xs
                      uppercase
                      tracking-wide
                      px-3
                      py-1.5
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                    "
                  >
                    Blog · Fase 1: Creación de Buckets S3
                  </span>
                </a>
              ) : (
                mediaContent
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default VerticalCarousel;
