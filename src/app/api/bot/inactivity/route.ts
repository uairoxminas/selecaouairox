import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentDayNumber, CHALLENGE_START } from "@/lib/constants";

// Chamado por um cron job (ex: Vercel Cron ou GitHub Actions)
// Autenticado via cabeçalho Authorization: Bearer <ADMIN_SECRET>
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const currentDay = getCurrentDayNumber();
  if (currentDay < 4 || new Date() < CHALLENGE_START) {
    return NextResponse.json({ skipped: true, reason: "Cedo demais para alertas." });
  }

  const supabase = createAdminClient();

  // Atletas sem check-in nos últimos 3 dias
  const threeDaysAgo = currentDay - 2;
  if (threeDaysAgo < 1) return NextResponse.json({ skipped: true });

  const { data: athletes } = await supabase.from("athletes").select("id, name, phone, email");
  const { data: checkins } = await supabase
    .from("checkins")
    .select("athlete_id, day_number")
    .gte("day_number", threeDaysAgo);

  const activeIds = new Set(checkins?.map((c: { athlete_id: string }) => c.athlete_id) ?? []);
  const inactive = (athletes ?? []).filter((a: { id: string }) => !activeIds.has(a.id));

  const alerts: string[] = [];

  for (const athlete of inactive) {
    if (!athlete.phone) continue;

    // Integração Z-API / Twilio aqui
    // await sendWhatsApp(athlete.phone, `Oi ${athlete.name}! 🏃‍♂️ Faz 3 dias sem check-in. Não desista da Seleção UAIROX — você está quase lá!`)
    alerts.push(athlete.id);
  }

  return NextResponse.json({ ok: true, alerted: alerts.length, total_inactive: inactive.length });
}
