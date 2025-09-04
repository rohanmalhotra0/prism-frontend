import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supaBaseClient";

const MAX_FILE_SIZE_MB = 10;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  if (!file.name.endsWith(".xlsx")) {
    return NextResponse.json({ error: "Only .xlsx allowed" }, { status: 400 });
  }

  const sizeMB = Math.round(file.size / (1024 * 1024));
  if (sizeMB > MAX_FILE_SIZE_MB) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // ✅ Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), "uploads");
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);

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

  // ✅ Update profile storage + dataset count
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("storage_used, datasets_count")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  await supabase
    .from("profiles")
    .update({
      storage_used: (profile.storage_used ?? 0) + sizeMB,
      datasets_count: (profile.datasets_count ?? 0) + 1,
    })
    .eq("id", user.id);

  const dataset = {
    id: Date.now().toString(),
    name: file.name,
    size: file.size,
    createdAt: new Date(),
    path: filePath,
  };

  return NextResponse.json(dataset);
}
