import { differenceInCalendarDays, parseISO } from "date-fns";

import type { OpportunityCardData } from "@/lib/types";

export function getDaysLeft(deadlineAt: string, now = new Date()) {
  return differenceInCalendarDays(parseISO(deadlineAt), now);
}

export function groupOpportunitiesByUrgency(
  opportunities: OpportunityCardData[],
  now = new Date(),
) {
  return opportunities.reduce(
    (groups, opportunity) => {
      const daysLeft = getDaysLeft(opportunity.deadlineAt, now);

      if (daysLeft <= 7) {
        groups.closingSoon.push({ ...opportunity, daysLeft });
      } else if (daysLeft <= 30) {
        groups.upcoming.push({ ...opportunity, daysLeft });
      } else {
        groups.later.push({ ...opportunity, daysLeft });
      }

      return groups;
    },
    {
      closingSoon: [] as OpportunityCardData[],
      upcoming: [] as OpportunityCardData[],
      later: [] as OpportunityCardData[],
    },
  );
}
