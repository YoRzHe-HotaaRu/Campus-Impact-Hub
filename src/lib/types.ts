export const locales = ["en", "ms"] as const;
export const opportunityCategories = [
  "scholarship",
  "volunteering",
  "competition",
  "internship",
  "research",
] as const;
export const opportunityModes = ["onsite", "hybrid", "remote"] as const;
export const opportunityStatuses = ["draft", "published", "archived"] as const;
export const userRoles = ["student", "admin"] as const;
export const deadlinePresets = ["all", "7", "30", "90"] as const;
export const opportunitySorts = ["featured", "closing", "recent"] as const;

export type AppLocale = (typeof locales)[number];
export type OpportunityCategory = (typeof opportunityCategories)[number];
export type OpportunityMode = (typeof opportunityModes)[number];
export type OpportunityStatus = (typeof opportunityStatuses)[number];
export type UserRole = (typeof userRoles)[number];
export type OpportunityDeadlinePreset = (typeof deadlinePresets)[number];
export type OpportunitySort = (typeof opportunitySorts)[number];

export type Organization = {
  id: string;
  displayName: string;
  shortDescriptionEn: string;
  shortDescriptionMs: string;
  website: string;
  logoUrl?: string | null;
};

export type Opportunity = {
  id: string;
  slug: string;
  titleEn: string;
  titleMs: string;
  summaryEn: string;
  summaryMs: string;
  descriptionEn: string;
  descriptionMs: string;
  eligibilityEn: string[];
  eligibilityMs: string[];
  category: OpportunityCategory;
  organizationId: string;
  locationLabel: string;
  mode: OpportunityMode;
  deadlineAt: string;
  externalUrl: string;
  featured: boolean;
  status: OpportunityStatus;
  createdAt: string;
  updatedAt: string;
};

export type OpportunityWithOrganization = Opportunity & {
  organization: Organization;
};

export type OpportunityFilters = {
  q: string;
  category: OpportunityCategory | "all";
  mode: OpportunityMode | "all";
  location: string;
  deadline: OpportunityDeadlinePreset;
  sort: OpportunitySort;
};

export type OpportunityCardData = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: OpportunityCategory;
  organizationName: string;
  locationLabel: string;
  mode: OpportunityMode;
  deadlineAt: string;
  featured: boolean;
  saved: boolean;
  status: OpportunityStatus;
  daysLeft: number;
};

export type Viewer = {
  isAuthenticated: boolean;
  userId: string | null;
  role: UserRole | null;
  authMode: "none" | "demo" | "clerk";
  canEdit: boolean;
};

export type OpportunityInput = {
  slug: string;
  titleEn: string;
  titleMs: string;
  summaryEn: string;
  summaryMs: string;
  descriptionEn: string;
  descriptionMs: string;
  eligibilityEn: string[];
  eligibilityMs: string[];
  category: OpportunityCategory;
  organizationId: string;
  locationLabel: string;
  mode: OpportunityMode;
  deadlineAt: string;
  externalUrl: string;
  featured: boolean;
  status: OpportunityStatus;
};
