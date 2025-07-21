import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Configure the runtime for this API route
export const runtime = 'edge'

// Store the secret in environment variables for security
const CHATBASE_SECRET = process.env.CHATBASE_SECRET

export async function POST(request: NextRequest) {
  try {
    // Check if secret is configured
    if (!CHATBASE_SECRET) {
      console.error('CHATBASE_SECRET is not configured in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Generate HMAC hash for user verification
    const hash = crypto
      .createHmac('sha256', CHATBASE_SECRET)
      .update(userId.toString())
      .digest('hex')

    return NextResponse.json({
      hash,
      userId
    })
  } catch (error) {
    console.error('Error generating Chatbase hash:', error)
    return NextResponse.json(
      { error: 'Failed to generate hash' },
      { status: 500 }
    )
  }
}
