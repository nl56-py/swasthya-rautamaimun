import { Metadata } from "next";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { fetchBlogsPaginated } from "@/lib/db-fetch";

export const metadata: Metadata = {
  title: "स्वास्थ्य ब्लग तथा लेखहरू - रौतामाई गाउँपालिका",
  description: "रौतामाई गाउँपालिकाको स्वास्थ्य शाखाद्वारा प्रकाशित जनस्वास्थ्य सम्बन्धी उपयोगी लेखहरू, ब्लगहरू र सचेतनामूलक सामग्रीहरू।",
  keywords: ["रौतामाई", "स्वास्थ्य ब्लग", "नेपाल स्वास्थ्य लेख", "Rautamai Health Blog", "Healthcare Articles Nepal"]
};

const PAGE_SIZE = 6;

export default async function BlogsPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const { data: blogs, count } = await fetchBlogsPaginated(page, PAGE_SIZE);
  const totalPages = Math.ceil(count / PAGE_SIZE);

  return (
    <SitePage title="स्वास्थ्य ब्लग तथा लेखहरू">
      {blogs.length === 0 ? (
        <div className="civic-card p-8 text-center text-slate-500 font-bold bg-white">
          अहिलेसम्म कुनै ब्लग वा लेखहरू प्रकाशित गरिएका छैनन्।
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article key={blog.id} className="civic-card overflow-hidden hover:shadow-lg transition-shadow flex flex-col bg-white border border-slate-200">
                <div className="relative aspect-[16/10] bg-slate-100 shrink-0 border-b border-slate-100">
                  {blog.cover_image_url ? (
                    <img
                      src={blog.cover_image_url}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center font-bold text-slate-400">
                      Cover Image
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                      <Calendar size={14} />
                      <span>
                        {new Date(blog.published_at).toLocaleDateString("ne-NP", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl font-extrabold text-[var(--civic-navy)] line-clamp-2 hover:text-[var(--civic-red)] transition-colors leading-snug">
                      <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h2>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center font-bold text-sm text-[var(--civic-blue)] hover:underline"
                    >
                      थप पढ्नुहोस् &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2 select-none">
              {page > 1 ? (
                <Link
                  href={`/blogs?page=${page - 1}`}
                  className="rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-[var(--civic-blue)] hover:bg-slate-50 transition-colors"
                >
                  &larr; अघिल्लो
                </Link>
              ) : (
                <span className="rounded border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-400 cursor-not-allowed">
                  &larr; अघिल्लो
                </span>
              )}

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const isActive = p === page;
                  return isActive ? (
                    <span
                      key={p}
                      className="rounded bg-[var(--civic-blue)] px-3.5 py-1.5 text-sm font-bold text-white shadow-sm"
                    >
                      {p}
                    </span>
                  ) : (
                    <Link
                      key={p}
                      href={`/blogs?page=${p}`}
                      className="rounded border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>

              {page < totalPages ? (
                <Link
                  href={`/blogs?page=${page + 1}`}
                  className="rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-[var(--civic-blue)] hover:bg-slate-50 transition-colors"
                >
                  पछिल्लो &rarr;
                </Link>
              ) : (
                <span className="rounded border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-400 cursor-not-allowed">
                  पछिल्लो &rarr;
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </SitePage>
  );
}
