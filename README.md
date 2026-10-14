# Dengyang Jiang · Personal Homepage

[Live website](https://vvvvvjdy.github.io/) · [中文维护指南](maintenance/README.zh-CN.md) · [English maintenance guide](maintenance/README.en.md)

A static academic homepage with selected projects and publications, a profile sidebar, a flowing canvas banner, and light/dark lilac themes. Dark mode is the default; visitors can change it. Content remains readable without JavaScript.

Edit `index.html` directly to update content. No package installation or build step is required.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ for local development. The maintenance guides include copyable examples for projects, publications and experience, image locations, styling, and GitHub Pages updates.

## Acknowledgements

- Layout inspired by [Junsong Chen](https://junsongc.top/).
- Original homepage adapted from [Jon Barron's website](https://github.com/jonbarron/website).
- Self-hosted [TeX Gyre Pagella](https://ctan.org/pkg/tex-gyre-pagella) fonts provide Palatino-style typography. Font license and upstream documentation are in [`assets/fonts/`](assets/fonts/). Their license applies to the fonts; it does not grant rights to personal photos or research illustrations.
