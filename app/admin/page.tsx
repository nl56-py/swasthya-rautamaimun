"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Building2,
  CalendarPlus,
  Download,
  FileText,
  Home,
  Lock,
  LogOut,
  Megaphone,
  MessageSquare,
  Save,
  Stethoscope,
  Users,
  Edit,
  Trash2,
  Plus,
  Video,
  Eye,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  branchContact,
  citizenCharter,
  downloads,
  emergencyContacts,
  galleryItems,
  institutions,
  notices,
  programs,
  reportItems,
  vaccinationSeed,
  nutritionSeed,
  familyHealthSeed
} from "@/lib/content";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

type ModuleId =
  | "home"
  | "about"
  | "staff"
  | "institutions"
  | "programs"
  | "notices"
  | "reports"
  | "downloads"
  | "grievance"
  | "emergency"
  | "gallery"
  | "contact"
  | "charter"
  | "appointments"
  | "vaccination"
  | "nutrition"
  | "family_health"
  | "blogs"
  | "videos"
  | "change_password";

type Submission = {
  id: string;
  full_name: string | null;
  phone: string | null;
  service?: string | null;
  category?: string | null;
  preferred_date?: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

type ModuleConfig = {
  id: ModuleId;
  label: string;
  helper: string;
  table?: string;
  select?: string;
  seed: string;
  serialize?: (rows: any[]) => string;
  parse: (text: string) => any[];
};

const sections = [
  { id: "home", label: "Home Page Settings", icon: Home },
  { id: "about", label: "हाम्रो बारेमा", icon: Users },
  { id: "staff", label: "कर्मचारी", icon: Users },
  { id: "institutions", label: "स्वास्थ्य संस्था", icon: Building2 },
  { id: "programs", label: "कार्यक्रम सेवा", icon: Stethoscope },
  { id: "notices", label: "सूचना प्रकाशन", icon: Megaphone },
  { id: "reports", label: "प्रतिवेदन (Reports)", icon: FileText },
  { id: "downloads", label: "डाउनलोड केन्द्र", icon: Download },
  { id: "blogs", label: "ब्लग लेखहरू (Blogs)", icon: FileText },
  { id: "videos", label: "भिडियो (Videos)", icon: Video },
  { id: "grievance", label: "गुनासो (Grievance)", icon: MessageSquare },
  { id: "emergency", label: "Emergency", icon: Bell },
  { id: "gallery", label: "Gallery", icon: FileText },
  { id: "contact", label: "Contact Info", icon: Users },
  { id: "charter", label: "Citizen Charter", icon: FileText },
  { id: "appointments", label: "Appointments", icon: CalendarPlus },
  { id: "vaccination", label: "खोप सेवा विवरण", icon: FileText },
  { id: "nutrition", label: "पोषणको अवस्था", icon: FileText },
  { id: "family_health", label: "परिवार स्वास्थ्य अवस्था", icon: FileText },
  { id: "change_password", label: "पासवर्ड परिवर्तन (Password)", icon: Lock }
] as const;

const overviewSeed = [
  `municipality | ${branchContact.municipality}`,
  `office | ${branchContact.office}`,
  `provinceLine | ${branchContact.provinceLine}`,
  `slogan | ${branchContact.slogan}`,
  `map_url | https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113824.31828551717!2d86.72146950294902!3d26.934898126135246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef692b15e44ec7%3A0xe2128e469c470a7d!2sRautamai!5e0!3m2!1sen!2snp!4v1720612345678!5m2!1sen!2snp`
].join("\n");

const aboutSeed =
  "रौतामाई गाउँपालिकाको स्वास्थ्य शाखाले स्वास्थ्य योजना, सेवा समन्वय, रोग नियन्त्रण, स्वास्थ्य शिक्षा र तथ्याङ्क प्रतिवेदनको काम गर्छ।";

const contactSeed = [
  `chief | ${branchContact.chief}`,
  `chiefTitle | ${branchContact.chiefTitle}`,
  `email | ${branchContact.email}`,
  `phone | ${branchContact.phone}`,
  `address | ${branchContact.address}`
].join("\n");

function serializeKeyValue(metadata: Record<string, string>) {
  return Object.entries(metadata || {})
    .map(([key, value]) => `${key} | ${value}`)
    .join("\n");
}

const moduleConfigs: Record<ModuleId, ModuleConfig> = {
  home: {
    id: "home",
    label: "Home Page Settings",
    helper: "विवरणहरू प्रविष्ट गर्नुहोस्।",
    table: "site_sections",
    seed: overviewSeed,
    serialize: (rows) => serializeKeyValue(rows[0]?.metadata),
    parse: (text) => [{ slug: "home", title: "Home Page", body: text, metadata: keyValueMetadata(text) }]
  },
  about: {
    id: "about",
    label: "हाम्रो बारेमा",
    helper: "हाम्रो बारेमा परिचय विवरण प्रविष्ट गर्नुहोस्।",
    table: "site_sections",
    seed: aboutSeed,
    serialize: (rows) => rows[0]?.body || "",
    parse: (text) => [{ slug: "about", title: "हाम्रो बारेमा", body: text, metadata: {} }]
  },
  staff: {
    id: "staff",
    label: "कर्मचारी",
    helper: "कर्मचारीको विवरण थप, सम्पादन वा हटाउनुहोस्।",
    table: "staff",
    select: "name, role, email, phone, photo_url, sort_order",
    seed: `${branchContact.chief} | ${branchContact.chiefTitle} | ${branchContact.email} | ${branchContact.phone} | /ram.jfif`,
    serialize: (rows) => rows.map((row) => [row.name, row.role, row.email, row.phone, row.photo_url].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        name: parts[0],
        role: parts[1] ?? "",
        email: parts[2] ?? null,
        phone: parts[3] ?? null,
        photo_url: parts[4] ?? null,
        sort_order: index
      }))
  },
  institutions: {
    id: "institutions",
    label: "स्वास्थ्य संस्था",
    helper: "स्वास्थ्य संस्थाको सूची सम्पादन गर्नुहोस्।",
    table: "health_institutions",
    select: "name, type, address, phone, service_time, map_url, sort_order",
    seed: institutions.map((item) => [item.name, item.type, item.address, item.phone, item.serviceTime, ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.name, row.type, row.address, row.phone, row.service_time, row.map_url].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        name: parts[0],
        type: parts[1] ?? "",
        address: parts[2] ?? null,
        phone: parts[3] ?? null,
        service_time: parts[4] ?? null,
        map_url: parts[5] ?? null,
        sort_order: index
      }))
  },
  programs: {
    id: "programs",
    label: "कार्यक्रम सेवा",
    helper: "सञ्चालित कार्यक्रम तथा सेवाहरू।",
    table: "programs",
    select: "title, summary, icon, content, sort_order",
    seed: programs.map((item) => [item.title, item.summary, "", ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.title, row.summary, row.icon || "", row.content || ""].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0],
        summary: parts[1] ?? "",
        icon: parts[2] ?? null,
        content: parts[3] ?? null,
        sort_order: index
      }))
  },
  notices: {
    id: "notices",
    label: "सूचना प्रकाशन",
    helper: "सूचना, समाचार तथा परिपत्रहरू।",
    table: "notices",
    select: "title, category, published_at, body, file_url, is_featured",
    seed: notices.map((item) => [item.title, item.category, item.date, item.body, "", "false"].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.title, row.category, row.published_at, row.body, row.file_url, row.is_featured ? "true" : "false"].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts) => ({
        title: parts[0],
        category: parts[1] ?? "सूचना",
        published_at: normalizeDate(parts[2]),
        body: parts[3] ?? null,
        file_url: parts[4] ?? null,
        is_featured: parts[5] === "true"
      }))
  },
  reports: {
    id: "reports",
    label: "प्रतिवेदन (Reports)",
    helper: "प्रतिवेदन दस्तावेजहरू। गुगल ड्राइभ लिङ्क वा PDF फाइल सिधै अपलोड गर्नुहोस्।",
    table: "downloads",
    select: "title, category, file_url, sort_order",
    seed: reportItems.map((item) => [item, "report", ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.filter((row) => row.category === "report").map((row) => [row.title, row.category, row.file_url].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0],
        category: parts[1] ?? "report",
        file_url: parts[2] ?? null,
        sort_order: index
      }))
  },
  downloads: {
    id: "downloads",
    label: "डाउनलोड केन्द्र",
    helper: "फाराम तथा कागजातहरू।",
    table: "downloads",
    select: "title, category, file_url, sort_order",
    seed: downloads.map((item) => [item.title, item.category, item.fileUrl ?? ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.filter((row) => row.category !== "report").map((row) => [row.title, row.category, row.file_url].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0],
        category: parts[1] ?? "फाराम",
        file_url: parts[2] ?? null,
        sort_order: index
      }))
  },
  blogs: {
    id: "blogs",
    label: "ब्लग लेखहरू (Blogs)",
    helper: "स्वास्थ्य ब्लग, सन्देश तथा जानकारीमूलक लेखहरू।",
    table: "blogs",
    select: "id, title, slug, content, cover_image_url, published_at",
    seed: "",
    serialize: (rows) => rows.map((row) => [row.title, row.slug, row.content.replace(/\n/g, "<br>"), row.cover_image_url || "", row.published_at].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts) => ({
        title: parts[0] ?? "",
        slug: parts[1] ?? "",
        content: (parts[2] ?? "").replace(/<br>/g, "\n"),
        cover_image_url: parts[3] ?? null,
        published_at: normalizeDate(parts[4])
      }))
  },
  videos: {
    id: "videos",
    label: "भिडियो (Videos)",
    helper: "यूट्यूब वा फेसबुक भिडियो लिङ्कहरू।",
    table: "videos",
    select: "id, title, youtube_url, is_reel, sort_order",
    seed: "",
    serialize: (rows) => rows.map((row) => [row.title, row.youtube_url, row.is_reel ? "true" : "false"].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0] ?? "",
        youtube_url: parts[1] ?? "",
        is_reel: parts[2] === "true",
        sort_order: index
      }))
  },
  grievance: {
    id: "grievance",
    label: "गुनासो (Grievance)",
    helper: "गुनासो शाखाको परिचय विवरण।",
    table: "site_sections",
    seed: "नागरिक गुनासो, सुझाव र प्रतिक्रिया यहाँबाट पठाउन सकिन्छ।",
    serialize: (rows) => rows[0]?.body || "",
    parse: (text) => [{ slug: "grievance", title: "Grievance", body: text, metadata: {} }]
  },
  emergency: {
    id: "emergency",
    label: "Emergency",
    helper: "आकस्मिक सम्पर्क नम्बरहरू।",
    table: "emergency_contacts",
    select: "title, phone, details, sort_order",
    seed: emergencyContacts.map((item) => [item.title, item.phone, item.details].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.title, row.phone, row.details].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0],
        phone: parts[1] ?? "",
        details: parts[2] ?? null,
        sort_order: index
      }))
  },
  gallery: {
    id: "gallery",
    label: "Gallery",
    helper: "ग्यालरीका तस्विरहरू।",
    table: "gallery_items",
    select: "title, media_type, media_url, thumbnail_url, sort_order",
    seed: galleryItems.map((item) => [item, "photo", "", ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.title, row.media_type, row.media_url, row.thumbnail_url].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        title: parts[0],
        media_type: parts[1] ?? "photo",
        media_url: parts[2] ?? null,
        thumbnail_url: parts[3] ?? null,
        sort_order: index
      }))
  },
  contact: {
    id: "contact",
    label: "Contact Info",
    table: "site_sections",
    helper: "सम्पर्क विवरणहरू।",
    seed: contactSeed,
    serialize: (rows) => serializeKeyValue(rows[0]?.metadata),
    parse: (text) => [{ slug: "contact", title: "Contact", body: text, metadata: keyValueMetadata(text) }]
  },
  charter: {
    id: "charter",
    label: "Citizen Charter",
    helper: "नागरिक बडापत्रका सेवाहरू।",
    table: "citizen_charter",
    select: "service, fee, service_time, sort_order",
    seed: citizenCharter.map((item) => [item.service, item.fee, item.time].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.service, row.fee, row.service_time].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        service: parts[0],
        fee: parts[1] ?? "",
        service_time: parts[2] ?? "",
        sort_order: index
      }))
  },
  appointments: {
    id: "appointments",
    label: "Appointments",
    helper: "अपोइन्टमेन्ट अनुरोधको परिचय पाठ।",
    table: "site_sections",
    seed: "नागरिकले उपलब्ध स्वास्थ्य सेवाका लागि अनलाइन appointment request पठाउन सक्छन्।",
    serialize: (rows) => rows[0]?.body || "",
    parse: (text) => [{ slug: "appointments", title: "Appointments", body: text, metadata: {} }]
  },
  vaccination: {
    id: "vaccination",
    label: "खोप सेवा विवरण",
    helper: "खोप सेवाको आँकडा तालिका।",
    table: "vaccination_records",
    select: "description, count_71_72, count_72_73, count_73_74, sort_order",
    seed: vaccinationSeed.map((row) => [row.description, row.count_71_72 ?? "", row.count_72_73 ?? "", row.count_73_74 ?? ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.description, row.count_71_72 ?? "", row.count_72_73 ?? "", row.count_73_74 ?? ""].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        description: parts[0],
        count_71_72: parts[1] ? parseInt(parts[1], 10) : null,
        count_72_73: parts[2] ? parseInt(parts[2], 10) : null,
        count_73_74: parts[3] ? parseInt(parts[3], 10) : null,
        sort_order: index
      }))
  },
  nutrition: {
    id: "nutrition",
    label: "पोषणको अवस्था",
    helper: "पोषण सम्बन्धी आँकडा तालिका।",
    table: "nutrition_status",
    select: "indicator, count_71_72, count_72_73, count_73_74, sort_order",
    seed: nutritionSeed.map((row) => [row.indicator, row.count_71_72 ?? "", row.count_72_73 ?? "", row.count_73_74 ?? ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.indicator, row.count_71_72 ?? "", row.count_72_73 ?? "", row.count_73_74 ?? ""].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        indicator: parts[0],
        count_71_72: parts[1] ? parseInt(parts[1], 10) : null,
        count_72_73: parts[2] ? parseInt(parts[2], 10) : null,
        count_73_74: parts[3] ? parseInt(parts[3], 10) : null,
        sort_order: index
      }))
  },
  family_health: {
    id: "family_health",
    label: "परिवार स्वास्थ्य अवस्था",
    helper: "परिवार स्वास्थ्यको वडागत आँकडा।",
    table: "family_health_status",
    select: "ward_number, healthy, common_ill, chronic_ill, not_mentioned, total, sort_order",
    seed: familyHealthSeed.map((row) => [row.ward_number, row.healthy ?? "", row.common_ill ?? "", row.chronic_ill ?? "", row.not_mentioned ?? "", row.total ?? ""].join(" | ")).join("\n"),
    serialize: (rows) => rows.map((row) => [row.ward_number, row.healthy ?? "", row.common_ill ?? "", row.chronic_ill ?? "", row.not_mentioned ?? "", row.total ?? ""].join(" | ")).join("\n"),
    parse: (text) =>
      parseDelimited(text).map((parts, index) => ({
        ward_number: parts[0],
        healthy: parts[1] ? parseInt(parts[1], 10) : null,
        common_ill: parts[2] ? parseInt(parts[2], 10) : null,
        chronic_ill: parts[3] ? parseInt(parts[3], 10) : null,
        not_mentioned: parts[4] ? parseInt(parts[4], 10) : null,
        total: parts[5] ? parseInt(parts[5], 10) : null,
        sort_order: index
      }))
  },
  change_password: {
    id: "change_password",
    label: "पासवर्ड परिवर्तन (Change Password)",
    helper: "नयाँ पासवर्ड सेट गर्नुहोस्।",
    seed: "",
    parse: () => []
  }
};

