import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import {
  opportunities as opportunitiesTable,
  organizations as organizationsTable,
  profiles as profilesTable,
  savedOpportunities as savedOpportunitiesTable,
} from "@/lib/db/schema";
import { getDemoStore } from "@/lib/demo-store";
import { seedOrganizations } from "@/lib/seed-data";
import { getDaysLeft } from "@/lib/urgency";
import type {
  AppLocale,
  Opportunity,
  OpportunityCardData,
  OpportunityFilters,
  OpportunityInput,
  OpportunityWithOrganization,
  Organization,
  UserRole,
} from "@/lib/types";

function toIsoString(value: string | Date) {
  return value instanceof Date ? value.toISOString() : value;
}

function joinOrganization(
  opportunity: Opportunity,
  organizations: Organization[],
): OpportunityWithOrganization {
  const organization = organizations.find((entry) => entry.id === opportunity.organizationId);

  if (!organization) {
    throw new Error(`Missing organization for ${opportunity.slug}`);
  }

  return {
    ...opportunity,
    organization,
  };
}

function matchesFilters(
  opportunity: OpportunityWithOrganization,
  filters: OpportunityFilters,
) {
  const query = filters.q.trim().toLowerCase();

  if (query) {
    const haystack = [
      opportunity.titleEn,
      opportunity.titleMs,
      opportunity.summaryEn,
      opportunity.summaryMs,
      opportunity.organization.displayName,
      opportunity.locationLabel,
    ]
      .join(" ")
      .toLowerCase();

    if (!haystack.includes(query)) {
      return false;
    }
  }

  if (filters.category !== "all" && opportunity.category !== filters.category) {
    return false;
  }

  if (filters.mode !== "all" && opportunity.mode !== filters.mode) {
    return false;
  }

  if (
    filters.location.trim() &&
    !opportunity.locationLabel.toLowerCase().includes(filters.location.trim().toLowerCase())
  ) {
    return false;
  }

  if (filters.deadline !== "all") {
    const daysLeft = getDaysLeft(opportunity.deadlineAt);
    if (daysLeft > Number(filters.deadline)) {
      return false;
    }
  }

  return true;
}

function sortOpportunities(
  opportunities: OpportunityWithOrganization[],
  sort: OpportunityFilters["sort"],
) {
  return [...opportunities].sort((left, right) => {
    if (sort === "recent") {
      return (
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
      );
    }

    if (sort === "closing") {
      return (
        new Date(left.deadlineAt).getTime() - new Date(right.deadlineAt).getTime()
      );
    }

    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    return (
      new Date(left.deadlineAt).getTime() - new Date(right.deadlineAt).getTime()
    );
  });
}

function toCardData(
  opportunity: OpportunityWithOrganization,
  locale: AppLocale,
  saved: boolean,
): OpportunityCardData {
  return {
    id: opportunity.id,
    slug: opportunity.slug,
    title: locale === "ms" ? opportunity.titleMs : opportunity.titleEn,
    summary: locale === "ms" ? opportunity.summaryMs : opportunity.summaryEn,
    category: opportunity.category,
    organizationName: opportunity.organization.displayName,
    locationLabel: opportunity.locationLabel,
    mode: opportunity.mode,
    deadlineAt: opportunity.deadlineAt,
    featured: opportunity.featured,
    saved,
    status: opportunity.status,
    daysLeft: getDaysLeft(opportunity.deadlineAt),
  };
}

async function loadOrganizations() {
  if (!db) {
    return structuredClone(seedOrganizations);
  }

  const rows = await db.select().from(organizationsTable);

  return rows.map((row) => ({
    id: row.id,
    displayName: row.displayName,
    shortDescriptionEn: row.shortDescriptionEn,
    shortDescriptionMs: row.shortDescriptionMs,
    website: row.website,
    logoUrl: row.logoUrl,
  }));
}

async function loadAllOpportunities() {
  if (!db) {
    return structuredClone(getDemoStore().opportunities);
  }

  const rows = await db.select().from(opportunitiesTable);

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    titleEn: row.titleEn,
    titleMs: row.titleMs,
    summaryEn: row.summaryEn,
    summaryMs: row.summaryMs,
    descriptionEn: row.descriptionEn,
    descriptionMs: row.descriptionMs,
    eligibilityEn: row.eligibilityEn ?? [],
    eligibilityMs: row.eligibilityMs ?? [],
    category: row.category as Opportunity["category"],
    organizationId: row.organizationId,
    locationLabel: row.locationLabel,
    mode: row.mode as Opportunity["mode"],
    deadlineAt: toIsoString(row.deadlineAt),
    externalUrl: row.externalUrl,
    featured: row.featured,
    status: row.status as Opportunity["status"],
    createdAt: toIsoString(row.createdAt),
    updatedAt: toIsoString(row.updatedAt),
  }));
}

