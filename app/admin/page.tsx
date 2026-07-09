"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Building2,
  CalendarPlus,
  Download,
  FileText,
  Home,
  LogOut,
  Megaphone,
  MessageSquare,
  Save,
  Stethoscope,
  Users
} from "lucide-react";
import {
  branchContact,
  citizenCharter,
  downloads,
  emergencyContacts,
  institutions,
  notices,
  programs
} from "@/lib/content";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", label: "Home Page", icon: Home },
  { id: "about", label: "हाम्रो बारेमा", icon: Users },
  { id: "institutions", label: "स्वास्थ्य संस्था", icon: Building2 },
  { id: "programs", label: "कार्यक्रम सेवा", icon: Stethoscope },
  { id: "notices", label: "सूचना प्रकाशन", icon: Megaphone },
  { id: "reports", label: "Data & Reports", icon: FileText },
  { id: "downloads", label: "Download Center", icon: Download },
  { id: "grievance", label: "Grievance", icon: MessageSquare },
  { id: "emergency", label: "Emergency", icon: Bell },
  { id: "gallery", label: "Gallery", icon: FileText },
  { id: "contact", label: "Contact", icon: Users },
  { id: "charter", label: "Citizen Charter", icon: FileText },
  { id: "appointments", label: "Appointments", icon: CalendarPlus }
];

const initialEditor = {
  introduction:
    "रौतामाई गाउँपालिकाको स्वास्थ्य शाखाले स्वास्थ्य योजना, सेवा समन्वय, रोग नियन्त्रण, स्वास्थ्य शिक्षा र तथ्यांक प्रतिवेदनको काम गर्छ।",
  chief: branchContact.chief,
  email: branchContact.email,
  phone: branchContact.phone,
  notices: notices.map((item) => `${item.title} | ${item.category} | ${item.date}`).join("\n"),
  institutions: institutions.map((item) => `${item.name} | ${item.type} | ${item.serviceTime}`).join("\n"),
  programs: programs.map((item) => `${item.title} | ${item.summary}`).join("\n"),
  downloads: downloads.join("\n"),
  emergency: emergencyContacts.map((item) => `${item.title} | ${item.phone} | ${item.details}`).join("\n"),
  charter: citizenCharter.map((item) => `${item.service} | ${item.fee} | ${item.time}`).join("\n"),
  gallery: "स्वास्थ्य शिविर\nखोप अभियान\nस्वास्थ्य सचेतना भिडियो",
  reports: "HMIS रिपोर्ट\nस्वास्थ्य सूचकहरू\nमासिक, त्रैमासिक तथा वार्षिक प्रतिवेदन\nDashboard"
};

type EditorState = typeof initialEditor;

