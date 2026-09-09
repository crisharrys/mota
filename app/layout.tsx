import type { Metadata } from "next";
import "./globals.css";
import FrostCanvas from "@/components/background/FrostCanvas";

export const metadata: Metadata = {
  title: "MOTA Serviços de Ar-Condicionado | Romero Mota - Venda, Instalação e Manutenção em SP",
  description: "Especialista em climatização em São Paulo. Venda de ar-condicionado Inverter, instalação com vacuômetro digital sem perda de garantia, higienização química, recarga de gás e contratos PMOC. WhatsApp: (11) 94732-1510.",
  keywords: [
    "ar condicionado são paulo",
    "instalação ar condicionado sp",
    "manutenção ar condicionado",
    "venda ar condicionado inverter",
    "higienização ar condicionado",
    "pmoc são paulo",
    "romero mota",
    "mota ar condicionado",
    "moema",
    "alphaville",
    "morumbi"
  ],
  authors: [{ name: "Romero Mota" }],
  creator: "Mota Serviços de Ar-Condicionado",
  openGraph: {
    title: "MOTA Serviços de Ar-Condicionado | Romero Mota",
    description: "Venda, instalação especializada e manutenção de ar-condicionado em São Paulo e região. Fale direto com o técnico!",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#020914] text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
        {/* Cold dynamic particle canvas reacting to scroll and idle */}
        <FrostCanvas />
        {children}
      </body>
    </html>
  );
}
