import type { AppLocale, OpportunityCategory, OpportunityMode } from "@/lib/types";

export const demoRoleCookieName = "impact-demo-role";

export const localeLabels: Record<AppLocale, string> = {
  en: "English",
  ms: "Bahasa Melayu",
};

export const categoryLabels: Record<
  OpportunityCategory,
  Record<AppLocale, string>
> = {
  scholarship: { en: "Scholarship", ms: "Biasiswa" },
  volunteering: { en: "Volunteering", ms: "Sukarelawan" },
  competition: { en: "Competition", ms: "Pertandingan" },
  internship: { en: "Internship", ms: "Latihan industri" },
  research: { en: "Research", ms: "Penyelidikan" },
};

export const modeLabels: Record<OpportunityMode, Record<AppLocale, string>> = {
  onsite: { en: "On-site", ms: "Di lokasi" },
  hybrid: { en: "Hybrid", ms: "Hibrid" },
  remote: { en: "Remote", ms: "Jarak jauh" },
};

export const categoryAccentClasses: Record<OpportunityCategory, string> = {
  scholarship: "border-sky-200 bg-sky-50 text-sky-800",
  volunteering: "border-emerald-200 bg-emerald-50 text-emerald-800",
  competition: "border-amber-200 bg-amber-50 text-amber-800",
  internship: "border-indigo-200 bg-indigo-50 text-indigo-800",
  research: "border-rose-200 bg-rose-50 text-rose-800",
};