export default function AdminPage() {
  const router = useRouter();
  const [active, setActive] = useState("home");
  const [editor, setEditor] = useState<EditorState>(initialEditor);
  const [status, setStatus] = useState("");
  const [checking, setChecking] = useState(isSupabaseConfigured);

  useEffect(() => {
    async function checkAuth() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setChecking(false);
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (!data.session) router.push("/admin/login");
      setChecking(false);
    }
    checkAuth();
  }, [router]);

  const activeTitle = useMemo(() => sections.find((section) => section.id === active)?.label ?? "Editor", [active]);

  async function saveSection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving...");
    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("Local preview saved in browser state. Supabase configure गरेपछि database update हुनेछ।");
      return;
    }

    const { error } = await supabase.from("site_sections").upsert({
      slug: active,
      title: activeTitle,
      body: JSON.stringify(editor),
      metadata: { editor }
    });

    setStatus(error ? error.message : `${activeTitle} saved to Supabase.`);
  }

  async function signOut() {
    const supabase = getSupabaseClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (checking) {
    return <main className="grid min-h-screen place-items-center bg-slate-100 font-bold text-[var(--civic-navy)]">Checking session...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="bg-[var(--civic-navy)] text-white">
          <div className="flex items-center gap-3 border-b border-white/10 p-5">
            <Image src="/emblem.png" alt="Rautamai emblem" width={54} height={45} className="h-12 w-auto" />
            <div>
              <p className="text-sm text-white/70">स्वास्थ्य शाखा</p>
              <p className="font-extrabold">Admin Panel</p>
            </div>
          </div>
          <nav className="grid gap-1 p-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActive(section.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-bold hover:bg-white/10",
                    active === section.id && "bg-[var(--civic-red)]"
                  )}
                >
                  <Icon size={17} />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <section>
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white p-5">
            <div>
              <p className="text-sm font-bold text-[var(--civic-red)]">Content Management</p>
              <h1 className="text-2xl font-extrabold text-[var(--civic-navy)]">{activeTitle}</h1>
            </div>
            <div className="flex gap-2">
              <Link href="/" className="rounded-md border border-slate-300 px-3 py-2 font-bold text-slate-700">View Site</Link>
              <button onClick={signOut} className="inline-flex items-center gap-2 rounded-md bg-[var(--civic-red)] px-3 py-2 font-bold text-white">
                <LogOut size={17} /> Sign out
              </button>
            </div>
          </header>

          <div className="p-5">
            {!isSupabaseConfigured && (
              <div className="mb-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
                Supabase env vars missing. This admin panel is running in local preview mode.
              </div>
            )}

            <div className="mb-5 grid gap-4 md:grid-cols-5">
              {[
                ["Notices", notices.length],
                ["Institutions", institutions.length],
                ["Programs", programs.length],
                ["Emergency", emergencyContacts.length],
                ["Downloads", downloads.length]
              ].map(([label, value]) => (
                <div key={label} className="civic-card p-4">
                  <p className="text-sm font-bold text-slate-500">{label}</p>
                  <p className="mt-1 text-3xl font-extrabold text-[var(--civic-navy)]">{value}</p>
                </div>
              ))}
            </div>

            <form onSubmit={saveSection} className="civic-card p-5">
              <div className="grid gap-4 lg:grid-cols-2">
                <TextField label="Health branch introduction" value={editor.introduction} onChange={(value) => setEditor({ ...editor, introduction: value })} textarea />
                <div className="grid gap-4">
                  <TextField label="Health unit chief" value={editor.chief} onChange={(value) => setEditor({ ...editor, chief: value })} />
                  <TextField label="Email" value={editor.email} onChange={(value) => setEditor({ ...editor, email: value })} />
                  <TextField label="Phone" value={editor.phone} onChange={(value) => setEditor({ ...editor, phone: value })} />
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <SectionEditor active={active} editor={editor} setEditor={setEditor} />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-md bg-[var(--civic-blue)] px-4 py-2 font-bold text-white">
                  <Save size={18} /> Save {activeTitle}
                </button>
                {status && <p className="font-semibold text-slate-600">{status}</p>}
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionEditor({
  active,
  editor,
  setEditor
}: {
  active: string;
  editor: EditorState;
  setEditor: (state: EditorState) => void;
}) {
  const map: Record<string, keyof EditorState> = {
    home: "notices",
    about: "introduction",
    institutions: "institutions",
    programs: "programs",
    notices: "notices",
    reports: "reports",
    downloads: "downloads",
    grievance: "introduction",
    emergency: "emergency",
    gallery: "gallery",
    contact: "introduction",
    charter: "charter",
    appointments: "programs"
  };
  const key = map[active] ?? "introduction";
  return (
    <TextField
      label={`${active} content rows`}
      value={editor[key]}
      onChange={(value) => setEditor({ ...editor, [key]: value })}
      textarea
      helper="Use one row per item. Separate columns with | for list sections."
    />
  );
}

function TextField({
  label,
  value,
  onChange,
  textarea,
  helper
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  helper?: string;
}) {
  return (
    <label className="admin-label">
      {label}
      {textarea ? (
        <textarea className="admin-input min-h-44" value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className="admin-input" value={value} onChange={(event) => onChange(event.target.value)} />
      )}
      {helper && <span className="text-xs font-medium text-slate-500">{helper}</span>}
    </label>
  );
}
