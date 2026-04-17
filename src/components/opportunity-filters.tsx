import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { opportunityCategories, opportunityModes, type AppLocale, type OpportunityFilters } from "@/lib/types";
import { categoryLabels, modeLabels } from "@/lib/constants";
import { Link } from "@/i18n/navigation";

export async function OpportunityFilters({
  locale,
  filters,
}: {
  locale: AppLocale;
  filters: OpportunityFilters;
}) {
  const t = await getTranslations("Opportunities");

  return (
    <section className="surface-panel rounded-[4px] p-6 sm:p-7">
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <p className="section-label">{t("filterTitle")}</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            {t("description")}
          </p>
        </div>
        <Button asChild variant="ghost" className="hidden md:inline-flex">
          <Link href="/opportunities">{t("clearFilters")}</Link>
        </Button>
      </div>

      <form className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        <label className="xl:col-span-2">
          <span className="field-label">Search</span>
          <input
            className="field-control"
            defaultValue={filters.q}
            name="q"
            placeholder={t("searchPlaceholder")}
          />
        </label>

        <label>
          <span className="field-label">Category</span>
          <select
            className="field-control"
            defaultValue={filters.category}
            name="category"
          >
            <option value="all">All</option>
            {opportunityCategories.map((category) => (
              <option key={category} value={category}>
                {categoryLabels[category][locale]}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="field-label">Mode</span>
          <select
            className="field-control"
            defaultValue={filters.mode}
            name="mode"
          >
            <option value="all">All</option>
            {opportunityModes.map((mode) => (
              <option key={mode} value={mode}>
                {modeLabels[mode][locale]}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="field-label">Location</span>
          <input
            className="field-control"
            defaultValue={filters.location}
            name="location"
            placeholder="Cyberjaya, Remote, Klang Valley"
          />
        </label>

        <label>
          <span className="field-label">Sort</span>
          <select
            className="field-control"
            defaultValue={filters.sort}
            name="sort"
          >
            <option value="featured">
              {locale === "ms" ? "Keutamaan utama" : "Featured first"}
            </option>
            <option value="closing">
              {locale === "ms" ? "Tarikh tutup paling hampir" : "Closing soonest"}
            </option>
            <option value="recent">
              {locale === "ms" ? "Paling baharu" : "Most recent"}
            </option>
          </select>
        </label>

        <label>
          <span className="field-label">Deadline</span>
          <select
            className="field-control"
            defaultValue={filters.deadline}
            name="deadline"
          >
            <option value="all">Any time</option>
            <option value="7">Within 7 days</option>
            <option value="30">Within 30 days</option>
            <option value="90">Within 90 days</option>
          </select>
        </label>

        <div className="flex items-end gap-3 pt-1 xl:col-span-6">
          <Button type="submit">{t("searchButton")}</Button>
          <Button asChild variant="outline">
            <Link href="/opportunities">{t("clearFilters")}</Link>
          </Button>
        </div>
      </form>
    </section>
  );
}
