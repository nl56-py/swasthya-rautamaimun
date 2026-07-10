"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Menu, X } from "lucide-react";

const navItems = [
  { label: "गृह पृष्ठ", href: "/" },
  { label: "कर्मचारी", href: "/staff" },
  { label: "स्वास्थ्य संस्था", href: "/institutions" },
  { label: "कार्यक्रम", href: "/programs" },
  { label: "प्रतिवेदन", href: "/reports" },
  { label: "सूचना", href: "/notices" },
  { label: "डाउनलोड", href: "/downloads" },
  { label: "आकस्मिक सम्पर्क", href: "/emergency" },
  { label: "नागरिक बडापत्र", href: "/citizen-charter" },
  { label: "ग्यालरी", href: "/gallery" },
  { label: "गुनासो", href: "/grievance" },
  { label: "अपोइन्टमेन्ट", href: "/appointments" },
  { label: "सम्पर्क", href: "/contact" }
];

export function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 bg-[var(--civic-blue)] text-white shadow-md">
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
        <div className="hidden min-w-0 flex-1 items-center overflow-x-auto md:flex h-full">
          <Link
            href="/"
            className="grid h-14 w-12 shrink-0 place-items-center hover:bg-white/10"
            aria-label="गृहपृष्ठ"
          >
            <Home size={18} fill="currentColor" />
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex h-full items-center gap-1 whitespace-nowrap px-3 text-[14px] font-bold hover:bg-white/10 xl:px-4"
            >
              {item.label}
            </Link>
          ))}
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
          {navItems.map((item) => (
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
