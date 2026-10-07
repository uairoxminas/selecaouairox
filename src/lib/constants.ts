export const CHALLENGE_START = new Date("2026-05-15T00:00:00-03:00"); // TESTE — reverter para 2026-06-11 antes do lançamento
export const CHALLENGE_END = new Date("2026-06-22T23:59:59-03:00");   // TESTE — reverter para 2026-07-19
export const DRAW_DATE = new Date("2026-06-24T20:00:00-03:00");       // TESTE — reverter para 2026-07-21
export const TOTAL_DAYS = 39;
export const QUALIFYING_DAYS = 30;
export const GOLDEN_FROM = 31;

export function getCurrentDayNumber(): number {
  const now = new Date();
  const diff = now.getTime() - CHALLENGE_START.getTime();
  if (diff < 0) return 0;
  const day = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  return Math.min(day, TOTAL_DAYS);
}

export function isGoldenDay(day: number): boolean {
  return day >= GOLDEN_FROM;
}

export function formatCPF(cpf: string): string {
  return cpf.replace(/\D/g, "").slice(0, 11);
}
