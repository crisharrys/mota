/*
  Gera public/images/sala-depth.png a partir da geometria da foto da sala.

  Por que não usar um render em argila (clay): um clay tem luz e sombra. O
  shader de deslocamento lê cada tom de cinza como distância, então a sombra
  do sol no tapete vira "relevo" e rasga quando a câmera mexe — e o piso
  inteiro sai branco, como se o fundo da sala estivesse tão perto quanto a
  frente.

  Aqui a profundidade vem da perspectiva. Numa foto de interior em um ponto
  de fuga, cada pixel é um raio saindo da câmera que bate primeiro no piso,
  no teto, numa parede lateral ou na parede do fundo. Calibrando pelo
  retângulo da parede do fundo, a distância até cada plano sai direto:

      piso    z = aF / dy      teto    z = aC / -dy
      parede  z = aL / -dx     parede  z = aR / dx     fundo z = 1

  (dx, dy medidos a partir do ponto de fuga; z em unidades da distância até
  a parede do fundo). Os móveis são "levantados" do chão: cada coluna de um
  móvel herda a profundidade do ponto onde ele toca o piso.

  O mapa grava disparidade (1/z), não z: é a disparidade que é proporcional
  à paralaxe, então é ela que faz o fundo quase não se mexer e a frente
  deslizar.

  Uso:  node scripts/gerar-profundidade.mjs
*/

import fs from 'node:fs';
import zlib from 'node:zlib';

const FOTO = 'public/images/sala.jpg';
const SAIDA = 'public/images/sala-depth.png';

/* ---------- tamanho real da foto (lido do marcador SOF do JPEG) ---------- */

function tamanhoJpeg(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const m = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  throw new Error('marcador SOF não encontrado no JPEG');
}

const { w: W, h: H } = tamanhoJpeg(fs.readFileSync(FOTO));

// Toda a calibração abaixo foi medida na foto em 1376x768.
const sx = W / 1376;
const sy = H / 768;

/* ---------- calibração da sala ---------- */

// ponto de fuga: centro da janela, na altura dos olhos
const VP = { x: 676 * sx, y: 350 * sy };

// retângulo da parede do fundo (quina esquerda no pilar, direita na estante)
const FUNDO = { esq: 380 * sx, dir: 915 * sx, topo: 205 * sy, base: 493 * sy };

const aF = FUNDO.base - VP.y;
const aC = VP.y - FUNDO.topo;
const aL = VP.x - FUNDO.esq;
const aR = FUNDO.dir - VP.x;

function zSala(x, y) {
  const dx = x - VP.x;
  const dy = y - VP.y;
  let z = 1;
  if (dy > 0) z = Math.min(z, aF / dy);
  if (dy < 0) z = Math.min(z, aC / -dy);
  if (dx < 0) z = Math.min(z, aL / -dx);
  if (dx > 0) z = Math.min(z, aR / dx);
  return z;
}

const zPiso = (y) => aF / Math.max(0.5, y - VP.y);

/* ---------- objetos ---------- */

const P = (pts) => pts.map(([x, y]) => [x * sx, y * sy]);
const retangulo = (x0, y0, x1, y1) => P([[x0, y0], [x1, y0], [x1, y1], [x0, y1]]);

const Z_LA_FORA = 3.2; // o que se vê pela janela está bem além da parede

/*
  modo:
    'coluna'   cada coluna herda o piso onde o objeto encosta (base da coluna)
    'contato'  profundidade constante, do piso na altura contatoY
    'parede'   segue a parede atrás, só que um pouco mais perto (ressalto)
    'fixo'     profundidade dada
  A ordem importa: quem vem depois fica na frente.
*/
const OBJETOS = [
  { nome: 'janela', modo: 'fixo', z: Z_LA_FORA, poly: retangulo(580, 238, 775, 456) },
  {
    nome: 'sofa',
    modo: 'coluna',
    poly: P([
      [0, 418], [100, 405], [250, 402], [380, 405], [466, 440], [570, 440],
      [612, 456], [612, 542], [430, 546], [425, 592], [215, 662], [150, 662], [0, 652],
    ]),
  },
  {
    nome: 'mesa-de-centro',
    modo: 'contato',
    contatoY: 580 * sy,
    poly: P([
      [543, 505], [575, 496], [700, 493], [770, 497], [793, 505], [785, 518],
      [775, 568], [668, 600], [655, 600], [568, 568], [548, 520],
    ]),
  },
  {
    nome: 'planta-e-vasos-sobre-a-mesa',
    modo: 'contato',
    contatoY: 580 * sy,
    poly: P([[585, 400], [682, 405], [690, 440], [745, 455], [745, 500], [600, 502], [585, 470]]),
  },
  // o split é o personagem da página: ganha um ressalto da parede
  { nome: 'split', modo: 'parede', ressalto: 0.14, poly: retangulo(236, 147, 346, 240) },
  {
    nome: 'rack-flutuante',
    modo: 'parede',
    ressalto: 0.1,
    poly: P([
      [950, 420], [1055, 420], [1060, 458], [1376, 480], [1376, 612],
      [1225, 607], [1225, 560], [1040, 522], [985, 506], [950, 462],
    ]),
  },
];

function dentro(poly, x, y) {
  let d = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) d = !d;
  }
  return d;
}

/* ---------- montagem ---------- */

