# Site Nascendo

**English** · [Português](README.pt-BR.md)

![A website being built as you scroll](docs/preview.gif)

A scroll-driven React section that shows a website being built, from the client briefing to the site going live. Scroll forward to build it, scroll back to rewind.

**[Live demo →](https://nicolliborges.github.io/site-nascendo/)**

Made by [Kodra](https://kodratecnologia.com.br).

## What it shows

The animation has 7 steps:

1. **Briefing:** sticky notes with the business info fly into the screen.
2. **Wireframe:** a grid appears and gray blocks sketch the layout.
3. **Branding:** the color palette and the heading font fly in.
4. **Content:** the real site fades in: heading, text, image and cards.
5. **Interactions:** a cursor clicks the main button (with sparks) and hovers a card.
6. **Responsive:** the laptop turns into a phone and the layout adapts for real.
7. **Live:** the domain is typed, the lock appears, the speed gauge fills and a "new order" notification pops up.

Next to it, a code editor types the "files" for each step. They are generated from your config.

## Features

- **One config object.** Change texts, colors, fonts, cards and the final notification without touching the animation.
- **Controlled by scroll** (GSAP ScrollTrigger with `pin` + `scrub`), so it rewinds smoothly.
- **Real responsive layout.** The mini site inside the device uses container queries, so it stacks for real when the device becomes a phone.
- **Custom art.** Use the default burger, any image, or your own SVG with layers that drop in one by one.
- **Works on desktop and mobile**, with a different layout for each (`gsap.matchMedia`).
- **Scoped CSS.** Every class starts with `sn-`, so it won't clash with your site's styles.
- **Small footprint:** `react`, `gsap` and `@gsap/react`.

| Burger shop (default) | Aesthetics clinic (custom config) |
|---|---|
| ![](docs/exemplo-hamburgueria.jpg) | ![](docs/exemplo-clinica.jpg) |

## Run the demo

```bash
npm install
npm run dev
```

Use the switch at the top of the page to swap between the two examples.

## Use it in your project

1. Copy the `src/SiteNascendo/` folder into your project.
2. Install the dependencies:
   ```bash
   npm i gsap @gsap/react
   ```
3. Render it:
   ```jsx
   import SiteNascendo from './SiteNascendo';
   import myConfig from './myConfig';

   <SiteNascendo config={myConfig} />
   ```
4. Load the fonts you use. The demo uses [Fontsource](https://fontsource.org); see `src/main.jsx`.

> Define the config **outside** your component (a separate file or a module-level constant). If you create the object inside render, the animation is rebuilt on every render.

The fastest way to start is to copy `src/exemplos/clinica.jsx` and change the texts.

### Props

| Prop | Default | Description |
|---|---|---|
| `config` | `{}` | Your settings. They are merged on top of the default (burger shop) config. |
| `id` | `'construcao'` | The section's `id`, useful for anchor links. |
| `className` | `''` | Extra class for the section. |

## Config

Config keys are in Portuguese (the project was born in Brazil). You only pass what you want to change.

```js
{
  rotulo: 'Construção ao vivo',  // small label above the steps
  assinatura: 'Kodra',           // name on the editor's status bar
  duracao: 6.2,                  // how many screen heights of scroll the animation lasts

  // colors and fonts of the surrounding section (designed for dark backgrounds)
  tema: { fundo, texto, apagado, destaque, destaque2, fonte, fonteMono },

  etapas: [{ titulo, texto }, ...],    // always 7 steps. Use {} to keep a step unchanged
  briefing: [{ rotulo, valor }, ...],  // sticky notes (up to 4)

  site: {                        // the mini site being built
    nome, dominio, logo,
    icone,                       // 'chama' | null | <svg/>
    menu: ['...', '...'], botaoMenu,
    tag, titulo, tituloDestaque, texto,
    botao, botaoSecundario,
    cards: [{ titulo, texto, preco }],   // 1 to 3 works best
    arte,                        // 'burger' | 'image.png' | <svg> with layers
    fonteTitulo, pesoTitulo, tituloMaiusculo, tamanhoTitulo, destaqueItalico,
    cores: { fundo, texto, primaria, textoNaPrimaria, acento, card, linha },
    paleta: null,                // palette swatches. null = use the colors above
  },

  editor: { secao, itens, arte },  // fake component names shown in the code

  final: {
    publicado, velocidade, rotuloVelocidade, visitante,
    notificacao: { app, titulo, texto },
  },
}
```

See `src/SiteNascendo/config.js` for every default value.

### Custom art

- **Image:** `arte: '/my-photo.png'`. It drops in as a whole.
- **Layered SVG** (like the burger): add `className="sn-camada"` to each `<g>`, from bottom to top, and each layer drops separately. See `src/exemplos/clinica.jsx`.

## How it works

- The section is pinned with ScrollTrigger (`pin: true`, `scrub: 0.8`). One GSAP timeline of about 13 "seconds" is spread over `duracao × viewport height` of scroll.
- Each step starts at a fixed time on the timeline (`TEMPOS` in `SiteNascendo.jsx`). A ticker callback toggles the active step, tab and file.
- **Typing effect:** each code line uses `clip-path: inset(0 calc(100% - var(--n) * 1ch) 0 -2px)`, and GSAP tweens `--n` from 0 to the line length. Since the font is monospace, this reveals one character at a time.
- **Laptop → phone:** GSAP tweens a virtual `morph` value from 0 to 1, and width, height, border radius and scale are interpolated from it. A `--m` CSS variable fades the browser dots and shows the notch.
- **Responsive mini site:** the device screen is a CSS container (`container: sn-vp / inline-size`), so the mini site switches to its mobile layout through a container query, not a media query.

## Tips

- **Keep headings short:** 2 or 3 words plus the highlight. The mini site is small.
- **Smooth scrolling is optional.** The demo uses [Lenis](https://github.com/darkroomengineering/lenis); see `useLenis()` in `src/App.jsx`.
- **Deploy:** the included GitHub Action publishes the demo to GitHub Pages on every push to `main`. Enable it once under *Settings → Pages → Source: GitHub Actions*.
- **Going deeper:** to edit the mini site structure, open `MiniSite.jsx`. Keep the `sn-cta`, `sn-card` and `sn-art` classes, because the animation looks for them.

## License

[MIT](LICENSE) © Kodra. Built with [React](https://react.dev), [GSAP](https://gsap.com) and [Lenis](https://github.com/darkroomengineering/lenis).

Need a site, system or automation? Talk to [Kodra](https://kodratecnologia.com.br).
