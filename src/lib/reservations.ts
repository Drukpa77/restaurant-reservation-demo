import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import type { Reservation } from "@/lib/types";

const FILE = join(process.cwd(), "src/data/reservations.json");

function readAll(): Reservation[] {
  try {
    return JSON.parse(readFileSync(FILE, "utf8")) as Reservation[];
  } catch {
    return [];
  }
}

function writeAll(rows: Reservation[]) {
  mkdirSync(dirname(FILE), { recursive: true });
  writeFileSync(FILE, JSON.stringify(rows, null, 2));
}

function nextReference(rows: Reservation[]) {
  const numbers = rows.map((row) => Number(row.reference.replace(/\D/g, "")) || 1000);
  const next = Math.max(1047, ...numbers) + 1;
  return `#RES${next}`;
}

export function listReservations() {
  return readAll();
}

export function getReservation(reference: string) {
  const key = reference.startsWith("#") ? reference : `#${reference}`;
  return readAll().find((row) => row.reference.toUpperCase() === key.toUpperCase()) ?? null;
}

export function createReservation(
  input: Omit<Reservation, "reference" | "createdAt" | "status">,
): Reservation {
  const rows = readAll();
  const reservation: Reservation = {
    ...input,
    reference: nextReference(rows),
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  rows.push(reservation);
  writeAll(rows);
  return reservation;
}

export function updateReservation(reference: string, patch: Partial<Reservation>) {
  const rows = readAll();
  const key = reference.startsWith("#") ? reference : `#${reference}`;
  const index = rows.findIndex((row) => row.reference.toUpperCase() === key.toUpperCase());
  if (index < 0) return null;
  rows[index] = { ...rows[index], ...patch, reference: rows[index].reference };
  writeAll(rows);
  return rows[index];
}
