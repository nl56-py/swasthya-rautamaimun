import Link from "next/link";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/site-chrome";
import { programs } from "@/lib/content";
import { findBySlug, slugify } from "@/lib/slug";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: slugify(program.title) }));
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = findBySlug(programs, slug);
  if (!program) notFound();

  return (
    <SitePage title={program.title}>
      <article className="civic-card p-6">
        <p className="leading-8 text-slate-700">{program.summary}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["सेवा विवरण", "लक्षित समूह", "सम्पर्क शाखा"].map((item) => (
            <div key={item} className="rounded border border-slate-200 bg-slate-50 p-4">
              <h2 className="font-extrabold text-[var(--civic-navy)]">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Admin panel बाट थप विवरण अद्यावधिक गर्न सकिने।</p>
            </div>
          ))}
        </div>
        <Link href="/programs" className="mt-6 inline-block rounded-md bg-[var(--civic-blue)] px-4 py-2 font-bold text-white">
          सबै कार्यक्रम
        </Link>
      </article>
    </SitePage>
  );
}
