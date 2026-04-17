import { beforeEach, describe, expect, it } from "vitest";

import {
  getOpportunityBySlug,
  listAdminOpportunities,
  listOpportunityCards,
  setSavedOpportunity,
  upsertOpportunity,
} from "@/lib/data";
import { resetDemoStore } from "@/lib/demo-store";

describe("data layer demo mode", () => {
  beforeEach(() => {
    resetDemoStore();
  });

  it("filters opportunities in demo mode", async () => {
    const opportunities = await listOpportunityCards(
      {
        q: "climate",
        category: "all",
        mode: "all",
        location: "",
        deadline: "all",
        sort: "featured",
      },
      "en",
    );

    expect(opportunities).toHaveLength(1);
    expect(opportunities[0].slug).toBe("climate-resilience-research-assistantship");
  });

  it("persists demo saves by viewer id", async () => {
    const detail = await getOpportunityBySlug("mdec-ai-product-internship");
    expect(detail).not.toBeNull();

    await setSavedOpportunity("demo-student", detail!.opportunity.id, true);

    const savedView = await getOpportunityBySlug(
      "mdec-ai-product-internship",
      "demo-student",
    );

    expect(savedView?.saved).toBe(true);
  });

  it("creates new opportunities in the demo admin store", async () => {
    await upsertOpportunity({
      slug: "new-demo-opportunity",
      titleEn: "New Demo Opportunity",
      titleMs: "Peluang Demo Baharu",
      summaryEn: "A new opportunity for testing the admin flow.",
      summaryMs: "Peluang baharu untuk menguji aliran admin.",
      descriptionEn: "This record verifies that demo admin creation works end to end.",
      descriptionMs:
        "Rekod ini mengesahkan bahawa penciptaan admin demo berfungsi sepenuhnya.",
      eligibilityEn: ["Open to all students"],
      eligibilityMs: ["Terbuka kepada semua pelajar"],
      category: "competition",
      organizationId: "myharapan",
      locationLabel: "Remote",
      mode: "remote",
      deadlineAt: "2026-12-01T00:00:00.000Z",
      externalUrl: "https://example.com/demo-opportunity",
      featured: false,
      status: "published",
    });

    const opportunities = await listAdminOpportunities();

    expect(opportunities[0].slug).toBe("new-demo-opportunity");
  });
});
