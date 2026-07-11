import { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { fetchNotices } from "@/lib/db-fetch";
import { slugify } from "@/lib/slug";

export const metadata: Metadata = {
  title: "सूचनाहरू",
  description: "रौतामाई गाउँपालिका स्वास्थ्य शाखाबाट प्रकाशित भर्खरैका सूचनाहरू तथा जानकारीहरू।",
  keywords: ["सूचना", "Notices", "Health Notices Rautamai", "स्वास्थ्य सूचना"]
};

export default async function NoticesPage() {
  const notices = await fetchNotices();

  return (
    <SitePage title="सूचना तथा जानकारी">
      <div className="grid gap-4">
        {notices.map((notice) => (
          <Link key={notice.title} href={`/notices/${slugify(notice.title)}`} className="civic-card flex gap-4 p-5 hover:border-[var(--civic-blue)]">
            <FileText className="mt-1 shrink-0 text-[var(--civic-red)]" />
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded bg-[var(--civic-red)] px-2 py-1 font-bold text-white">{notice.category}</span>
                <span className="font-semibold text-slate-500">{notice.date}</span>
              </div>
              <h2 className="mt-2 text-lg font-extrabold text-[var(--civic-navy)]">{notice.title}</h2>
              <p className="mt-1 text-slate-600">{notice.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </SitePage>
  );
}
