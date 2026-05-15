-- =============================================
-- SELEÇÃO UAIROX — Schema do Banco de Dados
-- Execute este script no SQL Editor do Supabase
-- =============================================

-- Habilitar extensão de UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabela de Atletas (pré-populada pelo checkout)
CREATE TABLE IF NOT EXISTS athletes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL,
  cpf         TEXT NOT NULL,
  name        TEXT NOT NULL,
  phone       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT athletes_email_cpf_unique UNIQUE (email, cpf)
);

-- Tabela de Passaportes (configuração única por atleta)
CREATE TABLE IF NOT EXISTS passports (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id        UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  strava_url        TEXT NOT NULL,
  instagram_url     TEXT NOT NULL,
  address           TEXT NOT NULL,
  city              TEXT NOT NULL,
  state             CHAR(2) NOT NULL,
  cep               TEXT NOT NULL,
  kit_confirmed     BOOLEAN NOT NULL DEFAULT FALSE,
  kit_confirmed_at  TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT passports_athlete_unique UNIQUE (athlete_id)
);

-- Tabela de Check-ins Diários
CREATE TABLE IF NOT EXISTS checkins (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id  UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  day_number  SMALLINT NOT NULL CHECK (day_number BETWEEN 1 AND 39),
  checked_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT checkins_athlete_day_unique UNIQUE (athlete_id, day_number)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_checkins_athlete_id ON checkins(athlete_id);
CREATE INDEX IF NOT EXISTS idx_checkins_day_number ON checkins(day_number);
CREATE INDEX IF NOT EXISTS idx_passports_athlete_id ON passports(athlete_id);

-- =============================================
-- RLS (Row Level Security) — Desabilitado pois
-- usamos service_role key no servidor.
-- Habilite apenas se usar anon key no cliente.
-- =============================================
ALTER TABLE athletes DISABLE ROW LEVEL SECURITY;
ALTER TABLE passports DISABLE ROW LEVEL SECURITY;
ALTER TABLE checkins DISABLE ROW LEVEL SECURITY;

-- =============================================
-- View Admin: Resumo por atleta
-- =============================================
CREATE OR REPLACE VIEW admin_athlete_summary AS
SELECT
  a.id,
  a.name,
  a.email,
  a.phone,
  COUNT(c.id) AS checkin_count,
  COUNT(c.id) >= 30 AS qualified,
  p.kit_confirmed,
  p.strava_url,
  p.instagram_url,
  p.cep,
  p.city,
  p.state
FROM athletes a
LEFT JOIN checkins c ON c.athlete_id = a.id
LEFT JOIN passports p ON p.athlete_id = a.id
GROUP BY a.id, a.name, a.email, a.phone, p.kit_confirmed, p.strava_url, p.instagram_url, p.cep, p.city, p.state
ORDER BY checkin_count DESC;

-- =============================================
-- Dados de Exemplo (remova em produção)
-- =============================================
-- INSERT INTO athletes (email, cpf, name, phone)
-- VALUES ('atleta@exemplo.com', '12345678900', 'João Silva', '(31) 99999-9999');
