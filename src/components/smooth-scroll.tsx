"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

// Smooth scroll global (Lenis): scroll com inércia no lugar do padrão do navegador.
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 0.9 }}>
      {children}
    </ReactLenis>
  );
}
