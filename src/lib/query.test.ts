import { describe, expect, it } from "vitest";

import { parseOpportunityFilters } from "@/lib/query";

describe("parseOpportunityFilters", () => {
  it("returns defaults when no params are provided", () => {
    expect(parseOpportunityFilters()).toEqual({
      q: "",
      category: "all",
      mode: "all",
      location: "",
      deadline: "all",
      sort: "featured",
    });
  });

  it("normalizes array-like search params", () => {
    expect(
      parseOpportunityFilters({
        q: ["climate"],
        category: ["research"],
        mode: ["hybrid"],
        location: ["selangor"],
        deadline: ["30"],
        sort: ["closing"],
      }),
    ).toEqual({
      q: "climate",
      category: "research",
      mode: "hybrid",
      location: "selangor",
      deadline: "30",
      sort: "closing",
    });
  });
});
