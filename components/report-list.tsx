"use client";

import { useState } from "react";
import { Newspaper, Download, Eye, EyeOff } from "lucide-react";

type ReportItem = {
  title: string;
  fileUrl?: string;
};

function getPreviewUrl(url: string) {
  if (!url) return "";
  // Check if it's a Google Drive link
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }
  return url;
}

export function ReportList({ reports }: { reports: ReportItem[] }) {
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>("");

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reports.map((item) => (
          <div
            key={item.title}
            className={`rounded-lg border p-5 transition-colors relative flex flex-col justify-between bg-slate-50 ${
              activePreview === item.fileUrl
                ? "border-[var(--civic-blue)] bg-blue-50/20"
                : "border-slate-200 hover:border-[var(--civic-blue)]"
            }`}
          >
            <div>
              <Newspaper className="text-[var(--civic-red)]" />
              <h3 className="mt-3 font-extrabold text-[var(--civic-navy)] text-base leading-snug">{item.title}</h3>
              <p className="mt-2 text-xs text-slate-500">प्रतिवेदन ढाँचा / आधिकारिक दस्तावेज</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {item.fileUrl ? (
                <>
                  <button
                    onClick={() => {
                      if (activePreview === item.fileUrl) {
                        setActivePreview(null);
                        setActiveTitle("");
                      } else {
                        setActivePreview(item.fileUrl!);
                        setActiveTitle(item.title);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--civic-red)] hover:underline focus:outline-none"
                  >
                    {activePreview === item.fileUrl ? (
                      <>
                        <EyeOff size={14} /> पूर्वावलोकन बन्द
                      </>
                    ) : (
                      <>
                        <Eye size={14} /> पूर्वावलोकन
                      </>
                    )}
                  </button>
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--civic-blue)] hover:underline"
                  >
                    <Download size={14} /> डाउनलोड
                  </a>
                </>
              ) : (
                <span className="text-xs font-bold text-slate-400">फाइल अद्यावधिक हुँदै</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {activePreview && (
        <div className="civic-card bg-white p-4 lg:p-5 border-2 border-[var(--civic-blue)] mt-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div>
              <p className="text-xs font-bold text-[var(--civic-red)]">File Viewer</p>
              <h3 className="text-lg font-extrabold text-[var(--civic-navy)]">{activeTitle}</h3>
            </div>
            <button
              onClick={() => {
                setActivePreview(null);
                setActiveTitle("");
              }}
              className="rounded bg-slate-100 hover:bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors"
            >
              बन्द गर्नुहोस् (Close Preview)
            </button>
          </div>
          <div className="relative w-full rounded border border-slate-200 overflow-hidden bg-slate-50 min-h-[500px]">
            <iframe
              src={getPreviewUrl(activePreview)}
              className="absolute inset-0 h-full w-full border-0"
              title="Report Document Preview"
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </div>
  );
}
