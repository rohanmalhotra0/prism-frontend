// /app/api/datasets/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supaBaseClient";

export async function GET(req: NextRequest) {
  // ✅ Get current user from request
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json({ error: "Invalid user" }, { status: 401 });
  }

  // ✅ Fetch datasets from Supabase
  const { data: datasets, error: datasetsError } = await supabase
    .from("datasets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (datasetsError) {
    return NextResponse.json({ error: "Failed to fetch datasets" }, { status: 500 });
  }

  return NextResponse.json(datasets || []);
}

// Optional: allow POST from upload route to push into this list
export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json(data);
}
