import { Metadata } from "next";
import { Bell } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { fetchEmergencyContacts } from "@/lib/db-fetch";

export const metadata: Metadata = {
  title: "आकस्मिक सेवा",
  description: "रौतामाई गाउँपालिका अन्तर्गतका आकस्मिक सम्पर्क नम्बरहरू — एम्बुलेन्स, अस्पताल, प्रहरी, दमकल आदि।",
  keywords: ["आकस्मिक सेवा", "Emergency", "Ambulance", "Emergency Contacts Rautamai", "आपतकालीन सम्पर्क"]
};

export default async function EmergencyPage() {
  const emergencyContacts = await fetchEmergencyContacts();

  return (
    <SitePage title="आकस्मिक सेवा जानकारी">
      <div className="grid gap-4 md:grid-cols-4">
        {emergencyContacts.map((item) => (
          <div key={item.title} className="civic-card p-5">
            <Bell className="text-[var(--civic-red)]" />
            <h2 className="mt-3 font-extrabold text-[var(--civic-navy)]">{item.title}</h2>
            <p className="mt-2 text-xl font-extrabold">{item.phone}</p>
            <p className="text-sm text-slate-600">{item.details}</p>
          </div>
        ))}
      </div>
    </SitePage>
  );
}
