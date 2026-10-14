import { ContatoAdms } from "@/components/ui/contato-adms";
import FAQSection from "@/components/ui/faq1";
import { Footer } from "@/components/ui/footer";
import { RegrasECardapio } from "@/components/ui/regras-e-cardapio";
import { SolicitarVagaButton } from "@/components/solicitar-vaga-button";
import { WebSpiderFlow } from "@/components/ui/web-spider-flow";

const ctaClass =
  "relative z-10 h-24 rounded-3xl px-16 text-2xl font-semibold md:h-28 md:px-24 md:text-4xl";

export default function Home() {
  return (
    <main>
      <WebSpiderFlow>
        <section
          id="hero"
          className="relative flex min-h-screen flex-col items-center justify-start gap-12 bg-preto-noite pb-28 pt-[34vh]"
        >
          {/* aqui vai a landing decorada de Halloween + o botão de CTA */}
          <h1
            className="relative z-10 text-center leading-[0.9]"
            style={{ fontFamily: "var(--font-creepy)" }}
          >
            <span className="block bg-gradient-to-b from-lilas-luar from-40% to-laranja-queimado bg-clip-text pb-2 text-7xl text-transparent drop-shadow-[0_0_32px_rgba(199,92,30,0.55)] md:text-[9rem]">
              Halloween
            </span>
            <span className="mt-3 block text-5xl tracking-[0.25em] text-laranja-queimado drop-shadow-[0_0_24px_rgba(199,92,30,0.6)] md:text-7xl">
              16/10
            </span>
          </h1>
          <SolicitarVagaButton className={ctaClass} />

          <div className="relative z-10 flex max-w-4xl flex-col items-center gap-7 px-6 text-center">
            <p
              className="text-5xl text-white md:text-7xl"
              style={{ fontFamily: "var(--font-nosifer)" }}
            >
              LOTE 1
            </p>

            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.3em] text-lilas-luar/60">
                Contaremos com
              </p>
              <p className="text-xl font-medium text-lilas-luar md:text-2xl">
                DJs <span className="text-laranja-queimado">•</span> Open bar{" "}
                <span className="text-laranja-queimado">•</span> Espaço exclusivo
              </p>
            </div>

            <p className="text-3xl font-black uppercase tracking-[0.16em] text-[#F08A3E] [text-shadow:0_0_14px_rgba(199,92,30,0.55)] md:text-5xl">
              21H00 · FANTASIA OBRIGATÓRIA
            </p>

            <div className="relative mt-2 w-full">
              <div
                aria-hidden
                className="absolute -inset-1 animate-glow-pulse rounded-3xl bg-laranja-queimado/50 blur-xl"
              />
              <div className="relative flex flex-col items-center gap-3 rounded-3xl border-2 border-laranja-queimado bg-preto-noite px-6 py-7 md:px-12 md:py-9">
                <span aria-hidden className="animate-bounce text-4xl font-black text-laranja-queimado">
                  ↑
                </span>
                <p className="text-2xl font-extrabold leading-tight text-white md:text-4xl">
                  Clique no botão e{" "}
                  <span className="whitespace-nowrap text-laranja-queimado">solicite sua vaga</span>
                </p>
                <p className="text-base font-semibold text-white/85 md:text-xl">
                  Nossos ADMs entram em contato para você garantir a sua!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* a teia/aranha do WebSpiderFlow desce por trás desta seção, ligando o hero ao FAQ */}
        <RegrasECardapio />

        <div id="cta-final" className="flex min-h-screen flex-col justify-center bg-preto-noite pb-8">
          {/* FAQ + contato com os ADMs */}
          <div className="relative z-10 w-full">
            <FAQSection />
          </div>
          <div className="relative z-10 w-full">
            <ContatoAdms />
          </div>
          <Footer />
        </div>
      </WebSpiderFlow>
    </main>
  );
}
