import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/catalog/(.*)',
  '/products/(.*)',
  '/search',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/stripe', // Stripe webhook should be public
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // If the route is not public, check for authentication
    const { userId } = await auth()
    if (!userId) {
      // If the user is not authenticated, redirect them to the sign-in page
      const signInUrl = new URL('/sign-in', request.url)
      signInUrl.searchParams.set('redirect_url', request.url)
      return NextResponse.redirect(signInUrl)
    }
  }
})

export const config = {
  // The following matcher ensures that Clerk's middleware runs on all routes
  // except for assets and other special routes.
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
