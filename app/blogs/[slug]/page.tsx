export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SitePage } from "@/components/site-chrome";
import { fetchBlogBySlug } from "@/lib/db-fetch";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <SitePage title={blog.title}>
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 font-bold text-sm text-slate-600 hover:text-[var(--civic-blue)] mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>ब्लग सूचीमा फर्कनुहोस्</span>
        </Link>

        <article className="civic-card bg-white overflow-hidden p-6 lg:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-6">
            <Calendar size={16} />
            <span>
              प्रकाशित मिति: {new Date(blog.published_at).toLocaleDateString("ne-NP", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
          </div>

          {blog.cover_image_url && (
            <div className="relative aspect-[16/9] bg-slate-100 rounded-md overflow-hidden mb-8">
              <img
                src={blog.cover_image_url}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div
            className="prose max-w-none leading-8 text-slate-800"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
    </SitePage>
  );
}
