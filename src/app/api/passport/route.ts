import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const body = await req.json();
  const { strava_url, instagram_url, address, city, state, cep } = body;

  if (!strava_url || !instagram_url || !address || !city || !state || !cep) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("passports").upsert(
    {
      athlete_id: session.id,
      strava_url,
      instagram_url,
      address,
      city,
      state,
      cep,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "athlete_id" }
  );

  if (error) {
    return NextResponse.json({ error: "Erro ao salvar passaporte." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
