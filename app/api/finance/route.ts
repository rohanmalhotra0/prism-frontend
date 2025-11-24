import { NextResponse } from "next/server";
import { UPSTREAM_API_BASE } from "@/lib/api-config";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const upstreamRes = await fetch(`${UPSTREAM_API_BASE}/finance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    // Try to parse JSON regardless of status; pass through status code
    let data: any = null;
    try {
      data = await upstreamRes.json();
    } catch {
      data = null;
    }

    return NextResponse.json(data ?? {}, { status: upstreamRes.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Finance proxy failed", detail: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}


