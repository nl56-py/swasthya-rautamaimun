import { Download } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { downloads } from "@/lib/content";

export default function DownloadsPage() {
  return (
    <SitePage title="डाउनलोड">
      <div className="civic-card overflow-hidden">
        {downloads.map((item) => (
          <a
            key={item.title}
            href={item.fileUrl ?? "#"}
            className="flex items-center justify-between border-b border-slate-200 px-5 py-4 font-bold last:border-0 hover:bg-slate-50"
          >
            <span>
              {item.title}
              <span className="ml-3 rounded bg-slate-100 px-2 py-1 text-xs text-slate-500">{item.category}</span>
            </span>
            <Download size={18} className="text-[var(--civic-blue)]" />
          </a>
        ))}
      </div>
    </SitePage>
  );
}
