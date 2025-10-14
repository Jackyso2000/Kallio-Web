import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!api/webhooks/stripe$|catalog/.*|products/.*|search$|$|.+\\.[\\w]+$|_next).*)',
    '/api/(.*)', // apply to other API routes if desired
  ],
}
