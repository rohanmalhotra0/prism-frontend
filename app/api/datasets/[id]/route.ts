import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supaBaseClient";

// Temporary in-memory store (replace with DB later)
let datasets: any[] = [];

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // ✅ Authenticate user
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json({ error: "Invalid user" }, { status: 401 });
  }

  // ✅ Find dataset
  const index = datasets.findIndex((d) => d.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
  }
  const [removed] = datasets.splice(index, 1);

  // ✅ Delete file from /uploads (if it exists)
  if (removed?.path) {
    try {
      await fs.unlink(path.resolve(removed.path));
    } catch (err) {
      console.warn("File already deleted or not found:", removed.path);
    }
  }

  // ✅ Update profile stats
  const sizeMB = Math.round((removed.size ?? 0) / (1024 * 1024));

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("storage_used, datasets_count")
    .eq("id", user.id)
    .single();

  if (profile && !profileError) {
    await supabase
      .from("profiles")
      .update({
        storage_used: Math.max(0, (profile.storage_used ?? 0) - sizeMB),
        datasets_count: Math.max(0, (profile.datasets_count ?? 1) - 1),
      })
      .eq("id", user.id);
  }

  return NextResponse.json({
    success: true,
    removed,
  });
}

// ✅ Optional: GET one dataset by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const dataset = datasets.find((d) => d.id === id);

  if (!dataset) {
    return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
  }

  return NextResponse.json(dataset);
}
