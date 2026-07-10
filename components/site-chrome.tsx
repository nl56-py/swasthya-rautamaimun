import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Home, Menu, Users } from "lucide-react";
import { branchContact } from "@/lib/content";

const navItems = [
  { label: "परिचय", href: "/about", children: true },
  { label: "प्रतिवेदन", href: "/reports", children: true },
  { label: "कार्यक्रम तथा परियोजना", href: "/programs", children: true },
  { label: "विद्युतीय सुशासन सेवा", href: "/appointments", children: true },
  { label: "सूचना तथा जानकारी", href: "/notices", children: true },
  { label: "घर नं. र नक्सा", href: "/institutions", children: true },
  { label: "डाउनलोड", href: "/downloads", children: true },
  { label: "ग्यालरी", href: "/gallery", children: true },
  { label: "प्रमुखहरु", href: "/staff" },
  { label: "सम्पर्क", href: "/contact" }
];

export function SiteHeader() {
  return (
    <>
      <header className="identity-header bg-white">
        <div className="identity-grid">
          <Image src="/emblem.png" alt="नगरपालिका चिन्ह" width={112} height={98} className="identity-logo" priority />
          <div className="identity-title">
            <h1>{branchContact.municipality}</h1>
            <p className="identity-office">{branchContact.office}</p>
            <p className="identity-location">{branchContact.provinceLine}</p>
            <p className="identity-slogan">&quot;{branchContact.slogan}&quot;</p>
          </div>
          <div className="identity-flag">
            <Image src="/np_flag.gif" alt="Nepal flag" width={96} height={116} className="nepal-flag" priority />
          </div>
        </div>
      </header>
      <nav className="sticky top-0 z-30 bg-[var(--civic-blue)] text-white shadow-md">
        <div className="container-civic flex items-center justify-between">
          <div className="hidden min-w-0 flex-1 items-center md:flex">
            <Link href="/" className="grid h-14 w-12 shrink-0 place-items-center hover:bg-white/10" aria-label="गृहपृष्ठ">
              <Home size={18} fill="currentColor" />
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex h-14 items-center gap-1 whitespace-nowrap px-3 text-[15px] font-bold hover:bg-white/10 xl:px-4"
              >
                {item.label}
                {item.children && <ChevronDown size={14} />}
              </Link>
            ))}
          </div>
          <button className="inline-flex h-14 items-center gap-2 font-bold md:hidden">
            <Menu size={20} /> मेनु
          </button>
          <Link href="/admin/login" className="hidden h-14 items-center bg-[var(--civic-red)] px-4 text-sm font-bold hover:bg-red-700 lg:inline-flex">
            Admin
          </Link>
        </div>
      </nav>
    </>
  );
}

export function SiteFooter() {
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

export function SitePage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main>
      <SiteHeader />
      <section className="bg-white py-8">
        <div className="container-civic">
          <h1 className="text-3xl font-extrabold text-[var(--civic-navy)]">{title}</h1>
        </div>
      </section>
      <section className="py-10">
        <div className="container-civic">{children}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
