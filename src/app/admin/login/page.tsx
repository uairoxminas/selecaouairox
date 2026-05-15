"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Senha incorreta.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#1A1A1A]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.2em] text-[#C9A84C] uppercase font-semibold">Seleção UAIROX</p>
          <h1 className="text-2xl font-bold text-white mt-2">Admin</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Senha de administrador"
            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl text-white placeholder-gray-500 outline-none focus:border-[#C9A84C]"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full py-4 text-sm tracking-widest rounded-xl">
            {loading ? "..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
