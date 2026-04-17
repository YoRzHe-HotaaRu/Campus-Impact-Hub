import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { demoRoleCookieName } from "@/lib/constants";

function sanitizeRedirect(target: FormDataEntryValue | null) {
  if (typeof target === "string" && target.startsWith("/")) {
    return target;
  }

  return "/en";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const target = sanitizeRedirect(formData.get("redirectTo"));
  const cookieStore = await cookies();

  if (intent === "logout") {
    cookieStore.delete(demoRoleCookieName);
    redirect(target as never);
  }

  const role = formData.get("role");

  if (role !== "student" && role !== "admin") {
    redirect("/sign-in");
  }

  cookieStore.set(demoRoleCookieName, role, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect(target as never);
}
