"use client";

import { useState, useEffect } from "react";

interface Props {
  drawDate: string;
  challengeStart: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown({ drawDate, challengeStart }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const draw = new Date(drawDate).getTime();
    const start = new Date(challengeStart).getTime();

    function tick() {
      const now = Date.now();
      setStarted(now >= start);
      const diff = draw - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [drawDate, challengeStart]);

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="gold-bar" />
        <h2 className="text-sm font-bold tracking-wider uppercase text-[#1A1A1A]">Sorteio da Esteira Brave</h2>
      </div>
      <p className="text-xs text-[#8A8A8A] mb-4">
        {started
          ? "Sorteio exclusivo entre quem completar o álbum (30/39) — 21 de Julho"
          : "O desafio começa em 11 de Junho. O sorteio é em 21 de Julho."}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {[
          { value: timeLeft.days, label: "DIAS" },
          { value: timeLeft.hours, label: "HORAS" },
          { value: timeLeft.minutes, label: "MIN" },
          { value: timeLeft.seconds, label: "SEG" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center bg-[#F0EFED] rounded-xl py-3">
            <p className="text-2xl font-black text-[#1A1A1A] tabular-nums">{pad(value)}</p>
            <p className="text-[10px] font-semibold tracking-widest text-[#8A8A8A] mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-[#C9A84C] font-semibold mt-3 tracking-wide">
        PRÊMIO: R$ 6.000 — ESTEIRA CURVA BRAVE
      </p>
    </div>
  );
}
