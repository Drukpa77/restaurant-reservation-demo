import { site } from "@/lib/site";

/** Kitchen hours in Australia/Canberra (Sydney timezone). Mondays are closed for bookings. */
export function melbourneNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: site.timezone }));
}

export function kitchenStatus() {
  const now = melbourneNow();
  const day = now.getDay(); // 0 Sun
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (day === 1) {
    return { open: false, label: "Closed Mondays", until: "Tuesday 5:00 PM" };
  }

  const weekend = day === 0 || day === 5 || day === 6;
  const openAt = weekend ? 12 * 60 : 17 * 60;
  const closeAt = weekend ? 23 * 60 : 22 * 60;
  const kitchenUntil = closeAt - 30;

  if (minutes >= openAt && minutes < kitchenUntil) {
    const closeHour = Math.floor(closeAt / 60);
    const suffix = closeHour >= 12 ? "PM" : "AM";
    const h12 = closeHour % 12 || 12;
    return {
      open: true,
      label: `Open now · kitchen until ${h12}:00 ${suffix}`,
      until: `${h12}:00 ${suffix}`,
    };
  }

  if (minutes >= kitchenUntil && minutes < closeAt) {
    return { open: true, label: "Open · kitchen closed", until: "bar only" };
  }

  return {
    open: false,
    label: weekend ? "Opens at 12:00 PM" : "Opens at 5:00 PM",
    until: weekend ? "12:00 PM" : "5:00 PM",
  };
}
