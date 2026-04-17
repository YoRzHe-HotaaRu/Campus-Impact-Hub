import { sql } from "drizzle-orm";
import {
  boolean,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  role: text("role").notNull().default("student"),
  displayName: text("display_name"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const organizations = pgTable("organizations", {
  id: text("id").primaryKey(),
  displayName: text("display_name").notNull(),
  shortDescriptionEn: text("short_description_en").notNull(),
  shortDescriptionMs: text("short_description_ms").notNull(),
  website: text("website").notNull(),
  logoUrl: text("logo_url"),
});

export const opportunities = pgTable("opportunities", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleMs: text("title_ms").notNull(),
  summaryEn: text("summary_en").notNull(),
  summaryMs: text("summary_ms").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionMs: text("description_ms").notNull(),
  eligibilityEn: jsonb("eligibility_en")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  eligibilityMs: jsonb("eligibility_ms")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  category: text("category").notNull(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  locationLabel: text("location_label").notNull(),
  mode: text("mode").notNull(),
  deadlineAt: timestamp("deadline_at", { withTimezone: true }).notNull(),
  externalUrl: text("external_url").notNull(),
  featured: boolean("featured").notNull().default(false),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const savedOpportunities = pgTable(
  "saved_opportunities",
  {
    profileId: text("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    opportunityId: text("opportunity_id")
      .notNull()
      .references(() => opportunities.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.profileId, table.opportunityId] })],
);
