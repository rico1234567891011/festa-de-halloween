"use client";

import { useEffect, useRef, useState } from "react";
import { JackOLantern } from "@/components/ui/jack-o-lantern";
import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";

export interface CarouselItem {
  id: number;
  url: string;
  title: string;
  subtitle?: string;
  /** "contain" mostra a foto inteira (zoom out) sobre um fundo desfocado */
  fit?: "cover" | "contain";
}

const DEFAULT_ITEMS: CarouselItem[] = [
  { id: 1, url: "/atracoes/entrada-noite.webp", title: "Espaço Mato Dentro", subtitle: "A entrada iluminada à noite", fit: "contain" },
  { id: 2, url: "/atracoes/vista-aerea.png", title: "Vista aérea", subtitle: "Área verde, piscina e casarão" },
  { id: 3, url: "/atracoes/area-coberta.png", title: "Área coberta", subtitle: "Salão amplo e sofás lounge" },
  { id: 4, url: "/atracoes/salao.png", title: "Salão", subtitle: "Ambiente aberto para a natureza" },
];

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 35;
const GAP_PX = 2;
const MARGIN_PX = 2;

interface ThumbnailsProps {
  items: CarouselItem[];
  index: number;
  setIndex: (i: number) => void;
}

function Thumbnails({ items, index, setIndex }: ThumbnailsProps) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = thumbnailsRef.current;
    if (!node) return;

    let scrollPosition = 0;
    for (let i = 0; i < index; i++) {
      scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
    }
    scrollPosition += MARGIN_PX;

    const centerOffset = node.offsetWidth / 2 - FULL_WIDTH_PX / 2;
    scrollPosition -= centerOffset;

    node.scrollTo({ left: scrollPosition, behavior: "smooth" });
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="mx-auto flex h-20 w-fit gap-0.5 pb-2">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            aria-label={item.title}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            variants={{
              active: { width: FULL_WIDTH_PX, marginLeft: MARGIN_PX, marginRight: MARGIN_PX },
              inactive: { width: COLLAPSED_WIDTH_PX, marginLeft: 0, marginRight: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative h-full shrink-0 overflow-hidden rounded"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt=""
              className="h-full w-full select-none object-cover pointer-events-none"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

interface ThumbnailCarouselProps {
  items?: CarouselItem[];
  /** Classes de posição/tamanho da abóbora sobre a foto; ela acende a cada troca de slide. Omitir = sem abóbora. */
  pumpkinClassName?: string;
}

export default function ThumbnailCarousel({ items = DEFAULT_ITEMS, pumpkinClassName }: ThumbnailCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      animate(x, -index * containerWidth, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    const containerWidth = containerRef.current?.offsetWidth || 1;
    const { offset, velocity } = info;

    let newIndex = index;
    if (Math.abs(velocity.x) > 500) {
      newIndex = velocity.x > 0 ? index - 1 : index + 1;
    } else if (Math.abs(offset.x) > containerWidth * 0.3) {
      newIndex = offset.x > 0 ? index - 1 : index + 1;
    }

    setIndex(Math.max(0, Math.min(items.length - 1, newIndex)));
  };

  const navButton =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-lilas-luar text-preto-noite shadow-lg transition-transform";

  return (
    <div className="mx-auto w-full max-w-[1400px] p-4 lg:p-10">
      <div className="relative flex flex-col gap-3">
        {pumpkinClassName && <JackOLantern className={pumpkinClassName} pulseKey={index} />}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl bg-cinza-ameixa"
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            drag="x"
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ x }}
          >
            {items.map((item) => (
              <div key={item.id} className="relative h-[320px] w-full shrink-0 md:h-[600px]">
                {item.fit === "contain" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full scale-110 select-none rounded-2xl object-cover opacity-60 blur-2xl pointer-events-none"
                    draggable={false}
                  />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.title}
                  className={`relative h-full w-full select-none rounded-2xl pointer-events-none ${
                    item.fit === "contain" ? "object-contain" : "object-cover"
                  }`}
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-preto-noite/90 to-transparent p-6 pb-14 pt-24 text-left">
                  <p className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p className="mt-1 text-sm text-lilas-luar/80 md:text-base">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <button
            type="button"
            aria-label="Anterior"
            disabled={index === 0}
            onClick={() => setIndex(Math.max(0, index - 1))}
            className={`${navButton} left-4 ${
              index === 0 ? "cursor-not-allowed opacity-40" : "opacity-80 hover:scale-110 hover:opacity-100"
            }`}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Próximo"
            disabled={index === items.length - 1}
            onClick={() => setIndex(Math.min(items.length - 1, index + 1))}
            className={`${navButton} right-4 ${
              index === items.length - 1
                ? "cursor-not-allowed opacity-40"
                : "opacity-80 hover:scale-110 hover:opacity-100"
            }`}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-preto-noite/60 px-3 py-1 text-sm">
            {index + 1} / {items.length}
          </div>
        </div>

        <Thumbnails items={items} index={index} setIndex={setIndex} />
      </div>
    </div>
  );
}
