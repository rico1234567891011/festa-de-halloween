"use client";

import { useRouter } from "next/navigation";

import { OriginButton } from "@/components/ui/origin-button";

// Botão do hero: leva ao formulário de solicitação de vaga (/vaga).
export function SolicitarVagaButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <OriginButton className={className} onClick={() => router.push("/vaga")}>
      Quero meu ingresso
    </OriginButton>
  );
}
