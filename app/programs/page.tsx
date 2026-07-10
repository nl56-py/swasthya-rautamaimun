import Link from "next/link";
import { Activity, HeartPulse } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { fetchPrograms } from "@/lib/db-fetch";
import { slugify } from "@/lib/slug";

export default async function ProgramsPage() {
  const programs = await fetchPrograms();

  return (
    <SitePage title="कार्यक्रम तथा परियोजना">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, index) => (
          <Link key={program.title} href={`/programs/${slugify(program.title)}`} className="civic-card block p-5 hover:border-[var(--civic-blue)]">
            <div className="grid h-11 w-11 place-items-center rounded bg-[var(--civic-blue)] text-white">
              {index % 2 === 0 ? <HeartPulse size={22} /> : <Activity size={22} />}
            </div>
            <h2 className="mt-4 font-extrabold text-[var(--civic-navy)]">{program.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{program.summary}</p>
            <p className="mt-4 text-sm font-bold text-[var(--civic-red)]">विस्तृत हेर्नुहोस्</p>
          </Link>
        ))}
      </div>
    </SitePage>
  );
}
