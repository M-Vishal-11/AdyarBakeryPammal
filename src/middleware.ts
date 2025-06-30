import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin-dashboard(.*)"]);
const isOperatorRoute = createRouteMatcher(["/operator(.*)"]);

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/cart",
  "/offers",
  "/shop",
  "/api(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { sessionClaims } = await auth();
    const role = sessionClaims?.metadata?.role;

    if (isAdminRoute(req) && role !== "admin") {
      return NextResponse.redirect(new URL("/404", req.url));
    }
    if (isOperatorRoute(req) && !(role === "operator" || role === "admin")) {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
