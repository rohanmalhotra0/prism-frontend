import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supaBaseClient";

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

  // ✅ Get dataset from Supabase
  const { data: dataset, error: datasetError } = await supabase
    .from("datasets")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (datasetError || !dataset) {
    return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
  }

  // ✅ Delete from Supabase
  const { error: deleteError } = await supabase
    .from("datasets")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (deleteError) {
    return NextResponse.json({ error: "Failed to delete dataset" }, { status: 500 });
  }

  // ✅ Delete file from /uploads (if it exists)
  if (dataset?.path) {
    try {
      await fs.unlink(path.resolve(dataset.path));
    } catch (err) {
      console.warn("File already deleted or not found:", dataset.path);
    }
  }

  // ✅ Update profile stats
  const sizeMB = Math.round((dataset.size ?? 0) / (1024 * 1024));

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
    removed: dataset,
  });
}

// ✅ Optional: GET one dataset by id
export async function GET(
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

  // ✅ Get dataset from Supabase
  const { data: dataset, error: datasetError } = await supabase
    .from("datasets")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (datasetError || !dataset) {
    return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
  }

  return NextResponse.json(dataset);
}
