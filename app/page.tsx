import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InstallationBlueprint from '@/components/InstallationBlueprint';
import BeforeAfterCleaning from '@/components/BeforeAfterCleaning';
import BtuCalculatorPro from '@/components/BtuCalculatorPro';
import ServicesBento from '@/components/ServicesBento';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Sleek Glass Navbar */}
      <Navbar />

      {/* Futuristic Smart Climate Console Hero */}
      <HeroSection />

      {/* Raio-X Técnico: Blueprint da Instalação Perfeita */}
      <InstallationBlueprint />

      {/* Antes & Depois: Higienização Química Hospitalar */}
      <BeforeAfterCleaning />

      {/* Simulador de Ambientes & Economia de Energia Pro */}
      <BtuCalculatorPro />

      {/* Bento Grid de Serviços & Marcas */}
      <ServicesBento />

      {/* Captura de Leads com Confetti */}
      <LeadCaptureForm />

      {/* Botão Flutuante com Pulso WhatsApp */}
      <FloatingWhatsApp />

      {/* Rodapé Minimalista */}
      <Footer />
    </main>
  );
}
