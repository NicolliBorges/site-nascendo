import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SiteNascendo from './SiteNascendo';
import hamburgueria from './exemplos/hamburgueria.js';
import clinica from './exemplos/clinica.jsx';

gsap.registerPlugin(ScrollTrigger);

const REPO = 'https://github.com/NicolliBorges/site-nascendo';
const KODRA = 'https://kodratecnologia.com.br';

const EXEMPLOS = {
  hamburgueria: { nome: 'Hamburgueria', config: hamburgueria },
  clinica: { nome: 'Clínica', config: clinica },
};

// Rolagem suave (opcional). O componente funciona sem isso.
function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh); // remede depois que as fontes carregam
    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener('load', refresh);
      lenis.destroy();
    };
  }, []);
}

export default function App() {
  useLenis();
  const [ex, setEx] = useState(() => {
    const p = new URLSearchParams(window.location.search).get('exemplo');
    return EXEMPLOS[p] ? p : 'hamburgueria';
  });

  const trocar = (k) => {
    window.scrollTo(0, 0);
    setEx(k);
    const url = new URL(window.location.href);
    url.searchParams.set('exemplo', k);
    window.history.replaceState(null, '', url);
  };

  return (
    <>
      <nav className="demo-troca" aria-label="Exemplos">
        {Object.entries(EXEMPLOS).map(([k, e]) => (
          <button key={k} type="button" className={k === ex ? 'on' : ''} onClick={() => trocar(k)}>
            {e.nome}
          </button>
        ))}
      </nav>

      <header className="demo-topo">
        <p className="demo-tag">Componente open source · React + GSAP</p>
        <h1>
          Veja um site <em>nascer.</em>
        </h1>
        <p>Role a página para ver a construção.</p>
        <span className="demo-seta" aria-hidden="true">
          ↓
        </span>
      </header>

      {/* key força remontar ao trocar de exemplo */}
      <SiteNascendo key={ex} config={EXEMPLOS[ex].config} />

      <footer className="demo-fim">
        <h2>Quer usar no seu site?</h2>
        <p>
          O componente é open source. Copie, troque a config e pronto.
        </p>
        <div className="demo-links">
          <a className="demo-btn" href={REPO} target="_blank" rel="noopener">
            Ver no GitHub
          </a>
          <a className="demo-btn ghost" href={KODRA} target="_blank" rel="noopener">
            Feito pela Kodra
          </a>
        </div>
      </footer>
    </>
  );
}
