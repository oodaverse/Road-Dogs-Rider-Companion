import { Header, Footer } from '@/components/layout/Header';
import {
  HeroSection,
  FeaturesSection,
  ProcessSection,
  RequirementsSection,
  CTASection,
} from '@/components/home/Sections';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <RequirementsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
