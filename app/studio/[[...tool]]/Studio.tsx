'use client'

export default function Studio() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sanity Studio</h1>
        <p className="text-gray-600 mb-6">
          El estudio de Sanity estará disponible una vez que instales las dependencias.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p className="font-medium">Instala estas dependencias:</p>
          <code className="block bg-gray-100 p-2 rounded text-xs">
            npm install sanity @sanity/vision @sanity/icons styled-components next-sanity
          </code>
        </div>
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm font-medium text-gray-700">
            Mientras tanto, el blog está funcionando con datos de prueba en:
          </p>
          <div className="mt-2 space-y-1">
            <a href="/" className="block text-blue-600 hover:underline text-sm">
              • Página principal (sección blog)
            </a>
            <a href="/blog" className="block text-blue-600 hover:underline text-sm">
              • Página completa del blog
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
