// /app/api/datasets/route.ts
import { NextResponse } from "next/server";

// For now: in-memory storage (replace with DB later)
let datasets: any[] = [];

export async function GET() {
  return NextResponse.json(datasets);
}

// Optional: allow POST from upload route to push into this list
export async function POST(req: Request) {
  const data = await req.json();
  datasets.push(data);
  return NextResponse.json(data);
}
