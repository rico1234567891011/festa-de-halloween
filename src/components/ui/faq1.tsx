import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Posso pedir reembolso se desistir?",
    answer:
      `Sim! O reembolso poderá ser solicitado até o dia 16/10, uma semana antes da festa.

Para solicitar, basta entrar em contato com um dos responsáveis pela organização através do WhatsApp, informando a desistência. Após a solicitação, o valor pago será devolvido via Pix.`,
  },
  {
    question: "Depois que eu adicionar meu nome e contato no site, o que acontece?",
    answer:
      `Após preencher seu nome e número de WhatsApp, seus dados serão recebidos pela organização.

Em seguida, um dos responsáveis entrará em contato com você pelo WhatsApp para realizar o pagamento via Pix.

Entraremos em contato assim que possível!`,
  },
  {
    question: "Minha vaga está garantida depois que eu colocar meu nome no site?",
    answer:
      `Ainda não. O preenchimento do nome e contato no site não garante a vaga.

Sua vaga será confirmada somente após a realização e confirmação do pagamento via Pix.

Por isso, recomendamos realizar o pagamento assim que receber o contato da organização, pois as vagas são limitadas e podem se esgotar.`,
  },
  {
    question: "E se eu preencher meu nome no site, mas demorar para fazer o Pix e o lote mudar?",
    answer:
      `O valor do lote só será garantido após a confirmação do pagamento via Pix.

Se você preencher seus dados no site, mas o pagamento ainda não tiver sido realizado e o lote mudar nesse período, será considerado o valor do novo lote vigente.`,
  },
  {
    question: "Onde é o endereço?",
    answer:
      `É segredo até a confirmação! Assim que seu pagamento for aprovado, um dos nossos ADMs chama você no seu WhatsApp particular e entrega a localização certinha, só para quem vai estar na festa. 🎃`,
  },
];

export default function FAQSection() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Caixinha opaca: a aranha passa por trás e o halo brilha em volta */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-2 animate-glow-pulse rounded-[2.25rem] bg-gradient-to-r from-laranja-queimado via-roxo-profundo to-laranja-queimado blur-2xl"
          />
          <div className="relative rounded-[2rem] border border-laranja-queimado/50 bg-preto-noite p-6 shadow-[0_0_60px_-12px_rgba(199,92,30,0.55),inset_0_0_40px_-20px_rgba(199,92,30,0.45)] sm:p-10">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold text-laranja-queimado">FAQ</p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-lilas-luar sm:text-5xl">
            Perguntas frequentes
          </h2>
          <p className="mx-auto max-w-xl text-lilas-luar/70">
            Tire suas dúvidas sobre a festa.
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-cinza-ameixa"
            >
              <AccordionTrigger className="text-left text-base font-medium text-lilas-luar hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="whitespace-pre-line text-base leading-relaxed text-lilas-luar/75">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
