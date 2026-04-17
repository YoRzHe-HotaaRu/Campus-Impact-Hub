import { z } from "zod";

import {
  deadlinePresets,
  opportunityCategories,
  opportunityModes,
  opportunitySorts,
  type OpportunityFilters,
} from "@/lib/types";

const filtersSchema = z.object({
  q: z.string().default(""),
  category: z.enum(["all", ...opportunityCategories]).default("all"),
  mode: z.enum(["all", ...opportunityModes]).default("all"),
  location: z.string().default(""),
  deadline: z.enum(deadlinePresets).default("all"),
  sort: z.enum(opportunitySorts).default("featured"),
});

type SearchParamInput =
  | URLSearchParams
  | Record<string, string | string[] | undefined>;

function normalizeSearchParams(searchParams?: SearchParamInput) {
  if (!searchParams) {
    return {};
  }

  if (searchParams instanceof URLSearchParams) {
    return Object.fromEntries(searchParams.entries());
  }

  return Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
}

export function parseOpportunityFilters(
  searchParams?: SearchParamInput,
): OpportunityFilters {
  return filtersSchema.parse(normalizeSearchParams(searchParams));
}
