import type { Metadata } from "next";

import { VagaForm } from "@/components/vaga-form";

export const metadata: Metadata = {
  title: "Solicitar vaga · Halloween 23/10",
  description: "Solicite sua vaga na festa de Halloween.",
};

export default function VagaPage() {
  return <VagaForm />;
}
