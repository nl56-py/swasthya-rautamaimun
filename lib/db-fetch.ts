import { getSupabaseServerClient } from "./supabase-server";
import {
  branchContact,
  notices as noticesSeed,
  programs as programsSeed,
  institutions as institutionsSeed,
  emergencyContacts as emergencySeed,
  downloads as downloadsSeed,
  citizenCharter as charterSeed,
  galleryItems as gallerySeed,
  vaccinationSeed,
  nutritionSeed,
  familyHealthSeed,
  DownloadItem
} from "./content";

export async function fetchBranchContact() {
  const supabase = getSupabaseServerClient();
  let contact = { ...branchContact };

  if (!supabase) return contact;

  try {
    const { data: sections } = await supabase
      .from("site_sections")
      .select("slug, metadata")
      .in("slug", ["home", "contact"]);

    if (sections) {
      const home = sections.find((s) => s.slug === "home");
      const cont = sections.find((s) => s.slug === "contact");
      if (home?.metadata) contact = { ...contact, ...home.metadata };
      if (cont?.metadata) contact = { ...contact, ...cont.metadata };
    }
  } catch (error) {
    console.error("Error fetching branch contact:", error);
  }

  return contact;
}

export async function fetchAboutText() {
  const supabase = getSupabaseServerClient();
  const defaultText = "रौतामाई गाउँपालिकाको स्वास्थ्य शाखाले स्वास्थ्य योजना, सेवा समन्वय, रोग नियन्त्रण, स्वास्थ्य शिक्षा र तथ्याङ्क प्रतिवेदनको काम गर्छ।";

  if (!supabase) return defaultText;

  try {
    const { data } = await supabase
      .from("site_sections")
      .select("body")
      .eq("slug", "about")
      .single();

    if (data?.body) return data.body;
  } catch (error) {
    console.error("Error fetching about text:", error);
  }

  return defaultText;
}

export async function fetchStaff() {
  const supabase = getSupabaseServerClient();
  const defaultStaff = [
    {
      name: branchContact.chief,
      role: branchContact.chiefTitle,
      email: branchContact.email,
      phone: branchContact.phone,
      photo_url: "/ram.jfif"
    }
  ];

  if (!supabase) return defaultStaff;

  try {
    const { data } = await supabase
      .from("staff")
      .select("name, role, email, phone, photo_url")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) return data;
  } catch (error) {
    console.error("Error fetching staff:", error);
  }

  return defaultStaff;
}

export async function fetchInstitutions() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return institutionsSeed;

  try {
    const { data } = await supabase
      .from("health_institutions")
      .select("name, type, address, phone, service_time, map_url")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) {
      return data.map((item) => ({
        name: item.name,
        type: item.type,
        address: item.address || "",
        phone: item.phone || "",
        serviceTime: item.service_time || "",
        mapUrl: item.map_url || ""
      }));
    }
  } catch (error) {
    console.error("Error fetching institutions:", error);
  }

  return institutionsSeed;
}

export async function fetchNotices() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return noticesSeed;

  try {
    const { data } = await supabase
      .from("notices")
      .select("title, category, published_at, body, file_url, is_featured")
      .order("published_at", { ascending: false });

    if (data && data.length > 0) {
      return data.map((notice) => ({
        title: notice.title,
        category: notice.category,
        date: notice.published_at ? notice.published_at.replace(/-/g, "/") : "",
        body: notice.body || "",
        fileUrl: notice.file_url || undefined,
        isFeatured: notice.is_featured || false
      }));
    }
  } catch (error) {
    console.error("Error fetching notices:", error);
  }

  return noticesSeed;
}

export async function fetchPrograms() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return programsSeed;

  try {
    const { data } = await supabase
      .from("programs")
      .select("title, summary, icon")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) return data;
  } catch (error) {
    console.error("Error fetching programs:", error);
  }

  return programsSeed;
}

export async function fetchDownloads() {
  const supabase = getSupabaseServerClient();
  const fallback = downloadsSeed.map((item) => ({
    title: item.title,
    category: item.category,
    fileUrl: item.fileUrl
  }));

  if (!supabase) return fallback;

  try {
    const { data } = await supabase
      .from("downloads")
      .select("title, category, file_url")
      .neq("category", "report")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) {
      return data.map((item) => ({
        title: item.title,
        category: item.category,
        fileUrl: item.file_url || undefined
      }));
    }
  } catch (error) {
    console.error("Error fetching downloads:", error);
  }

  return fallback;
}

export async function fetchReports() {
  const supabase = getSupabaseServerClient();
  const fallback: DownloadItem[] = [
    { title: "HMIS रिपोर्ट", category: "report" },
    { title: "स्वास्थ्य सूचकहरू", category: "report" },
    { title: "मासिक प्रतिवेदन", category: "report" },
    { title: "Dashboard", category: "report" }
  ];

  if (!supabase) return fallback;

  try {
    const { data } = await supabase
      .from("downloads")
      .select("title, category, file_url")
      .eq("category", "report")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) {
      return data.map((item) => ({
        title: item.title,
        category: item.category,
        fileUrl: item.file_url || undefined
      }));
    }
  } catch (error) {
    console.error("Error fetching reports:", error);
  }

  return fallback;
}

export async function fetchEmergencyContacts() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return emergencySeed;

  try {
    const { data } = await supabase
      .from("emergency_contacts")
      .select("title, phone, details")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) {
      return data.map((item) => ({
        title: item.title,
        phone: item.phone,
        details: item.details || ""
      }));
    }
  } catch (error) {
    console.error("Error fetching emergency contacts:", error);
  }

  return emergencySeed;
}

export async function fetchGalleryItems() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return gallerySeed;

  try {
    const { data } = await supabase
      .from("gallery_items")
      .select("title")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) {
      return data.map((item) => item.title);
    }
  } catch (error) {
    console.error("Error fetching gallery items:", error);
  }

  return gallerySeed;
}

export async function fetchCitizenCharter() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return charterSeed;

  try {
    const { data } = await supabase
      .from("citizen_charter")
      .select("service, fee, service_time")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) {
      return data.map((item) => ({
        service: item.service,
        fee: item.fee,
        time: item.service_time
      }));
    }
  } catch (error) {
    console.error("Error fetching citizen charter:", error);
  }

  return charterSeed;
}

export async function fetchVaccinationRecords() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return vaccinationSeed;

  try {
    const { data } = await supabase
      .from("vaccination_records")
      .select("description, count_71_72, count_72_73, count_73_74")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) return data;
  } catch (error) {
    console.error("Error fetching vaccination records:", error);
  }

  return vaccinationSeed;
}

export async function fetchNutritionStatus() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return nutritionSeed;

  try {
    const { data } = await supabase
      .from("nutrition_status")
      .select("indicator, count_71_72, count_72_73, count_73_74")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) return data;
  } catch (error) {
    console.error("Error fetching nutrition status:", error);
  }

  return nutritionSeed;
}

export async function fetchFamilyHealthStatus() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return familyHealthSeed;

  try {
    const { data } = await supabase
      .from("family_health_status")
      .select("ward_number, healthy, common_ill, chronic_ill, not_mentioned, total")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) return data;
  } catch (error) {
    console.error("Error fetching family health status:", error);
  }

  return familyHealthSeed;
}
