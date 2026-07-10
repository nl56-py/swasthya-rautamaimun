import Image from "next/image";
import { fetchBranchContact } from "@/lib/db-fetch";
import { NavigationBar } from "./navigation-bar";

export async function SiteHeader() {
  const branchContact = await fetchBranchContact();

  return (
    <>
      <header className="identity-header bg-white">
        <div className="identity-grid">
          <Image src="/emblem.png" alt="नगरपालिका चिन्ह" width={100} height={88} className="identity-logo" priority />
          <div className="identity-title">
            <h1>{branchContact.municipality}</h1>
            <p className="identity-office">{branchContact.office}</p>
            <p className="identity-location">{branchContact.provinceLine}</p>
            <p className="identity-slogan">&quot;{branchContact.slogan}&quot;</p>
          </div>
          <div className="identity-flag">
            <Image src="/np_flag.gif" alt="Nepal flag" width={80} height={96} className="nepal-flag" priority />
          </div>
        </div>
      </header>
      <NavigationBar />
    </>
  );
}

export async function SiteFooter() {
  const branchContact = await fetchBranchContact();

  return (
    <footer className="bg-[var(--civic-navy)] py-8 text-white">
      <div className="container-civic flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-lg font-extrabold">{branchContact.municipality} - {branchContact.office}</p>
        </div>
      </div>
    </footer>
  );
}

export async function SitePage({ title, children }: { title: string; children: React.ReactNode }) {
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

