import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { encodeSession, COOKIE_NAME_EXPORT as COOKIE_NAME, MAX_AGE_EXPORT as MAX_AGE } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { name, email, cpf, phone } = await req.json();

  if (!name || !email || !cpf || !phone) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
  }

  const cleanCpf = cpf.replace(/\D/g, "");
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanCpf.length !== 11) {
    return NextResponse.json({ error: "CPF inválido." }, { status: 400 });
  }

  if (cleanPhone.length < 10) {
    return NextResponse.json({ error: "WhatsApp inválido." }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Verifica se já existe inscrição com esse e-mail OU CPF
  const { data: existing } = await supabase
    .from("athletes")
    .select("id, name, email")
    .or(`email.eq.${cleanEmail},cpf.eq.${cleanCpf}`)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "Este e-mail ou CPF já está inscrito. Acesse com suas credenciais na tela de login." },
      { status: 409 }
    );
  }

  const { data: athlete, error } = await supabase
    .from("athletes")
    .insert({ name: name.trim(), email: cleanEmail, cpf: cleanCpf, phone: cleanPhone })
    .select("id, name, email")
    .single();

  if (error || !athlete) {
    return NextResponse.json({ error: "Erro ao realizar inscrição. Tente novamente." }, { status: 500 });
  }

  // Inicia sessão automaticamente após inscrição
  const token = encodeSession({ id: athlete.id, name: athlete.name, email: athlete.email });
  const res = NextResponse.json({ ok: true });

  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  return res;
}
