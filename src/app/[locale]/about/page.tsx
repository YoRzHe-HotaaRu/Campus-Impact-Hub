import { Globe2, Layers3, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/lib/types";

const pillars = [
  {
    icon: Globe2,
    title: "Useful for real student decisions",
    body: "The platform is centered on actions students actually take: finding funding, building experience, joining research and contributing to their communities.",
  },
  {
    icon: Layers3,
    title: "Designed for busy university life",
    body: "Short summaries, clear filters and a deadline-aware saved list reduce the friction of opportunity hunting across scattered websites.",
  },
  {
    icon: ShieldCheck,
    title: "Built for curation and trust",
    body: "The first release is admin-curated so students spend less time second-guessing the quality and relevance of each listing.",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const about = await getTranslations("About");

  return (
    <div className="space-y-12">
      <section className="-mx-4 border-b border-slate-200/80 px-4 pb-10 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <p className="section-label">
          {locale === "ms" ? "Misi projek" : "Project mission"}
        </p>
        <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-none tracking-[-0.04em] text-slate-900 sm:text-6xl">
          {about("title")}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          {about("description")}
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;

          return (
            <article
              key={pillar.title}
              className="surface-panel rounded-[4px] p-6"
            >
              <div className="flex size-12 items-center justify-center rounded-[4px] border border-slate-300 bg-white text-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.08)]">
                <Icon className="size-5" />
              </div>
              <h2 className="mt-6 font-heading text-[2rem] leading-none text-slate-900">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.body}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
