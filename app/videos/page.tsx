import { Metadata } from "next";
import Link from "next/link";
import { SitePage } from "@/components/site-chrome";
import { fetchVideosPaginated, getEmbedUrl } from "@/lib/db-fetch";

export const metadata: Metadata = {
  title: "स्वास्थ्य सचेतना भिडियोहरू - रौतामाई गाउँपालिका",
  description: "रौतामाई गाउँपालिकाको स्वास्थ्य शाखाद्वारा संकलित जनस्वास्थ्य सचेतना र स्वास्थ्य सम्बन्धी उपयोगी भिडियोहरू।",
  keywords: ["रौतामाई", "स्वास्थ्य भिडियो", "नेपाल जनस्वास्थ्य भिडियो", "Rautamai Health Videos", "Public Health Videos Nepal"]
};

const PAGE_SIZE = 6;

export default async function VideosPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const { data: videos, count } = await fetchVideosPaginated(page, PAGE_SIZE);
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const resolvedVideos = await Promise.all(
    videos.map(async (video) => {
      const embedUrl = await getEmbedUrl(video.youtube_url);
      return { ...video, embedUrl };
    })
  );

  return (
    <SitePage title="स्वास्थ्य सचेतना भिडियोहरू">
      {resolvedVideos.length === 0 ? (
        <div className="civic-card p-8 text-center text-slate-500 font-bold bg-white">
          अहिलेसम्म कुनै भिडियोहरू प्रकाशित गरिएका छैनन्।
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            {resolvedVideos.map((video) => {
              const embedUrl = video.embedUrl;
              const isReel =
                video.is_reel ||
                video.youtube_url.includes("/share/r/") ||
                video.youtube_url.includes("/reel/") ||
                video.youtube_url.includes("/reels/");
              return (
                <div
                  key={video.id}
                  className={`civic-card overflow-hidden bg-white flex flex-col h-full border border-slate-200 ${
                    isReel ? "max-w-[340px] mx-auto w-full" : "w-full"
                  }`}
                >
                  <div className={`relative w-full bg-slate-200 ${isReel ? "aspect-[9/16]" : "aspect-video"}`}>
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        className="absolute inset-0 h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        scrolling="no"
                      />
                    ) : (
                      <div className="grid h-full place-items-center font-bold text-slate-500 text-sm p-4 text-center">
                        Invalid Video Link: {video.youtube_url}
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between border-t border-slate-100 gap-3">
                    <h2 className="text-lg font-extrabold text-[var(--civic-navy)] leading-snug line-clamp-2">
                      {video.title}
                    </h2>
                    <a
                      href={video.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--civic-blue)] hover:text-[var(--civic-red)] transition-colors self-start mt-1"
                    >
                      फेसबुकमा हेर्नुहोस् &rarr;
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2 select-none">
              {page > 1 ? (
                <Link
                  href={`/videos?page=${page - 1}`}
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
                      href={`/videos?page=${p}`}
                      className="rounded border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>

              {page < totalPages ? (
                <Link
                  href={`/videos?page=${page + 1}`}
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

