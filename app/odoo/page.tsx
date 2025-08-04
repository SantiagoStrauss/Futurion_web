import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OdooComponent from "@/components/odoo"

export default function OdooPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFFCF2]">
        <OdooComponent />
      </main>
      <Footer />
    </>
  )
}
