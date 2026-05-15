"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    strava_url: "",
    instagram_url: "",
    address: "",
    city: "",
    state: "",
    cep: "",
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/passport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao salvar. Tente novamente.");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-[#FAFAF8]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="gold-bar mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Passaporte do Atleta</h1>
          <p className="text-sm text-[#8A8A8A] mt-1">Configure seus dados uma única vez</p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1 rounded-full transition-all duration-500 ${
                  s <= step ? "gold-gradient" : "bg-[#E8E6E1]"
                }`}
              />
              <p className={`text-xs mt-1 font-medium ${s <= step ? "text-[#C9A84C]" : "text-[#8A8A8A]"}`}>
                {s === 1 ? "Perfis Digitais" : "Endereço"}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div className="card p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">
                    URL do Perfil Strava
                  </label>
                  <input
                    type="url"
                    value={form.strava_url}
                    onChange={(e) => set("strava_url", e.target.value)}
                    placeholder="https://www.strava.com/athletes/..."
                    required
                    className="input-field"
                  />
                  <p className="text-xs text-[#8A8A8A] mt-1">Para auditoria GPS dos 30 dias de corrida (1km mínimo)</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">
                    URL do Destaque Instagram
                  </label>
                  <input
                    type="url"
                    value={form.instagram_url}
                    onChange={(e) => set("instagram_url", e.target.value)}
                    placeholder="https://www.instagram.com/stories/highlights/..."
                    required
                    className="input-field"
                  />
                  <p className="text-xs text-[#8A8A8A] mt-1">Destaque com os vídeos marcando @uairox e @brave</p>
                </div>
              </div>

              <button
                type="button"
                disabled={!form.strava_url || !form.instagram_url}
                onClick={() => setStep(2)}
                className="btn-gold w-full py-4 text-sm tracking-widest"
              >
                PRÓXIMO
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="card p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">CEP</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.cep}
                    onChange={(e) => set("cep", e.target.value.replace(/\D/g, "").slice(0, 8))}
                    placeholder="00000000"
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">Endereço</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="Rua, número, complemento"
                    required
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">Cidade</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="Cidade"
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase mb-2">UF</label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => set("state", e.target.value.toUpperCase().slice(0, 2))}
                      placeholder="MG"
                      required
                      maxLength={2}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 text-sm font-semibold tracking-wider border border-[#E8E6E1] rounded-xl text-[#1A1A1A]"
                >
                  VOLTAR
                </button>
                <button
                  type="submit"
                  disabled={loading || !form.cep || !form.address || !form.city || !form.state}
                  className="btn-gold flex-1 py-4 text-sm tracking-widest"
                >
                  {loading ? "SALVANDO..." : "CONFIRMAR"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