type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "date" | "file" | "image" | "rich-text";
};

const moduleFields: Record<ModuleId, FieldConfig[]> = {
  home: [
    { name: "municipality", label: "गाउँपालिका नाम (Municipality Name)", type: "text" },
    { name: "office", label: "कार्यालय नाम (Office Name)", type: "text" },
    { name: "provinceLine", label: "प्रदेश र जिल्ला (Province & District)", type: "text" },
    { name: "slogan", label: "नारा (Slogan)", type: "text" },
    { name: "map_url", label: "गुगल नक्सा (Google Map Embed URL)", type: "text" }
  ],
  about: [
    { name: "body", label: "विवरण (About Text)", type: "textarea" }
  ],
  contact: [
    { name: "chief", label: "स्वास्थ्य शाखा प्रमुख (Chief Name)", type: "text" },
    { name: "chiefTitle", label: "पद (Chief Title)", type: "text" },
    { name: "email", label: "इमेल (Email)", type: "text" },
    { name: "phone", label: "फोन नम्बर (Phone)", type: "text" },
    { name: "address", label: "ठेगाना (Address)", type: "text" }
  ],
  staff: [
    { name: "name", label: "नाम (Name)", type: "text" },
    { name: "role", label: "पद (Role)", type: "text" },
    { name: "email", label: "इमेल (Email)", type: "text" },
    { name: "phone", label: "फोन (Phone)", type: "text" },
    { name: "photo_url", label: "फोटो (Photo URL or Upload)", type: "image" }
  ],
  institutions: [
    { name: "name", label: "संस्थाको नाम (Name)", type: "text" },
    { name: "type", label: "संस्थाको प्रकार (Type)", type: "text" },
    { name: "address", label: "ठेगाना (Address)", type: "text" },
    { name: "phone", label: "सम्पर्क फोन (Phone)", type: "text" },
    { name: "service_time", label: "सेवा समय (Service Time)", type: "text" },
    { name: "map_url", label: "नक्सा लिङ्क (Google Map URL)", type: "text" }
  ],
  programs: [
    { name: "title", label: "कार्यक्रम शीर्षक (Title)", type: "text" },
    { name: "summary", label: "संक्षिप्त विवरण (Summary)", type: "textarea" },
    { name: "icon", label: "आइकन (Icon Name)", type: "text" },
    { name: "content", label: "विस्तृत विवरण (Full Content Page)", type: "rich-text" }
  ],
  notices: [
    { name: "title", label: "सूचना शीर्षक (Title)", type: "text" },
    { name: "category", label: "विधा (Category)", type: "text" },
    { name: "published_at", label: "प्रकाशन मिति (Published Date)", type: "date" },
    { name: "body", label: "सूचना विवरण (Body Description)", type: "textarea" },
    { name: "file_url", label: "फाइल लिङ्क वा अपलोड (File URL/Upload)", type: "file" },
    { name: "is_featured", label: "प्रमुख सूचना हो? (Is Featured)", type: "boolean" }
  ],
  reports: [
    { name: "title", label: "प्रतिवेदन शीर्षक (Report Title)", type: "text" },
    { name: "category", label: "विधा (Category)", type: "text" },
    { name: "file_url", label: "फाइल लिङ्क वा अपलोड (Drive/Direct Link)", type: "file" }
  ],
  downloads: [
    { name: "title", label: "डाउनलोड फाइल शीर्षक (Title)", type: "text" },
    { name: "category", label: "विधा (Category)", type: "text" },
    { name: "file_url", label: "फाइल लिङ्क वा अपलोड (File URL/Upload)", type: "file" }
  ],
  blogs: [
    { name: "title", label: "ब्लग शीर्षक (Title)", type: "text" },
    { name: "slug", label: "स्लग (Slug - English only, e.g. clean-health)", type: "text" },
    { name: "cover_image_url", label: "कभर चित्र (Cover Image URL/Upload)", type: "image" },
    { name: "published_at", label: "प्रकाशन मिति (Date)", type: "date" },
    { name: "content", label: "ब्लग विवरण (Content)", type: "rich-text" }
  ],
  videos: [
    { name: "title", label: "भिडियो शीर्षक (Title)", type: "text" },
    { name: "youtube_url", label: "भिडियो लिङ्क (YouTube or Facebook URL)", type: "text" },
    { name: "is_reel", label: "रिल भिडियो हो? (Is Reel/Vertical Video)", type: "boolean" }
  ],
  grievance: [
    { name: "body", label: "गुनासो शाखा परिचय (Intro Text)", type: "textarea" }
  ],
  emergency: [
    { name: "title", label: "शीर्षक (Title)", type: "text" },
    { name: "phone", label: "फोन नम्बर (Phone)", type: "text" },
    { name: "details", label: "थप विवरण (Details)", type: "text" }
  ],
  gallery: [
    { name: "title", label: "ग्यालरी शीर्षक (Title)", type: "text" },
    { name: "media_type", label: "प्रकार (photo/video)", type: "text" },
    { name: "media_url", label: "मिडिया लिङ्क (Media URL)", type: "text" },
    { name: "thumbnail_url", label: "थम्बनेल लिङ्क (Thumbnail URL)", type: "text" }
  ],
  charter: [
    { name: "service", label: "सेवा विवरण (Service)", type: "text" },
    { name: "fee", label: "शुल्क (Fee)", type: "text" },
    { name: "service_time", label: "समय (Time Taken)", type: "text" }
  ],
  appointments: [
    { name: "body", label: "अपोइन्टमेन्ट परिचय (Intro Text)", type: "textarea" }
  ],
  vaccination: [
    { name: "description", label: "विवरण (Vaccine Name)", type: "text" },
    { name: "count_71_72", label: "आ.व. ०७१/०७२ संख्या", type: "number" },
    { name: "count_72_73", label: "आ.व. ०७२/०७३ संख्या", type: "number" },
    { name: "count_73_74", label: "आ.व. ०७३/०७४ संख्या", type: "number" }
  ],
  nutrition: [
    { name: "indicator", label: "सूचकांक (Indicator)", type: "text" },
    { name: "count_71_72", label: "आ.व. ०७१/०७२ संख्या", type: "number" },
    { name: "count_72_73", label: "आ.व. ०७२/०७३ संख्या", type: "number" },
    { name: "count_73_74", label: "आ.व. ०७३/०७४ संख्या", type: "number" }
  ],
  family_health: [
    { name: "ward_number", label: "वडा नम्बर (Ward Number)", type: "text" },
    { name: "healthy", label: "स्वस्थ संख्या", type: "number" },
    { name: "common_ill", label: "सामान्य रोगी संख्या", type: "number" },
    { name: "chronic_ill", label: "दीर्घ रोगी संख्या", type: "number" },
    { name: "not_mentioned", label: "उल्लेख नभएको संख्या", type: "number" },
    { name: "total", label: "जम्मा संख्या", type: "number" }
  ],
  change_password: []
};

