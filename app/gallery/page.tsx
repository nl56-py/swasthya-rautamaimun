export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { SitePage } from "@/components/site-chrome";
import { fetchGalleryItems } from "@/lib/db-fetch";

export const metadata: Metadata = {
  title: "ग्यालरी",
  description: "रौतामाई गाउँपालिका स्वास्थ्य शाखाका कार्यक्रम र गतिविधिहरूका तस्बिरहरू।",
  keywords: ["ग्यालरी", "Gallery", "Health Activities Photos", "Rautamai Gallery"]
};

export default async function GalleryPage() {
  const galleryItems = await fetchGalleryItems();

  return (
    <SitePage title="ग्यालरी">
      <div className="grid gap-4 sm:grid-cols-3">
        {galleryItems.map((item) => (
          <div key={item} className="civic-card aspect-[4/3] overflow-hidden">
            <div className="grid h-full place-items-center bg-slate-100 p-4 text-center font-extrabold text-[var(--civic-navy)]">
              {item}
            </div>
          </div>
        ))}
      </div>
    </SitePage>
  );
}
