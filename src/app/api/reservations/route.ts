import { NextRequest, NextResponse } from "next/server";
import { createReservation } from "@/lib/reservations";
import type { GuestDetails, PreOrderLine } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    guests: number;
    date: string;
    time: string;
    preOrder: PreOrderLine[];
    details: GuestDetails;
  };

  await new Promise((resolve) => setTimeout(resolve, 1100));

  if (body.details.email.toLowerCase().includes("fail@")) {
    return NextResponse.json(
      { error: "The time may have been claimed while you were filling in your details." },
      { status: 409 },
    );
  }

  const reservation = createReservation({
    guests: body.guests,
    date: body.date,
    time: body.time,
    table: body.guests > 10 ? "Long table" : "Dining room",
    preOrder: body.preOrder ?? [],
    details: body.details,
  });

  return NextResponse.json(reservation);
}
