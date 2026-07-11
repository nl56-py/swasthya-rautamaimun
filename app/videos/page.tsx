import { SitePage } from "@/components/site-chrome";
import { fetchVideos, getEmbedUrl } from "@/lib/db-fetch";

export default async function VideosPage() {
  const videos = await fetchVideos();

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
                className={`civic-card overflow-hidden bg-white flex flex-col h-full ${
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
                <div className="p-4 flex-1 flex flex-col justify-center border-t border-slate-100">
                  <h2 className="text-lg font-extrabold text-[var(--civic-navy)] leading-snug line-clamp-2">
                    {video.title}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SitePage>
  );
}

