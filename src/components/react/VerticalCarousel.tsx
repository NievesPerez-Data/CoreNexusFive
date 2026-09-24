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
}) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const y = useMotionValue(0);
  const x = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(false);

  /*
   * BASE DEL SITIO
   * GitHub Pages:
   * https://NievesPerez-Data.github.io/CoreNexusFive/
   */
  const siteBase = (
    basePath ??
    import.meta.env.BASE_URL ??
    "/"
  ).replace(/\/?$/, "/");

  const assetUrl = (file: string) =>
    `${siteBase}assets/${file}`;

  /*
   * ENLACE DEL PRIMER ELEMENTO
   *
   * El primer elemento del carrusel:
   * ochoretratos.html
   *
   * lleva a:
   * /CoreNexusFive/arquitectura/
   */
  const architectureUrl = `${siteBase}arquitectura/`;

  /*
   * ENLACE DEL SLIDE "BUCKETS"
   *
   * El slide que usa:
   * assets/buckets.jpg
   *
   * lleva al post del blog:
   * /CoreNexusFive/blog/creacion-buckets-s3/
   *
   * Si la ruta real de tu post es distinta, cambia solo esta línea.
   */
  const bucketsPostUrl = `${siteBase}blog/creacion-buckets-s3/`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const MAX_AVAILABLE = 6;

    const count = Math.min(
      Math.max(0, imageCount),
      MAX_AVAILABLE,
    );

    const cityImages: ImageData[] = Array.from(
      { length: count },
      (_, i) => {
        const index = i + 1;

        return {
          file: `city${index}.webp`,
          alt: `City artwork ${index}`,
        };
      },
    );

    /*
     * SLIDE "BUCKETS"
     *
     * Se añade al final de la secuencia, aparte del
     * conteo de imágenes de ciudad (no cuenta para MAX_AVAILABLE).
     */
    const prepared: ImageData[] = [
      ...cityImages,
      { file: "buckets.jpg", alt: "Creación de Buckets S3" },
    ];

    setImages(prepared);
  }, [imageCount]);

  useEffect(() => {
    y.set(0);
    x.set(0);
  }, [images, scrollSpeed, interval, y, x]);

  /*
   * MOVIMIENTO DEL CARRUSEL
   */
  useAnimationFrame((t, delta) => {
    const container = carouselRef.current;
    const content = contentRef.current;

    if (
      !container ||
      !content ||
      images.length === 0
    ) {
      return;
    }

    const pixelsPerSecond =
      (scrollSpeed * 1000) /
      Math.max(1, interval);

    const distance =
      (pixelsPerSecond * delta) / 1000;

    if (isMobile) {
      const maxScroll = Math.max(
        0,
        content.scrollWidth -
          container.clientWidth,
      );

      if (maxScroll <= 0) return;

      let nextX = x.get() - distance;

      if (
        Math.abs(nextX) >=
        maxScroll - 1
      ) {
        nextX = 0;
      }

      x.set(nextX);
    } else {
      const maxScroll = Math.max(
        0,
        content.scrollHeight -
          container.clientHeight,
      );

      if (maxScroll <= 0) return;

      let nextY = y.get() - distance;

      if (
        Math.abs(nextY) >=
        maxScroll - 1
      ) {
        nextY = 0;
      }

      y.set(nextY);
    }
  });

  /*
   * CARGANDO
   */
  if (images.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100 gap-2">
        {[
          "#d991c2",
          "#9869b8",
          "#6756cc",
        ].map((color, index) => (
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

  /*
   * CARRUSEL
   */
  return (
    <div
      ref={carouselRef}
      className="h-screen w-full overflow-hidden relative"
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
        {images.map(
          ({ file, alt }, index) => {
            const url = assetUrl(file);

            /*
             * PRIMER ELEMENTO
             *
             * Aquí mostramos:
             * ochoretratos.html
             */
            const isFirstSlide =
              index === 0;

            /*
             * SLIDE "BUCKETS"
             *
             * Identificado por su nombre de archivo,
             * no por posición, para que no dependa
             * de cuántas imágenes de ciudad haya.
             */
            const isBucketsSlide =
              file === "buckets.jpg";

            /*
             * CONTENIDO DEL ELEMENTO
             */
            const mediaContent =
              isFirstSlide ? (
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
                  {/*
                   * HTML INTERACTIVO
                   */}
                  <iframe
                    src={assetUrl(
                      "ochoretratos.html",
                    )}
                    title="Ocho retratos"
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      border-none
                      pointer-events-none
                    "
                    loading="eager"
                  />

                  {/*
                   * TEXTO SOBRE LA IMAGEN
                   */}
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
                      from-black/90
                      via-black/50
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

                  {/*
                   * CAPA CLICABLE
                   *
                   * Todo el bloque lleva a:
                   * /CoreNexusFive/arquitectura/
                   */}
                  <a
                    href={architectureUrl}
                    className="
                      absolute
                      inset-0
                      z-20
                      cursor-pointer
                    "
                    aria-label="Stack & Data Flow"
                  >
                    <span className="sr-only">
                      Stack &amp; Data Flow
                    </span>
                  </a>
                </div>
              ) : isBucketsSlide ? (
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
                  {/*
                   * IMAGEN
                   */}
                  <img
                    src={url}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    fetchPriority="low"
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      object-cover
                      pointer-events-none
                    "
                  />

                  {/*
                   * TEXTO SOBRE LA IMAGEN
                   */}
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
                      from-black/90
                      via-black/50
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
                      Creación de Buckets S3
                    </span>
                  </div>

                  {/*
                   * CAPA CLICABLE
                   *
                   * Todo el bloque lleva al post del blog:
                   * /CoreNexusFive/blog/creacion-buckets-s3/
                   */}
                  <a
                    href={bucketsPostUrl}
                    className="
                      absolute
                      inset-0
                      z-20
                      cursor-pointer
                    "
                    aria-label="Creación de Buckets S3"
                  >
                    <span className="sr-only">
                      Creación de Buckets S3
                    </span>
                  </a>
                </div>
              ) : (
                /*
                 * RESTO DE LAS IMÁGENES
                 */
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
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    fetchPriority="low"
                    className="
                      object-contain
                      max-h-[80vh]
                      max-w-[90vw]
                      md:max-w-full
                    "
                  />
                </picture>
              );

            /*
             * ELEMENTO DEL CARRUSEL
             */
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
                {mediaContent}
              </div>
            );
          },
        )}
      </motion.div>
    </div>
  );
};

export default VerticalCarousel;
