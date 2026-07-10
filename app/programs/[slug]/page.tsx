import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, HeartPulse } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { fetchPrograms } from "@/lib/db-fetch";
import { findBySlug, slugify } from "@/lib/slug";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const programs = await fetchPrograms();
  return programs.map((program) => ({ slug: slugify(program.title) }));
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const programs = await fetchPrograms();
  const program = findBySlug(programs, slug);
  if (!program) notFound();

  return (
    <SitePage title={program.title}>
      <div className="mx-auto max-w-6xl">
        {/* Back Link */}
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 font-bold text-sm text-slate-600 hover:text-[var(--civic-blue)] mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>कार्यक्रम सूचीमा फर्कनुहोस्</span>
        </Link>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[var(--civic-navy)] to-[var(--civic-blue)] text-white py-10 px-6 rounded-md mb-8 shadow-sm">
          <div className="max-w-4xl flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded bg-white text-[var(--civic-blue)] shadow">
              <HeartPulse size={30} />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-white/70">स्वास्थ्य सेवा तथा कार्यक्रम</span>
              <h1 className="text-2xl lg:text-3xl font-extrabold mt-1">{program.title}</h1>
            </div>
          </div>
        </div>

        {/* Two Columns Section */}
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Left Column: Content */}
          <div className="civic-card bg-white p-6 lg:p-8">
            <h2 className="text-lg font-extrabold text-[var(--civic-navy)] mb-4 border-b border-slate-100 pb-2">
              विवरण तथा जानकारी
            </h2>
            {program.content ? (
              <div
                className="prose max-w-none leading-8 text-slate-800"
                dangerouslySetInnerHTML={{ __html: program.content }}
              />
            ) : (
              <p className="leading-8 text-slate-700 whitespace-pre-wrap">{program.summary}</p>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">
            <div className="civic-card bg-white p-5 border border-slate-200">
              <h3 className="font-extrabold text-[var(--civic-navy)] border-b border-slate-100 pb-2 mb-3">सेवा विवरण</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                गाउँपालिका भित्रका नागरिकहरूलाई सहजरूपमा लक्षित स्वास्थ्य सेवा पुऱ्याउने यस कार्यक्रमको मुख्य उद्देश्य रहेको छ।
              </p>
            </div>
            <div className="civic-card bg-white p-5 border border-slate-200">
              <h3 className="font-extrabold text-[var(--civic-navy)] border-b border-slate-100 pb-2 mb-3">लक्षित समूह</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                स्थानीय आमा, शिशु, विपन्न वर्ग तथा दीर्घ रोगीहरू यस स्वास्थ्य कार्यक्रमका लक्षित समूह हुन्।
              </p>
            </div>
            <div className="civic-card bg-white p-5 border border-slate-200">
              <h3 className="font-extrabold text-[var(--civic-navy)] border-b border-slate-100 pb-2 mb-3">सम्पर्क शाखा</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-bold">
                स्वास्थ्य शाखा, रौतामाई गाउँपालिका
              </p>
              <p className="text-xs text-slate-500 mt-1">थप जानकारीको लागि शाखामा सम्पर्क गर्न सक्नुहुन्छ।</p>
            </div>
          </div>
        </div>
      </div>
    </SitePage>
  );
}
