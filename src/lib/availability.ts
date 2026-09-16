import { isMonday, parseISODate } from "@/lib/format";
import type { AvailabilityResponse, TimeSlot, TimeSlotStatus } from "@/lib/types";

const LUNCH = ["12:00", "12:30", "13:00", "13:30", "14:00"];
const EVENING = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

function labelFor(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function getAvailability(date: string, guests: number): AvailabilityResponse {
  if (isMonday(date)) {
    return { date, guests, closed: true, slots: [] };
  }

  const weekday = parseISODate(date).getDay();
  const weekendService = weekday === 0 || weekday === 5 || weekday === 6;
  const times = weekendService ? [...LUNCH, ...EVENING] : EVENING;
  const day = Number(date.slice(-2));
  const busy = guests > 8 || day % 7 === 3;

  const slots: TimeSlot[] = times.map((time) => {
    let status: TimeSlotStatus = "available";
    let remaining: number | undefined;

    if (time === "17:00" || time === "20:30") status = "full";
    else if (time === "18:30") {
      status = "almost_full";
      remaining = 2;
    } else if (time === "19:30") status = "popular";

    if (busy && time === "19:00") status = "almost_full";
    if (guests > 10 && (time === "17:30" || time === "20:00")) status = "full";

    return {
      time,
      label: labelFor(time),
      status,
      remaining,
    };
  });

  return { date, guests, closed: false, slots };
}
