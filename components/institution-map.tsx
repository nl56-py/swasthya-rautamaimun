"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

type Institution = {
  name: string;
  type: string;
  address: string;
  mapUrl?: string;
};

type Props = {
  institutions: Institution[];
  branchMapUrl?: string;
};

export function InstitutionMap({ institutions, branchMapUrl }: Props) {
  const [selectedMap, setSelectedMap] = useState<string>(branchMapUrl || "");
  const [selectedName, setSelectedName] = useState<string>("स्वास्थ्य शाखा, रौतामाई गाउँपालिका");

  const mapList = [
    { name: "स्वास्थ्य शाखा, रौतामाई गाउँपालिका", mapUrl: branchMapUrl || "" },
    ...institutions.map((inst) => ({
      name: inst.name,
      mapUrl: inst.mapUrl || ""
    }))
  ];

  return (
    <div className="civic-card mt-6 p-4 lg:p-6 bg-slate-50 border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="text-[var(--civic-blue)] shrink-0" size={24} />
          <div>
            <h3 className="font-extrabold text-[var(--civic-navy)] text-base">गुगल स्थान नक्सा (Google Location Map)</h3>
            <p className="text-xs text-slate-500">नक्सा हेर्न स्वास्थ्य संस्था चयन गर्नुहोस्।</p>
          </div>
        </div>
        <div>
          <select
            value={selectedName}
            onChange={(e) => {
              const selected = mapList.find((m) => m.name === e.target.value);
              if (selected) {
                setSelectedName(selected.name);
                setSelectedMap(selected.mapUrl);
              }
            }}
            className="w-full md:w-80 rounded border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--civic-blue)]"
          >
            {mapList.map((mapItem) => (
              <option key={mapItem.name} value={mapItem.name}>
                {mapItem.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full rounded border border-slate-200 overflow-hidden bg-slate-100 min-h-[350px] lg:min-h-[450px]">
        {selectedMap ? (
          <iframe
            src={selectedMap}
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            title={selectedName}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div>
              <MapPin className="mx-auto text-slate-400 mb-2" size={32} />
              <p className="font-bold text-slate-500 text-sm">
                "{selectedName}" को गुगल नक्सा लिङ्क उपलब्ध छैन।
              </p>
              <p className="text-xs text-slate-400 mt-1">
                एड्मिन प्यानलबाट नक्सा लिङ्क थप्न सक्नुहुन्छ।
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
