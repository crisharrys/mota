# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primário: morador residencial em São Paulo.** Dono ou inquilino de apartamento/casa que está em uma de três situações:

1. **Comprou ou vai comprar** um split e precisa de instalação sem perder a garantia de fábrica.
2. **O aparelho parou de gelar, está pingando ou cheirando mal** — precisa de manutenção/higienização e quer resolver rápido.
3. **Vai reformar ou mudar** e precisa dimensionar o aparelho certo para o ambiente.

A decisão é rápida, feita quase sempre pelo celular, com frequência em um dia de calor. O critério real não é preço tabelado — é confiança de que o técnico não vai estragar o aparelho nem sumir depois.

**Secundário (não prioritário nesta versão): clientes comerciais** — clínicas, escritórios e lojas que precisam de contrato PMOC e plantão. Existe como capacidade real e deve continuar acessível, mas não disputa o topo da página.

## Product Purpose

Site de captação de serviço técnico local. O sucesso é **uma conversa iniciada no WhatsApp** com contexto suficiente (tipo de serviço, ambiente, urgência) para o Romerio orçar sem ida a campo. Secundariamente, o lead cai num painel administrativo próprio e dispara notificação por e-mail.

Não é e-commerce: não há checkout, carrinho nem preço publicado.

## Positioning

O diferencial é **o método de instalação, não a marca do aparelho**. Qualquer concorrente vende o mesmo split; o que Romerio afirma é como instala:

- **Vácuo profundo com vacuômetro digital** (padrão abaixo de 500 microns), em vez do atalho comum de "purgar abrindo o gás" — que contamina o sistema com umidade e é o que mais mata compressor cedo.
- **Tubulação de cobre**, sem substituição por alumínio.
- Instalação que **preserva a garantia do fabricante**, porque segue o procedimento que a fabricante exige.

É uma posição verificável e específica: fala de procedimento, não de superlativo. Um concorrente que faz o atalho não pode copiar a frase honestamente.

## Operating Context

- Atendimento por **WhatsApp (11) 94732-1510** — canal principal e preferido.
- Horário: **segunda a sábado, 08h às 19h**. Plantão de emergência 24h existe para **empresas e contratos**, não para residencial avulso.
- Cobertura: São Paulo capital (todas as zonas), Grande ABC (Santo André, São Bernardo, São Caetano), Alphaville/Tamboré, Guarulhos e Osasco.
- O visitante muito frequentemente chega **com calor, com pressa e no celular**. Interação por toque é o caso principal, não o secundário.

## Capabilities and Constraints

**Serviços reais oferecidos:**
- Venda de ar-condicionado split (incluindo Inverter)
- Instalação completa
- Higienização química (serpentina, turbina, bandeja de dreno)
- Recarga de gás
- Manutenção preventiva e corretiva
- Contratos PMOC (comercial)

**Stack (existente):** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, nodemailer. Deploy na Vercel.

**Constraints técnicas conhecidas:**
- Persistência atual em arquivos JSON. **Em serverless na Vercel isso é efêmero** — leads e configurações do painel não sobrevivem a cold start. Pendência aberta, não resolvida.
- O painel `/admin` tem senha-mestra hardcoded (`admin123`/`mota2026`) que ignora a senha configurada. Falha de segurança conhecida, pendente.
- Configurações editáveis no painel **não alimentam a home** — telefone e dados de contato estão hardcoded nos componentes.

**Grafia do nome:** **Romerio Mota** (confirmado pelo cliente). Ocorrências de "Romero" no código são erro e devem ser corrigidas.

## Brand Commitments

- Nome comercial: **MOTA Serviços de Ar-Condicionado**.
- Emblema existente: **floco de neve de 6 pontas** em círculo, desenhado em SVG ([components/Logo.tsx](components/Logo.tsx)). É o ativo de identidade e deve ser preservado.
- Paleta incumbente: azuis frios sobre fundo escuro (`#020914`, `#041326`, `#082142`, ciano `#38bdf8`). Tokens em [tailwind.config.ts](tailwind.config.ts).
- Voz: técnica e direta, primeira pessoa do técnico. Fala de procedimento e consequência, não de superlativo publicitário.

## Evidence on Hand

**Confirmado pelo cliente: não há prova externa disponível hoje.** Nenhum depoimento, avaliação, número de clientes atendidos, tempo de mercado, CNPJ ou certificação pode ser afirmado.

Consequência vinculante para todo trabalho futuro:
- **Não inventar** contagem de instalações, anos de experiência, nota de avaliação, selo ou depoimento.
- Afirmações numéricas presentes no site atual que não têm lastro — "mais de 90% dos problemas", "elimina 99,9% de fungos", "até 30% de queda na conta de luz" — **devem sair ou ser reescritas como mecanismo**, não como promessa mensurada.
- O que **pode** ser afirmado é o método próprio (vácuo abaixo de 500 microns, cobre, procedimento que preserva garantia), porque é um compromisso do técnico sobre o próprio trabalho, não uma estatística sobre o mundo.
- Espaços para prova social devem existir na estrutura, prontos para receber conteúdo real depois.

**Imagens:** as 6 imagens em `public/images/` são genéricas/stock, não registros de serviços do Romerio. Não legendar como se fossem trabalho dele.

## Product Principles

1. **O WhatsApp é o produto.** Toda tela é medida pela distância até uma conversa iniciada com contexto. Uma seção que não aproxima disso está decorando.
2. **Método no lugar de superlativo.** Sem prova externa, a única credibilidade honesta disponível é a especificidade técnica sobre o próprio procedimento.
3. **Celular com pressa é o caso principal.** Toque, polegar e uma mão só definem o alvo; mouse e desktop são o refinamento em cima disso.
4. **Nunca afirmar o que não se pode sustentar.** Um número inventado destrói exatamente a confiança que o método constrói.
5. **Residencial ganha o topo.** Comercial/PMOC permanece alcançável, nunca disputando a primeira decisão do visitante.

## Accessibility & Inclusion

O site é fortemente animado (canvas de partículas + Framer Motion em toda a página) e hoje **não trata `prefers-reduced-motion`** — lacuna conhecida. Como a narrativa pretendida é dirigida por scroll e por ponteiro, o respeito a movimento reduzido é requisito, não opcional: o conteúdo e a transição dia→noite precisam permanecer compreensíveis sem movimento contínuo.
