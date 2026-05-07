import Link from "next/link";
import { NAV } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-20 sm:mt-28 border-t border-line">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2">
            <div className="font-display text-3xl sm:text-4xl tracking-tightest text-ink leading-tight">
              Built for Nagpur.
              <br />
              <span className="italic font-light text-ink-2">Designed for India.</span>
            </div>
            <p className="mt-4 text-sm text-ink-3 max-w-md leading-relaxed">
              The NMC Smart City platform — a single front door for every civic
              service, payment, and conversation with the city.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/60 border border-line px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" /> All systems online
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/60 border border-line px-3 py-1.5">
                Govt of Maharashtra
              </span>
            </div>
          </div>

          <FooterCol title="Services">
            {NAV.slice(0, 5).map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="City">
            {NAV.slice(5).map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
            <FooterLink href="/about">About NMC</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 pt-6 border-t border-line-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-ink-4">
          <span>
            © {new Date().getFullYear()} Nagpur Municipal Corporation. All rights reserved.
          </span>
          <div className="flex items-center gap-4 uppercase tracking-[0.14em]">
            <Link href="/privacy" className="hover:text-ink-2">Privacy</Link>
            <Link href="/terms" className="hover:text-ink-2">Terms</Link>
            <Link href="/accessibility" className="hover:text-ink-2">Accessibility</Link>
            <Link href="/sitemap" className="hover:text-ink-2">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.20em] text-ink-3 mb-4">
        {title}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-ink-2 hover:text-ink transition-colors focus-ring rounded"
    >
      {children}
    </Link>
  );
}
