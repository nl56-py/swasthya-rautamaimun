"use client";

import { FormEvent, useState } from "react";

export function SubmissionForm({
  endpoint,
  fields,
  textarea
}: {
  endpoint: string;
  fields: [string, string, string, boolean][];
  textarea: [string, string];
}) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setLoading(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setStatus(data?.error ?? "पठाउन सकेन। कृपया फेरि प्रयास गर्नुहोस्।");
      return;
    }
    form.reset();
    setStatus("तपाईंको विवरण सफलतापूर्वक प्राप्त भयो।");
  }

  return (
    <form className="civic-card max-w-3xl p-5" onSubmit={submit}>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map(([name, label, type, required]) => (
          <input key={name} name={name} type={type} className="admin-input" placeholder={label} required={required} />
        ))}
      </div>
      <textarea name={textarea[0]} className="admin-input mt-3 min-h-32" placeholder={textarea[1]} required />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button disabled={loading} className="rounded-md bg-[var(--civic-blue)] px-4 py-2 font-bold text-white disabled:opacity-60">
          {loading ? "Submitting..." : "Submit"}
        </button>
        {status && <p className="text-sm font-bold text-slate-600">{status}</p>}
      </div>
    </form>
  );
}
