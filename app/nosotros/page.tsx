import React from 'react'
import NosotrosComponent from '@/components/nosotros/nosotros'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <NosotrosComponent />
      <Footer />
    </main>
  )
}