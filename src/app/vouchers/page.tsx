import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function VouchersPage() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <article className="mx-auto max-w-[640px] px-5 py-16 md:px-gutter">
        <p className="font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">Give the room</p>
        <h1 className="mt-3 font-display text-[42px] font-light">Gift vouchers</h1>
        <p className="mt-4 font-ui text-body text-muted">
          Vouchers are available in $100, $150 and $250. We email a note you can forward, and we can post a card if you&apos;d rather.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {["$100", "$150", "$250"].map((amount) => (
            <div key={amount} className="rounded-card bg-surface p-6 text-center">
              <p className="font-display text-[34px] font-light">{amount}</p>
              <p className="mt-2 font-ui text-small text-muted">Dining credit</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={`${site.emailHref}?subject=Gift%20voucher`}>
            Email to purchase
          </Button>
          <Button variant="secondary" href={site.phoneHref}>
            Call {site.phoneDisplay}
          </Button>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
