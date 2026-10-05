import { isValidElement } from 'react';
import Burger from './Burger.jsx';

function Chama() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M12 2c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 2 1.3 3 2.5 3.5C11 8 11 5 12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

function Icone({ icone }) {
  if (icone === 'chama') return <Chama />;
  if (isValidElement(icone)) return icone;
  return null;
}

function Arte({ arte }) {
  if (arte == null || arte === 'burger') return <Burger />;
  if (typeof arte === 'string') return <img className="sn-art sn-camada" src={arte} alt="" />;
  return <div className="sn-art">{arte}</div>;
}

/** Versão em wireframe (blocos cinza) */
export function Wireframe({ nCards }) {
  return (
    <div className="sn-site sn-site-wf" aria-hidden="true" style={{ '--sn-ncards': nCards }}>
      <div className="sn-s-nav">
        <i className="sn-wf-b sn-wf-logo" />
        <span className="sn-s-links">
          <i className="sn-wf-b" />
          <i className="sn-wf-b" />
          <i className="sn-wf-b" />
        </span>
        <i className="sn-wf-b sn-wf-btn" />
      </div>
      <div className="sn-s-hero">
        <div className="sn-s-copy">
          <i className="sn-wf-b sn-wf-tag" />
          <i className="sn-wf-b sn-wf-h" />
          <i className="sn-wf-b sn-wf-h curto" />
          <i className="sn-wf-b sn-wf-p" />
          <i className="sn-wf-b sn-wf-p" />
          <i className="sn-wf-b sn-wf-p curto" />
          <span className="sn-s-ctas">
            <i className="sn-wf-b sn-wf-btn lg" />
            <i className="sn-wf-b sn-wf-btn lg ghost" />
          </span>
        </div>
        <div className="sn-s-media">
          <i className="sn-wf-b sn-wf-img" />
        </div>
      </div>
      <div className="sn-s-cards">
        {Array.from({ length: nCards }, (_, i) => (
          <i key={i} className="sn-wf-b sn-wf-card" />
        ))}
      </div>
    </div>
  );
}

/** Versão final, com o conteúdo e as cores do cliente */
export function SiteReal({ site }) {
  const k = site.cores;
  const fonte = String(site.fonteTitulo).includes(',') ? site.fonteTitulo : `"${site.fonteTitulo}", sans-serif`;
  const estilo = {
    '--sn-ncards': site.cards.length || 1,
    '--s-bg': k.fundo,
    '--s-text': k.texto,
    '--s-primary': k.primaria,
    '--s-on-primary': k.textoNaPrimaria,
    '--s-accent': k.acento,
    '--s-card': k.card,
    '--s-line': k.linha,
    '--s-font': fonte,
    '--s-fw': site.pesoTitulo,
    '--s-tt': site.tituloMaiusculo ? 'uppercase' : 'none',
    '--s-h1': `${site.tamanhoTitulo}px`,
    '--s-em-style': site.destaqueItalico ? 'italic' : 'normal',
  };

  return (
    <div className="sn-site sn-site-real" aria-hidden="true" style={estilo}>
      <div className="sn-s-nav">
        <span className="sn-s-logo">
          <Icone icone={site.icone} />
          {site.logo}
        </span>
        <span className="sn-s-links">
          {site.menu.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </span>
        <span className="sn-s-btn sm">{site.botaoMenu}</span>
      </div>

      <div className="sn-s-hero">
        <div className="sn-s-copy">
          <span className="sn-s-tag">{site.tag}</span>
          <h3 className="sn-s-h1">
            <span>{site.titulo}</span> <em>{site.tituloDestaque}</em>
          </h3>
          <p className="sn-s-p">{site.texto}</p>
          <span className="sn-s-ctas">
            <span className="sn-s-btn sn-cta">{site.botao}</span>
            {site.botaoSecundario && <span className="sn-s-btn ghost">{site.botaoSecundario}</span>}
          </span>
        </div>
        <div className="sn-s-media">
          <span className="sn-s-glow" />
          <Arte arte={site.arte} />
        </div>
      </div>

      <div className="sn-s-cards">
        {site.cards.map((c) => (
          <span key={c.titulo} className="sn-card">
            <b>{c.titulo}</b>
            <small>{c.texto}</small>
            {c.preco && <em>{c.preco}</em>}
          </span>
        ))}
      </div>
    </div>
  );
}
