import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentDayNumber, CHALLENGE_START, CHALLENGE_END } from "@/lib/constants";

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const now = new Date();
  if (now < CHALLENGE_START) {
    return NextResponse.json({ error: "O desafio ainda não começou." }, { status: 400 });
  }
  if (now > CHALLENGE_END) {
    return NextResponse.json({ error: "O desafio já encerrou." }, { status: 400 });
  }

  const dayNumber = getCurrentDayNumber();
  if (dayNumber < 1) {
    return NextResponse.json({ error: "Dia inválido." }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("checkins")
    .select("id")
    .eq("athlete_id", session.id)
    .eq("day_number", dayNumber)
    .single();

  if (existing) {
    return NextResponse.json({ error: "Check-in já realizado hoje." }, { status: 409 });
  }

  const { error } = await supabase.from("checkins").insert({
    athlete_id: session.id,
    day_number: dayNumber,
    checked_at: now.toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: "Erro ao registrar check-in." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, day: dayNumber });
}
