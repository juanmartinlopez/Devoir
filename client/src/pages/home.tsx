import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import WhyUs from "@/components/sections/why-us";
import Services from "@/components/sections/services";
import Projects from "@/components/sections/projects";
import Team from "@/components/sections/team";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <>
      <Navbar />
      <WhatsAppButton />
      <ScrollArea className="h-[100vh] w-full">
        <main className="min-h-screen pt-16">
          <Hero />
          <WhyUs />
          <Services />
          <Projects />
          <Team />
          {/* <Testimonials /> */}
          <Contact />
          <Footer />
        </main>
      </ScrollArea>
    </>
  );
}