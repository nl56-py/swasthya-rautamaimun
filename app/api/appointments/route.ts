import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const fullName = typeof body?.full_name === "string" ? body.full_name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const service = typeof body?.service === "string" ? body.service.trim() : "";

  if (!fullName || !phone || !service) {
    return NextResponse.json({ error: "नाम, फोन र सेवा प्रकार आवश्यक छ।" }, { status: 400 });
  }

  const preferredDate = typeof body.preferred_date === "string" && body.preferred_date ? body.preferred_date : null;
  const payload = {
    full_name: fullName,
    phone,
    service,
    preferred_date: preferredDate,
    message: typeof body.message === "string" ? body.message.trim() : null
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
