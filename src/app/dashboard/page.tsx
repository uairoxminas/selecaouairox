export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentDayNumber, CHALLENGE_START, DRAW_DATE, TOTAL_DAYS, QUALIFYING_DAYS, GOLDEN_FROM } from "@/lib/constants";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();

  const [passportRes, checkinsRes] = await Promise.all([
    supabase.from("passports").select("kit_confirmed").eq("athlete_id", session.id).single(),
    supabase.from("checkins").select("day_number").eq("athlete_id", session.id).order("day_number"),
  ]);

  if (passportRes.error || !passportRes.data) redirect("/setup");

  const checkedDays: number[] = checkinsRes.data?.map((c: { day_number: number }) => c.day_number) ?? [];
  const currentDay = getCurrentDayNumber();
  const todayChecked = checkedDays.includes(currentDay);
  const kitConfirmed = passportRes.data.kit_confirmed;

  return (
    <DashboardClient
      session={session}
      checkedDays={checkedDays}
      currentDay={currentDay}
      todayChecked={todayChecked}
      kitConfirmed={kitConfirmed}
      challengeStarted={currentDay > 0}
      totalDays={TOTAL_DAYS}
      qualifyingDays={QUALIFYING_DAYS}
      goldenFrom={GOLDEN_FROM}
      challengeStart={CHALLENGE_START.toISOString()}
      drawDate={DRAW_DATE.toISOString()}
    />
  );
}
