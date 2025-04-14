import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Futurion Partners',
  description: 'Seeking the future beyond boundaries',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}