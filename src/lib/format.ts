const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function parseISODate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isMonday(iso: string) {
  return parseISODate(iso).getDay() === 1;
}

export function nextSaturday(from = startOfToday()) {
  const day = from.getDay();
  const delta = (6 - day + 7) % 7 || 7;
  return addDays(from, delta);
}

export function weekdayShort(iso: string) {
  return WEEKDAYS[parseISODate(iso).getDay()].toUpperCase();
}

export function weekdayLong(iso: string) {
  return WEEKDAYS_LONG[parseISODate(iso).getDay()];
}

export function monthShort(iso: string) {
  return MONTHS_SHORT[parseISODate(iso).getMonth()];
}

export function monthLong(iso: string) {
  return MONTHS[parseISODate(iso).getMonth()];
}

export function dayNumber(iso: string) {
  return String(parseISODate(iso).getDate());
}

export function formatLongDate(iso: string) {
  const date = parseISODate(iso);
  return `${WEEKDAYS_LONG[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function formatCardDate(iso: string) {
  const date = parseISODate(iso);
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

export function formatSidebarDate(iso: string) {
  const date = parseISODate(iso);
  return `${WEEKDAYS_LONG[date.getDay()]}\n${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function formatTimeLabel(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function formatHold(msRemaining: number) {
  const total = Math.max(0, Math.floor(msRemaining / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function formatPrice(value: number) {
  return `$${value}`;
}

export function guestLabel(count: number) {
  return count === 1 ? "1 guest" : `${count} guests`;
}
