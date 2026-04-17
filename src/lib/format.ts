import { getDaysLeft } from "@/lib/urgency";
import type { AppLocale } from "@/lib/types";

export function formatDeadline(locale: AppLocale, deadlineAt: string) {
  return new Intl.DateTimeFormat(locale === "ms" ? "ms-MY" : "en-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(deadlineAt));
}

export function formatDeadlineCountdown(locale: AppLocale, deadlineAt: string) {
  const daysLeft = getDaysLeft(deadlineAt);

  if (daysLeft < 0) {
    return locale === "ms" ? "Sudah ditutup" : "Closed";
  }

  if (daysLeft === 0) {
    return locale === "ms" ? "Tutup hari ini" : "Closes today";
  }

  if (daysLeft === 1) {
    return locale === "ms" ? "Baki 1 hari" : "1 day left";
  }

  return locale === "ms" ? `Baki ${daysLeft} hari` : `${daysLeft} days left`;
}

export function formatDateTimeLocalInput(value: string) {
  const date = new Date(value);
  const pad = (input: number) => String(input).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
