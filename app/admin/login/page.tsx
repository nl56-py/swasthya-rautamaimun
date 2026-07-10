"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("Supabase env vars छैनन्, local preview admin खोल्दै।");
      router.push("/admin");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setStatus(error.message);
      return;
    }
    router.push("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 p-4">
      <form onSubmit={handleLogin} className="civic-card w-full max-w-md p-6">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-5">
          <Image src="/emblem.png" alt="Rautamai emblem" width={64} height={54} className="h-14 w-auto" />
          <div>
            <p className="text-sm font-bold text-[var(--civic-red)]">रौतामाई गाउँपालिका</p>
            <h1 className="text-2xl font-extrabold text-[var(--civic-navy)]">Admin Login</h1>
          </div>
        </div>
        <div className="mt-6 grid gap-4">
          <label className="admin-label">
            Email
            <span className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input className="admin-input pl-10" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </span>
          </label>
          <label className="admin-label">
            Password
            <span className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input className="admin-input pl-10" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </span>
          </label>
          {!isSupabaseConfigured && (
            <p className="rounded bg-amber-50 p-3 text-sm font-semibold text-amber-800">
              Local preview mode: Supabase keys configure गरेपछि real authentication चल्छ।
            </p>
          )}
          {status && <p className="rounded bg-slate-100 p-3 text-sm font-semibold text-slate-700">{status}</p>}
          <button disabled={loading} className="rounded-md bg-[var(--civic-blue)] px-4 py-3 font-bold text-white disabled:opacity-60">
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <Link href="/" className="text-center text-sm font-bold text-[var(--civic-red)]">Back to website</Link>
        </div>
      </form>
    </main>
  );
}
