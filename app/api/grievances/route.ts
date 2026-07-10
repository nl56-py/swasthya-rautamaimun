import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "गुनासो विवरण आवश्यक छ।" }, { status: 400 });
  }

  const payload = {
    full_name: typeof body.full_name === "string" ? body.full_name.trim() : null,
    phone: typeof body.phone === "string" ? body.phone.trim() : null,
    email: typeof body.email === "string" ? body.email.trim() : null,
    category: typeof body.category === "string" ? body.category.trim() : null,
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
