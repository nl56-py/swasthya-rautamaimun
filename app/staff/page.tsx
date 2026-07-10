import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { fetchStaff } from "@/lib/db-fetch";

export default async function StaffPage() {
  const staffList = await fetchStaff();

  return (
    <SitePage title="कर्मचारी">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {staffList.map((staff) => (
          <div key={staff.name} className="civic-card p-5">
            <Image
              src={staff.photo_url || "/ram.jfif"}
              alt={staff.name}
              width={180}
              height={176}
              className="h-40 w-40 rounded-md object-cover"
            />
            <h2 className="mt-4 text-xl font-extrabold text-[var(--civic-navy)]">{staff.name}</h2>
            <p className="font-bold text-slate-500">{staff.role}</p>
            {staff.phone && (
              <p className="mt-3 flex gap-2 text-sm">
                <Phone className="text-[var(--civic-red)]" size={18} /> {staff.phone}
              </p>
            )}
            {staff.email && (
              <p className="mt-2 flex gap-2 text-sm">
                <Mail className="text-[var(--civic-red)]" size={18} /> {staff.email}
              </p>
            )}
          </div>
        ))}
      </div>
    </SitePage>
  );
}
