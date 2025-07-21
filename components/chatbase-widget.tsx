"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Import debug utilities in development
if (process.env.NODE_ENV === 'development') {
  import('@/lib/chatbase-debug')
}

declare global {
  interface Window {
    chatbase: any
  }
}

interface ChatbaseWidgetProps {
  userId?: string | null
  userEmail?: string
  userName?: string
}

export default function ChatbaseWidget({ 
  userId, 
  userEmail, 
  userName 
}: ChatbaseWidgetProps = {}) {
  const pathname = usePathname()

  // Don't show widget on certain routes
  const hiddenRoutes = ['/studio']
  const shouldHideWidget = hiddenRoutes.some(route => pathname?.startsWith(route))

  useEffect(() => {
    // Don't initialize if widget should be hidden
    if (shouldHideWidget) {
      return
    }

    let isInitialized = false

    // Initialize Chatbase
    const initChatbase = () => {
      if (isInitialized) return
      
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args: any[]) => {
          if (!window.chatbase.q) {
            window.chatbase.q = []
          }
          window.chatbase.q.push(args)
        }
        
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") {
              return target.q
            }
            return (...args: any[]) => target(prop, ...args)
          }
        })
      }

      // Check if script already exists
      const existingScript = document.getElementById("UvOz1MDei_eNhVbzbypYG")
      if (existingScript) {
        isInitialized = true
        if (userId) {
          setupIdentityVerification()
        }
        return
      }

      const onLoad = () => {
        const script = document.createElement("script")
        script.src = "https://www.chatbase.co/embed.min.js"
        script.id = "UvOz1MDei_eNhVbzbypYG"
        script.setAttribute('domain', "www.chatbase.co")
        
        // Wait for script to load before setting up identity
        script.onload = () => {
          isInitialized = true
          // Small delay to ensure Chatbase is fully initialized
          setTimeout(() => {
            if (userId) {
              setupIdentityVerification()
            }
          }, 500)
        }
        
        document.body.appendChild(script)
      }

      if (document.readyState === "complete") {
        onLoad()
      } else {
        window.addEventListener("load", onLoad)
      }
    }

    const setupIdentityVerification = async () => {
      if (!userId) return

      try {
        // Wait for Chatbase to be fully loaded
        let attempts = 0
        const maxAttempts = 10
        
        const waitForChatbase = () => {
          return new Promise<void>((resolve, reject) => {
            const checkChatbase = () => {
              if (window.chatbase && typeof window.chatbase === 'function') {
                try {
                  // Test if chatbase is actually working
                  const state = window.chatbase("getState")
                  if (state === "initialized" || state === "ready") {
                    resolve()
                    return
                  }
                } catch (e) {
                  // Continue trying
                }
              }
              
              attempts++
              if (attempts >= maxAttempts) {
                reject(new Error('Chatbase failed to initialize'))
                return
              }
              
              setTimeout(checkChatbase, 200)
            }
            checkChatbase()
          })
        }

        await waitForChatbase()

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

    initChatbase()

    // Cleanup function - más conservadora
    return () => {
      // Solo removemos listeners, no el script completo
      // para evitar interferir con el funcionamiento del widget
      window.removeEventListener("load", () => {})
    }
  }, [userId, userEmail, userName, shouldHideWidget])

  // Don't render anything if widget should be hidden
  if (shouldHideWidget) {
    return null
  }

  return null // This component doesn't render anything visible
}
