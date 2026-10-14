import { MessageCircle } from "lucide-react";

const ADMS = [
  { nome: "Mariana", telefone: "+55 19 99945-1015" },
  { nome: "Lincoln", telefone: "+55 19 99916-0707" },
  { nome: "Leo Lee", telefone: "+55 19 97421-0879" },
];

const whatsappHref = (telefone: string) => `https://wa.me/${telefone.replace(/\D/g, "")}`;

export function ContatoAdms() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-dashed border-lilas-luar/25 bg-cinza-ameixa/40 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-laranja-queimado text-white">
            <MessageCircle className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <h2 className="text-xl font-bold text-lilas-luar md:text-2xl">Ainda tem alguma dúvida?</h2>
            <p className="text-base text-lilas-luar/70">Fale com um dos ADMs pelo WhatsApp.</p>
          </div>
        </div>

        <ul className="flex flex-col gap-3 md:min-w-72">
          {ADMS.map(({ nome, telefone }) => (
            <li key={nome}>
              <a
                href={whatsappHref(telefone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-6 rounded-full border border-lilas-luar/20 bg-preto-noite px-6 py-3 text-lilas-luar transition-colors hover:border-laranja-queimado hover:bg-laranja-queimado hover:text-white"
              >
                <span className="font-semibold">{nome}</span>
                <span className="text-sm tabular-nums opacity-80">{telefone}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
