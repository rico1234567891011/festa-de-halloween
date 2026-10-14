"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useRef } from "react";

interface JackOLanternProps {
  className?: string;
  /** Muda a cada troca de foto do carrossel: dispara o clarão do rosto. */
  pulseKey?: number;
}

// Abóbora ilustrada em SVG (vetor), com rosto que "pisca" em verde-menta,
// inspirada na jack-o'-lantern de referência e nas cores da paleta.
export function JackOLantern({ className = "", pulseKey = 0 }: JackOLanternProps) {
  const [burstRef, animateBurst] = useAnimate<SVGGElement>();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (burstRef.current) {
      animateBurst(burstRef.current, { opacity: [0, 1, 0.9, 0] }, { duration: 1.4, ease: "easeOut" });
    }
  }, [pulseKey, animateBurst, burstRef]);

  const EYE_L = "M50 82L90 96L60 114Z";
  const EYE_R = "M150 82L110 96L140 114Z";
  const NOSE = "M100 108L111 126L89 126Z";
  const MOUTH =
    "M40 128L55 142L68 128L84 146L100 132L116 146L132 128L145 142L160 128Q152 166 100 166Q48 166 40 128Z";

  return (
    <svg
      viewBox="0 0 200 190"
      className={className}
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="jol-body" cx="50%" cy="38%" r="70%">
          <stop offset="0" stopColor="#E4813A" />
          <stop offset="0.6" stopColor="#C75C1E" />
          <stop offset="1" stopColor="#8A3A10" />
        </radialGradient>
        <linearGradient id="jol-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B9FFD6" />
          <stop offset="1" stopColor="#3FD68C" />
        </linearGradient>
        <linearGradient id="jol-stem" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3E5A34" />
          <stop offset="1" stopColor="#1E3018" />
        </linearGradient>
        <filter id="jol-blur-big" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="jol-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* caule */}
      <path
        d="M90 44C88 26 102 14 122 10C120 20 114 28 114 46Z"
        fill="url(#jol-stem)"
        stroke="#14200F"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* gomos da abóbora (de trás para frente) */}
      <g stroke="#5C230A" strokeWidth="2.5" strokeLinejoin="round" fill="url(#jol-body)">
        <ellipse cx="46" cy="106" rx="40" ry="54" />
        <ellipse cx="154" cy="106" rx="40" ry="54" />
        <ellipse cx="74" cy="104" rx="42" ry="60" />
        <ellipse cx="126" cy="104" rx="42" ry="60" />
        <ellipse cx="100" cy="104" rx="36" ry="62" />
      </g>

      {/* nervuras */}
      <g stroke="#5C230A" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path d="M100 44C90 84 90 128 100 166" />
        <path d="M66 50C44 84 46 130 68 162" />
        <path d="M134 50C156 84 154 130 132 162" />
        <path d="M32 66C14 92 16 128 36 152" />
        <path d="M168 66C186 92 184 128 164 152" />
      </g>

      {/* brilho no topo */}
      <ellipse cx="72" cy="66" rx="22" ry="9" fill="#F4A468" opacity="0.35" transform="rotate(-20 72 66)" />

      {/* rosto: halo desfocado + recortes brilhando */}
      <g className="animate-flicker">
        <g filter="url(#jol-blur)" fill="#5CFFA8" opacity="0.85">
          <path d={EYE_L} />
          <path d={EYE_R} />
          <path d={NOSE} />
          <path d={MOUTH} />
        </g>
        <g fill="url(#jol-glow)" stroke="#5C230A" strokeWidth="2.5" strokeLinejoin="round">
          <path d={EYE_L} />
          <path d={EYE_R} />
          <path d={NOSE} />
          <path d={MOUTH} />
        </g>
      </g>

      {/* clarão: boca e olhos acendem mais forte a cada troca de foto */}
      <g ref={burstRef} opacity="0" style={{ opacity: 0 }}>
        <g filter="url(#jol-blur-big)" fill="#8CFFC2">
          <path d={EYE_L} />
          <path d={EYE_R} />
          <path d={NOSE} />
          <path d={MOUTH} />
        </g>
        <g fill="#F2FFF8">
          <path d={EYE_L} />
          <path d={EYE_R} />
          <path d={NOSE} />
          <path d={MOUTH} />
        </g>
      </g>
    </svg>
  );
}
