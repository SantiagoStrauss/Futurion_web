import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ClientSlider from "@/components/client-slider"
import InteractiveCards from "@/components/interactive-cards"
import OurWork from "@/components/our-work"
import BusinessInnovation from "@/components/business-innovation"
import BlogSection from "@/components/blog-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-[#FFFCF2]">
        <HeroSection />
        <ClientSlider />
        <InteractiveCards />
        <OurWork />
        <BusinessInnovation />
        <BlogSection />
      </main>
      <Footer />
    </>
  )
}

