import createMiddleware from "next-intl/middleware";

import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(en|ms)/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
