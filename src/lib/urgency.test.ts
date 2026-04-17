import { describe, expect, it } from "vitest";

import { groupOpportunitiesByUrgency } from "@/lib/urgency";
import type { OpportunityCardData } from "@/lib/types";

const baseOpportunity: OpportunityCardData = {
  id: "opp-1",
  slug: "example-opportunity",
  title: "Example",
  summary: "Example summary",
  category: "research",
  organizationName: "Example Org",
  locationLabel: "Remote",
  mode: "remote",
  deadlineAt: "2026-05-01T00:00:00.000Z",
  featured: false,
  saved: true,
  status: "published",
  daysLeft: 0,
};

describe("groupOpportunitiesByUrgency", () => {
  it("splits opportunities into urgency buckets", () => {
    const grouped = groupOpportunitiesByUrgency(
      [
        baseOpportunity,
        {
          ...baseOpportunity,
          id: "opp-2",
          slug: "mid-range",
          deadlineAt: "2026-05-20T00:00:00.000Z",
        },
        {
          ...baseOpportunity,
          id: "opp-3",
          slug: "later",
          deadlineAt: "2026-07-10T00:00:00.000Z",
        },
      ],
      new Date("2026-04-25T00:00:00.000Z"),
    );

    expect(grouped.closingSoon.map((entry) => entry.slug)).toEqual([
      "example-opportunity",
    ]);
    expect(grouped.upcoming.map((entry) => entry.slug)).toEqual(["mid-range"]);
    expect(grouped.later.map((entry) => entry.slug)).toEqual(["later"]);
  });
});
