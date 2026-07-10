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
  galleryItems,
  institutions,
  notices,
  programs,
  reportItems,
  vaccinationSeed,
  nutritionSeed,
  familyHealthSeed
} from "@/lib/content";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type ModuleId =
  | "home"
  | "about"
  | "staff"
  | "institutions"
  | "programs"
  | "notices"
  | "reports"
  | "downloads"
  | "grievance"
  | "emergency"
  | "gallery"
  | "contact"
  | "charter"
  | "appointments"
  | "vaccination"
  | "nutrition"
  | "family_health";

type Submission = {
  id: string;
  full_name: string | null;
  phone: string | null;
  service?: string | null;
  category?: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

type ModuleConfig = {
  id: ModuleId;
  label: string;
  helper: string;
  table?: string;
  select?: string;
  seed: string;
  serialize?: (rows: Record<string, unknown>[]) => string;
  parse: (text: string) => Record<string, unknown>[];
};

const sections = [
  { id: "home", label: "Home Page", icon: Home },
  { id: "about", label: "हाम्रो बारेमा", icon: Users },
  { id: "staff", label: "प्रमुखहरु", icon: Users },
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
  { id: "appointments", label: "Appointments", icon: CalendarPlus },
  { id: "vaccination", label: "खोप सेवा विवरण", icon: FileText },
  { id: "nutrition", label: "पोषणको अवस्था", icon: FileText },
  { id: "family_health", label: "परिवार स्वास्थ्य अवस्था", icon: FileText }
] as const;

const overviewSeed = [
  `municipality | ${branchContact.municipality}`,
  `office | ${branchContact.office}`,
  `provinceLine | ${branchContact.provinceLine}`,
  `slogan | ${branchContact.slogan}`
].join("\n");

const aboutSeed =
  "रौतामाई गाउँपालिकाको स्वास्थ्य शाखाले स्वास्थ्य योजना, सेवा समन्वय, रोग नियन्त्रण, स्वास्थ्य शिक्षा र तथ्याङ्क प्रतिवेदनको काम गर्छ।";

const contactSeed = [
  `chief | ${branchContact.chief}`,
  `chiefTitle | ${branchContact.chiefTitle}`,
  `email | ${branchContact.email}`,
  `phone | ${branchContact.phone}`,
  `address | ${branchContact.address}`
].join("\n");

const moduleConfigs: Record<ModuleId, ModuleConfig> = {
  home: {
    id: "home",
    label: "Home Page",
    helper: "One setting per row: key | value. Saved in site_sections for header/home copy.",
    table: "site_sections",
    seed: overviewSeed,
    parse: (text) => [{ slug: "home", title: "Home Page", body: text, metadata: keyValueMetadata(text) }]
  },
  about: {
    id: "about",
    label: "हाम्रो बारेमा",
    helper: "Plain text introduction. Saved in site_sections.",
    table: "site_sections",
    seed: aboutSeed,
    parse: (text) => [{ slug: "about", title: "हाम्रो बारेमा", body: text, metadata: {} }]
  },
  staff: {
    id: "staff",
    label: "प्रमुखहरु",
    helper: "name | role | email | phone | photo_url",
    table: "staff",
    select: "name, role, email, phone, photo_url, sort_order",
    seed: `${branchContact.chief} | ${branchContact.chiefTitle} | ${branchContact.email} | ${branchContact.phone} | /ram.jfif`,
    serialize: (rows) => rows.map((row) => [row.name, row.role, row.email, row.phone, row.photo_url].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        name: parts[0],
        role: parts[1] ?? "",
        email: parts[2] ?? null,
        phone: parts[3] ?? null,
        photo_url: parts[4] ?? null,
        sort_order: index
      }))
  },
  institutions: {
    id: "institutions",
    label: "स्वास्थ्य संस्था",
    helper: "name | type | address | phone | service_time | map_url",
    table: "health_institutions",
    select: "name, type, address, phone, service_time, map_url, sort_order",
    seed: institutions.map((item) => [item.name, item.type, item.address, item.phone, item.serviceTime, ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.name, row.type, row.address, row.phone, row.service_time, row.map_url].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        name: parts[0],
        type: parts[1] ?? "",
        address: parts[2] ?? null,
        phone: parts[3] ?? null,
        service_time: parts[4] ?? null,
        map_url: parts[5] ?? null,
        sort_order: index
      }))
  },
  programs: {
    id: "programs",
    label: "कार्यक्रम सेवा",
    helper: "title | summary | icon",
    table: "programs",
    select: "title, summary, icon, sort_order",
    seed: programs.map((item) => [item.title, item.summary, ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.title, row.summary, row.icon].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0],
        summary: parts[1] ?? "",
        icon: parts[2] ?? null,
        sort_order: index
      }))
  },
  notices: {
    id: "notices",
    label: "सूचना प्रकाशन",
    helper: "title | category | published_at YYYY-MM-DD | body | file_url | is_featured true/false",
    table: "notices",
    select: "title, category, published_at, body, file_url, is_featured",
    seed: notices.map((item) => [item.title, item.category, item.date, item.body, "", "false"].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.title, row.category, row.published_at, row.body, row.file_url, row.is_featured].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts) => ({
        title: parts[0],
        category: parts[1] ?? "सूचना",
        published_at: normalizeDate(parts[2]),
        body: parts[3] ?? null,
        file_url: parts[4] ?? null,
        is_featured: parts[5] === "true"
      }))
  },
  reports: {
    id: "reports",
    label: "Data & Reports",
    helper: "title | category | file_url. Saved as downloads with category report.",
    table: "downloads",
    select: "title, category, file_url, sort_order",
    seed: reportItems.map((item) => [item, "report", ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.filter((row) => row.category === "report").map((row) => [row.title, row.category, row.file_url].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0],
        category: parts[1] ?? "report",
        file_url: parts[2] ?? null,
        sort_order: index
      }))
  },
  downloads: {
    id: "downloads",
    label: "Download Center",
    helper: "title | category | file_url",
    table: "downloads",
    select: "title, category, file_url, sort_order",
    seed: downloads.map((item) => [item.title, item.category, item.fileUrl ?? ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.filter((row) => row.category !== "report").map((row) => [row.title, row.category, row.file_url].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0],
        category: parts[1] ?? "फाराम",
        file_url: parts[2] ?? null,
        sort_order: index
      }))
  },
  grievance: {
    id: "grievance",
    label: "Grievance",
    helper: "Citizen grievance submissions appear below. Form intro text is saved in site_sections.",
    table: "site_sections",
    seed: "नागरिक गुनासो, सुझाव र प्रतिक्रिया यहाँबाट पठाउन सकिन्छ।",
    parse: (text) => [{ slug: "grievance", title: "Grievance", body: text, metadata: {} }]
  },
  emergency: {
    id: "emergency",
    label: "Emergency",
    helper: "title | phone | details",
    table: "emergency_contacts",
    select: "title, phone, details, sort_order",
    seed: emergencyContacts.map((item) => [item.title, item.phone, item.details].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.title, row.phone, row.details].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0],
        phone: parts[1] ?? "",
        details: parts[2] ?? null,
        sort_order: index
      }))
  },
  gallery: {
    id: "gallery",
    label: "Gallery",
    helper: "title | media_type photo/video | media_url | thumbnail_url",
    table: "gallery_items",
    select: "title, media_type, media_url, thumbnail_url, sort_order",
    seed: galleryItems.map((item) => [item, "photo", "", ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.title, row.media_type, row.media_url, row.thumbnail_url].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0],
        media_type: parts[1] ?? "photo",
        media_url: parts[2] ?? null,
        thumbnail_url: parts[3] ?? null,
        sort_order: index
      }))
  },
  contact: {
    id: "contact",
    label: "Contact",
    helper: "One setting per row: key | value. Saved in site_sections.",
    table: "site_sections",
    seed: contactSeed,
    parse: (text) => [{ slug: "contact", title: "Contact", body: text, metadata: keyValueMetadata(text) }]
  },
  charter: {
    id: "charter",
    label: "Citizen Charter",
    helper: "service | fee | service_time",
    table: "citizen_charter",
    select: "service, fee, service_time, sort_order",
    seed: citizenCharter.map((item) => [item.service, item.fee, item.time].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.service, row.fee, row.service_time].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        service: parts[0],
        fee: parts[1] ?? "",
        service_time: parts[2] ?? "",
        sort_order: index
      }))
  },
  appointments: {
    id: "appointments",
    label: "Appointments",
    helper: "Appointment submissions appear below. Form intro text is saved in site_sections.",
    table: "site_sections",
    seed: "नागरिकले उपलब्ध स्वास्थ्य सेवाका लागि अनलाइन appointment request पठाउन सक्छन्।",
    parse: (text) => [{ slug: "appointments", title: "Appointments", body: text, metadata: {} }]
  },
  vaccination: {
    id: "vaccination",
    label: "खोप सेवा विवरण",
    helper: "description | count_71_72 | count_72_73 | count_73_74 (Numbers or empty)",
    table: "vaccination_records",
    select: "description, count_71_72, count_72_73, count_73_74, sort_order",
    seed: vaccinationSeed.map((row) => [row.description, row.count_71_72 ?? "", row.count_72_73 ?? "", row.count_73_74 ?? ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.description, row.count_71_72 ?? "", row.count_72_73 ?? "", row.count_73_74 ?? ""].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        description: parts[0],
        count_71_72: parts[1] ? parseInt(parts[1], 10) : null,
        count_72_73: parts[2] ? parseInt(parts[2], 10) : null,
        count_73_74: parts[3] ? parseInt(parts[3], 10) : null,
        sort_order: index
      }))
  },
  nutrition: {
    id: "nutrition",
    label: "पोषणको अवस्था",
    helper: "indicator | count_71_72 | count_72_73 | count_73_74 (Numbers or empty)",
    table: "nutrition_status",
    select: "indicator, count_71_72, count_72_73, count_73_74, sort_order",
    seed: nutritionSeed.map((row) => [row.indicator, row.count_71_72 ?? "", row.count_72_73 ?? "", row.count_73_74 ?? ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.indicator, row.count_71_72 ?? "", row.count_72_73 ?? "", row.count_73_74 ?? ""].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        indicator: parts[0],
        count_71_72: parts[1] ? parseInt(parts[1], 10) : null,
        count_72_73: parts[2] ? parseInt(parts[2], 10) : null,
        count_73_74: parts[3] ? parseInt(parts[3], 10) : null,
        sort_order: index
      }))
  },
  family_health: {
    id: "family_health",
    label: "परिवार स्वास्थ्य अवस्था",
    helper: "ward_number | healthy | common_ill | chronic_ill | not_mentioned | total",
    table: "family_health_status",
    select: "ward_number, healthy, common_ill, chronic_ill, not_mentioned, total, sort_order",
    seed: familyHealthSeed.map((row) => [row.ward_number, row.healthy ?? "", row.common_ill ?? "", row.chronic_ill ?? "", row.not_mentioned ?? "", row.total ?? ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.ward_number, row.healthy ?? "", row.common_ill ?? "", row.chronic_ill ?? "", row.not_mentioned ?? "", row.total ?? ""].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        ward_number: parts[0],
        healthy: parts[1] ? parseInt(parts[1], 10) : null,
        common_ill: parts[2] ? parseInt(parts[2], 10) : null,
        chronic_ill: parts[3] ? parseInt(parts[3], 10) : null,
        not_mentioned: parts[4] ? parseInt(parts[4], 10) : null,
        total: parts[5] ? parseInt(parts[5], 10) : null,
        sort_order: index
      }))
  }
};

