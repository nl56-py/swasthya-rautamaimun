"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Bell,
  CalendarPlus,
  Download,
  FileText,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  Phone,
  ShieldAlert,
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

const navItems = [
  "गृहपृष्ठ",
  "हाम्रो बारेमा",
  "स्वास्थ्य संस्था",
  "कार्यक्रम तथा सेवा",
  "सूचना प्रकाशन",
  "तथ्यांक",
  "डाउनलोड",
  "गुनासो",
  "सम्पर्क"
];

export default function HomePage() {
  return (
    <main>
      <TopStrip />
      <Header />
      <NavBar />
      <Hero />
      <NoticeNews />
      <AboutSection />
      <InstitutionSection />
      <ProgramsSection />
      <ReportsDownloads />
      <FormsSection />
      <EmergencySection />
      <GalleryContact />
      <CitizenCharter />
      <Footer />
    </main>
  );
}

function TopStrip() {
  return (
    <div className="bg-[var(--civic-red)] text-white">
      <div className="container-civic flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
        <div className="flex flex-wrap gap-4">
          <span className="inline-flex items-center gap-2"><Phone size={15} /> {branchContact.phone}</span>
          <span className="inline-flex items-center gap-2"><Mail size={15} /> {branchContact.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>नेपाली | English</span>
          <Image src="/np_flag.gif" alt="Nepal flag" width={28} height={38} className="h-9 w-auto" />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-white">
      <div className="container-civic flex items-center justify-between gap-4 py-5">
        <div className="flex items-center gap-4">
          <Image src="/emblem.png" alt="Rautamai emblem" width={86} height={72} className="h-20 w-auto" priority />
          <div>
            <p className="text-sm font-bold text-[var(--civic-red)]">रौतामाई गाउँपालिका</p>
            <h1 className="text-2xl font-extrabold leading-tight text-[var(--civic-navy)] md:text-4xl">
              स्वास्थ्य शाखा
            </h1>
            <p className="mt-1 text-sm font-semibold text-slate-600">गाउँ कार्यपालिकाको कार्यालय | स्वास्थ्य सेवा सूचना प्रणाली</p>
          </div>
        </div>
        <div className="hidden text-right md:block">
          <p className="font-bold text-[var(--civic-navy)]">{branchContact.chiefTitle}</p>
          <p>{branchContact.chief}</p>
          <p className="text-sm text-slate-600">{branchContact.email}</p>
        </div>
      </div>
    </header>
  );
}

function NavBar() {
  return (
    <nav className="sticky top-0 z-30 bg-[var(--civic-blue)] text-white shadow-lg">
      <div className="container-civic flex items-center justify-between">
        <div className="hidden flex-wrap md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className="border-r border-white/15 px-4 py-3 text-sm font-bold hover:bg-[var(--civic-red)]">
              {item}
            </a>
          ))}
        </div>
        <button className="flex items-center gap-2 py-3 font-bold md:hidden">
          <Menu size={20} /> मेनु
        </button>
        <Link href="/admin/login" className="bg-[var(--civic-red)] px-4 py-3 text-sm font-bold hover:bg-red-700">
          Admin Panel
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="गृहपृष्ठ" className="bg-white">
      <div className="container-civic grid gap-6 py-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="civic-card overflow-hidden">
          <div className="bg-[var(--civic-navy)] px-5 py-3 text-white">
            <p className="text-sm font-bold">स्वास्थ्य शाखाको परिचय</p>
          </div>
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_220px]">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-[var(--civic-navy)]">
                समुदायमै गुणस्तरीय, पहुँचयोग्य र उत्तरदायी स्वास्थ्य सेवा
              </h2>
              <p className="mt-4 leading-8 text-slate-700">
                रौतामाई गाउँपालिकाको स्वास्थ्य शाखाले स्वास्थ्य संस्था समन्वय, मातृ तथा शिशु स्वास्थ्य, खोप, पोषण,
                रोग नियन्त्रण, स्वास्थ्य तथ्यांक, आपतकालीन सेवा सूचना र नागरिक गुनासो व्यवस्थापनका कार्यहरू सञ्चालन गर्छ।
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#Online Appointment" className="rounded-md bg-[var(--civic-red)] px-4 py-2 font-bold text-white">Appointment Request</a>
                <a href="#गुनासो" className="rounded-md border border-[var(--civic-blue)] px-4 py-2 font-bold text-[var(--civic-blue)]">गुनासो पठाउनुहोस्</a>
              </div>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-center">
              <Image src="/ram.jfif" alt="Health unit chief" width={180} height={176} className="mx-auto h-40 w-40 rounded-md object-cover" />
              <p className="mt-3 font-extrabold text-[var(--civic-navy)]">{branchContact.chief}</p>
              <p className="text-sm text-slate-600">{branchContact.chiefTitle}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          {emergencyContacts.slice(0, 3).map((item) => (
            <div key={item.title} className="civic-card border-l-4 border-l-[var(--civic-red)] p-4">
              <p className="text-sm font-bold text-slate-500">{item.title}</p>
              <p className="mt-1 text-2xl font-extrabold text-[var(--civic-navy)]">{item.phone}</p>
              <p className="text-sm text-slate-600">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NoticeNews() {
  return (
    <section id="सूचना प्रकाशन" className="py-10">
      <div className="container-civic grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <div className="civic-card p-5">
          <h2 className="section-title">प्रमुख सूचना तथा समाचार</h2>
          <div className="mt-5 grid gap-4">
            {notices.map((notice) => (
              <article key={notice.title} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded bg-[var(--civic-red)] px-2 py-1 font-bold text-white">{notice.category}</span>
                  <span className="font-semibold text-slate-500">{notice.date}</span>
                </div>
                <h3 className="mt-2 text-lg font-extrabold text-[var(--civic-navy)]">{notice.title}</h3>
                <p className="mt-1 text-slate-600">{notice.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="civic-card p-5">
          <h2 className="section-title">Notice Board</h2>
          <div className="mt-5 space-y-3">
            {["परिपत्र", "निर्देशिका", "कार्यविधि", "वार्षिक प्रतिवेदन", "स्वास्थ्य प्रोफाइल"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-3 py-3">
                <span className="font-bold">{item}</span>
                <FileText size={18} className="text-[var(--civic-red)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="हाम्रो बारेमा" className="bg-white py-10">
      <div className="container-civic grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="section-title">हाम्रो बारेमा</h2>
          <p className="mt-5 leading-8 text-slate-700">
            स्वास्थ्य शाखाले पालिकाभित्र स्वास्थ्य सेवा योजना, स्वास्थ्य संस्था सुपरिवेक्षण, जनस्वास्थ्य अभियान,
            तथ्यांक संकलन तथा प्रतिवेदन, स्वास्थ्य शिक्षा र आकस्मिक स्वास्थ्य समन्वयको काम गर्छ।
          </p>
        </div>
        <div className="civic-card p-5">
          <h3 className="font-extrabold text-[var(--civic-navy)]">संगठन संरचना</h3>
          <div className="mt-4 grid gap-3 text-center sm:grid-cols-3">
            {["गाउँपालिका", "स्वास्थ्य शाखा", "स्वास्थ्य संस्था/सेवा केन्द्र"].map((item) => (
              <div key={item} className="rounded border border-slate-200 bg-slate-50 p-4 font-bold">{item}</div>
            ))}
          </div>
          <div className="mt-4 rounded-md bg-[var(--civic-blue)] p-4 text-white">
            <p className="font-bold">कर्मचारी विवरण तथा सम्पर्क</p>
            <p className="mt-1">{branchContact.chief} - {branchContact.chiefTitle}</p>
            <p>{branchContact.phone} | {branchContact.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstitutionSection() {
  return (
    <section id="स्वास्थ्य संस्था" className="py-10">
      <div className="container-civic">
        <h2 className="section-title">स्वास्थ्य संस्थाहरूको विवरण</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {institutions.map((item) => (
            <div key={item.name} className="civic-card p-5">
              <MapPin className="text-[var(--civic-red)]" />
              <h3 className="mt-3 font-extrabold text-[var(--civic-navy)]">{item.name}</h3>
              <p className="text-sm font-bold text-slate-500">{item.type}</p>
              <p className="mt-3 text-sm text-slate-600">{item.address}</p>
              <p className="mt-2 text-sm">{item.phone}</p>
              <p className="mt-2 rounded bg-slate-100 px-3 py-2 text-sm font-bold">{item.serviceTime}</p>
            </div>
          ))}
        </div>
        <div className="civic-card mt-6 grid min-h-56 place-items-center bg-slate-100 p-6 text-center">
          <div>
            <MapPin className="mx-auto text-[var(--civic-blue)]" size={38} />
            <p className="mt-3 font-extrabold text-[var(--civic-navy)]">Google Location Map</p>
            <p className="text-sm text-slate-600">Supabase admin panelबाट embed/map URL अद्यावधिक गर्न मिल्ने।</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section id="कार्यक्रम तथा सेवा" className="bg-white py-10">
      <div className="container-civic">
        <h2 className="section-title">कार्यक्रम तथा सेवाहरू</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <div key={program.title} className="civic-card p-5">
              <div className="grid h-11 w-11 place-items-center rounded bg-[var(--civic-blue)] text-white">
                {index % 2 === 0 ? <HeartPulse size={22} /> : <Activity size={22} />}
              </div>
              <h3 className="mt-4 font-extrabold text-[var(--civic-navy)]">{program.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{program.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportsDownloads() {
  return (
    <section id="डाउनलोड" className="py-10">
      <div className="container-civic grid gap-6 lg:grid-cols-2">
        <div className="civic-card p-5">
          <h2 className="section-title">तथ्यांक तथा प्रतिवेदन</h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {["HMIS रिपोर्ट", "स्वास्थ्य सूचकहरू", "मासिक प्रतिवेदन", "Dashboard"].map((item) => (
              <div key={item} className="rounded border border-slate-200 bg-slate-50 p-4">
                <Newspaper className="text-[var(--civic-red)]" />
                <p className="mt-3 font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="civic-card p-5">
          <h2 className="section-title">डाउनलोड केन्द्र</h2>
          <div className="mt-5 space-y-3">
            {downloads.map((item) => (
              <button key={item} className="flex w-full items-center justify-between rounded border border-slate-200 px-3 py-3 text-left font-bold hover:border-[var(--civic-blue)]">
                {item}
                <Download size={18} className="text-[var(--civic-blue)]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormsSection() {
  return (
    <section id="गुनासो" className="bg-white py-10">
      <div className="container-civic grid gap-6 lg:grid-cols-2">
        <FormCard title="Online Complaint Form" icon={<ShieldAlert />} fields={["नाम", "फोन", "गुनासो विषय"]} textarea="गुनासो विवरण" />
        <FormCard title="Online Appointment Request" icon={<CalendarPlus />} fields={["नाम", "फोन", "सेवा प्रकार", "इच्छित मिति"]} textarea="थप विवरण" />
      </div>
    </section>
  );
}

function FormCard({ title, icon, fields, textarea }: { title: string; icon: React.ReactNode; fields: string[]; textarea: string }) {
  return (
    <form id={title} className="civic-card p-5" onSubmit={(event) => event.preventDefault()}>
      <div className="flex items-center gap-3">
        <span className="text-[var(--civic-red)]">{icon}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <input key={field} className="admin-input" placeholder={field} />
        ))}
      </div>
      <textarea className="admin-input mt-3 min-h-28" placeholder={textarea} />
      <button className="mt-4 rounded-md bg-[var(--civic-blue)] px-4 py-2 font-bold text-white">Submit</button>
    </form>
  );
}

function EmergencySection() {
  return (
    <section id="आपतकालीन" className="py-10">
      <div className="container-civic">
        <h2 className="section-title">आपतकालीन सेवा जानकारी</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {emergencyContacts.map((item) => (
            <div key={item.title} className="civic-card p-5">
              <Bell className="text-[var(--civic-red)]" />
              <h3 className="mt-3 font-extrabold text-[var(--civic-navy)]">{item.title}</h3>
              <p className="mt-2 text-xl font-extrabold">{item.phone}</p>
              <p className="text-sm text-slate-600">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryContact() {
  return (
    <section id="सम्पर्क" className="bg-white py-10">
      <div className="container-civic grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <h2 className="section-title">फोटो तथा भिडियो ग्यालरी</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {["स्वास्थ्य शिविर", "खोप अभियान", "स्वास्थ्य सचेतना भिडियो"].map((item) => (
              <div key={item} className="civic-card aspect-[4/3] overflow-hidden">
                <div className="grid h-full place-items-center bg-gradient-to-br from-slate-100 to-blue-100 p-4 text-center font-extrabold text-[var(--civic-navy)]">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="civic-card p-5">
          <h2 className="section-title">Contact Us</h2>
          <div className="mt-5 space-y-3 text-slate-700">
            <p className="flex gap-2"><MapPin className="text-[var(--civic-red)]" /> {branchContact.address}</p>
            <p className="flex gap-2"><Phone className="text-[var(--civic-red)]" /> {branchContact.phone}</p>
            <p className="flex gap-2"><Mail className="text-[var(--civic-red)]" /> {branchContact.email}</p>
            <p className="font-bold text-[var(--civic-blue)]">Social Media Links</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CitizenCharter() {
  return (
    <section className="py-10">
      <div className="container-civic">
        <h2 className="section-title">Citizen Charter</h2>
        <div className="civic-card mt-6 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead className="bg-[var(--civic-navy)] text-white">
              <tr>
                <th className="p-3">उपलब्ध सेवा</th>
                <th className="p-3">सेवा शुल्क</th>
                <th className="p-3">सेवा प्रदान गर्ने समय</th>
              </tr>
            </thead>
            <tbody>
              {citizenCharter.map((item) => (
                <tr key={item.service} className="border-b border-slate-200">
                  <td className="p-3 font-bold">{item.service}</td>
                  <td className="p-3">{item.fee}</td>
                  <td className="p-3">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--civic-navy)] py-8 text-white">
      <div className="container-civic flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-lg font-extrabold">{branchContact.municipality} - {branchContact.office}</p>
          <p className="text-sm text-white/75">Vercel + Supabase ready health section portal</p>
        </div>
        <div className="flex items-center gap-2">
          <Users size={18} />
          <Link href="/admin/login" className="font-bold text-[var(--civic-gold)]">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}

