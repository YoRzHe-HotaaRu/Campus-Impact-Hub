import { getTranslations } from "next-intl/server";

import { OpportunityCard } from "@/components/opportunity-card";
import { requireSignedIn } from "@/lib/auth";
import { listSavedOpportunityCards } from "@/lib/data";
import { groupOpportunitiesByUrgency } from "@/lib/urgency";
import type { AppLocale } from "@/lib/types";

export default async function SavedPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const viewer = await requireSignedIn(locale, `/${locale}/saved`);
  const [saved, t, common] = await Promise.all([
    listSavedOpportunityCards(locale, viewer.userId!),
    getTranslations("Saved"),
    getTranslations("Common"),
  ]);

  const grouped = groupOpportunitiesByUrgency(saved);

  if (saved.length === 0) {
    return (
      <div className="surface-panel-strong rounded-[4px] border-dashed p-10 text-center">
        <h1 className="font-heading text-4xl text-slate-900">{t("emptyTitle")}</h1>
        <p className="mt-4 text-slate-600">{t("emptyBody")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="-mx-4 border-b border-slate-200/80 px-4 pb-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <p className="section-label">{t("title")}</p>
        <h1 className="mt-4 font-heading text-5xl tracking-[-0.04em] text-slate-900 sm:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {t("description")}
        </p>
      </section>

      {[
        { key: "closingSoon", title: common("closingSoon"), items: grouped.closingSoon },
        { key: "upcoming", title: common("upcoming"), items: grouped.upcoming },
        { key: "later", title: common("later"), items: grouped.later },
      ].map((group) =>
        group.items.length > 0 ? (
          <section key={group.key} className="space-y-5">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
              <h2 className="font-heading text-3xl text-slate-900">{group.title}</h2>
              <span className="rounded-[3px] border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
                {group.items.length}
              </span>
            </div>
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {group.items.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  locale={locale}
                  opportunity={opportunity}
                  returnTo={`/${locale}/saved`}
                />
              ))}
            </div>
          </section>
        ) : null,
      )}
    </div>
  );
}
