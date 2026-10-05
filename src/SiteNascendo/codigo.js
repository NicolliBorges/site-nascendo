// Gera os "arquivos" que aparecem sendo digitados no editor, a partir da config.
// Um arquivo por etapa (7 no total), na mesma ordem das etapas.

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const tag = (cls) => (s) => `<span class="sn-${cls}">${esc(s)}</span>`;
const K = tag('k'); // palavra-chave
const F = tag('f'); // função
const T = tag('t'); // tag / seletor
const A = tag('a'); // atributo / propriedade
const S = tag('s'); // string
const V = tag('v'); // valor
const C = tag('c'); // comentário
const G = tag('g'); // ok verde

/** Quantos caracteres aparecem na tela (ignora as tags de cor). */
export const tamanhoVisivel = (html) =>
  html.replace(/<[^>]+>/g, '').replace(/&(lt|gt|amp|quot|#39);/g, 'x').length;

const slug = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const primeirasPalavras = (s, n) => {
  const p = String(s).split(/\s+/);
  return p.slice(0, n).join(' ') + (p.length > n ? '…' : '');
};

export function gerarArquivos(c) {
  const s = c.site;
  const e = c.editor;

  const larg = Math.max(...c.briefing.map((b) => b.rotulo.length + 1), 8);
  const briefing = [
    C(`# ${s.nome}`),
    '',
    ...c.briefing.map(
      (b) => `${K(`${b.rotulo.toLowerCase()}:`)}${' '.repeat(larg - b.rotulo.length)}${esc(b.valor.toLowerCase())}`,
    ),
  ];

  const home = [
    `${K('export default function')} ${F('Home')}() {`,
    `  ${K('return')} (`,
    `    ${T('<Layout>')}`,
    `      ${T('<Header />')}`,
    `      ${T('<Hero />')}`,
    `      ${T(`<${e.secao} />`)}`,
    `    ${T('</Layout>')}`,
    `  );`,
    `}`,
  ];

  const fonte = String(s.fonteTitulo).split(',')[0].replace(/["']/g, '').trim();
  const tema = [
    `${T(':root')} {`,
    `  ${A('--fundo')}: ${S(s.cores.fundo)};`,
    `  ${A('--primaria')}: ${S(s.cores.primaria)};`,
    `  ${A('--acento')}: ${S(s.cores.acento)};`,
    `  ${A('--titulo')}: ${S(`"${fonte}"`)};`,
    `}`,
  ];

  const hero = [
    `${T('<h1>')}${esc(s.titulo)} ${T('<em>')}${esc(s.tituloDestaque)}${T('</em>')}`,
    `${T('<p>')}${esc(primeirasPalavras(s.texto, 4))}${T('</p>')}`,
    `${T(`<${e.arte}`)} ${T('/>')}`,
    `${T(`<${e.secao}`)} ${A('itens')}={${V(e.itens)}} ${T('/>')}`,
  ];

  const anim = [
    `${V('botao')}.${F('onclick')} = () => {`,
    `  ${F('faiscas')}(${V('botao')});`,
    `  ${F('abrirWhatsApp')}(${V('pedido')});`,
    `};`,
    `${F('gsap')}.${F('from')}(${S('".card"')}, { ${A('y')}: ${V('20')} });`,
  ];
  anim[0] = anim[0].replace('=>', '=&gt;'); // escapa a seta solta

  const estilos = [
    `${K('@media')} (${A('max-width')}: ${V('560px')}) {`,
    `  ${T('.hero')} { ${A('flex-direction')}: ${S('column')}; }`,
    `  ${T('.cards')} { ${A('display')}: ${S('block')}; }`,
    `  ${T('.cta')} { ${A('width')}: ${V('100%')}; }`,
    `}`,
  ];

  const terminal = [
    `${C('$')} npm run build`,
    `${G('✓')} build concluído em 0,8 s`,
    `${C('$')} deploy --prod`,
    `${G('✓')} HTTPS ativo`,
    `${G('✓')} no ar: ${S(s.dominio)}`,
  ];

  const arquivos = [
    { aba: 'briefing.md', linhas: briefing },
    { aba: `Home.jsx`, linhas: home },
    { aba: 'theme.css', linhas: tema },
    { aba: 'Hero.jsx', linhas: hero },
    { aba: 'animacoes.js', linhas: anim },
    { aba: 'styles.css', linhas: estilos },
    { aba: 'terminal', terminal: true, linhas: terminal },
  ];

  // Lista do "explorador" (i = índice do arquivo acima)
  const explorador = [
    { nome: 'briefing.md', i: 0 },
    { nome: 'src', pasta: true },
    { nome: 'Home.jsx', i: 1, dentro: true },
    { nome: 'Hero.jsx', i: 3, dentro: true },
    { nome: 'animacoes.js', i: 4, dentro: true },
    { nome: 'styles', pasta: true },
    { nome: 'theme.css', i: 2, dentro: true },
    { nome: 'styles.css', i: 5, dentro: true },
    { nome: 'package.json' },
  ];

  return { projeto: slug(s.nome) || 'novo-site', arquivos, explorador };
}
