import { authMiddleware } from "@clerk/nextjs/server";
 
export default authMiddleware({
  
  // These routes are accessed when signed out
  publicRoutes: ['/404/'],
  
  // These routes can always be accessed
  // ignoredRoutes: ['/images/(.*)']
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};