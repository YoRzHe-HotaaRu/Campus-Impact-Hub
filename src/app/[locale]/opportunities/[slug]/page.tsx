import { ArrowUpRight, Bookmark, CalendarDays, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { OpportunityCard } from "@/components/opportunity-card";
import { SubmitButton } from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toggleSaveOpportunityAction } from "@/lib/actions";
import { getViewer } from "@/lib/auth";
import { categoryAccentClasses, categoryLabels, modeLabels } from "@/lib/constants";
import { formatDeadline, formatDeadlineCountdown } from "@/lib/format";
import { getOpportunityBySlug, listRelatedOpportunityCards } from "@/lib/data";
import type { AppLocale } from "@/lib/types";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const viewer = await getViewer();
  const detail = await getOpportunityBySlug(slug, viewer.userId, viewer.canEdit);

  if (!detail) {
    notFound();
  }

  const [t, common, related] = await Promise.all([
    getTranslations("Opportunities"),
    getTranslations("Common"),
    listRelatedOpportunityCards(detail.opportunity, locale, viewer.userId),
  ]);

  const localizedTitle =
    locale === "ms" ? detail.opportunity.titleMs : detail.opportunity.titleEn;
  const localizedSummary =
    locale === "ms" ? detail.opportunity.summaryMs : detail.opportunity.summaryEn;
  const localizedDescription =
    locale === "ms"
      ? detail.opportunity.descriptionMs
      : detail.opportunity.descriptionEn;
  const localizedEligibility =
    locale === "ms"
      ? detail.opportunity.eligibilityMs
      : detail.opportunity.eligibilityEn;

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="surface-panel-strong rounded-[4px] p-8 sm:p-10">
          <p className="section-label">{t("title")}</p>
          <div className="flex flex-wrap gap-2">
            <Badge className={categoryAccentClasses[detail.opportunity.category]}>
              {categoryLabels[detail.opportunity.category][locale]}
            </Badge>
            {detail.opportunity.featured ? (
              <Badge className="border-slate-200 bg-slate-100 text-slate-700">
                {common("featured")}
              </Badge>
            ) : null}
          </div>
          <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-none tracking-[-0.04em] text-slate-900 sm:text-6xl">
            {localizedTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {localizedSummary}
          </p>

          <div className="surface-panel-muted mt-8 rounded-[4px] p-6">
            <p className="text-sm leading-8 text-slate-700">{localizedDescription}</p>
          </div>

          <div className="mt-8">
            <p className="field-label">
              {common("eligibility")}
            </p>
            <ul className="mt-4 grid gap-3">
              {localizedEligibility.map((item) => (
                <li
                  key={item}
                  className="rounded-[3px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card className="surface-panel self-start border-slate-200/80 lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="text-3xl text-slate-900">
              {detail.opportunity.organization.displayName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-slate-600">
            <p>
              {locale === "ms"
                ? detail.opportunity.organization.shortDescriptionMs
                : detail.opportunity.organization.shortDescriptionEn}
            </p>
            <div className="surface-panel-muted grid gap-3 rounded-[4px] p-5">
              <div className="flex items-center gap-3">
                <CalendarDays className="size-4 text-slate-900" />
                <div>
                  <p className="text-slate-500">{common("deadline")}</p>
                  <p className="text-slate-900">
                    {formatDeadline(locale, detail.opportunity.deadlineAt)}
                  </p>
                  <p className="font-semibold text-slate-700">
                    {formatDeadlineCountdown(locale, detail.opportunity.deadlineAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-slate-900" />
                <div>
                  <p className="text-slate-500">{common("location")}</p>
                  <p className="text-slate-900">{detail.opportunity.locationLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bookmark className="size-4 text-slate-900" />
                <div>
                  <p className="text-slate-500">{common("mode")}</p>
                  <p className="text-slate-900">
                    {modeLabels[detail.opportunity.mode][locale]}
                  </p>
                </div>
              </div>
            </div>

            <form action={toggleSaveOpportunityAction} className="grid gap-3">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="slug" value={detail.opportunity.slug} />
              <input
                type="hidden"
                name="returnTo"
                value={`/${locale}/opportunities/${detail.opportunity.slug}`}
              />
              <input
                type="hidden"
                name="intent"
                value={detail.saved ? "unsave" : "save"}
              />
              <SubmitButton
                pendingLabel={detail.saved ? common("unsave") : common("save")}
                className="w-full"
                variant={detail.saved ? "outline" : "default"}
              >
                {detail.saved ? common("saved") : common("save")}
              </SubmitButton>
            </form>

            <Button asChild className="w-full">
              <a
                href={detail.opportunity.externalUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t("visitSource")}
                <ArrowUpRight className="ml-2 size-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>

      {related.length > 0 ? (
        <section className="space-y-6">
          <h2 className="font-heading text-3xl text-slate-900">{t("relatedTitle")}</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {related.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                locale={locale}
                opportunity={opportunity}
                returnTo={`/${locale}/opportunities/${detail.opportunity.slug}`}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
