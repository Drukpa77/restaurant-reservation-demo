"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import menu from "@/data/menu.json";
import { BookingHeader, BookingMobileBar } from "@/components/layout/BookingHeader";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Sheet } from "@/components/ui/Overlay";
import { Stepper } from "@/components/ui/Stepper";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { formatPrice, guestLabel } from "@/lib/format";
import { dishPhotos } from "@/lib/photos";
import { useBooking } from "@/lib/booking-store";
import type { Dish } from "@/lib/types";

const dishes = menu as Dish[];
const categories = [
  { id: "all", label: "All" },
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export default function PreOrderPage() {
  return (
    <Suspense fallback={<div className="px-gutter py-16 font-ui text-muted">Loading pre-order…</div>}>
      <PreOrderInner />
    </Suspense>
  );
}

function PreOrderInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const { draft, hydrated, setPreOrderQty } = useBooking();
  const manageRef = searchParams.get("manage");
  const [category, setCategory] = useState("all");
  const [diet, setDiet] = useState<string | null>(null);
  const [basketOpen, setBasketOpen] = useState(false);
  const saveTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (draft.guests <= 10 && !manageRef) {
      router.replace("/book");
    }
  }, [hydrated, draft.guests, manageRef, router]);

  const remaining = draft.guests - draft.mealsSelected;
  const visible = useMemo(() => {
    return dishes.filter((dish) => {
      if (
        category !== "all" &&
        dish.category !== category &&
        !(category === "vegetarian" && (dish.dietary.includes("V") || dish.dietary.includes("VG")))
      ) {
        return false;
      }
      if (diet && !dish.dietary.includes(diet as Dish["dietary"][number])) return false;
      return true;
    });
  }, [category, diet]);

  const lines = draft.preOrder
    .map((line) => {
      const dish = dishes.find((item) => item.id === line.dishId);
      return dish ? { ...line, dish } : null;
    })
    .filter(Boolean) as { dishId: string; qty: number; dish: Dish }[];

  const total = lines.reduce((sum, line) => sum + line.qty * line.dish.price, 0);
  const manageHref = manageRef ? `/reservations/${encodeURIComponent(manageRef)}` : "/book/group";

  function qtyFor(id: string) {
    return draft.preOrder.find((line) => line.dishId === id)?.qty ?? 0;
  }

  function changeQty(id: string, qty: number) {
    setPreOrderQty(id, qty);
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => toast("Pre-order saved"), 600);
  }

  async function continueNext() {
    if (manageRef) {
      const res = await fetch(`/api/reservations/${encodeURIComponent(manageRef)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preOrder: draft.preOrder }),
      });
      if (res.ok) {
        toast("Pre-order updated");
        router.push(manageHref);
      }
      return;
    }
    router.push("/book/details");
  }

  return (
    <>
      <div className="hidden md:block">
        <BookingHeader
          steps={[
            { id: "table", label: "Table" },
            { id: "preorder", label: "Pre-order" },
            { id: "details", label: "Details" },
            { id: "confirm", label: "Confirm" },
          ]}
          current="preorder"
          right={<span className="font-ui text-[15px] font-light text-muted">Saved automatically</span>}
        />
      </div>
      <BookingMobileBar
        stepLabel={`Pre-order · ${draft.guests} guests`}
        right="Saved"
        onBack={() => router.push(manageHref)}
      />

      <div className="grid items-start gap-12 px-5 py-8 md:px-gutter md:py-11 lg:grid-cols-[1fr_372px]">
        <div>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-display text-[36px] font-light md:text-[44px]">
                Pre-order for {guestLabel(draft.guests)}
              </h1>
              <p className="mt-3 max-w-[520px] font-ui text-[18px] font-light leading-relaxed text-muted">
                Choose your group&apos;s meals now. You can make changes up to 48 hours before your reservation.
              </p>
            </div>
            <div className="min-w-[210px] lg:text-right">
              <p className="font-ui text-[12px] uppercase tracking-label text-muted-subtle">Meals selected</p>
              <p className="my-1.5 font-display text-[34px] font-light">
                {draft.mealsSelected} / {draft.guests}
              </p>
              <div className="h-1.5 overflow-hidden rounded bg-track">
                <div
                  className="h-full bg-olive"
                  style={{ width: `${Math.min(100, (draft.mealsSelected / Math.max(1, draft.guests)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="my-8 flex flex-col gap-3 border-b border-hairline-10 pb-[18px] lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2.5 overflow-x-auto">
              {categories.map((item) => (
                <Pill
                  key={item.id}
                  variant={category === item.id ? "ink" : "outline"}
                  onClick={() => setCategory(item.id)}
                  className="shrink-0"
                >
                  {item.label}
                </Pill>
              ))}
            </div>
            <div className="flex items-center gap-2.5 font-ui text-small text-muted">
              Filter:
              {["V", "VG", "GF"].map((tag) => (
                <Pill
                  key={tag}
                  size="sm"
                  variant={diet === tag ? "filter" : "outline"}
                  onClick={() => setDiet(diet === tag ? null : tag)}
                >
                  {tag === "V" ? "Vegetarian" : tag === "VG" ? "Vegan" : "GF"}
                </Pill>
              ))}
            </div>
          </div>

          <div className="grid gap-[22px] lg:grid-cols-2">
            {visible.map((dish) => {
              const qty = qtyFor(dish.id);
              return (
                <article
                  key={dish.id}
                  className={cn(
                    "flex flex-col gap-4 rounded-card-lg border bg-background p-[18px] transition-all duration-hover ease-out md:flex-row",
                    qty > 0
                      ? "border-olive shadow-selected"
                      : "border-hairline-8 shadow-card hover:-translate-y-0.5 hover:shadow-raised",
                  )}
                >
                  <PlaceholderImage
                    src={dishPhotos[dish.id] ?? dish.image}
                    alt={dish.name}
                    caption={dish.name}
                    className="h-[132px] w-full shrink-0 rounded-slot md:h-[130px] md:w-[130px]"
                    width={130}
                    height={130}
                  />
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[21px] md:text-[23px]">{dish.name}</h3>
                      <p className="font-display text-[17px] text-terracotta md:text-[19px]">
                        {formatPrice(dish.price)}
                      </p>
                    </div>
                    <p className="font-ui text-[14px] font-light leading-relaxed text-muted md:text-[15px]">
                      {dish.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {dish.dietary.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-pill border border-olive-outline px-[11px] py-1 font-ui text-[11px] font-medium uppercase tracking-[0.14em] text-olive"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Stepper
                        value={qty}
                        min={0}
                        max={qty + remaining}
                        onChange={(value) => changeQty(dish.id, value)}
                        label={`${dish.name} quantity`}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="hidden rounded-card-xl bg-surface p-[30px] lg:sticky lg:top-8 lg:block">
          <Basket
            guests={draft.guests}
            meals={draft.mealsSelected}
            lines={lines}
            total={total}
            remaining={remaining}
            onQty={changeQty}
            continueLabel={manageRef ? "Save pre-order" : "Continue Booking"}
            laterLabel={manageRef ? "Back to reservation" : "Complete later"}
            onContinue={continueNext}
            onLater={() => router.push(manageRef ? manageHref : "/book/details")}
          />
        </aside>
      </div>

      <div className="h-24 lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-hairline-8 bg-background px-5 py-3.5 lg:hidden">
        <div>
          <p className="font-ui text-[13px] font-light text-muted-subtle">
            {draft.mealsSelected} meals · {formatPrice(total)}
          </p>
          <button type="button" className="border-b border-ink font-ui text-[14px]" onClick={() => setBasketOpen(true)}>
            View pre-order
          </button>
        </div>
        <Button onClick={continueNext}>{manageRef ? "Save" : "Continue"}</Button>
      </div>

      <Sheet open={basketOpen} onClose={() => setBasketOpen(false)} labelledBy="basket-title">
        <Basket
          guests={draft.guests}
          meals={draft.mealsSelected}
          lines={lines}
          total={total}
          remaining={remaining}
          onQty={changeQty}
          continueLabel={manageRef ? "Save pre-order" : "Continue Booking"}
          laterLabel={manageRef ? "Back to reservation" : "Complete later"}
          onContinue={() => {
            setBasketOpen(false);
            continueNext();
          }}
          onLater={() => {
            setBasketOpen(false);
            router.push(manageRef ? manageHref : "/book/details");
          }}
        />
      </Sheet>
    </>
  );
}

function Basket({
  guests,
  meals,
  lines,
  total,
  remaining,
  onQty,
  onContinue,
  onLater,
  continueLabel,
  laterLabel,
}: {
  guests: number;
  meals: number;
  lines: { dishId: string; qty: number; dish: Dish }[];
  total: number;
  remaining: number;
  onQty: (id: string, qty: number) => void;
  onContinue: () => void;
  onLater: () => void;
  continueLabel: string;
  laterLabel: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between">
        <h2 id="basket-title" className="font-display text-[30px] font-light">
          Your pre-order
        </h2>
        <p className="font-ui text-small text-muted-subtle">{guestLabel(guests)}</p>
      </div>
      <div className="flex justify-between font-ui text-[17px] font-light text-ink-alt">
        <span>Guests</span>
        <span className="font-normal">{guests}</span>
      </div>
      <div className="flex justify-between font-ui text-[17px] font-light text-ink-alt">
        <span>Meals selected</span>
        <span className="font-normal">{meals}</span>
      </div>
      <div className="h-px bg-hairline-12" />
      <div className="flex flex-col gap-3.5">
        {lines.map((line) => (
          <div key={line.dishId} className="flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-[17px]">
                {line.qty} × {line.dish.name}
              </p>
              <p className="font-ui text-[13px] font-light text-muted-subtle">
                {formatPrice(line.dish.price)} each
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-ui text-[16px] font-light">{formatPrice(line.qty * line.dish.price)}</span>
              <Stepper
                value={line.qty}
                min={0}
                max={line.qty + remaining}
                onChange={(value) => onQty(line.dishId, value)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="h-px bg-hairline-12" />
      <div className="flex items-baseline justify-between">
        <span className="font-ui text-[17px] font-light">Food total</span>
        <span className="font-display text-[30px] font-light">{formatPrice(total)}</span>
      </div>
      {remaining > 0 ? (
        <div className="rounded-slot bg-terracotta-muted px-4 py-3.5 font-ui text-[15px] font-light leading-relaxed text-terracotta-dark">
          {remaining} guests still need meals selected.
        </div>
      ) : null}
      <Button fullWidth onClick={onContinue}>
        {continueLabel}
      </Button>
      <div className="text-center">
        <Button variant="text-ink" onClick={onLater}>
          {laterLabel}
        </Button>
      </div>
    </div>
  );
}