export default function AdminPage() {
  const router = useRouter();
  const [active, setActive] = useState<ModuleId>("home");
  const [moduleText, setModuleText] = useState<Record<ModuleId, string>>(() =>
    Object.fromEntries(Object.values(moduleConfigs).map((config) => [config.id, config.seed])) as Record<ModuleId, string>
  );
  const [status, setStatus] = useState("");
  const [checking, setChecking] = useState(isSupabaseConfigured);
  const [grievances, setGrievances] = useState<Submission[]>([]);
  const [appointments, setAppointments] = useState<Submission[]>([]);

  const config = moduleConfigs[active];

  useEffect(() => {
    async function boot() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setChecking(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/admin/login");
        return;
      }

      await Promise.all([loadEditableContent(), loadSubmissions()]);
      setChecking(false);
    }
    boot();
  }, [router]);

  const moduleCounts = useMemo(
    () => ({
      notices: rowCount(moduleText.notices),
      institutions: rowCount(moduleText.institutions),
      programs: rowCount(moduleText.programs),
      grievances: grievances.length,
      appointments: appointments.length
    }),
    [appointments.length, grievances.length, moduleText]
  );

  async function loadEditableContent() {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const updates: Partial<Record<ModuleId, string>> = {};
    const siteSectionIds: ModuleId[] = ["home", "about", "grievance", "contact", "appointments"];

    const { data: sectionRows } = await supabase.from("site_sections").select("slug, body");
    sectionRows?.forEach((row) => {
      const id = row.slug as ModuleId;
      if (siteSectionIds.includes(id)) updates[id] = row.body ?? "";
    });

    await Promise.all(
      Object.values(moduleConfigs)
        .filter((item) => item.table && item.table !== "site_sections" && item.select)
        .map(async (item) => {
          const { data } = await supabase.from(item.table!).select(item.select!).order("sort_order", { ascending: true });
          if (data?.length && item.serialize) updates[item.id] = item.serialize(data as unknown as Record<string, unknown>[]);
        })
    );

    setModuleText((current) => ({ ...current, ...updates }));
  }

  async function loadSubmissions() {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const [grievanceResult, appointmentResult] = await Promise.all([
      supabase.from("grievances").select("id, full_name, phone, category, message, status, created_at").order("created_at", { ascending: false }).limit(25),
      supabase.from("appointments").select("id, full_name, phone, service, message, status, created_at").order("created_at", { ascending: false }).limit(25)
    ]);

    if (grievanceResult.data) setGrievances(grievanceResult.data);
    if (appointmentResult.data) setAppointments(appointmentResult.data);
  }

  async function saveModule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving...");
    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("Local preview mode. Supabase configure गरेपछि यो module database मा save हुन्छ।");
      return;
    }

    const rows = config.parse(moduleText[active]).filter((row) => Object.values(row).some((value) => value !== "" && value !== null));
    if (!config.table) {
      setStatus("This module does not have a database table configured.");
      return;
    }

    if (config.table === "site_sections") {
      const { error } = await supabase.from("site_sections").upsert(rows);
      setStatus(error ? error.message : `${config.label} saved.`);
      return;
    }

    let deleteQuery = supabase.from(config.table).delete();
    if (active === "reports") {
      deleteQuery = deleteQuery.eq("category", "report");
    } else if (active === "downloads") {
      deleteQuery = deleteQuery.neq("category", "report");
    } else {
      deleteQuery = deleteQuery.neq("id", "00000000-0000-0000-0000-000000000000");
    }

    const { error: deleteError } = await deleteQuery;
    if (deleteError) {
      setStatus(deleteError.message);
      return;
    }

    if (rows.length > 0) {
      const { error: insertError } = await supabase.from(config.table).insert(rows);
      if (insertError) {
        setStatus(insertError.message);
        return;
      }
    }

    setStatus(`${config.label} saved to ${config.table}.`);
    await loadEditableContent();
  }

  async function updateSubmissionStatus(table: "grievances" | "appointments", id: string, nextStatus: string) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("Local preview mode. Status update needs Supabase.");
      return;
    }

    const { error } = await supabase.from(table).update({ status: nextStatus, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus(`${table} status updated.`);
    await loadSubmissions();
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
                  onClick={() => {
                    setActive(section.id);
                    setStatus("");
                  }}
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
              <h1 className="text-2xl font-extrabold text-[var(--civic-navy)]">{config.label}</h1>
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
                ["Notices", moduleCounts.notices],
                ["Institutions", moduleCounts.institutions],
                ["Programs", moduleCounts.programs],
                ["Grievances", moduleCounts.grievances],
                ["Appointments", moduleCounts.appointments]
              ].map(([label, value]) => (
                <div key={label} className="civic-card p-4">
                  <p className="text-sm font-bold text-slate-500">{label}</p>
                  <p className="mt-1 text-3xl font-extrabold text-[var(--civic-navy)]">{value}</p>
                </div>
              ))}
            </div>

            <div className="mb-5 grid gap-4 xl:grid-cols-2">
              <SubmissionList
                title="Latest Grievances"
                table="grievances"
                items={grievances}
                empty="No grievances yet."
                statuses={["new", "in_review", "resolved", "closed"]}
                onStatusChange={updateSubmissionStatus}
              />
              <SubmissionList
                title="Latest Appointments"
                table="appointments"
                items={appointments}
                empty="No appointment requests yet."
                statuses={["requested", "confirmed", "completed", "cancelled"]}
                onStatusChange={updateSubmissionStatus}
              />
            </div>

            <form onSubmit={saveModule} className="civic-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--civic-navy)]">{config.label} Editor</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{config.helper}</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-md bg-[var(--civic-blue)] px-4 py-2 font-bold text-white">
                  <Save size={18} /> Save Module
                </button>
              </div>

              <textarea
                className="admin-input mt-5 min-h-[360px] font-mono text-sm leading-7"
                value={moduleText[active]}
                onChange={(event) => setModuleText((current) => ({ ...current, [active]: event.target.value }))}
              />

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="button" onClick={loadEditableContent} className="rounded-md border border-slate-300 px-4 py-2 font-bold text-slate-700">
                  Reload from Database
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