async function handleFileUpload(file: File): Promise<string | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).slice(2)}-${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from("uploads").upload(fileName, file);
    if (error) {
      console.error("Supabase Storage Error:", error);
      return null;
    }
    const { data: publicUrlData } = supabase.storage.from("uploads").getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("File upload crash:", err);
    return null;
  }
}

export default function AdminPage() {
  const router = useRouter();
  const [active, setActive] = useState<ModuleId>("home");
  const [moduleText, setModuleText] = useState<Record<ModuleId, string>>(() =>
    Object.fromEntries(Object.values(moduleConfigs).map((config) => [config.id, config.seed])) as Record<ModuleId, string>
  );
  const [status, setStatus] = useState("");
  const [checking, setChecking] = useState(true);
  const [grievances, setGrievances] = useState<Submission[]>([]);
  const [appointments, setAppointments] = useState<Submission[]>([]);

  // Visual Editor State
  const [editingItems, setEditingItems] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // null = not editing; -1 = adding; >=0 = editing index
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [fiscalYears, setFiscalYears] = useState({
    year1: "आ.व. ०७१/०७२",
    year2: "आ.व. ०७२/०७३",
    year3: "आ.व. ०७३/०७४"
  });

  const config = moduleConfigs[active];

  const dynamicFields = {
    ...moduleFields,
    vaccination: [
      { name: "description", label: "विवरण (Vaccine Name)", type: "text" },
      { name: "count_71_72", label: `${fiscalYears.year1} संख्या`, type: "number" },
      { name: "count_72_73", label: `${fiscalYears.year2} संख्या`, type: "number" },
      { name: "count_73_74", label: `${fiscalYears.year3} संख्या`, type: "number" }
    ],
    nutrition: [
      { name: "indicator", label: "सूचकांक (Indicator)", type: "text" },
      { name: "count_71_72", label: `${fiscalYears.year1} संख्या`, type: "number" },
      { name: "count_72_73", label: `${fiscalYears.year2} संख्या`, type: "number" },
      { name: "count_73_74", label: `${fiscalYears.year3} संख्या`, type: "number" }
    ]
  };

  async function saveFiscalYears() {
    setStatus("Saving fiscal years...");
    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("त्रुटि: Supabase जडान हुन सकेन।");
      return;
    }
    const { error } = await supabase.from("site_sections").upsert({
      slug: "fiscal_years",
      title: "Fiscal Years Config",
      metadata: fiscalYears
    }, { onConflict: "slug" });
    
    if (error) {
      setStatus("Fiscal years save failed: " + error.message);
    } else {
      setStatus("आर्थिक वर्ष सफलतापूर्वक सुरक्षित गरियो!");
    }
  }

  useEffect(() => {
    async function boot() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        router.push("/admin/login");
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/admin/login");
        return;
      }

      await Promise.all([loadEditableContent(), loadSubmissions()]);
      setChecking(false);
    }
    boot();
  }, [router]);

  // Sync editingItems when moduleText or active changes
  useEffect(() => {
    const parsed = config.parse(moduleText[active]);
    setEditingItems(parsed);
    setEditingIndex(null);
    setFormState({});
  }, [active, moduleText]);

  const moduleCounts = useMemo(
    () => ({
      notices: rowCount(moduleText.notices),
      institutions: rowCount(moduleText.institutions),
      programs: rowCount(moduleText.programs),
      grievances: grievances.length,
      appointments: appointments.length
    }),
    [appointments.length, grievances.length, moduleText]
  );

  async function loadEditableContent() {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const updates: Partial<Record<ModuleId, string>> = {};
    const siteSectionIds: ModuleId[] = ["home", "about", "grievance", "contact", "appointments"];

    const { data: sectionRows } = await supabase.from("site_sections").select("slug, body, metadata");
    sectionRows?.forEach((row) => {
      const id = row.slug as ModuleId;
      if (siteSectionIds.includes(id)) updates[id] = row.body ?? "";
      if (row.slug === "fiscal_years" && row.metadata) {
        const meta = row.metadata as any;
        setFiscalYears({
          year1: meta.year1 || "आ.व. ०७१/०७२",
          year2: meta.year2 || "आ.व. ०७२/०७३",
          year3: meta.year3 || "आ.व. ०७३/०७४"
        });
      }
    });

    await Promise.all(
      Object.values(moduleConfigs)
        .filter((item) => item.table && item.table !== "site_sections" && item.select)
        .map(async (item) => {
          const { data } = await supabase.from(item.table!).select(item.select!).order("created_at", { ascending: true });
          if (data?.length && item.serialize) updates[item.id] = item.serialize(data as any[]);
        })
    );

    setModuleText((current) => ({ ...current, ...updates }));
  }

  async function loadSubmissions() {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const [grievanceResult, appointmentResult] = await Promise.all([
      supabase.from("grievances").select("id, full_name, phone, category, message, status, created_at").order("created_at", { ascending: false }).limit(25),
      supabase.from("appointments").select("id, full_name, phone, service, preferred_date, message, status, created_at").order("created_at", { ascending: false }).limit(25)
    ]);

    if (grievanceResult.data) setGrievances(grievanceResult.data);
    if (appointmentResult.data) setAppointments(appointmentResult.data);
  }

  function updateEditingItems(newItems: any[]) {
    setEditingItems(newItems);
    let serialized = "";
    if (config.serialize) {
      serialized = config.serialize(newItems);
    } else {
      if (newItems.length > 0) {
        serialized = newItems[0].body || "";
      }
    }
    setModuleText((current) => ({ ...current, [active]: serialized }));
  }

  // Handle key-value editing for home/contact directly
  function handleKeyValueChange(key: string, value: string) {
    const newItems = [...editingItems];
    if (newItems.length === 0) {
      newItems.push({ slug: active, title: config.label, body: "", metadata: {} });
    }
    const meta = { ...newItems[0].metadata };
    meta[key] = value;
    newItems[0].metadata = meta;
    updateEditingItems(newItems);
  }

  // Handle plain text editing for about/grievance/appointments
  function handlePlainTextChange(value: string) {
    const newItems = [...editingItems];
    if (newItems.length === 0) {
      newItems.push({ slug: active, title: config.label, body: "", metadata: {} });
    }
    newItems[0].body = value;
    updateEditingItems(newItems);
  }

  async function saveModule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving...");
    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("त्रुटि: Supabase जडान हुन सकेन।");
      return;
    }

    const rows = config.parse(moduleText[active]).filter((row) => Object.values(row).some((value) => value !== "" && value !== null));
    if (!config.table) {
      setStatus("This module does not have a database table configured.");
      return;
    }

    if (config.table === "site_sections") {
      const { error } = await supabase.from("site_sections").upsert(rows);
      setStatus(error ? error.message : `${config.label} saved.`);
      return;
    }

    // Tabular table deletion & insertion
    let deleteQuery = supabase.from(config.table).delete();
    if (active === "reports") {
      deleteQuery = deleteQuery.eq("category", "report");
    } else if (active === "downloads") {
      deleteQuery = deleteQuery.neq("category", "report");
    } else {
      deleteQuery = deleteQuery.neq("id", "00000000-0000-0000-0000-000000000000");
    }

    const { error: deleteError } = await deleteQuery;
    if (deleteError) {
      setStatus(deleteError.message);
      return;
    }

    if (rows.length > 0) {
      const { error: insertError } = await supabase.from(config.table).insert(rows);
      if (insertError) {
        setStatus(insertError.message);
        return;
      }
    }

    setStatus(`${config.label} saved to database.`);
    await loadEditableContent();
  }

  async function updateSubmissionStatus(table: "grievances" | "appointments", id: string, nextStatus: string) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("त्रुटि: Supabase जडान हुन सकेन।");
      return;
    }

    const { error } = await supabase.from(table).update({ status: nextStatus, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus(`${table} status updated.`);
    await loadSubmissions();
  }

  async function signOut() {
    const supabase = getSupabaseClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/admin/login");
  }

  // Handle uploading files/images inside forms
  async function onFileSelect(event: React.ChangeEvent<HTMLInputElement>, fieldName: string) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);
    const uploadedUrl = await handleFileUpload(file);
    setUploadingField(null);

    if (uploadedUrl) {
      setFormState((prev) => ({ ...prev, [fieldName]: uploadedUrl }));
    } else {
      alert("फाइल अपलोड गर्न असफल भयो।");
    }
  }

  function handleSaveForm(event: FormEvent) {
    event.preventDefault();
    const next = [...editingItems];
    if (editingIndex === -1) {
      next.push(formState);
    } else if (editingIndex !== null) {
      next[editingIndex] = formState;
    }
    updateEditingItems(next);
    setEditingIndex(null);
    setFormState({});
  }

  if (checking) {
    return <main className="grid min-h-screen place-items-center bg-slate-100 font-bold text-[var(--civic-navy)]">Checking session...</main>;
  }

  const isKeyValueModule = active === "home" || active === "contact";
  const isPlainTextModule = active === "about" || active === "grievance" || active === "appointments";

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar / Mobile Top bar */}
        <aside className="w-full lg:w-[280px] bg-[var(--civic-navy)] text-white shrink-0">
          <div className="flex items-center justify-between lg:justify-start gap-3 border-b border-white/10 p-4 lg:p-5">
            <div className="flex items-center gap-3">
              <Image src="/emblem.png" alt="Rautamai emblem" width={48} height={40} className="h-10 w-auto" />
              <div>
                <p className="text-xs text-white/70">स्वास्थ्य शाखा</p>
                <p className="font-extrabold text-sm lg:text-base">Admin Panel</p>
              </div>
            </div>

            {/* Quick Actions for Mobile */}
            <div className="flex gap-2 lg:hidden">
              <Link href="/" className="rounded bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20">
                View Site
              </Link>
              <button onClick={signOut} className="rounded bg-[var(--civic-red)] px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700">
                Sign Out
              </button>
            </div>
          </div>

          {/* Module Selector Dropdown for Mobile */}
          <div className="p-3 lg:hidden border-b border-white/10">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1">
              Select Module
            </label>
            <select
              value={active}
              onChange={(event) => {
                setActive(event.target.value as ModuleId);
                setStatus("");
              }}
              className="w-full rounded bg-white/10 border border-white/20 px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-[var(--civic-red)]"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id} className="text-slate-900 bg-white">
                  {section.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sidebar Nav for Desktop */}
          <nav className="hidden lg:grid gap-1 p-3 max-h-[calc(100vh-80px)] overflow-y-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActive(section.id);
                    setStatus("");
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-bold hover:bg-white/10",
                    active === section.id && "bg-[var(--civic-red)]"
                  )}
                >
                  <Icon size={17} />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 min-w-0">
          {/* Header for Desktop */}
          <header className="hidden lg:flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white p-5">
            <div>
              <p className="text-sm font-bold text-[var(--civic-red)]">Content Management</p>
              <h1 className="text-2xl font-extrabold text-[var(--civic-navy)]">{config.label}</h1>
            </div>
            <div className="flex gap-2">
              <Link href="/" className="rounded-md border border-slate-300 px-3 py-2 font-bold text-slate-700">View Site</Link>
              <button onClick={signOut} className="inline-flex items-center gap-2 rounded-md bg-[var(--civic-red)] px-3 py-2 font-bold text-white">
                <LogOut size={17} /> Sign out
              </button>
            </div>
          </header>

          {/* Title for Mobile */}
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3">
            <p className="text-xs font-bold text-[var(--civic-red)]">Content Management</p>
            <h1 className="text-xl font-extrabold text-[var(--civic-navy)]">{config.label}</h1>
          </div>

          <div className="p-4 lg:p-5">
            {active === "change_password" ? (
              <PasswordChangeForm />
            ) : (
              <div className="grid gap-6">
                {/* Stats Dashboard Grid (Only shown when not editing items) */}
                {editingIndex === null && !isKeyValueModule && !isPlainTextModule && (
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                    {[
                      ["Notices", moduleCounts.notices],
                      ["Institutions", moduleCounts.institutions],
                      ["Programs", moduleCounts.programs],
                      ["Grievances", moduleCounts.grievances],
                      ["Appointments", moduleCounts.appointments]
                    ].map(([label, value]) => (
                      <div key={label} className="civic-card p-4 bg-white">
                        <p className="text-sm font-bold text-slate-500">{label}</p>
                        <p className="mt-1 text-2xl lg:text-3xl font-extrabold text-[var(--civic-navy)]">{value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submissions Section (Only shown when not editing on Home) */}
                {editingIndex === null && active === "home" && (
                  <div className="grid gap-4 xl:grid-cols-2">
                    <SubmissionList
                      title="Latest Grievances"
                      table="grievances"
                      items={grievances}
                      empty="No grievances yet."
                      statuses={["new", "in_review", "resolved", "closed"]}
                      onStatusChange={updateSubmissionStatus}
                    />
                    <SubmissionList
                      title="Latest Appointments"
                      table="appointments"
                      items={appointments}
                      empty="No appointment requests yet."
                      statuses={["requested", "confirmed", "completed", "cancelled"]}
                      onStatusChange={updateSubmissionStatus}
                    />
                  </div>
                )}

                {/* Form Editor Card */}
                <form onSubmit={saveModule} className="civic-card p-4 lg:p-5 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
                    <div>
                      <h2 className="text-lg lg:text-xl font-extrabold text-[var(--civic-navy)]">{config.label} Editor</h2>
                      <p className="mt-1 text-xs lg:text-sm font-semibold text-slate-500">{config.helper}</p>
                    </div>
                    {editingIndex === null && (
                      <button className="inline-flex items-center gap-2 rounded bg-[var(--civic-blue)] px-4 py-2 font-bold text-white text-xs hover:bg-opacity-90 transition-colors cursor-pointer">
                        <Save size={16} /> Save to Database
                      </button>
                    )}
                  </div>

                  {/* KEY-VALUE FIELDS EDITOR (Home / Contact) */}
                  {isKeyValueModule && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {dynamicFields[active].map((field) => {
                        const meta = editingItems[0]?.metadata || {};
                        return (
                          <label key={field.name} className="admin-label">
                            {field.label}
                            <input
                              type="text"
                              className="admin-input"
                              value={meta[field.name] || ""}
                              onChange={(e) => handleKeyValueChange(field.name, e.target.value)}
                            />
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* PLAIN TEXT EDITOR (About / Grievance Intro / Appointment Intro) */}
                  {isPlainTextModule && (
                    <div className="grid gap-4">
                      {dynamicFields[active].map((field) => (
                        <label key={field.name} className="admin-label">
                          {field.label}
                          <textarea
                            className="admin-input min-h-[250px] font-medium leading-relaxed"
                            value={editingItems[0]?.body || ""}
                            onChange={(e) => handlePlainTextChange(e.target.value)}
                          />
                        </label>
                      ))}
                    </div>
                  )}

                  {/* LIST & ITEMIZED CARD BUILDER (Staff, Institution, Notice, etc.) */}
                  {!isKeyValueModule && !isPlainTextModule && (
                    <div>
                      {editingIndex === null ? (
                        <div className="space-y-4">
                          {(active === "vaccination" || active === "nutrition") && (
                            <div className="bg-slate-50 border border-slate-200 rounded-md p-4 mb-4">
                              <div className="flex items-center justify-between gap-4 mb-3 border-b border-slate-200 pb-2">
                                <h3 className="font-extrabold text-[var(--civic-navy)] text-xs">आर्थिक वर्षहरू सम्पादन गर्नुहोस् (Edit Fiscal Years)</h3>
                                <button
                                  type="button"
                                  onClick={saveFiscalYears}
                                  className="rounded bg-[var(--civic-blue)] px-3 py-1 font-bold text-white text-[10px] hover:bg-opacity-90 transition-colors shrink-0 cursor-pointer"
                                >
                                  सुरक्षित गर्नुहोस् (Save Years)
                                </button>
                              </div>
                              <div className="grid gap-3 sm:grid-cols-3">
                                <label className="admin-label !text-[11px] !mb-0">
                                  प्रथम वर्ष (Year 1)
                                  <input
                                    type="text"
                                    className="admin-input !py-1 !text-xs font-semibold"
                                    value={fiscalYears.year1}
                                    onChange={(e) => setFiscalYears(prev => ({ ...prev, year1: e.target.value }))}
                                  />
                                </label>
                                <label className="admin-label !text-[11px] !mb-0">
                                  द्वितीय वर्ष (Year 2)
                                  <input
                                    type="text"
                                    className="admin-input !py-1 !text-xs font-semibold"
                                    value={fiscalYears.year2}
                                    onChange={(e) => setFiscalYears(prev => ({ ...prev, year2: e.target.value }))}
                                  />
                                </label>
                                <label className="admin-label !text-[11px] !mb-0">
                                  तृतीय वर्ष (Year 3)
                                  <input
                                    type="text"
                                    className="admin-input !py-1 !text-xs font-semibold"
                                    value={fiscalYears.year3}
                                    onChange={(e) => setFiscalYears(prev => ({ ...prev, year3: e.target.value }))}
                                  />
                                </label>
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between items-center">
                            <h3 className="font-bold text-slate-600 text-sm">सूचीबद्ध विवरणहरू (Items List):</h3>
                            <button
                              type="button"
                              onClick={() => {
                                const defaults = Object.fromEntries(
                                  dynamicFields[active].map((f) => [
                                    f.name,
                                    f.type === "boolean" ? false : f.type === "number" ? 0 : ""
                                  ])
                                );
                                setFormState(defaults);
                                setEditingIndex(-1);
                              }}
                              className="inline-flex items-center gap-1.5 rounded bg-[var(--civic-red)] px-3 py-1.5 text-xs font-bold text-white hover:bg-opacity-90 cursor-pointer"
                            >
                              <Plus size={14} /> नयाँ थप्नुहोस् (Add Item)
                            </button>
                          </div>

                          {editingItems.length === 0 ? (
                            <p className="text-center py-6 text-sm font-semibold text-slate-400 bg-slate-50 border border-dashed rounded-md">
                              कुनै पनि विवरण थपिएको छैन।
                            </p>
                          ) : (
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                              {editingItems.map((item, index) => (
                                <div key={index} className="border border-slate-200 rounded p-4 flex flex-col justify-between hover:bg-slate-50/40 relative">
                                  <div>
                                    <p className="font-extrabold text-[var(--civic-navy)] text-sm mb-1 leading-snug">
                                      {item.title || item.name || item.service || item.description || item.indicator || `वडा ${item.ward_number}` || `Item ${index + 1}`}
                                    </p>
                                    <p className="text-xs text-slate-500 line-clamp-2">
                                      {item.role || item.type || item.category || item.summary || item.details || item.fee || item.youtube_url || ""}
                                    </p>
                                  </div>
                                  <div className="mt-4 border-t border-slate-100 pt-3 flex justify-end gap-3">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setFormState({ ...item });
                                        setEditingIndex(index);
                                      }}
                                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--civic-blue)] hover:underline focus:outline-none"
                                    >
                                      <Edit size={12} /> सम्पादन
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const next = editingItems.filter((_, i) => i !== index);
                                        updateEditingItems(next);
                                      }}
                                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline focus:outline-none"
                                    >
                                      <Trash2 size={12} /> हटाउनुहोस्
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        // Form to Add or Edit a single item
                        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 animate-fade-in">
                          <h3 className="font-bold text-[var(--civic-navy)] text-sm mb-4 border-b border-slate-200 pb-2">
                            {editingIndex === -1 ? "नयाँ विवरण प्रविष्टि (Add Item)" : "विवरण सम्पादन (Edit Item)"}
                          </h3>
                          <div className="grid gap-4 sm:grid-cols-2 mb-5">
                            {dynamicFields[active].map((field) => {
                              if (field.type === "textarea") {
                                return (
                                  <label key={field.name} className="admin-label sm:col-span-2">
                                    {field.label}
                                    <textarea
                                      className="admin-input min-h-20"
                                      value={formState[field.name] || ""}
                                      onChange={(e) => setFormState((prev) => ({ ...prev, [field.name]: e.target.value }))}
                                      required
                                    />
                                  </label>
                                );
                              }
                              if (field.type === "rich-text") {
                                return (
                                  <div key={field.name} className="admin-label sm:col-span-2">
                                    <span>{field.label}</span>
                                    <RichTextEditor
                                      value={formState[field.name] || ""}
                                      onChange={(val) => setFormState((prev) => ({ ...prev, [field.name]: val }))}
                                    />
                                  </div>
                                );
                              }
                              if (field.type === "boolean") {
                                return (
                                  <label key={field.name} className="flex items-center gap-2 font-bold text-slate-700 text-sm mt-6 select-none cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(formState[field.name])}
                                      onChange={(e) => setFormState((prev) => ({ ...prev, [field.name]: e.target.checked }))}
                                      className="h-4 w-4 rounded border-slate-300 text-[var(--civic-blue)]"
                                    />
                                    {field.label}
                                  </label>
                                );
                              }
                              if (field.type === "image" || field.type === "file") {
                                return (
                                  <div key={field.name} className="admin-label sm:col-span-2">
                                    <span>{field.label}</span>
                                    <div className="flex gap-2">
                                      <input
                                        type="text"
                                        className="admin-input flex-1"
                                        placeholder="Paste Link or Upload file"
                                        value={formState[field.name] || ""}
                                        onChange={(e) => setFormState((prev) => ({ ...prev, [field.name]: e.target.value }))}
                                      />
                                      <input
                                        type="file"
                                        className="hidden"
                                        id={`upload-${field.name}`}
                                        onChange={(e) => onFileSelect(e, field.name)}
                                        accept={field.type === "image" ? "image/*" : "application/pdf,.doc,.docx,.xls,.xlsx"}
                                      />
                                      <label
                                        htmlFor={`upload-${field.name}`}
                                        className="rounded bg-slate-200 border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-300 select-none flex items-center justify-center shrink-0"
                                      >
                                        {uploadingField === field.name ? "Uploading..." : "Upload File"}
                                      </label>
                                    </div>
                                  </div>
                                );
                              }
                              return (
                                <label key={field.name} className="admin-label">
                                  {field.label}
                                  <input
                                    type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                                    className="admin-input"
                                    value={formState[field.name] === undefined ? "" : formState[field.name]}
                                    onChange={(e) => setFormState((prev) => ({ ...prev, [field.name]: field.type === "number" ? Number(e.target.value) : e.target.value }))}
                                    required
                                  />
                                </label>
                              );
                            })}
                          </div>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={handleSaveForm}
                              className="rounded bg-[var(--civic-blue)] px-4 py-2 font-bold text-white text-xs hover:bg-opacity-90 cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingIndex(null);
                                setFormState({});
                              }}
                              className="rounded border border-slate-300 bg-white px-4 py-2 font-bold text-slate-700 text-xs hover:bg-slate-50 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {status && (
                    <div className="mt-4 flex items-center gap-2 bg-slate-50 border border-slate-200 p-3 rounded text-sm font-semibold text-slate-700">
                      <Check size={16} className="text-green-600" />
                      <span>{status}</span>
                    </div>
                  )}
                </form>

                {editingIndex === null && active === "grievance" && (
                  <SubmissionList
                    title="Submitted Grievances (गुनासोहरू)"
                    table="grievances"
                    items={grievances}
                    empty="No grievances yet."
                    statuses={["new", "in_review", "resolved", "closed"]}
                    onStatusChange={updateSubmissionStatus}
                  />
                )}

                {editingIndex === null && active === "appointments" && (
                  <SubmissionList
                    title="Submitted Appointments (अपोइन्टमेन्टहरू)"
                    table="appointments"
                    items={appointments}
                    empty="No appointment requests yet."
                    statuses={["requested", "confirmed", "completed", "cancelled"]}
                    onStatusChange={updateSubmissionStatus}
                  />
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function RichTextEditor({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const editorId = "rich-editor";
  return (
    <div className="border border-slate-300 rounded-md overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 bg-slate-100 border-b border-slate-300 p-2">
        {["bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              document.execCommand(cmd, false);
              const el = document.getElementById(editorId);
              if (el) onChange(el.innerHTML);
            }}
            className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-300 rounded text-xs font-bold focus:outline-none"
          >
            {cmd.replace("insert", "").replace("justify", "")}
          </button>
        ))}
        {["h1", "h2", "h3", "p"].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              document.execCommand("formatBlock", false, `<${tag}>`);
              const el = document.getElementById(editorId);
              if (el) onChange(el.innerHTML);
            }}
            className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-300 rounded text-xs font-bold uppercase focus:outline-none"
          >
            {tag}
          </button>
        ))}
      </div>
      {/* Editable Area */}
      <div
        id={editorId}
        contentEditable
        className="p-4 min-h-[200px] outline-none max-h-[350px] overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
}

function SubmissionList({
  title,
  table,
  items,
  empty,
  statuses,
  onStatusChange
}: {
  title: string;
  table: "grievances" | "appointments";
  items: Submission[];
  empty: string;
  statuses: string[];
  onStatusChange: (table: "grievances" | "appointments", id: string, nextStatus: string) => void;
}) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="civic-card p-5 bg-white">
      <h2 className="font-extrabold text-[var(--civic-navy)]">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 && <p className="text-sm font-semibold text-slate-500">{empty}</p>}
        {items.map((item) => {
          const isExpanded = expandedIds[item.id];
          return (
            <article key={item.id} className="rounded border border-slate-200 bg-slate-50 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-extrabold">{item.full_name ?? "नाम उपलब्ध छैन"}</p>
                <select
                  className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-bold text-slate-700"
                  value={item.status}
                  onChange={(event) => onStatusChange(table, item.id, event.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {item.service ?? item.category ?? "General"} | {item.phone ?? "No phone"}
                {item.preferred_date && ` | Preferred Date: ${item.preferred_date}`}
              </p>
              <div className="mt-2">
                <p className={cn("text-sm text-slate-700 whitespace-pre-wrap", !isExpanded && "line-clamp-2")}>
                  {item.message}
                </p>
                {item.message && item.message.length > 100 && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    className="mt-1 text-xs font-bold text-[var(--civic-blue)] hover:underline"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function PasswordChangeForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setStatus("त्रुटि: पासवर्डहरू मेल खाएनन् (Passwords do not match).");
      return;
    }
    if (password.length < 6) {
      setStatus("त्रुटि: पासवर्ड कम्तिमा ६ अक्षरको हुनुपर्छ (Password must be at least 6 characters).");
      return;
    }

    setLoading(true);
    setStatus("");
    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("त्रुटि: Supabase जडान हुन सकेन।");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setStatus(`त्रुटि: ${error.message}`);
    } else {
      setStatus("सफलतापूर्वक: पासवर्ड परिवर्तन भयो (Password updated successfully!).");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="civic-card p-5 max-w-md bg-white">
      <div>
        <h2 className="text-xl font-extrabold text-[var(--civic-navy)]">पासवर्ड परिवर्तन गर्नुहोस्</h2>
        <p className="mt-1 text-xs font-semibold text-slate-500">तपाईंको नयाँ सुरक्षित पासवर्ड यहाँ प्रविष्ट गर्नुहोस्।</p>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="admin-label">
          नयाँ पासवर्ड (New Password)
          <input
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>

        <label className="admin-label">
          पासवर्ड पुष्टि गर्नुहोस् (Confirm Password)
          <input
            type="password"
            className="admin-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>

        {status && (
          <p className={cn(
            "rounded p-3 text-sm font-semibold border",
            status.startsWith("सफलतापूर्वक") 
              ? "bg-green-50 text-green-800 border-green-200" 
              : "bg-red-50 text-red-800 border-red-200"
          )}>
            {status}
          </p>
        )}

        <button
          disabled={loading}
          className="rounded-md bg-[var(--civic-blue)] px-4 py-2.5 font-bold text-white disabled:opacity-60 cursor-pointer hover:bg-opacity-90 transition-colors mt-2 text-sm"
        >
          {loading ? "पासवर्ड अपडेट हुँदैछ..." : "पासवर्ड अपडेट गर्नुहोस्"}
        </button>
      </div>
    </form>
  );
}

function parseDelimited(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split("|").map((part) => emptyToNull(part.trim()) as string));
}

function keyValueMetadata(text: string) {
  return Object.fromEntries(parseDelimited(text).map(([key, value]) => [key, value ?? ""]));
}

function emptyToNull(value: string) {
  return value === "" ? null : value;
}

function normalizeDate(value: string | null | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date().toISOString().slice(0, 10);
  return value;
}

function rowCount(text: string) {
  return text.split("\n").filter((line) => line.trim()).length;
}
