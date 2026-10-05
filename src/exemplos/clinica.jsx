// Exemplo 2: outro nicho, outras cores, outra fonte e uma arte própria.
// Use este arquivo como modelo para criar o seu.

// Arte própria: cada <g className="sn-camada"> cai separado, de baixo para cima.
const Serum = (
  <svg viewBox="0 0 320 270" aria-hidden="true">
    <g className="sn-camada">
      <ellipse cx="160" cy="252" rx="92" ry="10" fill="rgba(43,34,32,.14)" />
    </g>
    <g className="sn-camada">
      <path d="M104 108 Q104 96 116 96 L204 96 Q216 96 216 108 L216 236 Q216 250 202 250 L118 250 Q104 250 104 236 Z" fill="#e8c9c0" />
      <path d="M114 112 L114 232" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".55" />
    </g>
    <g className="sn-camada">
      <path d="M104 160 L216 160 L216 236 Q216 250 202 250 L118 250 Q104 250 104 236 Z" fill="#b4637a" opacity=".85" />
    </g>
    <g className="sn-camada">
      <rect x="124" y="176" width="72" height="46" rx="8" fill="#fbf6f2" />
      <path d="M136 192 h48 M142 206 h36" stroke="#b4637a" strokeWidth="4" strokeLinecap="round" />
    </g>
    <g className="sn-camada">
      <rect x="132" y="70" width="56" height="28" rx="6" fill="#9a7b4f" />
    </g>
    <g className="sn-camada">
      <path d="M146 72 Q146 22 160 22 Q174 22 174 72 Z" fill="#2b2220" />
      <path d="M232 110 Q262 80 286 92 Q268 128 232 110 Z" fill="#8fb39a" />
      <path d="M58 150 Q40 116 62 96 Q84 124 58 150 Z" fill="#8fb39a" />
    </g>
  </svg>
);

const Folha = (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15zm0 0 8-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export default {
  assinatura: 'Seu Estúdio',
  duracao: 6.2,

  tema: {
    fundo: '#0d0b10',
    texto: '#f3eef7',
    apagado: '#9a93a3',
    destaque: '#c084fc',
    destaque2: '#e9d5ff',
  },

  // Dá pra trocar só algumas etapas (as outras ficam com o texto padrão)
  etapas: [
    {},
    {},
    {},
    { texto: 'Textos que vendem, fotos e tratamentos no lugar certo.' },
    {},
    { texto: 'O mesmo site, perfeito no celular, onde suas clientes estão.' },
    { texto: 'Domínio, segurança e velocidade. E os agendamentos começam a chegar.' },
  ],

  briefing: [
    { rotulo: 'Negócio', valor: 'Clínica de estética' },
    { rotulo: 'Público', valor: 'Mulheres de 28 a 50 anos' },
    { rotulo: 'Objetivo', valor: 'Agendar avaliações' },
    { rotulo: 'Diferencial', valor: 'Protocolos sob medida' },
  ],

  site: {
    nome: 'Lumna Estética',
    dominio: 'lumnaestetica.com.br',
    logo: 'Lumna',
    icone: Folha,
    menu: ['Tratamentos', 'Equipe', 'Contato'],
    botaoMenu: 'Agendar',
    tag: 'Estética avançada · Moema',
    titulo: 'Sua pele,',
    tituloDestaque: 'renovada.',
    texto: 'Protocolos personalizados, tecnologia de ponta e uma equipe que acompanha cada etapa do seu tratamento.',
    botao: 'Agendar avaliação',
    botaoSecundario: 'Ver tratamentos',
    cards: [
      { titulo: 'Limpeza de pele', texto: 'profunda, 60 min', preco: 'R$ 180' },
      { titulo: 'Peeling', texto: 'renovação celular', preco: 'R$ 260' },
      { titulo: 'Bioestimulador', texto: 'avaliação inclusa', preco: 'R$ 890' },
    ],
    arte: Serum,

    fonteTitulo: 'Fraunces',
    pesoTitulo: 600,
    tituloMaiusculo: false,
    tamanhoTitulo: 66,
    destaqueItalico: true,

    cores: {
      fundo: '#f7f1ec',
      texto: '#2b2220',
      primaria: '#b4637a',
      textoNaPrimaria: '#ffffff',
      acento: '#9a7b4f',
      card: '#ffffff',
      linha: 'rgba(43,34,32,0.10)',
    },
    paleta: null, // usa as cores acima
  },

  editor: {
    secao: 'Tratamentos',
    itens: 'servicos',
    arte: 'Serum',
  },

  final: {
    publicado: 'Site publicado',
    velocidade: 97,
    notificacao: {
      app: 'WhatsApp · agora',
      titulo: 'Nova avaliação agendada',
      texto: 'Limpeza de pele · sábado, 10h',
    },
  },
};
