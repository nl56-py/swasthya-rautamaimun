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
      setStatus("प्रणाली त्रुटि: Supabase setup अझै पुरा भएको छैन। (.env.local missing values)");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setStatus(`त्रुटि: ${error.message}`);
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
              <input className="admin-input !pl-10" type="email" placeholder="email@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </span>
          </label>
          <label className="admin-label">
            Password
            <span className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input className="admin-input !pl-10" type="password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </span>
          </label>
          {status && <p className="rounded bg-red-50 p-3 text-sm font-semibold text-red-800 border border-red-200">{status}</p>}
          <button disabled={loading} className="rounded-md bg-[var(--civic-blue)] px-4 py-3 font-bold text-white disabled:opacity-60 cursor-pointer hover:bg-opacity-90 transition-colors">
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <Link href="/" className="text-center text-sm font-bold text-[var(--civic-red)]">Back to website</Link>
        </div>
      </form>
    </main>
  );
}

