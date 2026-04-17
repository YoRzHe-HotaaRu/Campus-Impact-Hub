import { ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import NextLink from "next/link";

import { ClerkUserButton } from "@/components/clerk-user-button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import { getViewer } from "@/lib/auth";
import type { AppLocale } from "@/lib/types";
import { Link } from "@/i18n/navigation";

export async function SiteHeader({ locale }: { locale: AppLocale }) {
  const [viewer, nav, site, common] = await Promise.all([
    getViewer(),
    getTranslations("Nav"),
    getTranslations("Site"),
    getTranslations("Common"),
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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[rgba(248,244,236,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="group">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-sans text-[0.66rem] font-bold uppercase tracking-[0.3em] text-slate-500">
                    MY
                  </p>
                  <p className="font-heading text-[1.35rem] leading-none text-slate-900">
                    {site("name")}
                  </p>
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  className="text-slate-600"
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {viewer.authMode === "demo" ? (
              <div className="hidden items-center gap-3 md:flex">
                <span className="inline-flex items-center gap-2 rounded-[3px] border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 shadow-[0_8px_20px_rgba(120,53,15,0.08)]">
                  <ShieldCheck className="size-3.5" />
                  {common("demoMode")}
                </span>
                <form action="/demo-auth" method="post">
                  <input type="hidden" name="intent" value="logout" />
                  <input type="hidden" name="redirectTo" value={`/${locale}`} />
                  <Button type="submit" variant="outline">
                    {nav("signOutDemo")}
                  </Button>
                </form>
              </div>
            ) : viewer.authMode === "clerk" && viewer.isAuthenticated ? (
              <ClerkUserButton />
            ) : (
              <Button asChild>
                <NextLink href="/sign-in">{nav("signIn")}</NextLink>
              </Button>
            )}

            <LocaleSwitcher />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:hidden">
          {navLinks.map((item) => (
            <Button
              key={item.href}
              asChild
              size="sm"
              variant="ghost"
              className="text-slate-600"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          {viewer.authMode === "demo" ? (
            <form action="/demo-auth" method="post">
              <input type="hidden" name="intent" value="logout" />
              <input type="hidden" name="redirectTo" value={`/${locale}`} />
              <Button size="sm" type="submit" variant="outline">
                {nav("signOutDemo")}
              </Button>
            </form>
          ) : null}
        </div>
      </div>
    </header>
  );
}
