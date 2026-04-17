import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { demoRoleCookieName } from "@/lib/constants";
import { ensureUserProfile } from "@/lib/data";
import { isClerkConfigured } from "@/lib/env";
import type { AppLocale, UserRole, Viewer } from "@/lib/types";

function fallbackPath(locale: AppLocale) {
  return `/${locale}/saved`;
}

export function buildSignInUrl(locale: AppLocale, returnTo?: string) {
  return `/sign-in?redirectTo=${encodeURIComponent(returnTo ?? fallbackPath(locale))}`;
}

export async function getViewer(): Promise<Viewer> {
  const cookieStore = await cookies();
  const demoRoleValue = cookieStore.get(demoRoleCookieName)?.value;
  const demoRole =
    demoRoleValue === "student" || demoRoleValue === "admin"
      ? (demoRoleValue as UserRole)
      : null;

  if (isClerkConfigured) {
    const { auth } = await import("@clerk/nextjs/server");
    const session = await auth();

    if (session.userId) {
      const profile = await ensureUserProfile(session.userId);

      return {
        isAuthenticated: true,
        userId: profile.id,
        role: profile.role,
        authMode: "clerk",
        canEdit: profile.role === "admin",
      };
    }
  }

  if (demoRole) {
    return {
      isAuthenticated: true,
      userId: `demo-${demoRole}`,
      role: demoRole,
      authMode: "demo",
      canEdit: demoRole === "admin",
    };
  }

  return {
    isAuthenticated: false,
    userId: null,
    role: null,
    authMode: "none",
    canEdit: false,
  };
}

export async function requireSignedIn(locale: AppLocale, returnTo?: string) {
  const viewer = await getViewer();

  if (!viewer.isAuthenticated) {
    redirect(buildSignInUrl(locale, returnTo) as never);
  }

  return viewer;
}

export async function requireAdmin(locale: AppLocale, returnTo?: string) {
  const viewer = await requireSignedIn(locale, returnTo);

  if (viewer.role !== "admin") {
    redirect(fallbackPath(locale) as never);
  }

  return viewer;
}
