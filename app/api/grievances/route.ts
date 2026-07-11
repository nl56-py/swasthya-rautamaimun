import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";

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
  const message = typeof body?.message === "string" ? sanitizeText(body.message.trim()) : "";

  if (!message) {
    return NextResponse.json({ error: "गुनासो विवरण आवश्यक छ।" }, { status: 400 });
  }

  const payload = {
    full_name: typeof body.full_name === "string" ? sanitizeText(body.full_name.trim()) : null,
    phone: typeof body.phone === "string" ? sanitizeText(body.phone.trim()) : null,
    email: typeof body.email === "string" ? sanitizeText(body.email.trim()) : null,
    category: typeof body.category === "string" ? sanitizeText(body.category.trim()) : null,
    message
  };

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, mode: "preview" });
  }

  const { error } = await supabase.from("grievances").insert(payload);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
