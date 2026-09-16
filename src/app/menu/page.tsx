"use client";

import menu from "@/data/menu.json";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { photos, dishPhotos } from "@/lib/photos";
import type { Dish } from "@/lib/types";

const dishes = menu as Dish[];
const sections = [
  { id: "starters", kicker: "To begin", title: "Starters", items: dishes.filter((d) => d.category === "starters") },
  { id: "mains", kicker: "From the coals", title: "Mains", items: dishes.filter((d) => d.category === "mains") },
  { id: "vegetarian", kicker: "From the garden", title: "Vegetarian", items: dishes.filter((d) => d.category === "vegetarian") },
  { id: "desserts", kicker: "To finish", title: "Desserts", items: dishes.filter((d) => d.category === "desserts") },
  { id: "drinks", kicker: "To drink", title: "Drinks", items: dishes.filter((d) => d.category === "drinks") },
];

export default function MenuPage() {
  const lamb = dishes.find((dish) => dish.id === "lamb");

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-background">
      <SiteHeader />
      <section className="relative h-[340px]">
        <PlaceholderImage fill src={photos.menuHero} alt="Our menu" caption="Plated dish on linen" priority />
        <div className="hero-overlay-menu pointer-events-none absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-cream">
          <p className="font-ui text-[12px] uppercase tracking-eyebrow text-hero">Spring 2026</p>
          <h1 className="font-display text-[44px] font-light md:text-[76px]">Our Menu</h1>
          <p className="font-ui text-[20px] font-light text-cream-86">Seasonal ingredients. Thoughtfully prepared.</p>
        </div>
      </section>

      <div className="sticky top-[57px] z-30 flex flex-col gap-4 border-b border-hairline-10 bg-background/95 px-5 py-4 backdrop-blur md:top-[89px] md:flex-row md:items-center md:justify-between md:px-gutter md:py-[22px]">
        <div className="flex gap-2.5 overflow-x-auto">
          {sections.map((item) => (
            <Pill key={item.id} variant="outline" onClick={() => scrollTo(item.id)} className="shrink-0">
              {item.title}
            </Pill>
          ))}
        </div>
        <p className="shrink-0 font-ui text-[15px] font-light text-muted-subtle">
          V vegetarian · VG vegan · GF gluten free
        </p>
      </div>

      <div className="grid gap-16 px-5 py-12 md:px-gutter md:py-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-40">
              <p className="font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">{section.kicker}</p>
              <h2 className="mt-3.5 font-display text-h2">{section.title}</h2>
              <div className="mt-7 flex flex-col gap-[22px]">
                {section.items.map((dish) => (
                  <div key={dish.id} className="flex gap-4">
                    <PlaceholderImage
                      src={dishPhotos[dish.id] ?? dish.image}
                      alt={dish.name}
                      caption={dish.name}
                      className="h-[72px] w-[72px] shrink-0 rounded-slot md:h-[88px] md:w-[88px]"
                      width={88}
                      height={88}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3.5">
                        <h3 className="font-display text-h3">{dish.name}</h3>
                        <span className="flex-1 border-b border-dotted border-hairline-30" />
                        <p className="font-display text-price text-terracotta">${dish.price}</p>
                      </div>
                      <p className="mt-1.5 font-ui text-[16px] font-light leading-relaxed text-muted">
                        {dish.description}{" "}
                        {dish.dietary.length ? (
                          <span className="text-[13px] tracking-[0.1em] text-olive">
                            {dish.dietary.join(" · ")}
                          </span>
                        ) : null}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <aside className="flex flex-col gap-[22px] lg:sticky lg:top-36">
          {lamb ? (
            <article className="overflow-hidden rounded-card-lg border border-hairline-8 bg-background shadow-card">
              <PlaceholderImage
                src={dishPhotos.lamb}
                alt={lamb.name}
                caption="Lamb shoulder on the coals"
                className="h-[300px]"
                width={640}
                height={300}
              />
              <div className="p-6">
                <p className="font-ui text-[12px] uppercase tracking-locale text-terracotta">Chef&apos;s pick</p>
                <h3 className="mt-2.5 font-display text-[28px]">Lamb Shoulder, Six Hours</h3>
                <p className="mt-2 font-ui text-[16px] font-light leading-relaxed text-muted">
                  Cooked over embers until it falls apart, served with labneh and pickled onion. Our most-ordered dish for groups.
                </p>
              </div>
            </article>
          ) : null}
          <div className="flex flex-col gap-4 rounded-card-lg bg-surface p-7">
            <h3 className="font-display text-[30px] font-light leading-snug">Booking for more than ten?</h3>
            <p className="font-ui text-[16px] font-light leading-relaxed text-muted">
              Larger groups pre-order from this menu so the kitchen can cook to time. Quantities can change up to 48 hours before.
            </p>
            <Button href="/book?guests=14" fullWidth>
              Start a group booking
            </Button>
          </div>
        </aside>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 bg-ink px-5 py-[26px] md:flex-row md:items-center md:px-gutter">
        <p className="font-display text-[20px] font-light text-cream">
          Tables for Saturday are filling — three sittings left.
        </p>
        <Button variant="cream" href="/book">
          Book a Table
        </Button>
      </div>
      <SiteFooter />
    </div>
  );
}
