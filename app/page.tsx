import React from 'react';
import HeroRoom from '@/components/room/HeroRoom';
import FrostCanvas from '@/components/room/FrostCanvas';
import BtuCalculatorPro from '@/components/BtuCalculatorPro';
import {
  Services,
  Method,
  Quote,
  Coverage,
  Footer,
  FloatingCall,
} from '@/components/room/Sections';

export default function HomePage() {
  return (
    <>
      {/* Campo de gelo: fundo fixo da página inteira, reagindo ao scroll */}
      <FrostCanvas />

      {/* A sala: sol das 15h até a noite climatizada, dirigida pelo scroll */}
      <HeroRoom />

      {/* transparente de propósito: é o que deixa o gelo aparecer atrás do conteúdo */}
      <main className="relative z-10">
        <Services />
        <Method />
        <BtuCalculatorPro />
        <Quote />
        <Coverage />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
      <FloatingCall />
    </>
  );
}
