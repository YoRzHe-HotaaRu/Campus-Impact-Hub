import Link from "next/link";
import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getViewer } from "@/lib/auth";

function sanitizeRedirect(target?: string) {
  return target && target.startsWith("/") ? target : "/en";
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const viewer = await getViewer();
  const redirectTo = sanitizeRedirect(
    Array.isArray(params.redirectTo) ? params.redirectTo[0] : params.redirectTo,
  );

  if (viewer.isAuthenticated) {
    redirect(redirectTo as never);
  }

  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (clerkEnabled) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-16">
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#111827",
              colorText: "#111827",
              colorBackground: "#ffffff",
              colorInputBackground: "#ffffff",
              colorInputText: "#111827",
              borderRadius: "1rem",
              fontFamily: "var(--font-public-sans)",
            },
            elements: {
              rootBox: "mx-auto",
              card: "rounded-[4px] border border-slate-300 bg-white shadow-[0_24px_48px_rgba(15,23,42,0.12)]",
              headerTitle: "font-heading text-3xl font-normal tracking-[-0.03em] text-slate-900",
              headerSubtitle: "text-slate-600",
              socialButtonsBlockButton:
                "rounded-[3px] border border-slate-300 bg-white hover:bg-slate-50",
              formButtonPrimary:
                "rounded-[3px] bg-slate-900 text-white shadow-none hover:bg-slate-800",
              formFieldInput:
                "rounded-[3px] border border-slate-300 bg-white text-slate-900",
              footerActionLink: "text-slate-900 underline-offset-4 hover:underline",
            },
          }}
          forceRedirectUrl={redirectTo}
          signUpUrl={`/sign-up?redirectTo=${encodeURIComponent(redirectTo)}`}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-16">
      <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="surface-panel-strong border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-4xl text-slate-900">
              Continue in local demo mode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-slate-600">
            <p>
              Clerk keys are not configured yet, so the project exposes a local demo
              entrypoint for student and admin testing.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <form action="/demo-auth" method="post" className="surface-panel-muted rounded-[4px] p-5">
                <input type="hidden" name="intent" value="login" />
                <input type="hidden" name="role" value="student" />
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <h2 className="font-heading text-2xl text-slate-900">Demo student</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Browse opportunities, save them and test the deadline dashboard.
                </p>
                <Button className="mt-5 w-full" type="submit">
                  Enter student mode
                </Button>
              </form>
              <form action="/demo-auth" method="post" className="surface-panel-muted rounded-[4px] p-5">
                <input type="hidden" name="intent" value="login" />
                <input type="hidden" name="role" value="admin" />
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <h2 className="font-heading text-2xl text-slate-900">Demo admin</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Create, edit, publish and archive opportunities inside the app.
                </p>
                <Button className="mt-5 w-full" type="submit" variant="outline">
                  Enter admin mode
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-panel border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">
              Production auth setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            <p>
              Add Clerk keys to `.env.local` to activate real authentication. The app
              will automatically switch from demo mode to Clerk mode.
            </p>
            <div className="rounded-[4px] border border-slate-300 bg-white p-4 text-slate-900 shadow-[0_12px_26px_rgba(15,23,42,0.08)]">
              <p>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...</p>
              <p>CLERK_SECRET_KEY=...</p>
            </div>
            <Link href="/" className="ink-link">
              Back to site
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
