import { Metadata } from "next";
import { FileText } from "lucide-react";
import { SitePage } from "@/components/site-chrome";
import { ReportList } from "@/components/report-list";
import {
  fetchReports,
  fetchVaccinationRecords,
  fetchNutritionStatus,
  fetchFamilyHealthStatus,
  fetchFiscalYears
} from "@/lib/db-fetch";

export const metadata: Metadata = {
  title: "प्रतिवेदनहरू",
  description: "रौतामाई गाउँपालिका स्वास्थ्य शाखाका वार्षिक प्रतिवेदन, खोप तथ्यांक, पोषण स्थिति र परिवार स्वास्थ्य तथ्यांकहरू।",
  keywords: ["प्रतिवेदन", "Reports", "Health Reports Rautamai", "Vaccination Data", "खोप तथ्यांक"]
};

export default async function ReportsPage() {
  const reports = await fetchReports();
  const vaccinationData = await fetchVaccinationRecords();
  const nutritionData = await fetchNutritionStatus();
  const familyHealthData = await fetchFamilyHealthStatus();
  const fiscalYears = await fetchFiscalYears();

  // Compute Vaccination totals
  const vacTotal71_72 = vaccinationData.reduce((acc, row) => acc + (row.count_71_72 || 0), 0);
  const vacTotal72_73 = vaccinationData.reduce((acc, row) => acc + (row.count_72_73 || 0), 0);
  const vacTotal73_74 = vaccinationData.reduce((acc, row) => acc + (row.count_73_74 || 0), 0);

  // Compute Nutrition totals
  const nutTotal71_72 = nutritionData.reduce((acc, row) => acc + (row.count_71_72 || 0), 0);
  const nutTotal72_73 = nutritionData.reduce((acc, row) => acc + (row.count_72_73 || 0), 0);
  const nutTotal73_74 = nutritionData.reduce((acc, row) => acc + (row.count_73_74 || 0), 0);

  // Compute Family Health totals
  const famTotalHealthy = familyHealthData.reduce((acc, row) => acc + (row.healthy || 0), 0);
  const famTotalCommon = familyHealthData.reduce((acc, row) => acc + (row.common_ill || 0), 0);
  const famTotalChronic = familyHealthData.reduce((acc, row) => acc + (row.chronic_ill || 0), 0);
  const famTotalNotMentioned = familyHealthData.reduce((acc, row) => acc + (row.not_mentioned || 0), 0);
  const famTotal = familyHealthData.reduce((acc, row) => acc + (row.total || 0), 0);

  return (
    <SitePage title="तथ्याङ्क तथा प्रतिवेदन">
      <div className="grid gap-8">
        
        {/* Section 1: Vaccination Details */}
        <div className="civic-card p-6 bg-white">
          <div className="border-b border-slate-200 pb-3 mb-5">
            <h2 className="text-xl font-extrabold text-[var(--civic-navy)] flex items-center gap-2">
              <span className="bg-[var(--civic-red)] text-white text-xs px-2 py-1 rounded">५.२.१</span>
              खोप सेवा विवरण
            </h2>
            <p className="text-sm text-slate-500 mt-1">विगत ३ वर्षको खोप लिने बालबालिकाको आँकडा खोपको किसिम अनुसार देहायमा प्रस्तुत गरिएको छ।</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-3 font-bold text-slate-700 w-16 text-center">क्र.सं.</th>
                  <th className="p-3 font-bold text-slate-700">विवरण</th>
                  <th className="p-3 font-bold text-slate-700 text-right">{fiscalYears.year1} (संख्या)</th>
                  <th className="p-3 font-bold text-slate-700 text-right">{fiscalYears.year2} (संख्या)</th>
                  <th className="p-3 font-bold text-slate-700 text-right">{fiscalYears.year3} (संख्या)</th>
                </tr>
              </thead>
              <tbody>
                {vaccinationData.map((row, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-3 text-center font-medium text-slate-500">{index + 1}</td>
                    <td className="p-3 font-bold text-[var(--civic-navy)]">{row.description}</td>
                    <td className="p-3 text-right font-semibold">{row.count_71_72 !== null ? row.count_71_72.toLocaleString() : "-"}</td>
                    <td className="p-3 text-right font-semibold">{row.count_72_73 !== null ? row.count_72_73.toLocaleString() : "-"}</td>
                    <td className="p-3 text-right font-semibold">{row.count_73_74 !== null ? row.count_73_74.toLocaleString() : "-"}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-extrabold border-t border-slate-300">
                  <td className="p-3 text-center">-</td>
                  <td className="p-3 text-[var(--civic-navy)]">जम्मा</td>
                  <td className="p-3 text-right text-[var(--civic-navy)]">{vacTotal71_72.toLocaleString()}</td>
                  <td className="p-3 text-right text-[var(--civic-navy)]">{vacTotal72_73.toLocaleString()}</td>
                  <td className="p-3 text-right text-[var(--civic-navy)]">{vacTotal73_74 > 0 ? vacTotal73_74.toLocaleString() : "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-slate-400 text-right italic">
            स्रोत: संस्थागत सर्वेक्षण, २०७५
          </div>
        </div>

        {/* Section 2: Nutrition Status */}
        <div className="civic-card p-6 bg-white">
          <div className="border-b border-slate-200 pb-3 mb-5">
            <h2 className="text-xl font-extrabold text-[var(--civic-navy)] flex items-center gap-2">
              <span className="bg-[var(--civic-red)] text-white text-xs px-2 py-1 rounded">५.२.२</span>
              पोषणको अवस्था
            </h2>
            <p className="text-sm text-slate-500 mt-1">प्रत्येक आर्थिक वर्षमा पोषण सम्बन्धी सेवा लिनेहरुको विवरण देहाय बमोजिम रहेको छ।</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-3 font-bold text-slate-700 w-16 text-center">क्र.सं.</th>
                  <th className="p-3 font-bold text-slate-700">सूचकांकहरु</th>
                  <th className="p-3 font-bold text-slate-700 text-right">{fiscalYears.year1}</th>
                  <th className="p-3 font-bold text-slate-700 text-right">{fiscalYears.year2}</th>
                  <th className="p-3 font-bold text-slate-700 text-right">{fiscalYears.year3}</th>
                </tr>
              </thead>
              <tbody>
                {nutritionData.map((row, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-3 text-center font-medium text-slate-500">{index + 1}</td>
                    <td className="p-3 font-bold text-[var(--civic-navy)]">{row.indicator}</td>
                    <td className="p-3 text-right font-semibold">{row.count_71_72 !== null ? row.count_71_72.toLocaleString() : "-"}</td>
                    <td className="p-3 text-right font-semibold">{row.count_72_73 !== null ? row.count_72_73.toLocaleString() : "-"}</td>
                    <td className="p-3 text-right font-semibold">{row.count_73_74 !== null ? row.count_73_74.toLocaleString() : "-"}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-extrabold border-t border-slate-300">
                  <td className="p-3 text-center">-</td>
                  <td className="p-3 text-[var(--civic-navy)]">जम्मा</td>
                  <td className="p-3 text-right text-[var(--civic-navy)]">{nutTotal71_72.toLocaleString()}</td>
                  <td className="p-3 text-right text-[var(--civic-navy)]">{nutTotal72_73.toLocaleString()}</td>
                  <td className="p-3 text-right text-[var(--civic-navy)]">{nutTotal73_74.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-slate-400 text-right italic">
            स्रोत: संस्थागत सर्वेक्षण, २०७५
          </div>
        </div>

        {/* Section 3: Family Members' Health Status */}
        <div className="civic-card p-6 bg-white">
          <div className="border-b border-slate-200 pb-3 mb-5">
            <h2 className="text-xl font-extrabold text-[var(--civic-navy)] flex items-center gap-2">
              <span className="bg-[var(--civic-red)] text-white text-xs px-2 py-1 rounded">५.२.४</span>
              परिवारका सदस्यहरुको स्वास्थ्य अवस्था
            </h2>
            <p className="text-sm text-slate-500 mt-1">गाउँपालिका भित्रका परिवारका सदस्यहरुको वडागत स्वास्थ्य अवस्था सम्बन्धी विवरण।</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-3 font-bold text-slate-700 w-24 text-center" rowSpan={2}>वडा नम्बर</th>
                  <th className="p-3 font-bold text-slate-700 text-center border-b border-slate-100" colSpan={4}>स्वास्थ्य अवस्था अनुसार जनसंख्या</th>
                  <th className="p-3 font-bold text-slate-700 text-right w-28" rowSpan={2}>जम्मा</th>
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-2 font-bold text-slate-600 text-right">स्वस्थ</th>
                  <th className="p-2 font-bold text-slate-600 text-right">सामान्य रोगी</th>
                  <th className="p-2 font-bold text-slate-600 text-right">दीर्घ रोगी</th>
                  <th className="p-2 font-bold text-slate-600 text-right">उल्लेख नभएको</th>
                </tr>
              </thead>
              <tbody>
                {familyHealthData.map((row, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-3 text-center font-bold text-[var(--civic-navy)]">{row.ward_number}</td>
                    <td className="p-3 text-right font-semibold">{row.healthy !== null ? row.healthy.toLocaleString() : "-"}</td>
                    <td className="p-3 text-right font-semibold">{row.common_ill !== null ? row.common_ill.toLocaleString() : "-"}</td>
                    <td className="p-3 text-right font-semibold">{row.chronic_ill !== null ? row.chronic_ill.toLocaleString() : "-"}</td>
                    <td className="p-3 text-right font-semibold">{row.not_mentioned !== null ? row.not_mentioned.toLocaleString() : "-"}</td>
                    <td className="p-3 text-right font-bold text-[var(--civic-navy)]">{row.total !== null ? row.total.toLocaleString() : "-"}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-extrabold border-t border-slate-300">
                  <td className="p-3 text-center text-[var(--civic-navy)]">जम्मा</td>
                  <td className="p-3 text-right text-[var(--civic-navy)]">{famTotalHealthy.toLocaleString()}</td>
                  <td className="p-3 text-right text-[var(--civic-navy)]">{famTotalCommon.toLocaleString()}</td>
                  <td className="p-3 text-right text-[var(--civic-navy)]">{famTotalChronic.toLocaleString()}</td>
                  <td className="p-3 text-right text-[var(--civic-navy)]">{famTotalNotMentioned.toLocaleString()}</td>
                  <td className="p-3 text-right text-[var(--civic-red)]">{famTotal.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-slate-400 text-right italic">
            स्रोत: घरपरिवार सर्वेक्षण, २०७५
          </div>
        </div>

        {/* Section 4: Dynamic PDF Reports & Documents */}
        <div className="civic-card p-6 bg-white">
          <div className="border-b border-slate-200 pb-3 mb-5">
            <h2 className="text-xl font-extrabold text-[var(--civic-navy)] flex items-center gap-2">
              <FileText className="text-[var(--civic-red)]" />
              आधिकारिक प्रतिवेदन तथा दस्तावेजहरू
            </h2>
            <p className="text-sm text-slate-500 mt-1">डाउनलोड गरी अध्ययन गर्न सकिने आधिकारिक स्वास्थ्य प्रतिवेदन तथा HMIS बुलेटिनहरू।</p>
          </div>
          <ReportList reports={reports} />
        </div>

      </div>
    </SitePage>
  );
}
