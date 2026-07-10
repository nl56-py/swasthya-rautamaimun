import { Newspaper } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { reportItems } from "@/lib/content";

export default function ReportsPage() {
  return (
    <SitePage title="प्रतिवेदन">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportItems.map((item) => (
          <div key={item} className="civic-card p-5">
            <Newspaper className="text-[var(--civic-red)]" />
            <h2 className="mt-3 font-extrabold text-[var(--civic-navy)]">{item}</h2>
            <p className="mt-2 text-sm text-slate-600">Admin panel बाट file URL र विवरण अद्यावधिक गर्न सकिने।</p>
          </div>
        ))}
      </div>
    </SitePage>
  );
}