function SubmissionList({
  title,
  table,
  items,
  empty,
  statuses,
  onStatusChange
}: {
  title: string;
  table: "grievances" | "appointments";
  items: Submission[];
  empty: string;
  statuses: string[];
  onStatusChange: (table: "grievances" | "appointments", id: string, nextStatus: string) => void;
}) {
  return (
    <div className="civic-card p-5">
      <h2 className="font-extrabold text-[var(--civic-navy)]">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 && <p className="text-sm font-semibold text-slate-500">{empty}</p>}
        {items.map((item) => (
          <article key={item.id} className="rounded border border-slate-200 bg-slate-50 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-extrabold">{item.full_name ?? "नाम उपलब्ध छैन"}</p>
              <select
                className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-bold text-slate-700"
                value={item.status}
                onChange={(event) => onStatusChange(table, item.id, event.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <p className="mt-1 text-sm text-slate-600">{item.service ?? item.category ?? "General"} | {item.phone ?? "No phone"}</p>
            <p className="mt-2 line-clamp-2 text-sm">{item.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function parseDelimited(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split("|").map((part) => emptyToNull(part.trim()) as string));
}

function keyValueMetadata(text: string) {
  return Object.fromEntries(parseDelimited(text).map(([key, value]) => [key, value ?? ""]));
}

function emptyToNull(value: string) {
  return value === "" ? null : value;
}

function normalizeDate(value: string | null | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date().toISOString().slice(0, 10);
  return value;
}

function rowCount(text: string) {
  return text.split("\n").filter((line) => line.trim()).length;
}
