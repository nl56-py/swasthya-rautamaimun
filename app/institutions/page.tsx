export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { MapPin } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { fetchInstitutions } from "@/lib/db-fetch";

export const metadata: Metadata = {
  title: "स्वास्थ्य संस्थाहरू",
  description: "रौतामाई गाउँपालिका अन्तर्गतका स्वास्थ्य चौकीहरू, प्राथमिक स्वास्थ्य केन्द्रहरू र अन्य सेवा प्रदायक संस्थाहरूको सूची।",
  keywords: ["स्वास्थ्य संस्था", "Health Institutions", "Health Post", "Rautamai", "स्वास्थ्य चौकी"]
};

export default async function InstitutionsPage() {
  const institutions = await fetchInstitutions();

  return (
    <SitePage title="स्वास्थ्य संस्था">
      <div className="grid gap-4 md:grid-cols-3">
        {institutions.map((item) => (
          <div key={item.name} className="civic-card p-5">
            <MapPin className="text-[var(--civic-red)]" />
            <h2 className="mt-3 font-extrabold text-[var(--civic-navy)]">{item.name}</h2>
            <p className="text-sm font-bold text-slate-500">{item.type}</p>
            <p className="mt-3 text-sm text-slate-600">{item.address}</p>
            <p className="mt-2 text-sm">{item.phone}</p>
            {item.serviceTime && (
              <p className="mt-2 rounded bg-slate-100 px-3 py-2 text-sm font-bold">{item.serviceTime}</p>
            )}
            {item.mapUrl && (
              <div className="mt-4 overflow-hidden rounded border border-slate-200">
                <iframe
                  src={item.mapUrl}
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={item.name}
                ></iframe>
                <div className="bg-slate-50 p-2 border-t border-slate-200">
                  <a
                    href={item.mapUrl.includes("pb=") ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ", Rautamai, Udayapur")}` : item.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded bg-[var(--civic-blue)] px-3 py-2 font-bold text-white text-xs hover:bg-opacity-95 transition-all w-full justify-center"
                  >
                    <MapPin size={12} /> दिशा निर्देश (Get Directions)
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </SitePage>
  );
}
