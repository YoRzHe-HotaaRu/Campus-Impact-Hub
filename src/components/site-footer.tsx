import { getTranslations } from "next-intl/server";

import { getViewer } from "@/lib/auth";
import type { AppLocale } from "@/lib/types";
import { Link } from "@/i18n/navigation";

export async function SiteFooter({ locale }: { locale: AppLocale }) {
  const [viewer, nav, site] = await Promise.all([
    getViewer(),
    getTranslations("Nav"),
    getTranslations("Site"),
  ]);

  const navLinks = [
    { href: "/", label: nav("home") },
    { href: "/opportunities", label: nav("opportunities") },
    { href: "/saved", label: nav("saved") },
    { href: "/about", label: nav("about") },
  ];

  if (viewer.canEdit) {
    navLinks.push({ href: "/admin/opportunities", label: nav("admin") });
  }

  return (
    <footer className="border-t border-slate-200/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <p className="section-label">
            {locale === "ms" ? "Direka untuk kampus Malaysia" : "Designed for Malaysian campuses"}
          </p>
          <h2 className="mt-4 font-heading text-[2.1rem] leading-none text-slate-900">
            {site("name")}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
            {site("tagline")}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="ink-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
