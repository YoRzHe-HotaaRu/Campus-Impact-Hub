import type { Opportunity } from "@/lib/types";
import { seedOpportunities } from "@/lib/seed-data";

type DemoStore = {
  opportunities: Opportunity[];
  savedByProfile: Record<string, string[]>;
};

declare global {
  var __impactDemoStore: DemoStore | undefined;
}

export function getDemoStore() {
  if (!globalThis.__impactDemoStore) {
    globalThis.__impactDemoStore = {
      opportunities: structuredClone(seedOpportunities),
      savedByProfile: {},
    };
  }

  return globalThis.__impactDemoStore;
}

export function resetDemoStore() {
  globalThis.__impactDemoStore = {
    opportunities: structuredClone(seedOpportunities),
    savedByProfile: {},
  };
}
