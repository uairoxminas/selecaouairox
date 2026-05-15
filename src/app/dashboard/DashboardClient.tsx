"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Album from "@/components/Album";
import Countdown from "@/components/Countdown";

interface Props {
  session: { id: string; name: string; email: string };
  checkedDays: number[];
  currentDay: number;
  todayChecked: boolean;
  kitConfirmed: boolean;
  challengeStarted: boolean;
  totalDays: number;
  qualifyingDays: number;
  goldenFrom: number;
  challengeStart: string;
  drawDate: string;
}

export default function DashboardClient({
  session,
  checkedDays: initialCheckedDays,
  currentDay,
  todayChecked: initialTodayChecked,
  kitConfirmed: initialKitConfirmed,
  challengeStarted,
  totalDays,
  qualifyingDays,
  goldenFrom,
  challengeStart,
  drawDate,
}: Props) {
  const router = useRouter();
  const [checkedDays, setCheckedDays] = useState(initialCheckedDays);
  const [todayChecked, setTodayChecked] = useState(initialTodayChecked);
  const [kitConfirmed, setKitConfirmed] = useState(initialKitConfirmed);
  const [checkingIn, setCheckingIn] = useState(false);
  const [confirmingKit, setConfirmingKit] = useState(false);
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalChecked = checkedDays.length;
  const qualified = totalChecked >= qualifyingDays;
  const isGoldenPhase = currentDay >= goldenFrom;
  const challengeNotStarted = currentDay === 0;

  async function handleCheckIn() {
    if (checkingIn || todayChecked || challengeNotStarted) return;
    setCheckingIn(true);
    try {
      const res = await fetch("/api/checkin", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setCheckedDays((prev) => [...prev, currentDay]);
        setTodayChecked(true);
        setCheckinSuccess(true);
        setTimeout(() => setCheckinSuccess(false), 3000);
      } else {
        alert(data.error || "Erro no check-in.");
      }
    } catch {
      alert("Erro de conexão.");
    } finally {
      setCheckingIn(false);
    }
  }

  async function handleKitConfirm() {
    if (confirmingKit || kitConfirmed) return;
    setConfirmingKit(true);
    try {
      const res = await fetch("/api/kit-confirm", { method: "POST" });
      if (res.ok) setKitConfirmed(true);
    } catch {
      // silent
    } finally {
      setConfirmingKit(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-[#E8E6E1] px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-[0.15em] text-[#C9A84C] uppercase">Seleção</span>
            <span className="text-xs font-black tracking-[0.15em] text-[#1A1A1A] uppercase">UAIROX</span>
          </div>
          <p className="text-xs text-[#8A8A8A]">Olá, {session.name.split(" ")[0]}</p>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-[#8A8A8A]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute top-full right-4 mt-1 bg-white border border-[#E8E6E1] rounded-xl shadow-lg z-20 min-w-[160px]">
            <button
              onClick={() => { setMenuOpen(false); router.push("/setup"); }}
              className="w-full text-left px-4 py-3 text-sm text-[#1A1A1A] hover:bg-[#F0EFED]"
            >
              Meu Passaporte
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
            >
              Sair
            </button>
          </div>
        )}
      </header>

      <div className="max-w-md mx-auto px-4 pt-6 space-y-5">
        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-3 text-center">
            <p className="text-2xl font-black gold-text">{totalChecked}</p>
            <p className="text-xs text-[#8A8A8A] mt-0.5 font-medium">Dias</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-2xl font-black gold-text">{Math.max(0, qualifyingDays - totalChecked)}</p>
            <p className="text-xs text-[#8A8A8A] mt-0.5 font-medium">Faltam</p>
          </div>
          <div className="card p-3 text-center">
            <p className={`text-2xl font-black ${qualified ? "gold-text" : "text-[#1A1A1A]"}`}>
              {qualified ? "✓" : totalDays - currentDay}
            </p>
            <p className="text-xs text-[#8A8A8A] mt-0.5 font-medium">{qualified ? "Qualif." : "Restam"}</p>
          </div>
        </div>

        {/* Countdown */}
        <Countdown drawDate={drawDate} challengeStart={challengeStart} />

        {/* Check-in Card */}
        {challengeNotStarted ? (
          <div className="card p-6 text-center">
            <p className="text-sm text-[#8A8A8A]">O desafio começa em</p>
            <p className="text-lg font-bold text-[#1A1A1A] mt-1">11 de Junho de 2026</p>
            <p className="text-xs text-[#C9A84C] mt-2 font-semibold">PREPARE-SE.</p>
          </div>
        ) : (
          <div className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-[#8A8A8A] uppercase tracking-wider font-semibold">
                  {isGoldenPhase ? "Dia Dourado" : "Tarefa do Dia"}
                </p>
                <h2 className="text-lg font-bold text-[#1A1A1A] mt-0.5">Dia {currentDay}</h2>
              </div>
              {isGoldenPhase && <span className="text-2xl">★</span>}
            </div>

            <div className="bg-[#F0EFED] rounded-xl p-4 mb-5">
              <p className="text-sm font-semibold text-[#1A1A1A]">Corrida 1km + Treino do Dia</p>
              <p className="text-xs text-[#8A8A8A] mt-1">
                Complete sua corrida de pelo menos 1km registrada no Strava e marque @uairox no seu story.
              </p>
            </div>

            {checkinSuccess && (
              <div className="gold-gradient text-white text-center rounded-xl py-3 mb-4 text-sm font-bold tracking-wider">
                CHECK-IN REALIZADO! ★
              </div>
            )}

            <button
              onClick={handleCheckIn}
              disabled={checkingIn || todayChecked}
              className={`btn-gold w-full py-4 text-sm tracking-widest ${todayChecked ? "opacity-40 cursor-not-allowed" : "pulse-gold"}`}
            >
              {checkingIn ? "CONFIRMANDO..." : todayChecked ? "JÁ FIZ MEU CHECK-IN HOJE ✓" : "FAZER CHECK-IN"}
            </button>

            {todayChecked && (
              <p className="text-center text-xs text-[#8A8A8A] mt-2">Volte amanhã para o próximo dia.</p>
            )}
          </div>
        )}

        {/* Album */}
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="gold-bar" />
            <h2 className="text-sm font-bold tracking-wider uppercase text-[#1A1A1A]">Álbum de Constância</h2>
          </div>
          <Album
            checkedDays={checkedDays}
            currentDay={currentDay}
            totalDays={totalDays}
            goldenFrom={goldenFrom}
          />
          <div className="flex items-center gap-4 mt-4 text-xs text-[#8A8A8A]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border border-[#C9A84C] bg-[#C9A84C]/10 inline-block" />
              Concluído
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-gradient-to-br from-[#C9A84C] to-[#A07830] inline-block" />
              Dourado (31+)
            </span>
          </div>
        </div>

        {/* Kit Confirmation */}
        {!kitConfirmed ? (
          <div className="card p-5 border-[#C9A84C] border-2">
            <p className="text-xs font-semibold tracking-wider text-[#C9A84C] uppercase mb-2">Kit do Atleta</p>
            <p className="text-sm text-[#1A1A1A] mb-4">
              Recebeu sua Camisa Branca Seleção? Confirme o recebimento aqui.
            </p>
            <button
              onClick={handleKitConfirm}
              disabled={confirmingKit}
              className="btn-gold w-full py-3 text-sm tracking-widest"
            >
              {confirmingKit ? "CONFIRMANDO..." : "CONFIRMAR RECEBIMENTO"}
            </button>
          </div>
        ) : (
          <div className="card p-5 bg-gradient-to-br from-[rgba(201,168,76,0.06)] to-[rgba(232,201,106,0.10)]">
            <p className="text-sm text-center text-[#C9A84C] font-semibold">★ Kit confirmado. Veste a farda. ★</p>
          </div>
        )}
      </div>
    </div>
  );
}
