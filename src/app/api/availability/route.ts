import { NextRequest, NextResponse } from "next/server";
import { getAvailability } from "@/lib/availability";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  const guests = Number(request.nextUrl.searchParams.get("guests") ?? "2");
  if (!date) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }
  await new Promise((resolve) => setTimeout(resolve, 450));
  return NextResponse.json(getAvailability(date, guests));
}
