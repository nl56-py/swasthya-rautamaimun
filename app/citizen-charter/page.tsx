import { SitePage } from "@/components/site-chrome";
import { fetchCitizenCharter } from "@/lib/db-fetch";

export default async function CitizenCharterPage() {
  const citizenCharter = await fetchCitizenCharter();

  return (
    <SitePage title="Citizen Charter">
      <div className="civic-card overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead className="bg-[var(--civic-navy)] text-white">
            <tr>
              <th className="p-3">उपलब्ध सेवा</th>
              <th className="p-3">सेवा शुल्क</th>
              <th className="p-3">सेवा प्रदान गर्ने समय</th>
            </tr>
          </thead>
          <tbody>
            {citizenCharter.map((item) => (
              <tr key={item.service} className="border-b border-slate-200">
                <td className="p-3 font-bold">{item.service}</td>
                <td className="p-3">{item.fee}</td>
                <td className="p-3">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SitePage>
  );
}
