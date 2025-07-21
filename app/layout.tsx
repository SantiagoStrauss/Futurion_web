import type { Metadata } from 'next'
import { Tinos, Libre_Franklin } from 'next/font/google'
import './globals.css'
import ChatbaseWidget from '@/components/chatbase-widget'

const tinos = Tinos({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-tinos',
})

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-libre-franklin',
})

export const metadata: Metadata = {
  title: 'Futurion Partners',
  description: 'Seeking the future beyond boundaries',//Future Unbound
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${tinos.variable} ${libreFranklin.variable}`}>
      <body className="overflow-x-hidden bg-black font-sans">
        {children}
        <ChatbaseWidget />
      </body>
    </html>
  )
}