import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { montarConfig, comAlpha } from './config.js';
import { gerarArquivos } from './codigo.js';
import Editor from './Editor.jsx';
import { Wireframe, SiteReal } from './MiniSite.jsx';
import './SiteNascendo.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Momento (em "segundos" da timeline) em que cada uma das 7 etapas começa.
// A rolagem controla o tempo: rolar = avançar, voltar = rebobinar.
const TEMPOS = [0, 1.4, 3, 4.8, 6.8, 9, 11];
const FIM = 12.4;

const DESK = { w: 1000, h: 640, r: 14 }; // tela "notebook"
const CEL = { w: 390, h: 790, r: 46 }; // tela "celular"
const CIRC = 2 * Math.PI * 42; // perímetro do medidor de velocidade

// Posição/tamanho do aparelho dentro da área, no desktop e no celular
const LAYOUT = {
  desk: { x: 0.68, y0: 0.6, y1: 0.5, fw: 0.6, fh: 0.52, pw: 0.6, ph: 0.9 },
  mob: { x: 0.5, y0: 0.37, y1: 0.36, fw: 0.94, fh: 0.56, pw: 0.94, ph: 0.66 },
};

export default function SiteNascendo({ config, id = 'construcao', className = '' }) {
  const c = useMemo(() => montarConfig(config), [config]);
  const editor = useMemo(() => gerarArquivos(c), [c]);
  const raiz = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ mob: '(max-width: 900px)', desk: '(min-width: 901px)' }, (ctx) => {
        const L = ctx.conditions.mob ? LAYOUT.mob : LAYOUT.desk;
        const q = gsap.utils.selector(raiz);
        const um = (s) => q(s)[0];

        const device = um('.sn-device');
        const area = um('.sn-device-area');
        const flutuantes = um('.sn-float');
        const viewport = um('.sn-viewport');
        const urlTexto = um('.sn-url-text');
        const wNum = um('.sn-w-num');
        const gNum = um('.sn-g-num');
        const gArco = um('.sn-g-arc');
        const linhaEtapas = um('.sn-steps-fill');
        const chip = um('.sn-width-chip');
        const etapas = q('.sn-step');
        const barras = q('.sn-steps-bar i');
        const paineis = q('.sn-ed-pane');
        const abas = q('.sn-ed-tab');
        const arquivos = q('.sn-ed-file');

        const { site, final } = c;
        const primaria = site.cores.primaria;

        // Valores "virtuais" que o GSAP anima e a gente aplica no DOM
        const v = { morph: 0, fly: 0, pfly: 0, url: 0, gauge: 0, fitD: 1, fitP: 1 };
        const lerp = (a, b, t) => a + (b - a) * t;

        const aplicarMorph = () => {
          const m = v.morph;
          gsap.set(device, {
            left: `${L.x * 100}%`,
            top: `${lerp(L.y0, L.y1, m) * 100}%`,
            width: lerp(DESK.w, CEL.w, m),
            height: lerp(DESK.h, CEL.h, m),
            borderRadius: lerp(DESK.r, CEL.r, m),
            scale: lerp(v.fitD, v.fitP, m),
            '--m': m,
          });
          wNum.textContent = Math.round(lerp(1440, 390, m));
        };
        const aplicarVoo = () => {
          q('.sn-note').forEach((n) => n.style.setProperty('--fly', v.fly));
          um('.sn-palette').style.setProperty('--fly', v.pfly);
        };
        const aplicarUrl = () => {
          const n = Math.round(v.url * site.dominio.length);
          urlTexto.textContent = n === 0 ? 'Novo projeto' : site.dominio.slice(0, n);
          urlTexto.classList.toggle('digitado', n > 0);
        };
        const aplicarGauge = () => {
          const val = v.gauge * final.velocidade;
          gNum.textContent = Math.round(val);
          gArco.style.strokeDashoffset = CIRC * (1 - val / 100);
        };
        // Mede a área e calcula a escala do aparelho + para onde os post-its voam
        const medir = () => {
          const r = area.getBoundingClientRect();
          v.fitD = Math.min((r.width * L.fw) / DESK.w, (r.height * L.fh) / DESK.h);
          v.fitP = Math.min((r.width * L.pw) / CEL.w, (r.height * L.ph) / CEL.h);
          const cx = flutuantes.clientWidth * L.x;
          const cy = flutuantes.clientHeight * L.y0;
          q('.sn-note, .sn-palette').forEach((el) => {
            el.style.setProperty('--dx', `${cx - (el.offsetLeft + el.offsetWidth / 2)}px`);
            el.style.setProperty('--dy', `${cy - (el.offsetTop + el.offsetHeight / 2)}px`);
          });
          chip.style.left = `${L.x * 100}%`;
          aplicarMorph();
          aplicarVoo();
        };

        gsap.set(device, { xPercent: -50, yPercent: -50 });
        medir();

        // posição de um elemento dentro da "tela" do aparelho
        const pos = (el) => {
          let x = 0;
          let y = 0;
          let r = el;
          while (r && r !== viewport) {
            x += r.offsetLeft;
            y += r.offsetTop;
            r = r.offsetParent;
          }
          return { x, y, w: el.offsetWidth, h: el.offsetHeight };
        };
        const cta = um('.sn-site-real .sn-cta');
        const cards = q('.sn-site-real .sn-card');
        const card = cards[1] || cards[0];
        const pCta = pos(cta);
        const pCard = card ? pos(card) : pCta;

        const camadas = q('.sn-site-real .sn-camada');
        const arte = camadas.length ? camadas : q('.sn-site-real .sn-art');

        // Estado inicial
        gsap.set(q('.sn-note-in'), { opacity: 0, scale: 0.6, y: 30 });
        gsap.set(q('.sn-palette-in'), { opacity: 0, x: 60 });
        gsap.set(q('.sn-grid-ov i'), { scaleY: 0, transformOrigin: '50% 0%' });
        gsap.set(q('.sn-site-wf .sn-wf-b'), { scaleX: 0, transformOrigin: '0% 50%' });
        gsap.set(q('.sn-site-real'), { opacity: 0 });
        gsap.set(q('.sn-site-real .sn-s-tag, .sn-site-real .sn-s-h1, .sn-site-real .sn-s-p, .sn-site-real .sn-s-ctas, .sn-site-real .sn-card'), {
          opacity: 0,
          y: 22,
        });
        gsap.set(arte, { opacity: 0, y: -230 });
        gsap.set(q('.sn-site-real .sn-s-glow'), { scale: 0, opacity: 0 });
        gsap.set(q('.sn-cursor'), { opacity: 0, x: 900, y: 560 });
        gsap.set(q('.sn-spark'), { x: pCta.x + pCta.w / 2, y: pCta.y + pCta.h / 2 });
        gsap.set(q('.sn-spark i'), { scaleX: 0, opacity: 0 });
        gsap.set(q('.sn-toast'), { opacity: 0, y: 24, xPercent: -50 });
        gsap.set(q('.sn-notif'), { opacity: 0, y: -110 });
        gsap.set(q('.sn-lock'), { opacity: 0, scale: 0.4 });
        gsap.set(chip, { opacity: 0, y: 10, xPercent: -50 });
        gsap.set(q('.sn-gauge'), { opacity: 0, y: 20 });
        gsap.set(q('.sn-ln-code'), { '--n': 0 });
        gsap.set(q('.sn-ed-body'), { y: 0 });
        gsap.set(q('.sn-editor'), { opacity: 0, y: 30 });
        aplicarUrl();
        aplicarGauge();

        // Marca a etapa atual (lista, barrinhas, aba e arquivo do editor)
        const marcarEtapa = (t) => {
          let atual = 0;
          TEMPOS.forEach((ini, i) => {
            if (t >= ini - 0.05) atual = i;
          });
          etapas.forEach((e, i) => e.classList.toggle('on', i === atual));
          barras.forEach((e, i) => e.classList.toggle('on', i <= atual));
          paineis.forEach((e, i) => e.classList.toggle('on', i === atual));
          abas.forEach((e, i) => {
            e.classList.toggle('open', i <= atual);
            e.classList.toggle('on', i === atual);
          });
          arquivos.forEach((e) => e.classList.toggle('on', e.dataset.i !== '' && +e.dataset.i === atual));
        };

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: raiz.current,
            start: 'top top',
            end: () => '+=' + Math.round(window.innerHeight * c.duracao),
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          },
        });

        let ultimo = -1;
        const aCadaFrame = () => {
          const t = tl.time();
          if (t === ultimo) return;
          ultimo = t;
          marcarEtapa(t);
          if (linhaEtapas) linhaEtapas.style.transform = `scaleY(${tl.progress()})`;
        };
        gsap.ticker.add(aCadaFrame);

        tl.to(q('.sn-editor'), { opacity: 1, y: 0, duration: 0.4 }, 0);

        // ── Editor: cada linha é "digitada" revelando N caracteres (CSS --n) ──
        const corpo0 = um('.sn-ed-body');
        const alturaLinha = parseFloat(getComputedStyle(corpo0).lineHeight) || 20;
        let linhasVisiveis;
        if (ctx.conditions.mob) {
          linhasVisiveis = Math.max(3, Math.floor((paineis[0].clientHeight - 8) / alturaLinha));
        } else {
          const r = area.getBoundingClientRect();
          const topo = corpo0.getBoundingClientRect().top - r.top + 10;
          const limite = r.height * L.y0 - (DESK.h * v.fitD) / 2;
          linhasVisiveis = Math.max(4, Math.floor((limite - topo) / alturaLinha));
        }

        paineis.forEach((painel, idx) => {
          const ini = TEMPOS[idx];
          const prox = TEMPOS[idx + 1] ?? FIM;
          const inicio = ini + 0.15;
          const tempo = Math.max(0.6, prox - ini - 0.4);
          const corpo = painel.querySelector('.sn-ed-body');
          const cursor = painel.querySelector('.sn-ed-caret');
          const linhas = [...painel.querySelectorAll('.sn-ln-code')];
          const tamanhos = linhas.map((l) => +l.dataset.len);
          const total = tamanhos.reduce((s, n) => s + Math.max(n, 4), 0);
          let t = inicio;
          linhas.forEach((linha, i) => {
            const d = (tempo * Math.max(tamanhos[i], 4)) / total;
            if (i >= linhasVisiveis) {
              tl.to(corpo, { y: -(i - linhasVisiveis + 1) * alturaLinha, duration: Math.min(0.15, d), ease: 'power1.out' }, t);
            }
            tl.to(
              linha,
              {
                '--n': tamanhos[i],
                duration: d,
                ease: 'none',
                onUpdate: () => {
                  cursor.style.setProperty('--cl', i);
                  cursor.style.setProperty('--cn', Math.round(gsap.getProperty(linha, '--n')));
                },
              },
              t,
            );
            t += d;
          });
        });

        // ── 1. Briefing → 2. Wireframe ──
        tl.to(q('.sn-note-in'), { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15 }, 0)
          .to(v, { fly: 1, duration: 0.9, ease: 'power2.in', onUpdate: aplicarVoo }, 1.4)
          .to(q('.sn-note-in'), { opacity: 0, scale: 0.3, duration: 0.5, ease: 'power2.in' }, 1.85)
          .to(q('.sn-grid-ov i'), { scaleY: 1, duration: 0.7, stagger: 0.03, ease: 'power2.out' }, 1.9)
          .to(q('.sn-site-wf .sn-wf-b'), { scaleX: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out' }, 2.1);

        // ── 3. Identidade visual → 4. Conteúdo ──
        tl.to(q('.sn-palette-in'), { opacity: 1, x: 0, duration: 0.6 }, 3)
          .to(v, { pfly: 1, duration: 0.7, ease: 'power2.in', onUpdate: aplicarVoo }, 3.6)
          .to(q('.sn-palette-in'), { opacity: 0, scale: 0.3, duration: 0.4, ease: 'power2.in' }, 3.95)
          .to(q('.sn-site-real'), { opacity: 1, duration: 0.6, ease: 'power1.out' }, 4)
          .to(q('.sn-site-wf'), { opacity: 0, duration: 0.5 }, 4.1)
          .to(q('.sn-grid-ov'), { opacity: 0, duration: 0.5 }, 4.2)
          .to(q('.sn-site-real .sn-s-tag, .sn-site-real .sn-s-h1, .sn-site-real .sn-s-ctas'), { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 4.3)
          .to(q('.sn-site-real .sn-s-glow'), { scale: 1, opacity: 1, duration: 0.8 }, 4.4)
          .to(q('.sn-site-real .sn-s-p'), { opacity: 1, y: 0, duration: 0.5 }, 4.8)
          .to(arte, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'back.out(1.6)' }, 4.9);
        if (cards.length) tl.to(cards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, 5.7);

        // ── 5. Interações: cursor clica no botão e passa pelo card ──
        tl.to(q('.sn-cursor'), { opacity: 1, x: pCta.x + pCta.w * 0.62, y: pCta.y + pCta.h * 0.6, duration: 0.8, ease: 'power2.inOut' }, 6.8)
          .to(cta, { scale: 1.07, boxShadow: `0 0 0 7px ${comAlpha(primaria, 0.22)}, 0 12px 34px ${comAlpha(primaria, 0.55)}`, duration: 0.3 }, 7.5)
          .to(q('.sn-cursor'), { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 }, 7.65)
          .fromTo(q('.sn-spark i'), { scaleX: 0, opacity: 1 }, { scaleX: 1, opacity: 0, duration: 0.5, ease: 'power2.out' }, 7.7)
          .to(cta, { scale: 1, boxShadow: `0 0 0 0 ${comAlpha(primaria, 0)}, 0 0 0 ${comAlpha(primaria, 0)}`, duration: 0.3 }, 8)
          .to(q('.sn-cursor'), { x: pCard.x + pCard.w * 0.55, y: pCard.y + pCard.h * 0.55, duration: 0.5, ease: 'power2.inOut' }, 7.95);
        if (card) {
          tl.to(card, { y: -10, borderColor: primaria, boxShadow: '0 18px 40px rgba(0,0,0,.5)', duration: 0.3 }, 8.3).to(
            card,
            { y: 0, borderColor: site.cores.linha, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.3 },
            8.7,
          );
        }
        tl.to(q('.sn-cursor'), { opacity: 0, duration: 0.3 }, 8.7);

        // ── 6. Responsivo: notebook vira celular ──
        tl.to(chip, { opacity: 1, y: 0, duration: 0.3 }, 9)
          .to(v, { morph: 1, duration: 1.6, ease: 'power2.inOut', onUpdate: aplicarMorph }, 9)
          .to(chip, { opacity: 0, duration: 0.3 }, 10.7);

        // ── 7. No ar: URL digitada, cadeado, velocidade e notificação ──
        tl.to(v, { url: 1, duration: 0.9, ease: 'none', onUpdate: aplicarUrl }, 11)
          .to(q('.sn-lock'), { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 11.9)
          .to(q('.sn-toast'), { opacity: 1, y: 0, duration: 0.4 }, 12)
          .to(q('.sn-gauge'), { opacity: 1, y: 0, duration: 0.4 }, 12.1)
          .to(v, { gauge: 1, duration: 0.9, ease: 'power2.out', onUpdate: aplicarGauge }, 12.2)
          .to(q('.sn-notif'), { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }, 12.4)
          .to(q('.sn-toast'), { opacity: 0, y: 12, duration: 0.3 }, 12.95)
          .to({}, { duration: 0.6 }, FIM);

        marcarEtapa(0);
        ScrollTrigger.addEventListener('refresh', medir);
        return () => {
          gsap.ticker.remove(aCadaFrame);
          ScrollTrigger.removeEventListener('refresh', medir);
        };
      });
    },
    { scope: raiz, dependencies: [c], revertOnUpdate: true },
  );

  const t = c.tema;
  const estiloTema = {
    '--sn-bg': t.fundo,
    '--sn-text': t.texto,
    '--sn-muted': t.apagado,
    '--sn-accent': t.destaque,
    '--sn-accent2': t.destaque2,
    '--sn-font': t.fonte,
    '--sn-mono': t.fonteMono,
    '--sn-spark': c.site.cores.acento,
    '--sn-aa': c.site.cores.primaria,
  };
  const fonteNome = String(c.site.fonteTitulo).split(',')[0].replace(/["']/g, '').trim();
  const notif = c.final.notificacao;

  return (
    <section className={`sn ${className}`} id={id} ref={raiz} style={estiloTema}>
      <div className="sn-stage">
        {/* Coluna das etapas */}
        <div className="sn-steps-col">
          <span className="sn-eyebrow">{c.rotulo}</span>
          <ol className="sn-steps">
            <span className="sn-steps-line" aria-hidden="true">
              <span className="sn-steps-fill" />
            </span>
            {c.etapas.map((e, i) => (
              <li key={i} className="sn-step">
                <span className="sn-step-n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <b>{e.titulo}</b>
                  <p>{e.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="sn-steps-bar" aria-hidden="true">
            {c.etapas.map((_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>

        {/* Área do aparelho */}
        <div className="sn-device-area">
          <Editor {...editor} assinatura={c.assinatura} />

          <div className="sn-device">
            <div className="sn-chrome">
              <span className="sn-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="sn-url">
                <svg className="sn-lock" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                  <path d="M7 10V7a5 5 0 0 1 10 0v3h1v11H6V10h1zm2 0h6V7a3 3 0 0 0-6 0v3z" fill="currentColor" />
                </svg>
                <span className="sn-url-text">Novo projeto</span>
                <i className="sn-caret" />
              </span>
              <span className="sn-chrome-sp" />
            </div>
            <span className="sn-notch" aria-hidden="true" />

            <div className="sn-viewport">
              <div className="sn-grid-ov" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
              <Wireframe nCards={c.site.cards.length || 1} />
              <SiteReal site={c.site} />

              <div className="sn-spark" aria-hidden="true">
                {Array.from({ length: 8 }, (_, i) => (
                  <i key={i} style={{ transform: `rotate(${i * 45}deg)` }} />
                ))}
              </div>

              <div className="sn-cursor" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="30" height="30">
                  <path d="M4 2l16 10-7 1.5 4 8-3 1.5-4-8L4 20z" fill="#fff" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
                <span>{c.final.visitante}</span>
              </div>

              <div className="sn-toast">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <circle cx="12" cy="12" r="11" fill="currentColor" />
                  <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c.final.publicado}
              </div>

              <div className="sn-notif">
                <span className="sn-wa">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path
                      fill="#fff"
                      d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.3 4.8 4.9-1.3A9.8 9.8 0 1 0 12 2.2zm5.6 13.9c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .2 0 .7-.1 1.3z"
                    />
                  </svg>
                </span>
                <span className="sn-notif-txt">
                  <small>{notif.app}</small>
                  <b>{notif.titulo}</b>
                  <span>{notif.texto}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Elementos que flutuam por cima (post-its, paleta, chip, medidor) */}
          <div className="sn-float">
            {c.briefing.map((b, i) => (
              <div key={i} className={`sn-note n${i + 1}`}>
                <div className="sn-note-in">
                  <small>{b.rotulo}</small>
                  <b>{b.valor}</b>
                </div>
              </div>
            ))}

            <div className="sn-palette">
              <div className="sn-palette-in">
                <small>{c.etapas[2].titulo}</small>
                <div className="sn-sw">
                  {c.site.paleta.map((cor, i) => (
                    <i key={i} style={{ background: cor }} />
                  ))}
                </div>
                <div className="sn-type">
                  <span className="sn-aa" style={{ fontFamily: `"${fonteNome}", sans-serif` }}>
                    Aa
                  </span>
                  <span>
                    <b>{fonteNome}</b>
                    <small>títulos</small>
                  </span>
                </div>
              </div>
            </div>

            <div className="sn-width-chip">
              <span className="sn-w-num">1440</span> px
            </div>

            <div className="sn-gauge">
              <svg viewBox="0 0 100 100" width="76" height="76" aria-hidden="true">
                <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,.12)" strokeWidth="8" fill="none" />
                <circle
                  className="sn-g-arc"
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span>
                <b className="sn-g-num">0</b>
                <small>{c.final.rotuloVelocidade}</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
