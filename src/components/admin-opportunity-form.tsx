import { upsertOpportunityAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTimeLocalInput } from "@/lib/format";
import { opportunityCategories, opportunityModes, opportunityStatuses, type AppLocale, type OpportunityWithOrganization, type Organization } from "@/lib/types";

const fieldClassName = "field-control";
const textareaClassName = "field-control min-h-28";
const labelClassName = "field-label";

export function AdminOpportunityForm({
  locale,
  organizations,
  opportunity,
  title,
}: {
  locale: AppLocale;
  organizations: Organization[];
  opportunity?: OpportunityWithOrganization | null;
  title: string;
}) {
  return (
    <Card className="surface-panel rounded-[4px] border-slate-300/80">
      <CardHeader className="border-b border-slate-200/80 pb-5">
        <CardTitle className="text-[2rem] text-slate-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={upsertOpportunityAction} className="grid gap-5 pt-6 md:grid-cols-2">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="originalSlug" value={opportunity?.slug ?? ""} />

          <label className="grid gap-2">
            <span className={labelClassName}>Slug</span>
            <input className={fieldClassName} name="slug" defaultValue={opportunity?.slug ?? ""} required />
          </label>
          <label className="grid gap-2">
            <span className={labelClassName}>Organization</span>
            <select className={fieldClassName} name="organizationId" defaultValue={opportunity?.organizationId ?? organizations[0]?.id} required>
              {organizations.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.displayName}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className={labelClassName}>Title (EN)</span>
            <input className={fieldClassName} name="titleEn" defaultValue={opportunity?.titleEn ?? ""} required />
          </label>
          <label className="grid gap-2">
            <span className={labelClassName}>Title (MS)</span>
            <input className={fieldClassName} name="titleMs" defaultValue={opportunity?.titleMs ?? ""} required />
          </label>

          <label className="grid gap-2">
            <span className={labelClassName}>Summary (EN)</span>
            <textarea className={textareaClassName} name="summaryEn" defaultValue={opportunity?.summaryEn ?? ""} required />
          </label>
          <label className="grid gap-2">
            <span className={labelClassName}>Summary (MS)</span>
            <textarea className={textareaClassName} name="summaryMs" defaultValue={opportunity?.summaryMs ?? ""} required />
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className={labelClassName}>Description (EN)</span>
            <textarea className="field-control min-h-36" name="descriptionEn" defaultValue={opportunity?.descriptionEn ?? ""} required />
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className={labelClassName}>Description (MS)</span>
            <textarea className="field-control min-h-36" name="descriptionMs" defaultValue={opportunity?.descriptionMs ?? ""} required />
          </label>

          <label className="grid gap-2">
            <span className={labelClassName}>Eligibility (EN), one per line</span>
            <textarea className="field-control min-h-32" name="eligibilityEn" defaultValue={opportunity?.eligibilityEn.join("\n") ?? ""} required />
          </label>
          <label className="grid gap-2">
            <span className={labelClassName}>Eligibility (MS), one per line</span>
            <textarea className="field-control min-h-32" name="eligibilityMs" defaultValue={opportunity?.eligibilityMs.join("\n") ?? ""} required />
          </label>

          <label className="grid gap-2">
            <span className={labelClassName}>Category</span>
            <select className={fieldClassName} name="category" defaultValue={opportunity?.category ?? "scholarship"} required>
              {opportunityCategories.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className={labelClassName}>Mode</span>
            <select className={fieldClassName} name="mode" defaultValue={opportunity?.mode ?? "hybrid"} required>
              {opportunityModes.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className={labelClassName}>Location</span>
            <input className={fieldClassName} name="locationLabel" defaultValue={opportunity?.locationLabel ?? ""} required />
          </label>
          <label className="grid gap-2">
            <span className={labelClassName}>Deadline</span>
            <input className={fieldClassName} name="deadlineAt" type="datetime-local" defaultValue={opportunity ? formatDateTimeLocalInput(opportunity.deadlineAt) : ""} required />
          </label>

          <label className="grid gap-2">
            <span className={labelClassName}>External URL</span>
            <input className={fieldClassName} name="externalUrl" type="url" defaultValue={opportunity?.externalUrl ?? ""} required />
          </label>
          <label className="grid gap-2">
            <span className={labelClassName}>Status</span>
            <select className={fieldClassName} name="status" defaultValue={opportunity?.status ?? "draft"} required>
              {opportunityStatuses.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>

          <label className="surface-panel-muted flex items-center gap-3 rounded-[4px] px-4 py-4 text-sm text-slate-700 md:col-span-2">
            <input className="size-4 rounded border-slate-300 bg-white accent-slate-900" name="featured" type="checkbox" defaultChecked={opportunity?.featured ?? false} />
            Mark as featured on the home page
          </label>

          <div className="flex gap-3 pt-1 md:col-span-2">
            <Button type="submit">Save opportunity</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
