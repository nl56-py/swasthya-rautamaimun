import { MapPin } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { institutions } from "@/lib/content";

export default function InstitutionsPage() {
  return (
    <SitePage title="घर नं. र नक्सा / स्वास्थ्य संस्था">
      <div className="grid gap-4 md:grid-cols-3">
        {institutions.map((item) => (
          <div key={item.name} className="civic-card p-5">
            <MapPin className="text-[var(--civic-red)]" />
            <h2 className="mt-3 font-extrabold text-[var(--civic-navy)]">{item.name}</h2>
            <p className="text-sm font-bold text-slate-500">{item.type}</p>
            <p className="mt-3 text-sm text-slate-600">{item.address}</p>
            <p className="mt-2 text-sm">{item.phone}</p>
            <p className="mt-2 rounded bg-slate-100 px-3 py-2 text-sm font-bold">{item.serviceTime}</p>
          </div>
        ))}
      </div>
    </SitePage>
  );
}
