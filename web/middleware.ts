import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    '/',
    '/catalog/(.*)',
    '/products/(.*)',
    '/search',
  ],
  // Routes that can always be accessed, and have no authentication information
  ignoredRoutes: ['/api/webhooks/stripe'],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}