import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import BtuCalculator from '@/components/BtuCalculator';
import ProductsCatalog from '@/components/ProductsCatalog';
import BrandsSection from '@/components/BrandsSection';
import DifferentialSection from '@/components/DifferentialSection';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Bento Grid Services */}
      <ServicesGrid />

      {/* Interactive BTU Calculator */}
      <BtuCalculator />

      {/* Products & Equipment Catalog */}
      <ProductsCatalog />

      {/* Brands & Certification Badges */}
      <BrandsSection />

      {/* Key Differentials & Standards */}
      <DifferentialSection />

      {/* Lead Capture Form (with SMTP & local JSON support) */}
      <LeadCaptureForm />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </main>
  );
}
