import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import BtuCalculator from '@/components/BtuCalculator';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Sleek Glass Navbar */}
      <Navbar />

      {/* Creative & Impactful Hero */}
      <HeroSection />

      {/* 3 Core Services: Venda, Instalação, Manutenção */}
      <ServicesGrid />

      {/* Minimalist BTU Calculator */}
      <BtuCalculator />

      {/* Clean Lead Capture Form */}
      <LeadCaptureForm />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Minimalist Footer */}
      <Footer />
    </main>
  );
}
