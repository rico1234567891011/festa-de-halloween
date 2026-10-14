@AGENTS.md

# Festa de Halloween — Landing Page

Landing page de um **evento de Halloween pago**. O objetivo é converter visitantes em inscritos/compradores de ingresso.

## Stack
- Next.js (App Router, `src/app`) + TypeScript
- Tailwind CSS (v4, com `tailwind.config.ts` carregado via `@config` em `src/app/globals.css`)
- Framer Motion (animações, scroll, arraste)

## Seções (a construir)
1. **Hero** com CTA que leva ao formulário de inscrição.
2. **Formulário de 3 etapas** (`/vaga`): nome completo → telefone (WhatsApp) → mensagem de confirmação ("sua vaga foi solicitada"), com indicador de progresso por barras. Envia para `/api/solicitar` (grava em `data/solicitacoes.jsonl`, provisório).
3. **Atrações** com destaque para o DJ.
4. **Carrossel de bebidas** com scroll horizontal por arraste (drag).
5. **Elementos decorativos SVG** — aranha, caveira, teia e abóbora — que aparecem animados conforme o usuário rola a página.

## Estilo visual
- Minimalista e elegante, inspirado na estética da Apple: muito espaço em branco (escuro), tipografia limpa, hierarquia clara, animações suaves e sutis.
- Componentes no padrão do **21st.dev**: React + Tailwind + Framer Motion, pequenos, isolados e reutilizáveis.

## Paleta (definida em `tailwind.config.ts` e como variáveis CSS)
| Token | Hex | Uso |
|---|---|---|
| `preto-noite` | #0B0B10 | Background padrão do site |
| `lilas-luar` | #E6D7FF | Cor de texto padrão |
| `roxo-profundo` | #3A0F5C | Destaques, gradientes |
| `laranja-queimado` | #C75C1E | CTAs, acentos |
| `cinza-ameixa` | #2F2A3A | Cards, bordas, superfícies |

Use as classes Tailwind (`bg-roxo-profundo`, `text-laranja-queimado`, etc.).

## Comandos
- `npm run dev` — servidor de desenvolvimento (http://localhost:3000)
- `npm run build` — build de produção
- `npm run lint` — ESLint

## Convenções
- Componentes em `src/components/` (seções em `src/components/sections/`, SVGs em `src/components/decor/`).
- Componentes de animação/interação são Client Components (`"use client"`).
- Respeitar `prefers-reduced-motion`.
