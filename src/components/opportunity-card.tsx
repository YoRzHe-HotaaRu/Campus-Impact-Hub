import { ArrowUpRight, Bookmark } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SubmitButton } from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toggleSaveOpportunityAction } from "@/lib/actions";
import { categoryAccentClasses, categoryLabels, modeLabels } from "@/lib/constants";
import { formatDeadline, formatDeadlineCountdown } from "@/lib/format";
import type { AppLocale, OpportunityCardData } from "@/lib/types";
import { Link } from "@/i18n/navigation";

export async function OpportunityCard({
  locale,
  opportunity,
  returnTo,
}: {
  locale: AppLocale;
  opportunity: OpportunityCardData;
  returnTo: string;
}) {
  const common = await getTranslations("Common");

  return (
    <Card className="group flex h-full flex-col border-slate-200/90 bg-[rgba(255,255,255,0.94)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.08)]">
      <CardHeader className="space-y-5 border-b border-slate-200/80 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={categoryAccentClasses[opportunity.category]}>
              {categoryLabels[opportunity.category][locale]}
            </Badge>
            {opportunity.featured ? (
              <Badge className="border-slate-200 bg-slate-100 text-slate-700">
                {common("featured")}
              </Badge>
            ) : null}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {formatDeadlineCountdown(locale, opportunity.deadlineAt)}
          </p>
        </div>
        <div className="space-y-3">
          <CardTitle className="text-[1.8rem] leading-[1.04] text-slate-900">
            {opportunity.title}
          </CardTitle>
          <p className="text-sm leading-7 text-slate-600">{opportunity.summary}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 pt-5 text-sm text-slate-600">
        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
            <span className="text-slate-500">{common("organization")}</span>
            <span className="text-right text-slate-900">{opportunity.organizationName}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
            <span className="text-slate-500">{common("mode")}</span>
            <span>{modeLabels[opportunity.mode][locale]}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
            <span className="text-slate-500">{common("location")}</span>
            <span className="text-right">{opportunity.locationLabel}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">{common("deadline")}</span>
            <span className="text-right text-slate-900">
              {formatDeadline(locale, opportunity.deadlineAt)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <form action={toggleSaveOpportunityAction} className="flex-1">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="slug" value={opportunity.slug} />
          <input type="hidden" name="returnTo" value={returnTo} />
          <input
            type="hidden"
            name="intent"
            value={opportunity.saved ? "unsave" : "save"}
          />
          <SubmitButton
            pendingLabel={opportunity.saved ? common("unsave") : common("save")}
            variant={opportunity.saved ? "outline" : "default"}
            className="w-full"
          >
            <Bookmark className="mr-1 size-4" />
            {opportunity.saved ? common("saved") : common("save")}
          </SubmitButton>
        </form>
        <Button asChild variant="ghost" className="sm:self-stretch">
          <Link href={`/opportunities/${opportunity.slug}` as never}>
            {common("learnMore")}
            <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
