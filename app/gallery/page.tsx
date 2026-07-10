import { SitePage } from "@/components/site-chrome";
import { galleryItems } from "@/lib/content";

export default function GalleryPage() {
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
