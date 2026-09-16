import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { photos } from "@/lib/photos";

export default function ContactPage() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <section className="grid gap-16 px-5 pt-16 md:px-gutter md:pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-[34px]">
          <div className="flex flex-col gap-4">
            <p className="font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">Visit us</p>
            <h1 className="font-display text-[42px] font-light leading-[1.12] md:text-h1">
              12 Hartwell Lane, Fitzroy
            </h1>
            <p className="font-ui text-[18px] font-light leading-relaxed text-muted">
              Between Gertrude and Johnston Street, second laneway past the church. Look for the green door.
            </p>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            <Info label="Hours">
              Closed Mondays
              <br />
              Tue – Thu · 5 – 10 PM
              <br />
              Fri – Sun · 12 – 11 PM
            </Info>
            <Info label="Contact">
              (03) 9417 2280
              <br />
              hello@terraandvine.com.au
              <br />
              @terraandvine
            </Info>
            <Info label="Parking">
              2-hour street parking after 6 PM
              <br />
              Secure lot on Kerr Street, 4 min walk
            </Info>
            <Info label="Public transport">
              Tram 86 · Smith St stop 15
              <br />
              Tram 11 · Brunswick St stop 16
              <br />
              Parliament Station, 12 min walk
            </Info>
          </div>
          <div className="flex flex-col items-start justify-between gap-6 rounded-card-lg bg-surface p-[26px] md:flex-row md:items-center">
            <p className="max-w-[340px] font-display text-[24px] font-light leading-snug">
              Private dining and groups up to 14 — we&apos;ll help you plan it.
            </p>
            <Button href="/book?guests=14">Book a group</Button>
          </div>
          <div className="flex flex-col items-start justify-between gap-6 rounded-card-lg border border-hairline-10 p-[26px] md:flex-row md:items-center">
            <p className="max-w-[340px] font-display text-[24px] font-light leading-snug">
              Already booked? Look up your table with the reference from your confirmation.
            </p>
            <Button href="/reservations" variant="secondary">
              Find a booking
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <PlaceholderImage
            src={photos.map}
            alt="Map of Fitzroy"
            caption="Fitzroy location"
            className="h-[320px] rounded-card-lg md:h-[480px]"
            width={720}
            height={480}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <Button
              variant="secondary"
              href="https://maps.google.com/?q=12+Hartwell+Lane+Fitzroy"
              fullWidth
            >
              Get directions
            </Button>
            <Button variant="secondary" href="tel:+61394172280" fullWidth>
              Call restaurant
            </Button>
            <Button variant="secondary" href="mailto:hello@terraandvine.com.au" fullWidth>
              Email us
            </Button>
          </div>
        </div>
      </section>
      <div className="mt-[72px]">
        <SiteFooter />
      </div>
    </div>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="font-ui text-[11px] uppercase tracking-label text-muted-subtle">{label}</p>
      <p className="font-ui text-[17px] font-light leading-[1.9] text-ink-alt">{children}</p>
    </div>
  );
}
