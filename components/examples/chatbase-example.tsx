// Ejemplo de cómo usar Chatbase con autenticación de usuario

import { useState, useEffect } from 'react'
import ChatbaseWidget from '@/components/chatbase-widget'

export default function ExampleWithUserAuth() {
  // Ejemplo de estado de usuario - reemplaza esto con tu sistema de autenticación real
  const [user, setUser] = useState<{
    id: string
    email: string
    name: string
  } | null>(null)

  // Simular login de usuario - reemplaza con tu lógica real
  useEffect(() => {
    // Ejemplo: obtener usuario autenticado
    const mockUser = {
      id: "user123",
      email: "usuario@futurionpartners.com", 
      name: "Usuario Ejemplo"
    }
    setUser(mockUser)
  }, [])

  return (
    <div>
      {/* Tu contenido aquí */}
      
      {/* Widget de Chatbase - se carga automáticamente */}
      <ChatbaseWidget 
        userId={user?.id}
        userEmail={user?.email}
        userName={user?.name}
      />
    </div>
  )
}

/* 
INSTRUCCIONES DE USO:

1. Sin autenticación (usuario anónimo):
   <ChatbaseWidget />

2. Con autenticación de usuario:
   <ChatbaseWidget 
     userId="unique-user-id"
     userEmail="user@example.com"
     userName="User Name"
   />

3. El widget se inicializa automáticamente cuando se monta el componente
4. La verificación de identidad se maneja automáticamente si proporcionas un userId
5. El hash HMAC se genera en el servidor para seguridad

NOTAS DE SEGURIDAD:
- El secret key está en variables de entorno (.env.local)
- NUNCA expongas el secret key en el código del cliente
- La generación del hash se hace en el servidor (/api/chatbase)
*/
