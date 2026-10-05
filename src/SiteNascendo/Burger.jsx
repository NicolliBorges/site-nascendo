import { useId } from 'react';

// Arte padrão: hambúrguer em 6 camadas (cada <g className="sn-camada"> cai separado).
// Para a sua própria arte, siga o mesmo padrão: um <svg className="sn-art"> com
// grupos className="sn-camada", de baixo para cima.
export default function Burger() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const u = (n) => `${n}-${id}`;
  return (
    <svg className="sn-art" viewBox="0 0 320 270" aria-hidden="true">
      <defs>
        <linearGradient id={u('pao-cima')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2b25c" />
          <stop offset="1" stopColor="#c97a2c" />
        </linearGradient>
        <linearGradient id={u('pao-baixo')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e09a45" />
          <stop offset="1" stopColor="#a8601f" />
        </linearGradient>
        <linearGradient id={u('carne')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b3820" />
          <stop offset="1" stopColor="#3a1c0f" />
        </linearGradient>
      </defs>

      <g className="sn-camada">
        <path d="M48 214 Q160 226 272 214 Q276 246 250 252 L70 252 Q44 246 48 214 Z" fill={`url(#${u('pao-baixo')})`} />
      </g>
      <g className="sn-camada">
        <path
          d="M40 186 Q44 172 70 170 L250 170 Q276 172 280 186 Q282 204 262 210 L58 210 Q38 204 40 186 Z"
          fill={`url(#${u('carne')})`}
        />
        <path d="M58 180 L262 180 M66 196 L254 196" stroke="#8a4a2a" strokeWidth="3" strokeDasharray="6 10" strokeLinecap="round" />
        <path d="M40 188 l-8 4 8 3 M280 188 l8 4 -8 3" stroke="#3a1c0f" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
      <g className="sn-camada">
        <path
          d="M44 160 L276 160 L268 174 Q258 176 252 190 Q246 176 230 174 L150 174 Q140 176 136 196 Q130 176 120 174 L70 174 Q62 176 58 186 Q54 176 50 172 Z"
          fill="#ffc23d"
        />
      </g>
      <g className="sn-camada">
        <path d="M36 150 Q52 138 68 150 T100 150 T132 150 T164 150 T196 150 T228 150 T260 150 T290 148 L286 162 L40 162 Z" fill="#5fb04a" />
      </g>
      <g className="sn-camada">
        <rect x="60" y="134" width="96" height="16" rx="8" fill="#e5432d" />
        <rect x="164" y="134" width="96" height="16" rx="8" fill="#e5432d" />
        <path d="M72 140 h70 M176 140 h70" stroke="#ff7a5c" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="sn-camada">
        <path d="M44 132 Q46 52 160 50 Q274 52 276 132 Q276 140 266 140 L54 140 Q44 140 44 132 Z" fill={`url(#${u('pao-cima')})`} />
        <path d="M80 74 Q120 56 170 58" stroke="#ffd58f" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".55" />
        {[
          [96, 92, -20],
          [128, 80, 10],
          [160, 76, -5],
          [192, 80, 15],
          [222, 92, -12],
          [112, 108, 25],
          [146, 98, -15],
          [178, 98, 8],
          [208, 108, -25],
          [130, 120, 5],
          [190, 120, -8],
        ].map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="3.2" fill="#fff3d6" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
}
