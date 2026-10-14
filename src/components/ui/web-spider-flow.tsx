"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const WEB_W = 1200;
const WEB_H = 390;
const RADIUS = 380;
const SPOKES = 6; // 7 fios radiais em 90°
const RINGS = 5;

const pt = (r: number, a: number) =>
  `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;

// Teia de canto: fios radiais saindo do canto (0,0) + anéis curvos "caídos".
function buildCornerWeb() {
  const parts: string[] = [];
  const step = Math.PI / 2 / SPOKES;

  for (let i = 0; i <= SPOKES; i++) {
    parts.push(`M0 0L${pt(RADIUS, i * step)}`);
  }

  for (let k = 1; k <= RINGS; k++) {
    const r = (RADIUS * k) / RINGS;
    for (let i = 0; i < SPOKES; i++) {
      const a0 = i * step;
      const a1 = (i + 1) * step;
      parts.push(`M${pt(r, a0)}Q${pt(r * 0.86, (a0 + a1) / 2)} ${pt(r, a1)}`);
    }
  }

  return parts.join("");
}

const CORNER_WEB = buildCornerWeb();

const draw = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 2.4, ease: "easeInOut" as const },
};

function WebTop() {
  return (
    <svg
      viewBox={`0 0 ${WEB_W} ${WEB_H}`}
      preserveAspectRatio="xMidYMin meet"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-auto w-full text-lilas-luar/80"
    >
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <motion.path d={CORNER_WEB} {...draw} />
        <g transform={`translate(${WEB_W} 0) scale(-1 1)`}>
          <motion.path d={CORNER_WEB} {...draw} />
        </g>
      </g>
    </svg>
  );
}

// Aranha pendurada pelo abdômen (cabeça para baixo): pernas de 3 segmentos com
// juntas, pedipalpos, quelíceras, olhos e ampulheta laranja no abdômen.
const LEGS = [
  "M52 64L30 44L13 46L5 62",
  "M50 68L24 60L8 70L3 88",
  "M50 73L24 79L11 93L9 111",
  "M53 78L35 97L28 111L31 118",
];
const KNEES: [number, number][] = [
  [30, 44],
  [24, 60],
  [24, 79],
  [35, 97],
];

function Spider() {
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        {LEGS.map((d) => (
          <g key={d}>
            <path d={d} />
            <path d={d} transform="translate(120 0) scale(-1 1)" />
          </g>
        ))}
      </g>
      <g fill="currentColor">
        {KNEES.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="2.6" />
            <circle cx={120 - x} cy={y} r="2.6" />
          </g>
        ))}
        <path d="M55 82L51 93L54 95L58 85Z" />
        <path d="M65 82L69 93L66 95L62 85Z" />
        <ellipse cx="60" cy="38" rx="17" ry="23" />
        <ellipse cx="60" cy="72" rx="12" ry="13" />
        <rect x="56" y="58" width="8" height="8" rx="3" />
      </g>
      <g fill="#C75C1E">
        <path d="M53 27H67L60 39Z" />
        <path d="M60 39L67 51H53Z" />
      </g>
      <g stroke="#0B0B10" strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
        <path d="M46 34Q43 40 46 48" />
        <path d="M74 34Q77 40 74 48" />
        <path d="M50 54Q60 60 70 54" />
      </g>
      <g stroke="#C75C1E" strokeWidth="2.2" strokeLinecap="round">
        <path d="M57 84L56 91" />
        <path d="M63 84L64 91" />
      </g>
      <g fill="#C75C1E">
        <circle cx="56" cy="76" r="2" />
        <circle cx="64" cy="76" r="2" />
        <circle cx="58.5" cy="72.5" r="1.4" />
        <circle cx="61.5" cy="72.5" r="1.4" />
      </g>
    </svg>
  );
}

interface WebSpiderFlowProps {
  children: ReactNode;
}

// Envolve a página inteira: teia no topo + fio que desce conforme o scroll até
// o fim da página. O fio e a aranha ficam ATRÁS do conteúdo (que usa z-10) e
// à frente dos fundos das seções.
//
// Performance (celular): o movimento usa só transform (translateY / scaleY),
// que roda na GPU. Animar top/height forçaria recalcular o layout a cada frame.
export function WebSpiderFlow({ children }: WebSpiderFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Altura da página e da janela, medidas fora do ciclo de scroll.
  const pageH = useMotionValue(0);
  const viewH = useMotionValue(0);
  const ready = useMotionValue(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => {
      pageH.set(node.offsetHeight);
      viewH.set(window.innerHeight);
      ready.set(1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pageH, viewH, ready]);

  // Começa 24vh abaixo do topo e termina rente ao fim da página (110px de folga
  // para a aranha, que pende abaixo do ponto do fio).
  const y = useTransform([scrollYProgress, pageH, viewH], ([p, h, vh]: number[]) => {
    const start = 0.24 * vh;
    return start + p * Math.max(0, h - start - 110);
  });
  const threadScale = useTransform([y, pageH], ([yy, h]: number[]) => (h ? yy / h : 0));

  return (
    <div ref={ref} className="relative">
      {children}

      <WebTop />

      <motion.div
        aria-hidden
        style={{ scaleY: threadScale, opacity: ready }}
        className="pointer-events-none absolute left-1/2 top-0 z-[1] h-full w-1 origin-top -translate-x-1/2 bg-lilas-luar/80"
      />
      <motion.div
        aria-hidden
        style={{ y, opacity: ready }}
        className="pointer-events-none absolute left-1/2 top-0 z-[1] -translate-x-1/2 -translate-y-[13%] text-lilas-luar"
      >
        <motion.div
          style={{ transformOrigin: "50% 13%" }}
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Spider />
        </motion.div>
      </motion.div>
    </div>
  );
}
