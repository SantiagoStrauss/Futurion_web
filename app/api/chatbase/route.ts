import { NextRequest, NextResponse } from 'next/server'

// Configure the runtime for this API route
export const runtime = 'edge'

// Store the secret in environment variables for security
const CHATBASE_SECRET = process.env.CHATBASE_SECRET

// Helper function to create HMAC using Web Crypto API
async function createHmac(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(message)

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, messageData)
  const hashArray = Array.from(new Uint8Array(signature))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return hashHex
}

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
    const hash = await createHmac(CHATBASE_SECRET, userId.toString())

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
