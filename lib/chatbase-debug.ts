// Utilidades para controlar Chatbase manualmente
// Puedes usar estas funciones en la consola del navegador para debugging

export interface ChatbaseDebugUtils {
  open: () => void
  close: () => void
  toggle: () => void
  getState: () => any
  identify: (userId: string, userEmail?: string, userName?: string) => void
}

// Agregar utilidades de debug a window
if (typeof window !== 'undefined') {
  (window as any).ChatbaseDebug = {
    open: () => {
      if (window.chatbase) {
        window.chatbase('open')
        console.log('Chatbase: Intentando abrir widget')
      } else {
        console.error('Chatbase no está disponible')
      }
    },
    
    close: () => {
      if (window.chatbase) {
        window.chatbase('close')
        console.log('Chatbase: Intentando cerrar widget')
      } else {
        console.error('Chatbase no está disponible')
      }
    },
    
    toggle: () => {
      if (window.chatbase) {
        try {
          const state = window.chatbase('getState')
          if (state && state.isOpen) {
            window.chatbase('close')
            console.log('Chatbase: Cerrando widget')
          } else {
            window.chatbase('open')
            console.log('Chatbase: Abriendo widget')
          }
        } catch (error) {
          console.error('Error al toggle widget:', error)
        }
      } else {
        console.error('Chatbase no está disponible')
      }
    },
    
    getState: () => {
      if (window.chatbase) {
        try {
          const state = window.chatbase('getState')
          console.log('Estado actual de Chatbase:', state)
          return state
        } catch (error) {
          console.error('Error al obtener estado:', error)
          return null
        }
      } else {
        console.error('Chatbase no está disponible')
        return null
      }
    },
    
    identify: async (userId: string, userEmail?: string, userName?: string) => {
      if (window.chatbase) {
        try {
          const response = await fetch('/api/chatbase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
          })
          
          const { hash } = await response.json()
          
          window.chatbase('identify', {
            userId,
            userHash: hash,
            ...(userEmail && { userEmail }),
            ...(userName && { userName }),
          })
          
          console.log('Usuario identificado:', { userId, userEmail, userName })
        } catch (error) {
          console.error('Error al identificar usuario:', error)
        }
      } else {
        console.error('Chatbase no está disponible')
      }
    }
  }
}

/*
USO EN CONSOLA DEL NAVEGADOR:

// Abrir widget manualmente
ChatbaseDebug.open()

// Cerrar widget manualmente
ChatbaseDebug.close()

// Toggle (abrir si está cerrado, cerrar si está abierto)
ChatbaseDebug.toggle()

// Ver estado actual
ChatbaseDebug.getState()

// Identificar usuario manualmente
ChatbaseDebug.identify('user123', 'user@example.com', 'User Name')
*/
