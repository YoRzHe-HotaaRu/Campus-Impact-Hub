export const isClerkConfigured = Boolean(
  process.env.CLERK_SECRET_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
);

export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);

export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
