import type { Metadata } from 'next';
import { Archivo, Chivo_Mono } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  weight: ['400', '500', '600', '700', '800'],
});

const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-chivo-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title:
    'MOTA Ar-Condicionado | Romerio Mota — instalação, higienização e manutenção em São Paulo',
  description:
    'Instalação de ar-condicionado com vácuo aferido por vacuômetro digital e tubulação de cobre, mantendo a garantia do fabricante. Venda, higienização química, recarga de gás e manutenção em São Paulo e Grande SP. WhatsApp (11) 94732-1510.',
  keywords: [
    'ar condicionado são paulo',
    'instalação ar condicionado sp',
    'manutenção ar condicionado',
    'higienização ar condicionado',
    'recarga de gás ar condicionado',
    'pmoc são paulo',
    'romerio mota',
    'mota ar condicionado',
  ],
  authors: [{ name: site.owner }],
  creator: site.companyFull,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'MOTA Ar-Condicionado | Romerio Mota',
    description:
      'Instalação com vácuo medido, higienização química e manutenção em São Paulo e região. Fale direto com o técnico.',
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.companyFull,
  },
  robots: { index: true, follow: true },
};

/* Apenas fatos confirmados: nada de nota, contagem de avaliações ou preço. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  name: site.companyFull,
  founder: { '@type': 'Person', name: site.owner },
  telephone: '+5511947321510',
  email: site.email,
  url: site.url,
  areaServed: [
    { '@type': 'City', name: 'São Paulo' },
    { '@type': 'City', name: 'Guarulhos' },
    { '@type': 'City', name: 'Osasco' },
    { '@type': 'City', name: 'Santo André' },
    { '@type': 'City', name: 'São Bernardo do Campo' },
    { '@type': 'City', name: 'São Caetano do Sul' },
    { '@type': 'City', name: 'Barueri' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '08:00',
      closes: '19:00',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${chivoMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
