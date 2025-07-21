import { useEffect } from 'react'

interface UseChatbaseIdentityProps {
  userId?: string | null
  userEmail?: string
  userName?: string
}

export function useChatbaseIdentity({ 
  userId, 
  userEmail, 
  userName 
}: UseChatbaseIdentityProps = {}) {
  useEffect(() => {
    const setupChatbaseIdentity = async () => {
      if (!userId || !window.chatbase) return

      try {
        // Generate HMAC hash on the server
        const response = await fetch('/api/chatbase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        })

        if (!response.ok) {
          throw new Error('Failed to generate Chatbase hash')
        }

        const { hash } = await response.json()

        // Set user identity with Chatbase
        window.chatbase('identify', {
          userId: userId,
          userHash: hash,
          ...(userEmail && { userEmail }),
          ...(userName && { userName }),
        })
      } catch (error) {
        console.error('Error setting up Chatbase identity:', error)
      }
    }

    // Small delay to ensure Chatbase is loaded
    const timer = setTimeout(setupChatbaseIdentity, 1000)
    
    return () => clearTimeout(timer)
  }, [userId, userEmail, userName])
}

export default useChatbaseIdentity
