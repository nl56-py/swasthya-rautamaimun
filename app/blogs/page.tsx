import Link from "next/link";
import { Calendar } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { fetchBlogs } from "@/lib/db-fetch";

export default async function BlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <SitePage title="स्वास्थ्य ब्लग तथा लेखहरू">
      {blogs.length === 0 ? (
        <div className="civic-card p-8 text-center text-slate-500 font-bold">
          अहिलेसम्म कुनै ब्लग वा लेखहरू प्रकाशित गरिएका छैनन्।
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.id} className="civic-card overflow-hidden hover:shadow-lg transition-shadow flex flex-col bg-white">
              <div className="relative aspect-[16/10] bg-slate-100 shrink-0">
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
                  <h2 className="text-xl font-extrabold text-[var(--civic-navy)] line-clamp-2 hover:text-[var(--civic-red)] transition-colors">
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
      )}
    </SitePage>
  );
}
