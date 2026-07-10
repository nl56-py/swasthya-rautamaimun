import { SitePage } from "@/components/site-chrome";
import { fetchVideos } from "@/lib/db-fetch";

function getEmbedUrl(url: string) {
  let videoId = "";
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v") || "";
      if (!videoId && urlObj.pathname.startsWith("/embed/")) {
        videoId = urlObj.pathname.slice(7);
      }
    }
  } catch (e) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (match) videoId = match[1];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export default async function VideosPage() {
  const videos = await fetchVideos();

  return (
    <SitePage title="स्वास्थ्य सचेतना भिडियोहरू">
      {videos.length === 0 ? (
        <div className="civic-card p-8 text-center text-slate-500 font-bold bg-white">
          अहिलेसम्म कुनै भिडियोहरू प्रकाशित गरिएका छैनन्।
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video) => {
            const embedUrl = getEmbedUrl(video.youtube_url);
            return (
              <div key={video.id} className="civic-card overflow-hidden bg-white flex flex-col h-full">
                <div className="relative aspect-video w-full bg-slate-200">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      className="absolute inset-0 h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="grid h-full place-items-center font-bold text-slate-500 text-sm">
                      Invalid YouTube Link: {video.youtube_url}
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-center">
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
