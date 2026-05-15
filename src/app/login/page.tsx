"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleCpf(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 11);
    setCpf(digits);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), cpf: cpf.replace(/\D/g, "") }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Credenciais inválidas.");
        return;
      }
      router.push(data.hasPassport ? "/dashboard" : "/setup");
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#FAFAF8]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex flex-col items-center border border-[#E8E6E1] rounded-xl px-8 py-4 mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#C9A84C] uppercase">Seleção</span>
            <div className="gold-bar my-2" />
            <span className="text-2xl font-black tracking-[0.15em] text-[#1A1A1A]">UAIROX</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Acesse sua conta</h1>
          <p className="text-sm text-[#8A8A8A] mt-1">Use o e-mail e CPF da sua inscrição</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">
              CPF
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={cpf}
              onChange={(e) => handleCpf(e.target.value)}
              placeholder="Apenas números"
              required
              maxLength={11}
              className="input-field"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || cpf.length < 11}
            className="btn-gold w-full py-4 text-sm tracking-widest rounded-xl mt-2"
          >
            {loading ? "VERIFICANDO..." : "ENTRAR"}
          </button>
        </form>

        <p className="text-center text-xs text-[#8A8A8A] mt-8 leading-relaxed">
          Dificuldades? Entre em contato com o suporte UAIROX.
        </p>
      </div>
    </div>
  );
}
