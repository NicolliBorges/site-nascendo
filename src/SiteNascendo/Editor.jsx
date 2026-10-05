import { tamanhoVisivel } from './codigo.js';

export default function Editor({ projeto, arquivos, explorador, assinatura }) {
  return (
    <div className="sn-editor" aria-hidden="true">
      <div className="sn-ed-title">
        <span className="sn-ed-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="sn-ed-name">{projeto}</span>
        <span className="sn-ed-sp" />
      </div>

      <div className="sn-ed-main">
        <div className="sn-ed-act">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
            <path d="M14 3v5h5" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6" />
            <path d="M20 20l-4.5-4.5" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="6" cy="6" r="2.5" />
            <circle cx="6" cy="18" r="2.5" />
            <circle cx="18" cy="9" r="2.5" />
            <path d="M6 8.5v7M18 11.5c0 3-4 3-9.5 5" />
          </svg>
        </div>

        <div className="sn-ed-side">
          <small>EXPLORADOR</small>
          <ul>
            {explorador.map((f) => (
              <li
                key={f.nome}
                className={`sn-ed-file${f.pasta ? ' pasta' : ''}${f.dentro ? ' dentro' : ''}`}
                data-i={f.i ?? ''}
              >
                {f.pasta ? '▾ ' : ''}
                {f.nome}
              </li>
            ))}
          </ul>
        </div>

        <div className="sn-ed-code">
          <div className="sn-ed-tabs">
            {arquivos.map((a, i) => (
              <span key={a.aba} className="sn-ed-tab" data-i={i}>
                {a.terminal ? '› terminal' : a.aba}
              </span>
            ))}
          </div>

          {arquivos.map((a, i) => (
            <div key={a.aba} className={`sn-ed-pane${a.terminal ? ' term' : ''}`} data-i={i}>
              <div className="sn-ed-body">
                {a.linhas.map((html, n) => (
                  <div key={n} className="sn-ed-line">
                    <span className="sn-ed-num">{a.terminal ? '' : n + 1}</span>
                    <span
                      className="sn-ln-code"
                      data-len={tamanhoVisivel(html)}
                      dangerouslySetInnerHTML={{ __html: html || ' ' }}
                    />
                  </div>
                ))}
                <i className="sn-ed-caret" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sn-ed-status">
        <span>● ao vivo</span>
        <span>{assinatura}</span>
      </div>
    </div>
  );
}
