import { HeroSection } from "@/components/sections/hero-section";
import { StickyNavbar } from "@/components/layout/sticky-navbar";
import { ReassuranceSection } from "@/components/sections/reassurance-section";
import { WhyGiveSection } from "@/components/sections/why-give-section";
import { EligibilitySection } from "@/components/sections/eligibility-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { BloodReservesSection } from "@/components/sections/blood-reserves-section";
import { CentersSection } from "@/components/sections/centers-section";
import { FinalCTASection } from "@/components/sections/final-cta-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-hemora-bg text-hemora-text">
      {/* Navbar sticky secondaire (apparaît après 250px de scroll) */}
      <StickyNavbar />

      {/* Main Content Sections (Header est intégré au conteneur maître HeroSection) */}
      <main className="flex-1">
        {/* 1 & 2. Header & Hero unifiés */}
        <HeroSection />

        {/* 3. Réassurance */}
        <ReassuranceSection />

        {/* 4. Pourquoi donner */}
        <WhyGiveSection />

        {/* 5. Éligibilité */}
        <EligibilitySection />

        {/* 6. Déroulement + préparation */}
        <ProcessSection />

        {/* 7. Témoignages premiers donneurs */}
        <TestimonialsSection />

        {/* 8. FAQ / idées reçues */}
        <FAQSection />

        {/* 9. État des réserves */}
        <BloodReservesSection />

        {/* 10. Centres de don */}
        <CentersSection />

        {/* 11. CTA final */}
        <FinalCTASection />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
