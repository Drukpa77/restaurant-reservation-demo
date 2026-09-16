import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-[560px] px-5 py-20 md:px-gutter">
        <p className="font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">404</p>
        <h1 className="mt-3 font-display text-[42px] font-light">This table isn&apos;t set yet</h1>
        <p className="mt-4 font-ui text-body text-muted">
          That page doesn&apos;t exist. Head back to the dining room, or look up a booking with your confirmation reference.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Home</Button>
          <Button variant="secondary" href="/book">
            Book a Table
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
