import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ServiciosComponent from "@/components/servicios"

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-[#FFFCF2]">
        <ServiciosComponent />
      </main>
      <Footer />
    </>
  )
}
