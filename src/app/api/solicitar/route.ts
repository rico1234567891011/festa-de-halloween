import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { after } from "next/server";

type Registro = { nome: string; telefone: string; criadoEm: string };

// Envia o pedido para a planilha do Google (Apps Script). O Apps Script leva alguns
// segundos para responder, então isto roda DEPOIS de responder ao usuário (after).
// redirect: "manual" — o script já gravou quando devolve o 302; seguir o redirecionamento
// só serviria para ler a resposta e atrasar. Se vier 200, é a página de erro do Google.
async function enviarParaPlanilha(webhook: string, registro: Registro) {
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(registro),
        redirect: "manual",
      });
      if (res.status >= 300 && res.status < 400) return; // gravado
      throw new Error(`resposta inesperada do Apps Script (${res.status})`);
    } catch (err) {
      console.error(`Planilha: tentativa ${tentativa} falhou`, err);
      await new Promise((r) => setTimeout(r, 1500 * tentativa));
    }
  }
  // Não perder o pedido: deixa registrado no log do servidor.
  console.error("Planilha: PEDIDO NÃO ENVIADO, registrar manualmente:", JSON.stringify(registro));
}

// Destino das solicitações de vaga:
// - com SHEETS_WEBHOOK_URL definida (.env.local): envia para a planilha do Google;
// - sem ela: grava em data/solicitacoes.jsonl (provisório, só funciona rodando local).
export async function POST(request: Request) {
  let body: { nome?: unknown; telefone?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const nome = typeof body.nome === "string" ? body.nome.trim() : "";
  const telefone = typeof body.telefone === "string" ? body.telefone.replace(/\D/g, "") : "";

  if (nome.length < 5 || nome.length > 120 || telefone.length < 10 || telefone.length > 11) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const registro: Registro = { nome, telefone, criadoEm: new Date().toISOString() };
  const webhook = process.env.SHEETS_WEBHOOK_URL;

  if (webhook) {
    after(() => enviarParaPlanilha(webhook, registro));
    return Response.json({ ok: true });
  }

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "solicitacoes.jsonl"), JSON.stringify(registro) + "\n", "utf8");

  return Response.json({ ok: true });
}