async function loadJoinedOpportunities() {
  const [organizations, opportunities] = await Promise.all([
    loadOrganizations(),
    loadAllOpportunities(),
  ]);

  return opportunities.map((entry) => joinOrganization(entry, organizations));
}

async function getSavedOpportunityIds(viewerId: string) {
  if (!db) {
    return new Set(getDemoStore().savedByProfile[viewerId] ?? []);
  }

  const rows = await db
    .select({ opportunityId: savedOpportunitiesTable.opportunityId })
    .from(savedOpportunitiesTable)
    .where(eq(savedOpportunitiesTable.profileId, viewerId));

  return new Set(rows.map((row) => row.opportunityId));
}

export async function ensureUserProfile(clerkUserId: string, role: UserRole = "student") {
  if (!db) {
    return { id: clerkUserId, clerkUserId, role };
  }

  const existing = await db
    .select({
      id: profilesTable.id,
      clerkUserId: profilesTable.clerkUserId,
      role: profilesTable.role,
    })
    .from(profilesTable)
    .where(eq(profilesTable.clerkUserId, clerkUserId))
    .limit(1);

  if (existing[0]) {
    return {
      id: existing[0].id,
      clerkUserId: existing[0].clerkUserId,
      role: existing[0].role as UserRole,
    };
  }

  await db.insert(profilesTable).values({
    id: clerkUserId,
    clerkUserId,
    role,
    updatedAt: new Date(),
  });

  return { id: clerkUserId, clerkUserId, role };
}

export async function listOrganizations() {
  return loadOrganizations();
}

export async function listFeaturedOpportunityCards(
  locale: AppLocale,
  viewerId?: string | null,
  limit = 3,
) {
  const [opportunities, savedIds] = await Promise.all([
    loadJoinedOpportunities(),
    viewerId ? getSavedOpportunityIds(viewerId) : Promise.resolve(new Set<string>()),
  ]);

  return opportunities
    .filter((entry) => entry.status === "published" && entry.featured)
    .sort(
      (left, right) =>
        new Date(left.deadlineAt).getTime() - new Date(right.deadlineAt).getTime(),
    )
    .slice(0, limit)
    .map((entry) => toCardData(entry, locale, savedIds.has(entry.id)));
}

export async function listOpportunityCards(
  filters: OpportunityFilters,
  locale: AppLocale,
  viewerId?: string | null,
) {
  const [opportunities, savedIds] = await Promise.all([
    loadJoinedOpportunities(),
    viewerId ? getSavedOpportunityIds(viewerId) : Promise.resolve(new Set<string>()),
  ]);

  return sortOpportunities(
    opportunities.filter(
      (entry) => entry.status === "published" && matchesFilters(entry, filters),
    ),
    filters.sort,
  ).map((entry) => toCardData(entry, locale, savedIds.has(entry.id)));
}

export async function getOpportunityBySlug(
  slug: string,
  viewerId?: string | null,
  includeUnpublished = false,
) {
  const [opportunities, savedIds] = await Promise.all([
    loadJoinedOpportunities(),
    viewerId ? getSavedOpportunityIds(viewerId) : Promise.resolve(new Set<string>()),
  ]);

  const opportunity = opportunities.find(
    (entry) =>
      entry.slug === slug && (includeUnpublished || entry.status === "published"),
  );

  if (!opportunity) {
    return null;
  }

  return {
    opportunity,
    saved: savedIds.has(opportunity.id),
  };
}

export async function listRelatedOpportunityCards(
  current: OpportunityWithOrganization,
  locale: AppLocale,
  viewerId?: string | null,
) {
  const [opportunities, savedIds] = await Promise.all([
    loadJoinedOpportunities(),
    viewerId ? getSavedOpportunityIds(viewerId) : Promise.resolve(new Set<string>()),
  ]);

  return opportunities
    .filter(
      (entry) =>
        entry.id !== current.id &&
        entry.status === "published" &&
        (entry.category === current.category ||
          entry.organizationId === current.organizationId),
    )
    .slice(0, 3)
    .map((entry) => toCardData(entry, locale, savedIds.has(entry.id)));
}

export async function listSavedOpportunityCards(
  locale: AppLocale,
  viewerId: string,
) {
  const [opportunities, savedIds] = await Promise.all([
    loadJoinedOpportunities(),
    getSavedOpportunityIds(viewerId),
  ]);

  return opportunities
    .filter((entry) => entry.status === "published" && savedIds.has(entry.id))
    .map((entry) => toCardData(entry, locale, true))
    .sort(
      (left, right) =>
        new Date(left.deadlineAt).getTime() - new Date(right.deadlineAt).getTime(),
    );
}

