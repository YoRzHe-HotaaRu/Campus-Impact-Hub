import { redirect } from "next/navigation";
import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const redirectTo =
    typeof params.redirectTo === "string" && params.redirectTo.startsWith("/")
      ? params.redirectTo
      : "/en";

  if (!clerkEnabled) {
    redirect(`/sign-in?redirectTo=${encodeURIComponent(redirectTo)}` as never);
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-16">
      <SignUp
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
        signInUrl={`/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`}
      />
    </div>
  );
}
