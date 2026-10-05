import { isValidElement } from 'react';

/**
 * Config padrão: o exemplo original (hamburgueria "Fornalha Smash").
 * Tudo que você passar em `config` é mesclado por cima disto,
 * então dá pra trocar só o que precisar.
 */
export const configPadrao = {
  // Texto pequeno acima das etapas
  rotulo: 'Construção ao vivo',
  // Nome no rodapé verde do editor de código
  assinatura: 'Kodra',
  // Quantas "alturas de tela" de rolagem a animação dura (mais = mais lenta)
  duracao: 6.2,

  // Cores e fontes da seção em volta (pensado para fundo escuro)
  tema: {
    fundo: '#0a0e0c',
    texto: '#eef3ef',
    apagado: '#8e9b93',
    destaque: '#42ad73',
    destaque2: '#7fe0aa',
    fonte: '"Outfit Variable", "Outfit", system-ui, -apple-system, "Segoe UI", sans-serif',
    fonteMono: '"JetBrains Mono", ui-monospace, monospace',
  },

  // Sempre 7 etapas, na ordem da animação. Pode trocar só os textos.
  etapas: [
    { titulo: 'Briefing', texto: 'Entendemos o negócio, o público e o objetivo do site.' },
    { titulo: 'Wireframe', texto: 'A estrutura nasce: grade, blocos e a ordem de cada seção.' },
    { titulo: 'Identidade visual', texto: 'Cores, fontes e estilo com a cara da marca.' },
    { titulo: 'Conteúdo', texto: 'Textos que vendem, fotos e cardápio no lugar certo.' },
    { titulo: 'Interações', texto: 'Animações e detalhes que prendem a atenção de quem visita.' },
    { titulo: 'Responsivo', texto: 'O mesmo site, perfeito no celular, onde está a maioria dos clientes.' },
    { titulo: 'No ar', texto: 'Domínio, segurança e velocidade. E os pedidos começam a chegar.' },
  ],

  // Os 4 post-its que voam para dentro da tela (máximo 4)
  briefing: [
    { rotulo: 'Negócio', valor: 'Hamburgueria artesanal' },
    { rotulo: 'Público', valor: '18 a 35 anos, Zona Oeste' },
    { rotulo: 'Objetivo', valor: 'Pedidos pelo WhatsApp' },
    { rotulo: 'Diferencial', valor: 'Smash feito na brasa' },
  ],

  // O site de exemplo que é "construído" dentro da tela
  site: {
    nome: 'Fornalha Smash',
    dominio: 'fornalhasmash.com.br',
    logo: 'FORNALHA',
    icone: 'chama', // 'chama' | null | <svg .../>
    menu: ['Cardápio', 'Unidades', 'Sobre'],
    botaoMenu: 'Pedir agora',
    tag: 'Smash na brasa · São Paulo',
    titulo: 'Smash de',
    tituloDestaque: 'verdade.',
    texto: 'Blend de 90 g prensado na chapa bem quente, cheddar derretendo e pão brioche selado na manteiga.',
    botao: 'Pedir no WhatsApp',
    botaoSecundario: 'Ver cardápio',
    cards: [
      { titulo: 'Smash Clássico', texto: 'pão, carne, cheddar', preco: 'R$ 32' },
      { titulo: 'Duplo Cheddar', texto: '2 carnes, muito queijo', preco: 'R$ 39' },
      { titulo: 'Bacon na Brasa', texto: 'bacon crocante, barbecue', preco: 'R$ 42' },
    ],
    // Imagem ao lado do título:
    //  'burger' (padrão) | 'url-da-imagem.png' | <svg> com partes className="sn-camada"
    arte: 'burger',

    fonteTitulo: 'Anton', // a fonte precisa estar carregada na página
    pesoTitulo: 400,
    tituloMaiusculo: true,
    tamanhoTitulo: 76, // px, no desktop
    destaqueItalico: false,

    cores: {
      fundo: '#141010',
      texto: '#f6e9d7',
      primaria: '#ff6a1a',
      textoNaPrimaria: '#141010',
      acento: '#ffc23d',
      card: '#1f1817',
      linha: 'rgba(255,255,255,0.08)',
    },
    // Bolinhas do card "Identidade visual". null = usa as cores acima
    paleta: ['#141010', '#ff6a1a', '#ffc23d', '#f6e9d7', '#5fb04a'],
  },

  // Só aparece no editor de código (nomes "de mentira" dos componentes)
  editor: {
    secao: 'Cardapio',
    itens: 'lanches',
    arte: 'Burger',
  },

  // Final da animação
  final: {
    publicado: 'Site publicado',
    velocidade: 98,
    rotuloVelocidade: 'velocidade',
    visitante: 'visitante',
    notificacao: {
      app: 'WhatsApp · agora',
      titulo: 'Novo pedido pelo site',
      texto: '2x Smash Clássico + batata',
    },
  },
};

const ehObjeto = (v) =>
  v !== null &&
  typeof v === 'object' &&
  !Array.isArray(v) &&
  !isValidElement(v) &&
  Object.getPrototypeOf(v) === Object.prototype;

function mesclar(base, extra, chave) {
  if (extra === undefined) return base;
  // etapas: mescla item a item (pode mandar só as que mudaram)
  if (chave === 'etapas' && Array.isArray(extra)) {
    return base.map((b, i) => ({ ...b, ...(extra[i] || {}) }));
  }
  if (ehObjeto(base) && ehObjeto(extra)) {
    const out = { ...base };
    for (const k of Object.keys(extra)) out[k] = mesclar(base[k], extra[k], k);
    return out;
  }
  return extra;
}

export function montarConfig(config = {}) {
  const c = mesclar(configPadrao, config);
  c.briefing = (c.briefing || []).slice(0, 4);
  if (!c.site.paleta) {
    const k = c.site.cores;
    c.site.paleta = [k.fundo, k.primaria, k.acento, k.texto];
  }
  return c;
}

/** '#ff6a1a' + 0.5 -> 'rgba(255,106,26,0.5)'. Se não for hex, devolve a cor como está. */
export function comAlpha(cor, a) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(cor).trim());
  if (!m) return cor;
  let h = m[1];
  if (h.length === 3) h = h.replace(/./g, (x) => x + x);
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
