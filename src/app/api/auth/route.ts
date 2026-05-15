import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { encodeSession, COOKIE_NAME_EXPORT as COOKIE_NAME, MAX_AGE_EXPORT as MAX_AGE } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { email, cpf } = await req.json();

  if (!email || !cpf) {
    return NextResponse.json({ error: "E-mail e CPF são obrigatórios." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("athletes")
    .select("id, name, email")
    .eq("email", email.toLowerCase().trim())
    .eq("cpf", cpf.replace(/\D/g, ""))
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Credenciais não encontradas. Verifique e-mail e CPF da inscrição." }, { status: 401 });
  }

  const { data: passport } = await supabase
    .from("passports")
    .select("id")
    .eq("athlete_id", data.id)
    .single();

  const token = encodeSession({ id: data.id, name: data.name, email: data.email });
  const res = NextResponse.json({ ok: true, hasPassport: !!passport });

  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
