import Link from "next/link";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/site-chrome";
import { notices } from "@/lib/content";
import { findBySlug, slugify } from "@/lib/slug";

export function generateStaticParams() {
  return notices.map((notice) => ({ slug: slugify(notice.title) }));
}

export default async function NoticeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const notice = findBySlug(notices, slug);
  if (!notice) notFound();

  return (
    <SitePage title={notice.title}>
      <article className="civic-card p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded bg-[var(--civic-red)] px-2 py-1 font-bold text-white">{notice.category}</span>
          <span className="font-semibold text-slate-500">{notice.date}</span>
        </div>
        <p className="mt-5 leading-8 text-slate-700">{notice.body}</p>
        <Link href="/notices" className="mt-6 inline-block rounded-md bg-[var(--civic-blue)] px-4 py-2 font-bold text-white">
          सबै सूचना
        </Link>
      </article>
    </SitePage>
  );
}
