import { Mail, MapPin, Phone } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { branchContact } from "@/lib/content";

export default function ContactPage() {
  return (
    <SitePage title="सम्पर्क">
      <div className="civic-card max-w-2xl p-5">
        <div className="space-y-4 text-slate-700">
          <p className="flex gap-2"><MapPin className="text-[var(--civic-red)]" /> {branchContact.address}</p>
          <p className="flex gap-2"><Phone className="text-[var(--civic-red)]" /> {branchContact.phone}</p>
          <p className="flex gap-2"><Mail className="text-[var(--civic-red)]" /> {branchContact.email}</p>
        </div>
      </div>
    </SitePage>
  );
}
