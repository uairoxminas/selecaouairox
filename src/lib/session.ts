import { cookies } from "next/headers";

const COOKIE_NAME = "uairox_session";
const MAX_AGE = 60 * 60 * 24 * 50;

export interface AthleteSession {
  id: string;
  name: string;
  email: string;
}

export async function getSession(): Promise<AthleteSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

export function encodeSession(session: AthleteSession): string {
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

export const COOKIE_NAME_EXPORT = COOKIE_NAME;
export const MAX_AGE_EXPORT = MAX_AGE;
