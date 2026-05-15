import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

interface AthleteInput {
  email: string;
  cpf: string;
  name: string;
  phone?: string;
}

export async function POST(req: NextRequest) {
  const adminCookie = req.cookies.get("uairox_admin")?.value;
  if (adminCookie !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { athletes }: { athletes: AthleteInput[] } = await req.json();

  if (!Array.isArray(athletes) || athletes.length === 0) {
    return NextResponse.json({ error: "Lista de atletas vazia." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const rows = athletes.map((a) => ({
    email: a.email.trim().toLowerCase(),
    cpf: a.cpf.replace(/\D/g, ""),
    name: a.name.trim(),
    phone: a.phone?.trim() || null,
  }));

  const { data, error } = await supabase
    .from("athletes")
    .upsert(rows, { onConflict: "email,cpf", ignoreDuplicates: true })
    .select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, inserted: data?.length ?? 0, total: rows.length });
}
