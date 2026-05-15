"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Step = 1 | 2;

export default function InscricaoPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleCpf(v: string) {
    set("cpf", v.replace(/\D/g, "").slice(0, 11));
  }

  function handlePhone(v: string) {
    set("phone", v.replace(/\D/g, "").slice(0, 11));
  }

  function formatPhoneDisplay(v: string) {
    const d = v.replace(/\D/g, "");
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
  }

  function formatCpfDisplay(v: string) {
    if (v.length <= 3) return v;
    if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
    if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
    return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
  }

  const step1Valid = form.name.trim().length >= 3 && form.email.includes("@");
  const step2Valid = form.cpf.length === 11 && form.phone.length >= 10;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!step2Valid) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          cpf: form.cpf,
          phone: form.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao realizar inscrição.");
        return;
      }
      router.push("/setup");
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-[#FAFAF8]">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center border border-[#E8E6E1] rounded-xl px-8 py-4 mb-5">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#C9A84C] uppercase">Seleção</span>
            <div className="gold-bar my-2" />
            <span className="text-2xl font-black tracking-[0.15em] text-[#1A1A1A]">UAIROX</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Faça sua inscrição</h1>
          <p className="text-sm text-[#8A8A8A] mt-1">39 dias. Uma vaga na elite.</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-7">
          <div className={`h-1 flex-1 rounded-full transition-all ${step >= 1 ? "gold-gradient" : "bg-[#E8E6E1]"}`} />
          <div className={`h-1 flex-1 rounded-full transition-all ${step >= 2 ? "gold-gradient" : "bg-[#E8E6E1]"}`} />
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Seu nome completo"
                  autoComplete="name"
                  className="input-field"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  className="input-field"
                />
              </div>
              <button
                type="button"
                disabled={!step1Valid}
                onClick={() => setStep(2)}
                className="btn-gold w-full py-4 text-sm tracking-widest mt-2"
              >
                PRÓXIMO
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatCpfDisplay(form.cpf)}
                  onChange={(e) => handleCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="input-field"
                  autoFocus
                />
                <p className="text-xs text-[#8A8A8A] mt-1">Usado para acessar sua conta</p>
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">
                  WhatsApp
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatPhoneDisplay(form.phone)}
                  onChange={(e) => handlePhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  autoComplete="tel"
                  className="input-field"
                />
                <p className="text-xs text-[#8A8A8A] mt-1">Para alertas de constância</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => { setStep(1); setError(""); }}
                  className="flex-1 py-4 text-sm font-semibold tracking-wider border border-[#E8E6E1] rounded-xl text-[#1A1A1A]"
                >
                  VOLTAR
                </button>
                <button
                  type="submit"
                  disabled={loading || !step2Valid}
                  className="btn-gold flex-1 py-4 text-sm tracking-widest"
                >
                  {loading ? "INSCREVENDO..." : "CONFIRMAR"}
                </button>
              </div>
            </div>
          )}
        </form>

        <p className="text-center text-xs text-[#8A8A8A] mt-7">
          Já tem conta?{" "}
          <Link href="/login" className="text-[#C9A84C] font-semibold">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
