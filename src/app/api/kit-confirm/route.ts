import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("passports")
    .update({ kit_confirmed: true, kit_confirmed_at: new Date().toISOString() })
    .eq("athlete_id", session.id);

  if (error) {
    return NextResponse.json({ error: "Erro ao confirmar." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
