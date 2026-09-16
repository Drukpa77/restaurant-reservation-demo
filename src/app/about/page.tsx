import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { photos } from "@/lib/photos";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <section className="grid items-center gap-12 px-5 pt-16 md:px-gutter md:pt-[76px] lg:grid-cols-2 lg:gap-[72px]">
        <div className="flex flex-col gap-6">
          <p className="font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">Our story</p>
          <h1 className="font-display text-[42px] font-light leading-[1.1] md:text-[62px]">
            Twelve years on Hartwell Lane
          </h1>
          <p className="font-ui text-[19px] font-light leading-[1.8] text-muted">
            Terra & Vine opened in a former print workshop in 2014 with eighteen seats and one wood oven. The oven is still here. So is the long communal table that seats fourteen — the reason our group bookings work the way they do.
          </p>
          <p className="font-ui text-[19px] font-light leading-[1.8] text-muted">
            We cook what the market gives us that week, write the menu each morning, and keep the room loud enough to be comfortable and quiet enough to talk.
          </p>
        </div>
        <PlaceholderImage
          src={photos.diningRoom}
          alt="The restaurant"
          caption="The dining room at Terra & Vine"
          className="h-[320px] rounded-card-lg md:h-[520px]"
          width={720}
          height={520}
        />
      </section>

      <section className="grid items-center gap-12 px-5 pt-20 md:px-gutter md:pt-24 lg:grid-cols-[1fr_1.1fr] lg:gap-[72px]">
        <PlaceholderImage
          src={photos.chef}
          alt="Chef Marco Ferraro"
          caption="Chef Marco Ferraro"
          className="order-2 h-[320px] rounded-card-lg lg:order-1 lg:h-[460px]"
          width={720}
          height={460}
        />
        <div className="order-1 flex flex-col gap-[22px] lg:order-2">
          <p className="font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">The kitchen</p>
          <h2 className="font-display text-[46px] font-light leading-[1.15]">Chef Marco Ferraro</h2>
          <p className="font-ui text-[19px] font-light leading-[1.8] text-muted">
            Marco grew up in his grandmother&apos;s trattoria outside Bari and cooked in Sydney and Copenhagen before taking over the Terra & Vine kitchen in 2019. His menu is short by design: eight mains, cooked over fire, changed as the season turns.
          </p>
          <blockquote className="border-l border-terracotta pl-[22px] font-display text-[26px] font-light italic leading-snug text-ink-alt">
            “If a dish needs more than five things on the plate, it isn&apos;t finished yet.”
          </blockquote>
        </div>
      </section>

      <section className="grid gap-7 px-5 pt-20 md:grid-cols-3 md:px-gutter md:pt-24">
        <Philosophy n="01" title="Cook with fire" body="Almost everything passes over coals or through the wood oven. It's the oldest technique we have and still the best." />
        <Philosophy n="02" title="Buy close to home" body="Vegetables from three growers in the Yarra Valley, fish from Lakes Entrance, olive oil pressed in Central Victoria." />
        <Philosophy n="03" title="Feed people properly" body="Generous plates, unhurried service, and a group pre-order system built so nobody waits an hour for their food." />
      </section>

      <section className="grid gap-5 px-5 pt-16 md:px-gutter md:pt-[72px] lg:grid-cols-[1.4fr_1fr_1fr]">
        <PlaceholderImage src={photos.galleryRoom} alt="Room detail" caption="The dining room" className="h-[294px] rounded-card" width={800} height={294} />
        <PlaceholderImage src={photos.galleryProduce} alt="Produce" caption="Market produce" className="h-[294px] rounded-card" width={600} height={294} />
        <PlaceholderImage src={photos.galleryWine} alt="Wine service" caption="Wine service" className="h-[294px] rounded-card" width={600} height={294} />
      </section>

      <div className="mt-[76px] flex flex-col items-start justify-between gap-6 bg-surface px-5 py-14 md:flex-row md:items-center md:px-gutter">
        <p className="max-w-[620px] font-display text-[40px] font-light leading-snug">
          Come and see the room for yourself.
        </p>
        <Button href="/book" size="lg">
          Book a Table
        </Button>
      </div>
      <SiteFooter />
    </div>
  );
}

function Philosophy({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="font-display text-[40px] font-light text-terracotta">{n}</p>
      <h3 className="font-display text-h3">{title}</h3>
      <p className="font-ui text-[16px] font-light leading-relaxed text-muted">{body}</p>
    </div>
  );
}