const z = new Float32Array(W * H);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) z[y * W + x] = zSala(x + 0.5, y + 0.5);
}

for (const obj of OBJETOS) {
  const xs = obj.poly.map((p) => p[0]);
  const ys = obj.poly.map((p) => p[1]);
  const x0 = Math.max(0, Math.floor(Math.min(...xs)));
  const x1 = Math.min(W - 1, Math.ceil(Math.max(...xs)));
  const y0 = Math.max(0, Math.floor(Math.min(...ys)));
  const y1 = Math.min(H - 1, Math.ceil(Math.max(...ys)));

  for (let x = x0; x <= x1; x++) {
    // base do objeto nesta coluna = onde ele encosta no piso
    let base = -1;
    if (obj.modo === 'coluna') {
      for (let y = y1; y >= y0; y--) {
        if (dentro(obj.poly, x + 0.5, y + 0.5)) {
          base = y;
          break;
        }
      }
      if (base < 0) continue;
    }

    for (let y = y0; y <= y1; y++) {
      if (!dentro(obj.poly, x + 0.5, y + 0.5)) continue;
      const i = y * W + x;
      const atras = zSala(x + 0.5, y + 0.5);

      let zo;
      if (obj.modo === 'fixo') zo = obj.z;
      else if (obj.modo === 'coluna') zo = zPiso(base + 0.5);
      else if (obj.modo === 'contato') zo = zPiso(obj.contatoY);
      else zo = atras * (1 - obj.ressalto);

      // nada fica atrás da parede que o sustenta — exceto a vista da janela
      z[i] = obj.modo === 'fixo' ? zo : Math.min(zo, atras);
    }
  }
}

/* ---------- disparidade normalizada ---------- */

const disp = new Float32Array(W * H);
let dMin = Infinity;
let dMax = -Infinity;
for (let i = 0; i < z.length; i++) {
  const d = 1 / z[i];
  disp[i] = d;
  if (d < dMin) dMin = d;
  if (d > dMax) dMax = d;
}

let mapa = new Float32Array(W * H);
for (let i = 0; i < disp.length; i++) mapa[i] = (disp[i] - dMin) / (dMax - dMin);

/*
  Desfoque separável leve: quina dura no mapa vira rasgo na paralaxe, porque
  os dois lados da quina se deslocam por quantidades diferentes. Suavizar a
  transição troca o rasgo por um leve estiramento, que o olho não pega.
*/
function borrar(src, r) {
  const tmp = new Float32Array(src.length);
  const out = new Float32Array(src.length);
  const n = 2 * r + 1;
  for (let y = 0; y < H; y++) {
    let s = 0;
    for (let k = -r; k <= r; k++) s += src[y * W + Math.min(W - 1, Math.max(0, k))];
    for (let x = 0; x < W; x++) {
      tmp[y * W + x] = s / n;
      const sai = y * W + Math.max(0, x - r);
      const entra = y * W + Math.min(W - 1, x + r + 1);
      s += src[entra] - src[sai];
    }
  }
  for (let x = 0; x < W; x++) {
    let s = 0;
    for (let k = -r; k <= r; k++) s += tmp[Math.min(H - 1, Math.max(0, k)) * W + x];
    for (let y = 0; y < H; y++) {
      out[y * W + x] = s / n;
      const sai = Math.max(0, y - r) * W + x;
      const entra = Math.min(H - 1, y + r + 1) * W + x;
      s += tmp[entra] - tmp[sai];
    }
  }
  return out;
}

for (let p = 0; p < 3; p++) mapa = borrar(mapa, Math.max(2, Math.round(4 * sx)));

/* ---------- PNG em tons de cinza, sem dependências ---------- */

const TABELA = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  TABELA[n] = c >>> 0;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = TABELA[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function bloco(tipo, dados) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(dados.length);
  const td = Buffer.concat([Buffer.from(tipo, 'ascii'), dados]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // 8 bits
ihdr[9] = 0; // tons de cinza

const bruto = Buffer.alloc((W + 1) * H);
for (let y = 0; y < H; y++) {
  bruto[y * (W + 1)] = 0;
  for (let x = 0; x < W; x++) {
    const v = Math.round(Math.min(1, Math.max(0, mapa[y * W + x])) * 255);
    bruto[y * (W + 1) + 1 + x] = v;
  }
}

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  bloco('IHDR', ihdr),
  bloco('IDAT', zlib.deflateSync(bruto, { level: 9 })),
  bloco('IEND', Buffer.alloc(0)),
]);

fs.writeFileSync(SAIDA, png);

// resumo para conferência
const amostra = (x, y) =>
  Math.round(mapa[Math.round(y * sy) * W + Math.round(x * sx)] * 100) / 100;
console.log(`${SAIDA}  ${W}x${H}  ${(png.length / 1024).toFixed(0)} KB`);
console.log('amostras (0 = longe, 1 = perto):');
console.log('  vista da janela   ', amostra(677, 300));
console.log('  parede do fundo   ', amostra(500, 300));
console.log('  piso lá no fundo  ', amostra(676, 505));
console.log('  piso no meio      ', amostra(676, 640));
console.log('  piso no pé da cena', amostra(676, 760));
console.log('  sofá (frente)     ', amostra(300, 600));
console.log('  mesa de centro    ', amostra(660, 520));
console.log('  split             ', amostra(290, 190));
console.log('  teto no topo      ', amostra(676, 5));
