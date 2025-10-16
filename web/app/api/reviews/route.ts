import { client } from '@/sanity/client'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // 1. Check for authenticated user
const { userId, sessionClaims } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    
    const { productId, rating, comment } = await request.json()

    // 2. Validate input
    if (!productId || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check for existing review to prevent duplicates
    const existingReviewQuery = `count(*[_type == "review" && product._ref == $productId && clerkUserId == $userId])`
    const existingReviewCount = await client.fetch(existingReviewQuery, { productId, userId })

    if (existingReviewCount > 0) {
      return NextResponse.json({ error: 'You have already reviewed this product.' }, { status: 409 }) // 409 Conflict
    }

    // 3. Prepare the review document and the patch
    const reviewDoc = {
      _type: 'review',
      product: {
        _type: 'reference',
        _ref: productId,
      },
      clerkUserId: userId,
      // Use user's name from Clerk session, or a default
      reviewerName: sessionClaims?.fullName || 'Anonymous',
      rating: Number(rating),
      comment: comment || '',
      approved: true, // Reviews should be manually approved
    }

    // 4. Create the review and patch the order in a single transaction
    await client
      .transaction()
      .create(reviewDoc)
      .commit()

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Failed to create review:', error)
    // Check if error is a plain Error object
    const message = error instanceof Error ? error.message : 'Internal Server Error'
    return new NextResponse(JSON.stringify({ error: 'Failed to create review', details: message }), {
      status: 500,
    })
  }
}