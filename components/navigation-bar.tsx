"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Menu, X, ChevronDown } from "lucide-react";

const mainItems = [
  { label: "कर्मचारी", href: "/staff" },
  { label: "स्वास्थ्य संस्था", href: "/institutions" },
  { label: "कार्यक्रम", href: "/programs" },
  { label: "सूचना", href: "/notices" },
  { label: "ब्लग", href: "/blogs" },
  { label: "भिडियो", href: "/videos" },
  { label: "नागरिक बडापत्र", href: "/citizen-charter" },
  { label: "आकस्मिक सम्पर्क", href: "/emergency" },
  { label: "अपोइन्टमेन्ट", href: "/appointments" },
  { label: "सम्पर्क", href: "/contact" }
];

const otherItems = [
  { label: "प्रतिवेदन", href: "/reports" },
  { label: "गुनासो", href: "/grievance" },
  { label: "डाउनलोड", href: "/downloads" },
  { label: "फोटो तथा भिडियो ग्यालरी", href: "/gallery" }
];

export function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Combine for mobile view
  const mobileItems = [
    { label: "गृह पृष्ठ", href: "/" },
    ...mainItems,
    ...otherItems
  ];

  return (
    <nav className="sticky top-0 z-30 bg-[var(--civic-blue)] text-white shadow-md select-none">
      <div className="container-civic flex items-center justify-between h-14">
        {/* Mobile View: Home Link on the Left */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold md:hidden hover:bg-white/10 px-3 h-full animate-fade-in"
          aria-label="गृह पृष्ठ"
        >
          <Home size={18} fill="currentColor" />
          <span className="text-sm font-bold">गृह पृष्ठ</span>
        </Link>

        {/* Desktop View Navigation */}
        <div className="hidden flex-1 items-center md:flex h-full">
          <Link
            href="/"
            className="grid h-14 w-12 shrink-0 place-items-center hover:bg-white/10"
            aria-label="गृहपृष्ठ"
          >
            <Home size={18} fill="currentColor" />
          </Link>
          <div className="flex flex-wrap h-full items-center">
            {mainItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex h-14 items-center gap-1 whitespace-nowrap px-3 text-[13px] xl:text-[14px] font-bold hover:bg-white/10 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* "अन्य" Dropdown Button */}
            <div className="relative h-14">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex h-14 items-center gap-1.5 whitespace-nowrap px-3 text-[13px] xl:text-[14px] font-bold hover:bg-white/10 focus:outline-none transition-colors cursor-pointer"
              >
                अन्य
                <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <>
                  {/* Click outside backdrop to close */}
                  <div className="fixed inset-0 z-40 cursor-default" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 top-14 w-52 bg-[var(--civic-navy)] border border-white/10 rounded-b shadow-lg py-1 animate-fade-in z-50">
                    {otherItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-3 text-[13px] xl:text-[14px] font-bold hover:bg-white/10 text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View: Burger Menu Button on the Right */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex h-14 items-center gap-2 font-bold md:hidden ml-auto px-3 hover:bg-white/10 focus:outline-none"
          aria-label="मेनु"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
          <span>मेनु</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown Links */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[var(--civic-navy)] py-2">
          {mobileItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-[15px] font-bold border-b border-white/5 last:border-b-0 hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