export async function listAdminOpportunities() {
  const opportunities = await loadJoinedOpportunities();

  return opportunities.sort(
    (left, right) =>
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
  );
}

export async function setSavedOpportunity(
  viewerId: string,
  opportunityId: string,
  shouldSave: boolean,
) {
  if (!db) {
    const store = getDemoStore();
    const savedIds = new Set(store.savedByProfile[viewerId] ?? []);

    if (shouldSave) {
      savedIds.add(opportunityId);
    } else {
      savedIds.delete(opportunityId);
    }

    store.savedByProfile[viewerId] = [...savedIds];
    return;
  }

  if (shouldSave) {
    await db
      .insert(savedOpportunitiesTable)
      .values({ profileId: viewerId, opportunityId })
      .onConflictDoNothing();

    return;
  }

  await db
    .delete(savedOpportunitiesTable)
    .where(
      and(
        eq(savedOpportunitiesTable.profileId, viewerId),
        eq(savedOpportunitiesTable.opportunityId, opportunityId),
      ),
    );
}

export async function upsertOpportunity(
  input: OpportunityInput,
  originalSlug?: string,
) {
  const timestamp = new Date().toISOString();

  if (!db) {
    const store = getDemoStore();
    const currentIndex = store.opportunities.findIndex(
      (entry) => entry.slug === (originalSlug ?? input.slug),
    );

    const nextOpportunity: Opportunity = {
      id:
        currentIndex >= 0
          ? store.opportunities[currentIndex].id
          : `demo-${crypto.randomUUID()}`,
      slug: input.slug,
      titleEn: input.titleEn,
      titleMs: input.titleMs,
      summaryEn: input.summaryEn,
      summaryMs: input.summaryMs,
      descriptionEn: input.descriptionEn,
      descriptionMs: input.descriptionMs,
      eligibilityEn: input.eligibilityEn,
      eligibilityMs: input.eligibilityMs,
      category: input.category,
      organizationId: input.organizationId,
      locationLabel: input.locationLabel,
      mode: input.mode,
      deadlineAt: new Date(input.deadlineAt).toISOString(),
      externalUrl: input.externalUrl,
      featured: input.featured,
      status: input.status,
      createdAt:
        currentIndex >= 0
          ? store.opportunities[currentIndex].createdAt
          : timestamp,
      updatedAt: timestamp,
    };

    if (currentIndex >= 0) {
      store.opportunities[currentIndex] = nextOpportunity;
    } else {
      store.opportunities.unshift(nextOpportunity);
    }

    return nextOpportunity.slug;
  }

  const existing = await db
    .select({ id: opportunitiesTable.id })
    .from(opportunitiesTable)
    .where(eq(opportunitiesTable.slug, originalSlug ?? input.slug))
    .limit(1);

  if (existing[0]) {
    await db
      .update(opportunitiesTable)
      .set({
        slug: input.slug,
        titleEn: input.titleEn,
        titleMs: input.titleMs,
        summaryEn: input.summaryEn,
        summaryMs: input.summaryMs,
        descriptionEn: input.descriptionEn,
        descriptionMs: input.descriptionMs,
        eligibilityEn: input.eligibilityEn,
        eligibilityMs: input.eligibilityMs,
        category: input.category,
        organizationId: input.organizationId,
        locationLabel: input.locationLabel,
        mode: input.mode,
        deadlineAt: new Date(input.deadlineAt),
        externalUrl: input.externalUrl,
        featured: input.featured,
        status: input.status,
        updatedAt: new Date(),
      })
      .where(eq(opportunitiesTable.id, existing[0].id));

    return input.slug;
  }

  await db.insert(opportunitiesTable).values({
    id: crypto.randomUUID(),
    slug: input.slug,
    titleEn: input.titleEn,
    titleMs: input.titleMs,
    summaryEn: input.summaryEn,
    summaryMs: input.summaryMs,
    descriptionEn: input.descriptionEn,
    descriptionMs: input.descriptionMs,
    eligibilityEn: input.eligibilityEn,
    eligibilityMs: input.eligibilityMs,
    category: input.category,
    organizationId: input.organizationId,
    locationLabel: input.locationLabel,
    mode: input.mode,
    deadlineAt: new Date(input.deadlineAt),
    externalUrl: input.externalUrl,
    featured: input.featured,
    status: input.status,
    updatedAt: new Date(),
  });

  return input.slug;
}

export async function archiveOpportunity(slug: string) {
  if (!db) {
    const entry = getDemoStore().opportunities.find((item) => item.slug === slug);

    if (entry) {
      entry.status = "archived";
      entry.updatedAt = new Date().toISOString();
    }

    return;
  }

  await db
    .update(opportunitiesTable)
    .set({
      status: "archived",
      updatedAt: new Date(),
    })
    .where(eq(opportunitiesTable.slug, slug));
}
