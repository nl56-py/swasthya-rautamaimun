import { Metadata } from "next";
import { SitePage } from "@/components/site-chrome";
import { fetchAboutText } from "@/lib/db-fetch";

export const metadata: Metadata = {
  title: "परिचय",
  description: "रौतामाई गाउँपालिका स्वास्थ्य शाखाको परिचय, उद्देश्य, इतिहास र संरचना।",
  keywords: ["रौतामाई परिचय", "About Rautamai", "Health Branch Introduction"]
};

export default async function AboutPage() {
  const aboutText = await fetchAboutText();

  return (
    <SitePage title="परिचय">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="section-title">हाम्रो बारेमा</h2>
          <p className="mt-5 leading-8 text-slate-700">{aboutText}</p>
        </div>
        <div className="civic-card p-5">
          <h2 className="font-extrabold text-[var(--civic-navy)]">संगठन संरचना</h2>
          <div className="mt-4 grid gap-3 text-center sm:grid-cols-3">
            {["गाउँपालिका", "स्वास्थ्य शाखा", "स्वास्थ्य संस्था/सेवा केन्द्र"].map((item) => (
              <div key={item} className="rounded border border-slate-200 bg-slate-50 p-4 font-bold">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </SitePage>
  );
}
