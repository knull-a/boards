import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: "/",
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute)
      return NextResponse.redirect(new URL("/dashboard", req.url));

    if (!auth.userId && !auth.isPublicRoute)
      return redirectToSignIn({ returnBackUrl: req.url });
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
