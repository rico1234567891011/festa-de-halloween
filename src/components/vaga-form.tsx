"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const TOTAL_STEPS = 3;

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const inputClass =
  "h-14 w-full rounded-xl border-2 border-white/25 bg-preto-noite px-4 text-lg text-white outline-none transition-colors placeholder:text-white/30 focus:border-white";

const primaryButton =
  "h-14 rounded-xl bg-laranja-queimado px-10 text-lg font-semibold text-white transition-[filter,transform] hover:brightness-110 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-50";

function ProgressBars({ step }: { step: number }) {
  return (
    <div>
      <div
        className="flex gap-2"
        role="progressbar"
        aria-label="Progresso do formulário"
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-valuenow={step + 1}
      >
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-laranja-queimado"
              initial={false}
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-white/50">
        Etapa {step + 1} de {TOTAL_STEPS}
      </p>
    </div>
  );
}

export function VagaForm() {
  const [step, setStep] = useState(0);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (step === 0) {
      const parts = nome.trim().split(/\s+/);
      if (parts.length < 2 || nome.trim().length < 5) {
        setError("Digite seu nome completo (nome e sobrenome).");
        return;
      }
      setNome(parts.join(" "));
      setStep(1);
      return;
    }

    const digits = telefone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11) {
      setError("Digite um número válido, com DDD.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/solicitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim(), telefone: digits }),
      });
      if (!res.ok) throw new Error();
      setStep(2);
    } catch {
      setError("Não foi possível enviar agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-preto-noite bg-[radial-gradient(ellipse_at_top,rgba(58,15,92,0.55),transparent_60%)] px-6 py-8">
      <header className="mx-auto flex w-full max-w-2xl items-center justify-between">
        <Link
          href="/"
          className="text-2xl text-lilas-luar transition-opacity hover:opacity-80"
          style={{ fontFamily: "var(--font-creepy)" }}
        >
          Halloween <span className="text-laranja-queimado">23/10</span>
        </Link>
        {step < 2 && (
          <Link href="/" className="text-sm text-white/50 transition-colors hover:text-white">
            Cancelar
          </Link>
        )}
      </header>

      <div className="mx-auto mt-14 w-full max-w-2xl flex-1">
        <ProgressBars step={step} />

        <div className="mt-12 min-h-[22rem]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.form
                key="nome"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h1 className="mb-3 text-3xl font-semibold text-white md:text-4xl">Olá!</h1>
                  <p className="text-lg text-white/80">
                    Precisamos de algumas informações para solicitar a sua vaga.
                  </p>
                </div>
                <label htmlFor="nome" className="text-lg font-bold text-white">
                  Qual é o seu nome completo?
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={inputClass}
                  aria-invalid={!!error}
                />
                {error && <p className="text-sm text-[#FF6B6B]">{error}</p>}
                <div>
                  <button type="submit" className={primaryButton}>
                    Continuar
                  </button>
                </div>
              </motion.form>
            )}

            {step === 1 && (
              <motion.form
                key="telefone"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <p className="text-lg text-white/80">
                  Perfeito, <span className="font-semibold text-white">{nome.split(" ")[0]}</span>.
                  Os nossos ADMs vão te chamar por esse número.
                </p>
                <label htmlFor="telefone" className="text-lg font-bold text-white">
                  Qual é o seu número de WhatsApp?
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  autoFocus
                  value={telefone}
                  onChange={(e) => setTelefone(formatPhone(e.target.value))}
                  className={inputClass}
                  aria-invalid={!!error}
                />
                {error && <p className="text-sm text-[#FF6B6B]">{error}</p>}
                <div className="flex items-center gap-6">
                  <button type="submit" disabled={loading} className={primaryButton}>
                    {loading ? "Enviando…" : "Solicitar vaga"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setStep(0);
                    }}
                    className="text-base text-white/60 transition-colors hover:text-white"
                  >
                    Voltar
                  </button>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.div
                key="sucesso"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-start gap-6"
                role="status"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-laranja-queimado">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-laranja-queimado" fill="none" aria-hidden>
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-semibold text-white md:text-4xl">
                  Parabéns, sua vaga foi solicitada!
                </h1>
                <p className="max-w-xl text-lg text-white/80">
                  Aguarde: um dos nossos ADMs vai te mandar mensagem para o pagamento e a
                  confirmação da sua vaga.
                </p>
                <Link href="/" className={`${primaryButton} inline-flex items-center`}>
                  Voltar ao início
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
