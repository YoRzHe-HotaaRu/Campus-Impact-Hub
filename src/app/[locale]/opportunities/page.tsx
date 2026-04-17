import { getTranslations } from "next-intl/server";

import { OpportunityCard } from "@/components/opportunity-card";
import { OpportunityFilters } from "@/components/opportunity-filters";
import { getViewer } from "@/lib/auth";
import { listOpportunityCards } from "@/lib/data";
import { parseOpportunityFilters } from "@/lib/query";
import type { AppLocale } from "@/lib/types";

export default async function OpportunitiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, rawSearchParams] = await Promise.all([params, searchParams]);
  const viewer = await getViewer();
  const filters = parseOpportunityFilters(rawSearchParams);
  const [opportunities, t] = await Promise.all([
    listOpportunityCards(filters, locale, viewer.userId),
    getTranslations("Opportunities"),
  ]);

  return (
    <div className="space-y-8">
      <section className="-mx-4 border-b border-slate-200/80 px-4 pb-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <p className="section-label">{t("title")}</p>
        <h1 className="mt-4 font-heading text-5xl leading-none tracking-[-0.04em] text-slate-900 sm:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {t("description")}
        </p>
      </section>

      <OpportunityFilters locale={locale} filters={filters} />

      {opportunities.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              locale={locale}
              opportunity={opportunity}
              returnTo={`/${locale}/opportunities`}
            />
          ))}
        </div>
      ) : (
        <div className="surface-panel-muted rounded-[4px] border-dashed p-8 text-center text-slate-600">
          {t("noResults")}
        </div>
      )}
    </div>
  );
}
