import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { branchContact } from "@/lib/content";

export default function StaffPage() {
  return (
    <SitePage title="प्रमुखहरु">
      <div className="civic-card max-w-xl p-5">
        <Image src="/ram.jfif" alt="स्वास्थ्य इकाई प्रमुख" width={180} height={176} className="h-40 w-40 rounded-md object-cover" />
        <h2 className="mt-4 text-xl font-extrabold text-[var(--civic-navy)]">{branchContact.chief}</h2>
        <p className="font-bold text-slate-500">{branchContact.chiefTitle}</p>
        <p className="mt-3 flex gap-2 text-sm"><Phone className="text-[var(--civic-red)]" size={18} /> {branchContact.phone}</p>
        <p className="mt-2 flex gap-2 text-sm"><Mail className="text-[var(--civic-red)]" size={18} /> {branchContact.email}</p>
      </div>
    </SitePage>
  );
}
