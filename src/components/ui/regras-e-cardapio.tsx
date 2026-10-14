import { Ban, ShieldCheck, TriangleAlert } from "lucide-react";

const REGRAS = [
  { titulo: "Brigas", texto: "Não serão toleradas. Envolvidos serão expulsos imediatamente." },
  { titulo: "Objetos cortantes", texto: "Proibida a entrada com objetos cortantes." },
  { titulo: "Drogas", texto: "Proibida a entrada e o consumo de qualquer tipo de droga." },
  { titulo: "Lista de convidados", texto: "Entrada somente para nomes confirmados na lista." },
  { titulo: "PT", texto: "Proibido dar PT." },
  { titulo: "Bebidas de fora", texto: "Proibido levar qualquer tipo de bebida de fora." },
];

// Regras da festa (em linha, na horizontal) + cardápio de drinks.
// Os cartões são opacos: a aranha e o fio passam por trás deles.
export function RegrasECardapio() {
  return (
    <section id="regras-e-cardapio" className="w-full px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Regras da festa */}
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <TriangleAlert className="h-5 w-5 shrink-0 text-laranja-queimado sm:h-7 sm:w-7 md:h-9 md:w-9" aria-hidden />
          <h2
            className="text-center text-2xl font-black uppercase tracking-[0.1em] text-lilas-luar sm:text-3xl sm:tracking-[0.14em] md:text-5xl md:tracking-[0.18em]"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Regras da festa
          </h2>
          <TriangleAlert className="h-5 w-5 shrink-0 text-laranja-queimado sm:h-7 sm:w-7 md:h-9 md:w-9" aria-hidden />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {REGRAS.map(({ titulo, texto }) => (
            <li
              key={titulo}
              className="flex flex-col gap-3 rounded-2xl border border-lilas-luar/15 bg-preto-noite p-4 md:p-5"
            >
              <Ban className="h-6 w-6 text-laranja-queimado" aria-hidden />
              <div>
                <p className="text-base font-bold text-white">{titulo}</p>
                <p className="mt-1 text-sm leading-snug text-lilas-luar/75">{texto}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-start gap-4 rounded-2xl border border-laranja-queimado/60 bg-preto-noite p-5 md:items-center md:p-6">
          <ShieldCheck className="h-7 w-7 shrink-0 text-laranja-queimado" aria-hidden />
          <p className="text-base font-medium text-white md:text-lg">
            A festa contará com equipe de segurança e controle de entrada.
          </p>
        </div>
      </div>
    </section>
  );
}
