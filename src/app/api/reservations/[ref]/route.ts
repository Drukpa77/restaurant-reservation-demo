import { NextRequest, NextResponse } from "next/server";
import { getReservation, updateReservation } from "@/lib/reservations";

type Params = { params: Promise<{ ref: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { ref } = await params;
  const reservation = getReservation(decodeURIComponent(ref));
  if (!reservation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(reservation);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { ref } = await params;
  const patch = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 400));
  const reservation = updateReservation(decodeURIComponent(ref), patch);
  if (!reservation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(reservation);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { ref } = await params;
  const reservation = updateReservation(decodeURIComponent(ref), { status: "cancelled" });
  if (!reservation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(reservation);
}
