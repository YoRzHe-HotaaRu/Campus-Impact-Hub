"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdmin, requireSignedIn } from "@/lib/auth";
import {
  archiveOpportunity,
  getOpportunityBySlug,
  setSavedOpportunity,
  upsertOpportunity,
} from "@/lib/data";
import {
  locales,
  opportunityCategories,
  opportunityModes,
  opportunityStatuses,
  type AppLocale,
} from "@/lib/types";

const localeSchema = z.enum(locales);

const opportunitySchema = z.object({
  slug: z.string().min(3),
  titleEn: z.string().min(3),
  titleMs: z.string().min(3),
  summaryEn: z.string().min(10),
  summaryMs: z.string().min(10),
  descriptionEn: z.string().min(20),
  descriptionMs: z.string().min(20),
  eligibilityEn: z.array(z.string()).min(1),
  eligibilityMs: z.array(z.string()).min(1),
  category: z.enum(opportunityCategories),
  organizationId: z.string().min(2),
  locationLabel: z.string().min(2),
  mode: z.enum(opportunityModes),
  deadlineAt: z.string().min(10),
  externalUrl: z.string().url(),
  featured: z.boolean(),
  status: z.enum(opportunityStatuses),
});

function revalidateApplication(locale: AppLocale, slug?: string) {
  const supportedLocales: AppLocale[] = ["en", "ms"];

  for (const current of supportedLocales) {
    revalidatePath(`/${current}`);
    revalidatePath(`/${current}/opportunities`);
    revalidatePath(`/${current}/saved`);
    revalidatePath(`/${current}/admin/opportunities`);

    if (slug) {
      revalidatePath(`/${current}/opportunities/${slug}`);
    }
  }

  revalidatePath(`/${locale}`);
}

export async function toggleSaveOpportunityAction(formData: FormData) {
  const locale = localeSchema.parse(formData.get("locale") ?? "en");
  const returnTo =
    (formData.get("returnTo") as string | null) ?? `/${locale}/opportunities`;
  const slug = formData.get("slug");
  const intent = formData.get("intent");

  if (typeof slug !== "string" || typeof intent !== "string") {
    redirect(returnTo as never);
  }

  const viewer = await requireSignedIn(locale, returnTo);
  const current = await getOpportunityBySlug(slug, viewer.userId, true);

  if (!current) {
    redirect(returnTo as never);
  }

  await setSavedOpportunity(viewer.userId!, current.opportunity.id, intent === "save");
  revalidateApplication(locale, current.opportunity.slug);
  redirect(returnTo as never);
}

export async function upsertOpportunityAction(formData: FormData) {
  const locale = localeSchema.parse(formData.get("locale") ?? "en");
  await requireAdmin(locale, `/${locale}/admin/opportunities`);

  const raw = {
    slug: String(formData.get("slug") ?? ""),
    titleEn: String(formData.get("titleEn") ?? ""),
    titleMs: String(formData.get("titleMs") ?? ""),
    summaryEn: String(formData.get("summaryEn") ?? ""),
    summaryMs: String(formData.get("summaryMs") ?? ""),
    descriptionEn: String(formData.get("descriptionEn") ?? ""),
    descriptionMs: String(formData.get("descriptionMs") ?? ""),
    eligibilityEn: String(formData.get("eligibilityEn") ?? "")
      .split("\n")
      .map((entry) => entry.trim())
      .filter(Boolean),
    eligibilityMs: String(formData.get("eligibilityMs") ?? "")
      .split("\n")
      .map((entry) => entry.trim())
      .filter(Boolean),
    category: String(formData.get("category") ?? ""),
    organizationId: String(formData.get("organizationId") ?? ""),
    locationLabel: String(formData.get("locationLabel") ?? ""),
    mode: String(formData.get("mode") ?? ""),
    deadlineAt: String(formData.get("deadlineAt") ?? ""),
    externalUrl: String(formData.get("externalUrl") ?? ""),
    featured: formData.get("featured") === "on",
    status: String(formData.get("status") ?? ""),
  };

  const parsed = opportunitySchema.parse(raw);
  const originalSlug = String(formData.get("originalSlug") ?? "").trim() || undefined;
  const nextSlug = await upsertOpportunity(parsed, originalSlug);

  revalidateApplication(locale, nextSlug);
  redirect(
    `/${locale}/admin/opportunities?edit=${encodeURIComponent(nextSlug)}` as never,
  );
}

export async function archiveOpportunityAction(formData: FormData) {
  const locale = localeSchema.parse(formData.get("locale") ?? "en");
  const slug = formData.get("slug");

  if (typeof slug !== "string") {
    redirect(`/${locale}/admin/opportunities` as never);
  }

  await requireAdmin(locale, `/${locale}/admin/opportunities`);
  await archiveOpportunity(slug);
  revalidateApplication(locale, slug);
  redirect(`/${locale}/admin/opportunities` as never);
}
