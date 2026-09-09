/**
 * Fonte única de verdade do conteúdo público do site.
 * Antes disso, telefone e WhatsApp estavam repetidos em 14 componentes.
 */

export const site = {
  company: 'MOTA',
  companyFull: 'MOTA Serviços de Ar-Condicionado',
  owner: 'Romerio Mota',
  phoneLabel: '(11) 94732-1510',
  whatsapp: '5511947321510',
  email: 'romerio.mota@gmail.com',
  city: 'São Paulo',
  state: 'SP',
  hours: 'Segunda a sábado, 08h às 19h',
  emergency: 'Plantão 24h para empresas e contratos',
  url: 'https://mota-ar-condicionado.vercel.app',
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Bancos da máquina: cada banco é um serviço real oferecido. */
export interface Bank {
  id: string;
  letter: string;
  name: string;
  legend: string;
  detail: string;
}

export const banks: Bank[] = [
  {
    id: 'instalacao',
    letter: 'A',
    name: 'Instalação',
    legend: 'SPLIT / INVERTER',
    detail:
      'Instalação completa do split, da furação à carga. Vácuo aferido com vacuômetro digital e tubulação de cobre — o procedimento que a fabricante exige para a garantia continuar valendo.',
  },
  {
    id: 'higienizacao',
    letter: 'B',
    name: 'Higienização',
    legend: 'QUÍMICA COMPLETA',
    detail:
      'Limpeza química da serpentina, da turbina e da bandeja de dreno com produto bactericida registrado. É o serviço que resolve mau cheiro, pingamento e queda de rendimento.',
  },
  {
    id: 'gas',
    letter: 'C',
    name: 'Recarga de gás',
    legend: 'R-410A / R-32',
    detail:
      'Localização do vazamento antes de qualquer recarga. Repor gás sem achar a fuga é jogar dinheiro fora — o sistema esvazia de novo.',
  },
  {
    id: 'manutencao',
    letter: 'D',
    name: 'Manutenção',
    legend: 'PREVENTIVA / CORRETIVA',
    detail:
      'Diagnóstico do que está acontecendo com o aparelho, com medição de pressão e de temperatura, antes de trocar qualquer peça.',
  },
  {
    id: 'pmoc',
    letter: 'E',
    name: 'PMOC',
    legend: 'CONTRATO COMERCIAL',
    detail:
      'Plano de manutenção, operação e controle para clínicas, escritórios e lojas, com registro das visitas. Inclui plantão para contrato.',
  },
  {
    id: 'venda',
    letter: 'F',
    name: 'Venda',
    legend: 'APARELHO + INSTALAÇÃO',
    detail:
      'Indicação e venda do aparelho já dimensionado para o ambiente, entregue instalado. Sem empurrar capacidade maior do que o cômodo pede.',
  },
];

/** As quatro pranchas do método. A ordem carrega informação: é a sequência real do serviço. */
export interface Plate {
  n: string;
  title: string;
  spec: string;
  body: string;
}

export const plates: Plate[] = [
  {
    n: '01',
    title: 'Vácuo',
    spec: '< 500 mícrons',
    body:
      'Bomba de duplo estágio e vacuômetro digital aferindo o vácuo real antes de abrir o gás. O atalho comum é "purgar" liberando refrigerante: isso deixa umidade e ar dentro do sistema, e é o que mata compressor cedo.',
  },
  {
    n: '02',
    title: 'Cobre',
    spec: 'tubo de cobre',
    body:
      'Tubulação de cobre com isolamento contínuo, sem substituição por alumínio. Solda com nitrogênio passando por dentro da linha para não formar carepa no interior do tubo.',
  },
  {
    n: '03',
    title: 'Estanqueidade',
    spec: 'antes da carga',
    body:
      'Pressurização e verificação de vazamento em cada conexão antes de liberar a carga de refrigerante. Achar a fuga aqui custa minutos; achar depois custa uma recarga inteira.',
  },
  {
    n: '04',
    title: 'Entrega',
    spec: 'ΔT medido',
    body:
      'Medição da temperatura de insuflamento e do diferencial em operação, com o aparelho rodando. Você recebe o número, não só a promessa de que "está gelando".',
  },
];

export const coverage: string[] = [
  'São Paulo — Capital',
  'Zona Sul — Moema, Morumbi, Vila Mariana, Brooklin, Itaim Bibi',
  'Zona Oeste — Pinheiros, Perdizes, Lapa, Butantã, Vila Leopoldina',
  'Zona Leste — Tatuapé, Anália Franco, Mooca',
  'Zona Norte — Santana, Tucuruvi, Casa Verde',
  'Centro Expandido',
  'Alphaville e Tamboré',
  'Grande ABC — Santo André, São Bernardo, São Caetano',
  'Guarulhos e Osasco',
];

/**
 * As 16 horas da fileira: do pico de calor às 12h até as 03h da madrugada.
 * Os quatro grupos de quatro são as quatro fases térmicas — o quarteamento
 * da máquina de ritmo, traduzido para a rampa de temperatura.
 */
export const STEPS = 16;

export interface StepInfo {
  hour: number;
  label: string;
  temp: number;
}

export const steps: StepInfo[] = Array.from({ length: STEPS }, (_, i) => {
  const hour = (12 + i) % 24;
  // Curva de temperatura externa de um dia quente em São Paulo.
  const temps = [34, 35, 35, 34, 32, 30, 28, 26, 25, 24, 23, 22, 22, 21, 21, 20];
  return {
    hour,
    label: `${String(hour).padStart(2, '0')}h`,
    temp: temps[i],
  };
});

export const phases = [
  {
    from: 0,
    to: 3,
    name: 'Sol pleno',
    tone: 'hot',
    note: 'Sol batendo direto na janela e o aparelho puxando o máximo. É neste regime que uma instalação malfeita começa a cobrar a conta.',
  },
  {
    from: 4,
    to: 7,
    name: 'Entardecer',
    tone: 'warm',
    note: 'O sol foi embora, mas a laje continua devolvendo o calor que guardou o dia inteiro. O compressor ainda não descansou.',
  },
  {
    from: 8,
    to: 11,
    name: 'Climatizado',
    tone: 'cool',
    note: 'O ar assumiu e o ambiente estabilizou. Um sistema com o vácuo bem feito chega até aqui sem forçar nada.',
  },
  {
    from: 12,
    to: 15,
    name: 'Noite',
    tone: 'cold',
    note: 'Madrugada, carga térmica baixa, compressor em rotação mínima. É o regime em que o inverter gasta menos — se a instalação deixar.',
  },
] as const;

export function phaseOf(step: number) {
  return phases.find((p) => step >= p.from && step <= p.to) ?? phases[0];
}
