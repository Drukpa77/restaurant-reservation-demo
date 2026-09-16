"use client";

import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { QuickBook } from "@/components/home/QuickBook";
import { OpenStatus } from "@/components/home/OpenStatus";
import { photos } from "@/lib/photos";
import { formatCardDate } from "@/lib/format";
import { useBooking } from "@/lib/booking-store";

const dishes = [
  {
    name: "Chargrilled Chicken",
    price: "$32",
    description: "Herb-marinated chicken, roast seasonal vegetables and rosemary jus.",
    tags: ["GF"],
    image: photos.chicken,
    caption: "Chargrilled chicken with roast vegetables",
  },
  {
    name: "Market Fish",
    price: "$38",
    description: "Whole fish over coals, preserved lemon butter and charred greens.",
    tags: ["GF", "FOR TWO"],
    image: photos.fish,
    caption: "Coal-roasted market fish",
  },
  {
    name: "Mushroom Risotto",
    price: "$29",
    description: "Carnaroli rice, wild mushrooms, aged pecorino and thyme oil.",
    tags: ["V", "GF"],
    image: photos.risotto,
    caption: "Wild mushroom risotto",
  },
];

export default function HomePage() {
  const { draft } = useBooking();

  return (
    <div className="bg-background">
      <SiteHeader />
      <main>
        <section className="relative hidden h-[620px] md:block">
          <PlaceholderImage
            fill
            src={photos.hero}
            alt="Dining room at dusk"
            caption="Dining room at dusk, warm lamplight"
            priority
          />
          <div className="hero-overlay-home pointer-events-none absolute inset-0" />
          <div className="absolute inset-0 flex flex-col justify-center gap-[26px] px-gutter pb-[120px] pt-[86px] text-cream">
            <div className="flex items-center gap-3.5 font-ui text-[12px] uppercase tracking-eyebrow text-hero">
              <span className="h-px w-11 bg-hero" />
              Wood fire · Mediterranean
            </div>
            <h1 className="max-w-[760px] font-display text-display">An Evening Worth Reserving</h1>
            <p className="max-w-[520px] font-ui text-[22px] font-light leading-[1.6] text-cream-86">
              Seasonal dishes, warm hospitality and a table waiting for you.
            </p>
            <div className="mt-1.5 flex gap-4">
              <Button variant="cream" href="/book">
                Book a Table
              </Button>
              <Button variant="outline-cream" href="/menu">
                View Menu
              </Button>
            </div>
            <div className="mt-[22px] flex flex-wrap items-center gap-[30px] font-ui text-[15px] font-light text-cream-82">
              <OpenStatus />
              <span className="h-4 w-px bg-cream-30" />
              <span>12 Hartwell Lane, Fitzroy</span>
              <span className="h-4 w-px bg-cream-30" />
              <span className="flex items-center gap-2">
                <span className="text-[15px] text-hero">★★★★★</span>
                4.8 · 612 reviews
              </span>
            </div>
          </div>
        </section>

        <section className="relative md:hidden">
          <div className="relative h-[284px]">
            <PlaceholderImage
              fill
              src={photos.hero}
              alt="Dining room at dusk"
              caption="Dining room at dusk"
              priority
            />
            <div className="hero-overlay-mobile pointer-events-none absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-[22px] text-cream">
              <p className="mb-2.5 font-ui text-[10px] uppercase tracking-locale text-hero">
                Wood fire · Fitzroy
              </p>
              <h1 className="font-display text-display-m">An Evening Worth Reserving</h1>
              <p className="mt-3.5 flex items-center gap-2.5 font-ui text-[13px] font-light text-cream-86">
                <OpenStatus compact />
                <span className="opacity-50">·</span>
                ★ 4.8 (612)
              </p>
            </div>
          </div>
        </section>

        <QuickBook />

        <div className="px-5 md:hidden">
          <p className="mt-4 font-ui text-[15px] font-light leading-relaxed text-muted">
            Twelve years on Hartwell Lane, cooking over coals.
          </p>
          <div className="mt-3.5 flex gap-3">
            <Link href="/menu" className="flex-1">
              <PlaceholderImage
                src={photos.chicken}
                alt="Chargrilled chicken"
                caption="Chargrilled chicken"
                className="h-[104px] rounded-slot"
                height={104}
                width={180}
              />
            </Link>
            <Link href="/menu" className="flex-1">
              <PlaceholderImage
                src={photos.fish}
                alt="Market fish"
                caption="Market fish"
                className="h-[104px] rounded-slot"
                height={104}
                width={180}
              />
            </Link>
          </div>
        </div>

        <section className="hidden items-center gap-[72px] px-gutter pt-24 md:grid md:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col gap-[22px]">
            <p className="font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">The dining room</p>
            <h2 className="font-display text-[52px] font-light leading-[1.14]">A table for every kind of evening</h2>
            <p className="font-ui text-[19px] font-light leading-[1.75] text-muted">
              Twelve years in the same terrace on Hartwell Lane. The menu changes with the market — most of it cooked over coals — and the wine list leans to small growers from Victoria and the Mediterranean.
            </p>
            <div className="mt-2 flex gap-11">
              <Stat value="72" label="Seats" />
              <Stat value="4.8" label="Guest rating" />
              <Stat value="14" label="Max group" />
            </div>
            <Link href="/about" className="mt-2.5 w-fit border-b border-ink pb-0.5 font-ui text-[16px] tracking-button">
              Read our story
            </Link>
          </div>
          <PlaceholderImage
            src={photos.diningRoom}
            alt="The dining room"
            caption="The dining room"
            className="h-[460px] rounded-card-lg"
            width={760}
            height={460}
          />
        </section>

        <section className="hidden px-gutter pt-[104px] md:block">
          <div className="mb-[34px] flex items-end justify-between">
            <div className="flex flex-col gap-3">
              <p className="font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">From the kitchen</p>
              <h2 className="font-display text-[46px] font-light">Signature plates</h2>
            </div>
            <Link href="/menu" className="border-b border-ink pb-0.5 font-ui text-[16px] tracking-button">
              See the full menu
            </Link>
          </div>
          <div className="grid gap-[26px] md:grid-cols-3">
            {dishes.map((dish) => (
              <article
                key={dish.name}
                className="overflow-hidden rounded-card-lg border border-hairline-8 bg-background shadow-card transition-all duration-hover ease-out hover:-translate-y-0.5 hover:shadow-raised"
              >
                <PlaceholderImage
                  src={dish.image}
                  alt={dish.name}
                  caption={dish.caption}
                  className="h-[260px]"
                  width={440}
                  height={260}
                />
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3.5">
                    <h3 className="font-display text-[26px]">{dish.name}</h3>
                    <p className="font-display text-price text-terracotta">{dish.price}</p>
                  </div>
                  <p className="mt-2.5 font-ui text-[16px] font-light leading-relaxed text-muted">
                    {dish.description}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {dish.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-pill border border-olive-outline px-[11px] py-[5px] font-ui text-[11px] font-medium uppercase tracking-[0.14em] text-olive"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 bg-surface px-5 py-12 md:mt-[104px] md:grid-cols-[1fr_1fr_1.2fr] md:gap-14 md:px-gutter md:py-16">
          <div>
            <p className="mb-5 font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">Hours</p>
            <p className="font-ui text-[18px] font-light leading-[2.1] text-ink-alt">
              Closed Mondays
              <br />
              Tuesday – Thursday · 5 – 10 PM
              <br />
              Friday – Sunday · 12 – 11 PM
              <br />
              Kitchen closes 30 min prior
            </p>
          </div>
          <div>
            <p className="mb-5 font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">Find us</p>
            <p className="font-ui text-[18px] font-light leading-[2.1] text-ink-alt">
              12 Hartwell Lane
              <br />
              Fitzroy VIC 3065
              <br />
              (03) 9417 2280
            </p>
          </div>
          <div className="flex flex-col justify-between gap-[22px]">
            <p className="font-display text-[34px] font-light leading-snug">
              Tables open 60 days ahead — weekends go quickly.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Button href="/book">Book a Table</Button>
              <Button variant="secondary" href="/contact">
                Private events
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <div className="h-24 md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-hairline-8 bg-cream/96 px-5 py-3.5 md:hidden">
        <p className="font-ui text-small text-muted">
          {draft.date ? formatCardDate(draft.date) : "Select a date"} · {draft.guests} guests
        </p>
        <Button href="/book" size="sm">
          Book a Table
        </Button>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-[40px] font-light">{value}</p>
      <p className="font-ui text-small uppercase tracking-[0.1em] text-muted-subtle">{label}</p>
    </div>
  );
}
