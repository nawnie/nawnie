# Local preview

Open `index.html` in a browser. Keep the folder together so `styles.css`, `app.js`, `src/engine.js`, `assets/`, and `case-studies/` remain alongside the page. The three interactive samples run locally and require JavaScript. They do not use a network API or fetch local JSON files, so a `file://` preview works.

The site does not send or retain form inputs. Refreshing the page restores the fictional defaults. A local browser preview is not a deployment.

## Optional local HTTP preview

From the repository folder:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000`. Stop the server with Ctrl+C.

## Browser smoke test

The optional smoke test requires Node.js, Playwright, and a compatible installed Chromium browser. No production dependency is needed to view the site.

```sh
node --test tests/engine.test.cjs
node tests/site-smoke.cjs --static-only
node tests/site-smoke.cjs
```

The `--static-only` run needs only Node.js. It checks local asset links, unique IDs, JavaScript syntax, contact boundaries, and explicit project scope; it does not render the page or verify DOM interaction. The full run exits with code 2 if Playwright or compatible Chromium is missing, after reporting any successful static checks.

With a working browser, set `PORTFOLIO_QA_DIR` to a temporary output folder to capture desktop and mobile screenshots. The default is the operating system temporary directory. Browser checks cover local-file loading, navigation tabs, changed and invalid scenarios, reset behavior, a 360px viewport, and absence of network requests during page load. These checks do not certify accessibility or clinical, financial, or operational suitability.

## Publication boundary

This folder was published in the public `nawnie/nawnie` repository on 6 November 2026 at `projects/client-work-samples/`. That does not by itself establish a hosted GitHub Pages website; no Pages configuration was changed or hosted site verified. No open-source license is granted here.

The GitHub-only link uses `id="github-header"` and `class="github-only-link"`. Any Upwork-upload edition must physically remove that outbound anchor; hiding it with CSS is not a sanitization step. The default Upwork handoff should use contact-free case-study PDFs, cover images, and project descriptions, not the website source.

## Honest portfolio labels

- The first three items contain runnable deterministic demonstrations with fictional inputs.
- AI task routing is an architecture study, not an exposed commercial runtime.
- Multi-site operations is a sample management framework.
- AES Studio is an experimental, limited workflow design using external ComfyUI templates; native support is not claimed.
- AES ReTrain's Qwen Image 2.1 preparation and evaluation lane is proposed; this portfolio does not claim image-model training runs, measured results, or MOSS training support.
