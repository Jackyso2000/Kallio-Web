import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define routes that are public and do not require authentication.
const isPublicRoute = createRouteMatcher([
  '/',
  '/catalog/(.*)',
  '/products/(.*)',
  '/search',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/stripe',
])

export default clerkMiddleware((auth, request) => {
  // Protect all routes that are not explicitly marked as public.
  if (!isPublicRoute(request)) {
    auth.protect()
  }
})

export const config = {
  // The following matcher ensures that Clerk's middleware runs on all routes
  // except for assets and other special routes.
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
