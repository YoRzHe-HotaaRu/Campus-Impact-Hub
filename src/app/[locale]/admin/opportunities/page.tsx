import { getTranslations } from "next-intl/server";

import { AdminOpportunityForm } from "@/components/admin-opportunity-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { archiveOpportunityAction } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { formatDeadline } from "@/lib/format";
import {
  getOpportunityBySlug,
  listAdminOpportunities,
  listOrganizations,
} from "@/lib/data";
import type { AppLocale } from "@/lib/types";
import { Link } from "@/i18n/navigation";

const statusClasses = {
  published: "border-emerald-200 bg-emerald-50 text-emerald-800",
  draft: "border-amber-200 bg-amber-50 text-amber-800",
  archived: "border-slate-200 bg-slate-100 text-slate-700",
} as const;

export default async function AdminOpportunitiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, rawSearchParams] = await Promise.all([params, searchParams]);
  const viewer = await requireAdmin(locale, `/${locale}/admin/opportunities`);
  const editSlug =
    typeof rawSearchParams.edit === "string" ? rawSearchParams.edit : undefined;

  const [t, organizations, opportunities, current] = await Promise.all([
    getTranslations("Admin"),
    listOrganizations(),
    listAdminOpportunities(),
    editSlug ? getOpportunityBySlug(editSlug, viewer.userId, true) : Promise.resolve(null),
  ]);

  return (
    <div className="space-y-8">
      <section className="-mx-4 border-b border-slate-200/80 px-4 pb-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <p className="section-label">{t("title")}</p>
        <h1 className="mt-4 font-heading text-5xl tracking-[-0.04em] text-slate-900 sm:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {t("description")}
        </p>
      </section>

      <AdminOpportunityForm
        locale={locale}
        organizations={organizations}
        opportunity={current?.opportunity}
        title={current ? t("editOpportunity") : t("newOpportunity")}
      />

      <section className="surface-panel rounded-[4px] p-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl text-slate-900">{t("tableTitle")}</h2>
          <Button asChild variant="outline">
            <Link href="/admin/opportunities">{t("newOpportunity")}</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200/80">
              <TableHead className="text-slate-500">Title</TableHead>
              <TableHead className="text-slate-500">Status</TableHead>
              <TableHead className="text-slate-500">Deadline</TableHead>
              <TableHead className="text-slate-500">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunities.map((entry) => (
              <TableRow key={entry.id} className="border-slate-200/80">
                <TableCell className="font-medium text-slate-900">
                  <div>
                    <p>{entry.titleEn}</p>
                    <p className="text-xs text-slate-500">
                      {entry.organization.displayName}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusClasses[entry.status]}>{entry.status}</Badge>
                </TableCell>
                <TableCell className="text-slate-600">
                  {formatDeadline(locale, entry.deadlineAt)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={
                          `/admin/opportunities?edit=${encodeURIComponent(entry.slug)}` as never
                        }
                      >
                        Edit
                      </Link>
                    </Button>
                    {entry.status !== "archived" ? (
                      <form action={archiveOpportunityAction}>
                        <input type="hidden" name="locale" value={locale} />
                        <input type="hidden" name="slug" value={entry.slug} />
                        <Button size="sm" type="submit" variant="ghost">
                          {t("archive")}
                        </Button>
                      </form>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
