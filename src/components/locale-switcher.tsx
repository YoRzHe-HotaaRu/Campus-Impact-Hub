"use client";

import { startTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import { localeLabels } from "@/lib/constants";
import type { AppLocale } from "@/lib/types";

function replaceLocaleInPath(
  pathname: string,
  currentLocale: AppLocale,
  nextLocale: AppLocale,
) {
  const segments = pathname.split("/");

  if (segments[1] === currentLocale) {
    segments[1] = nextLocale;
  } else {
    segments.splice(1, 0, nextLocale);
  }

  return segments.join("/") || `/${nextLocale}`;
}

export function LocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="inline-flex rounded-[4px] border border-slate-300 bg-white/90 p-1 shadow-[0_14px_30px_rgba(15,23,42,0.1)]">
      {(Object.keys(localeLabels) as AppLocale[]).map((entry) => (
        <button
          key={entry}
          type="button"
          className={`rounded-[2px] px-3 py-1.5 text-xs font-semibold transition ${
            entry === locale
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          onClick={() => {
            if (entry === locale) {
              return;
            }

            startTransition(() => {
              const nextPathname = replaceLocaleInPath(pathname, locale, entry);
              const query = searchParams.toString();
              const nextHref = (query
                ? `${nextPathname}?${query}`
                : nextPathname) as Parameters<typeof router.replace>[0];

              router.replace(nextHref);
            });
          }}
        >
          {localeLabels[entry]}
        </button>
      ))}
    </div>
  );
}
