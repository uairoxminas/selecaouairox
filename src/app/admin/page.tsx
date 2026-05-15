import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
import { QUALIFYING_DAYS } from "@/lib/constants";

interface AthleteRow {
  id: string;
  name: string;
  email: string;
  checkin_count: number;
  qualified: boolean;
}

export default async function AdminPage() {
  const supabase = createAdminClient();

  const [athletesRes, checkinsRes] = await Promise.all([
    supabase.from("athletes").select("id, name, email").order("name"),
    supabase.from("checkins").select("athlete_id, day_number"),
  ]);

  const athletes = athletesRes.data ?? [];
  const checkins = checkinsRes.data ?? [];

  const checkinMap: Record<string, number> = {};
  for (const c of checkins) {
    checkinMap[c.athlete_id] = (checkinMap[c.athlete_id] ?? 0) + 1;
  }

  const rows: AthleteRow[] = athletes.map((a) => ({
    id: a.id,
    name: a.name,
    email: a.email,
    checkin_count: checkinMap[a.id] ?? 0,
    qualified: (checkinMap[a.id] ?? 0) >= QUALIFYING_DAYS,
  }));

  const total = rows.length;
  const qualified = rows.filter((r) => r.qualified).length;
  const active = rows.filter((r) => r.checkin_count > 0).length;
  const retention = total > 0 ? Math.round((active / total) * 100) : 0;

  rows.sort((a, b) => b.checkin_count - a.checkin_count);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-xs tracking-[0.2em] text-[#C9A84C] uppercase font-semibold">Seleção UAIROX</p>
          <h1 className="text-3xl font-black mt-1">Dashboard Admin</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Inscritos", value: total },
            { label: "Ativos", value: active },
            { label: "Qualificados", value: qualified },
            { label: "Retenção", value: `${retention}%` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl p-4 text-center">
              <p className="text-3xl font-black gold-text">{value}</p>
              <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-[#3A3A3A]">
            <span className="col-span-5">Atleta</span>
            <span className="col-span-4">E-mail</span>
            <span className="col-span-2 text-center">Dias</span>
            <span className="col-span-1 text-center">Status</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-[#333] text-sm hover:bg-[#333] transition-colors"
            >
              <span className="col-span-5 font-medium truncate">{r.name}</span>
              <span className="col-span-4 text-gray-400 truncate text-xs">{r.email}</span>
              <span className="col-span-2 text-center font-bold" style={{ color: r.qualified ? "#C9A84C" : "white" }}>
                {r.checkin_count}/39
              </span>
              <span className="col-span-1 text-center text-lg">
                {r.qualified ? "★" : r.checkin_count > 0 ? "●" : "○"}
              </span>
            </div>
          ))}
          {rows.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">Nenhum atleta cadastrado.</div>
          )}
        </div>

        <p className="text-xs text-gray-600 mt-4 text-center">
          ★ Qualificado (30+ dias) · ● Ativo · ○ Sem check-in
        </p>
      </div>
    </div>
  );
}
