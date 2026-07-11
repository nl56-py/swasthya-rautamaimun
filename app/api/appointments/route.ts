import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";
// @ts-ignore
import { bsToAd } from "@sbmdkl/nepali-date-converter";

export async function POST(request: NextRequest) {
  // 1. Rate Limiting
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
  const rateLimitResult = checkRateLimit(ip, 5, 60000); // 5 requests per minute
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "धेरै प्रयासहरू (Too many requests)। कृपया १ मिनेट पछि पुनः प्रयास गर्नुहोस्।" },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  
  // 2. Sanitize and validate inputs
  const fullName = typeof body?.full_name === "string" ? sanitizeText(body.full_name.trim()) : "";
  const phone = typeof body?.phone === "string" ? sanitizeText(body.phone.trim()) : "";
  const service = typeof body?.service === "string" ? sanitizeText(body.service.trim()) : "";

  if (!fullName || !phone || !service) {
    return NextResponse.json({ error: "नाम, फोन र सेवा प्रकार आवश्यक छ।" }, { status: 400 });
  }

  let preferredDate = typeof body.preferred_date === "string" && body.preferred_date ? sanitizeText(body.preferred_date) : null;
  if (preferredDate) {
    try {
      preferredDate = bsToAd(preferredDate);
    } catch (e) {
      console.error("Failed to convert preferred_date from BS to AD:", e);
      preferredDate = null;
    }
  }
  const message = typeof body.message === "string" ? sanitizeText(body.message.trim()) : null;

  const payload = {
    full_name: fullName,
    phone,
    service,
    preferred_date: preferredDate,
    message
  };

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, mode: "preview" });
  }

  const { error } = await supabase.from("appointments").insert(payload);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
