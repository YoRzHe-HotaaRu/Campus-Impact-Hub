import {
  ArrowRight,
  BookHeart,
  BriefcaseBusiness,
  FlaskConical,
  HeartHandshake,
  Trophy,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { OpportunityCard } from "@/components/opportunity-card";
import { Button } from "@/components/ui/button";
import { getViewer } from "@/lib/auth";
import { formatDeadlineCountdown } from "@/lib/format";
import { listFeaturedOpportunityCards } from "@/lib/data";
import { categoryLabels } from "@/lib/constants";
import type { AppLocale, OpportunityCategory } from "@/lib/types";
import { Link } from "@/i18n/navigation";

const categories: Array<{
  key: OpportunityCategory;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  copy: Record<AppLocale, string>;
}> = [
  {
    key: "scholarship",
    icon: BookHeart,
    tone: "border-sky-200 bg-sky-50 text-sky-800",
    copy: {
      en: "Funding for study, mobility and leadership paths that deserve more visibility.",
      ms: "Pendanaan untuk pengajian, mobiliti dan laluan kepimpinan yang patut lebih mudah ditemui.",
    },
  },
  {
    key: "volunteering",
    icon: HeartHandshake,
    tone: "border-emerald-200 bg-emerald-50 text-emerald-800",
    copy: {
      en: "Community work, service-learning and civic programmes that build real campus impact.",
      ms: "Kerja komuniti, pembelajaran berasaskan khidmat dan program sivik yang membina impak kampus sebenar.",
    },
  },
  {
    key: "competition",
    icon: Trophy,
    tone: "border-amber-200 bg-amber-50 text-amber-800",
    copy: {
      en: "Challenges, hackathons and pitch calls that sharpen portfolio and confidence.",
      ms: "Cabaran, hackathon dan panggilan pitch yang menguatkan portfolio serta keyakinan.",
    },
  },
  {
    key: "internship",
    icon: BriefcaseBusiness,
    tone: "border-indigo-200 bg-indigo-50 text-indigo-800",
    copy: {
      en: "Internships with clearer deadlines, organisations and work modes at a glance.",
      ms: "Latihan industri dengan tarikh, organisasi dan mod kerja yang lebih jelas pada satu pandangan.",
    },
  },
  {
    key: "research",
    icon: FlaskConical,
    tone: "border-rose-200 bg-rose-50 text-rose-800",
    copy: {
      en: "Labs, fellowships and study opportunities for students who want to investigate deeply.",
      ms: "Makmal, fellowships dan peluang kajian untuk pelajar yang mahu menyelidik dengan lebih mendalam.",
    },
  },
];

const valueCards = [
  {
    titleKey: "valueOneTitle",
    bodyKey: "valueOneBody",
  },
  {
    titleKey: "valueTwoTitle",
    bodyKey: "valueTwoBody",
  },
  {
    titleKey: "valueThreeTitle",
    bodyKey: "valueThreeBody",
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const viewer = await getViewer();
  const [home, common, featured] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Common"),
    listFeaturedOpportunityCards(locale, viewer.userId),
  ]);

  return (
    <div className="space-y-14">
      <section className="-mx-4 border-b border-slate-200/80 px-4 pb-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-7 fade-up">
            <p className="section-label">{home("eyebrow")}</p>
            <div className="space-y-5">
              <h1 className="max-w-5xl font-heading text-[clamp(3.35rem,8vw,6.9rem)] leading-[0.93] tracking-[-0.045em] text-slate-900">
                {home("title")}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {home("description")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/opportunities">
                  {home("primaryCta")}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">{home("secondaryCta")}</Link>
              </Button>
            </div>
            <p className="max-w-2xl text-sm uppercase tracking-[0.2em] text-slate-500">
              Scholarships / Research / Volunteering / Competitions / Internships
            </p>
          </div>

          <aside className="surface-panel-strong fade-up rounded-[4px] p-6 sm:p-7">
            <p className="section-label">{home("featuredTitle")}</p>
            {featured.length > 0 ? (
              <div className="mt-6 divide-y divide-slate-200/80">
                {featured.slice(0, 3).map((opportunity) => (
                  <div key={opportunity.id} className="py-5 first:pt-0 last:pb-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {categoryLabels[opportunity.category][locale]}
                    </p>
                    <Link
                      href={`/opportunities/${opportunity.slug}` as never}
                      className="mt-2 block font-heading text-[1.6rem] leading-[1.03] text-slate-900 hover:text-slate-700"
                    >
                      {opportunity.title}
                    </Link>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-600">
                      <span>{opportunity.organizationName}</span>
                      <span className="font-semibold text-slate-900">
                        {formatDeadlineCountdown(locale, opportunity.deadlineAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm leading-7 text-slate-600">
                {home("featuredDescription")}
              </p>
            )}
            {featured.length > 0 ? (
              <p className="mt-6 text-sm leading-7 text-slate-600">
                {home("featuredDescription")}
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">{home("featuredTitle")}</p>
            <h2 className="mt-4 max-w-3xl font-heading text-4xl leading-tight text-slate-900">
              {home("featuredDescription")}
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/opportunities">{common("browseAll")}</Link>
          </Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              locale={locale}
              opportunity={opportunity}
              returnTo={`/${locale}`}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-12 border-t border-slate-200/80 pt-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="section-label">{home("categoryTitle")}</p>
          <div className="mt-6 divide-y divide-slate-200/80">
            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.key}
                  href={`/opportunities?category=${item.key}` as never}
                  className="group flex items-start justify-between gap-5 py-5 first:pt-0 last:pb-0"
                >
                  <div className="flex gap-4">
                    <div
                      className={`mt-1 flex size-12 items-center justify-center rounded-[4px] border ${item.tone}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-[2rem] leading-none text-slate-900">
                        {categoryLabels[item.key][locale]}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                        {item.copy[locale]}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="mt-3 size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="section-label">{home("valueTitle")}</p>
          <div className="mt-6 grid gap-4">
            {valueCards.map((item) => (
              <div
                key={item.titleKey}
                className="surface-panel-muted rounded-[4px] p-6"
              >
                <h3 className="font-heading text-[2rem] leading-none text-slate-900">
                  {home(item.titleKey)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {home(item.bodyKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-panel-strong rounded-[4px] px-8 py-10 sm:px-10">
        <p className="section-label">
          {locale === "ms" ? "Langkah seterusnya" : "Your next move"}
        </p>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-heading text-4xl leading-tight text-slate-900 sm:text-5xl">
              {locale === "ms"
                ? "Bina shortlist yang lebih tajam sebelum tarikh penting bergerak."
                : "Build a sharper shortlist before the important deadlines move."}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {locale === "ms"
                ? "Semak peluang yang disaring, simpan yang relevan, kemudian kembali dengan kejelasan."
                : "Review the curated board, save what matters, then return with clarity instead of browser clutter."}
            </p>
          </div>
          <Button asChild size="lg">
            <Link href={viewer.isAuthenticated ? "/saved" : "/opportunities"}>
              {viewer.isAuthenticated
                ? locale === "ms"
                  ? "Buka papan simpanan"
                  : "Open saved board"
                : home("primaryCta")}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
