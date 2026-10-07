# Zaidh Rizme — Engineering Portfolio

A complete Next.js App Router + React portfolio, with a static production export and self-hosted fonts.

## Run locally

```powershell
npm install
npm run dev
```

Open the URL printed by Next.js. For a production build, run `npm run build`; the standalone website is written to `out/`.

## Portfolio content

- Interactive ToF robot assembly, enclosure and PCB views.
- Seven project pages: ToF SLAM robot, pneumatic ironing workstation, FLOD hopper, Sense-Oil, implemented two-layer control PCB, proposed four-layer PCB, and posture-sensing research.
- Original CAD, prototype galleries, keyboard-accessible image viewer, PDF drawings, BOMs and MATLAB simulation recording.
- Searchable, filterable, paginated engineering archive, with project links and pinned GitHub source revisions.
- Career history updated from the September 2026 CV, including the Hype Invention robotics internship.
- Responsive navigation, reduced-motion support, visible keyboard focus, accessible native image dialog, real mail/social/CV links and a custom 404 page.

Project copy is maintained in `data/projects.ts`. Media and document files are in `public/`. Archive entries are in `public/catalog.json` and counts are in `data/archive-stats.json`.

## Sources and evidence

The previous portfolio supplied project context, media and drawings only. The design is new. Content was reconciled with the user's local GitHub Brain, particularly its project notes, built-system records and source snapshots. The September CV was copied unchanged to the downloadable CV link.

The archive includes all suitable files from four public engineering repositories (`PROJECTS`, `Industrial-Innovation-Project---6MA038`, `Industrial-Training-Reports`, `sense-oil-business-report`), plus the complete original project image and drawing library. Repository links point to the indexed commit so files remain tied to the content reviewed. External source files remain on GitHub; the website serves original portfolio images, PDFs, CSVs and interactive BOMs locally. Dot files, secrets, temporary files, executables and redundant compressed archives are excluded.

Evidence is distinguished in the project pages: simulated and emulated ToF datasets are not represented as independent measured physical accuracy; the four-layer PCB is a design proposal; Sense-Oil business forecasts describe a hypothetical company; posture sensing is a CV-documented research study without a located standalone asset package. Hype Invention is included as current experience, using the CV's description.

## Refresh source material

```powershell
python scripts/import-brain.py --brain 'C:/path/to/GitHub Brain' --cv 'C:/path/to/current-CV.pdf'
npm run build
```

This refreshes original assets and the file manifest. Review `data/projects.ts` when project narratives or employment details change.

## Design direction

Graphite `#172336`, glacier `#A8DAF0`, cobalt `#2857D9`, cold paper `#F5F7FA`, and CAD stage `#E9EDF3`. Archivo gives the display type a mechanical, compact character; DM Sans keeps technical explanations legible. Large CAD images, restrained surfaces and an interactive specimen make the actual engineering the focal point.

Inspo references reviewed: [Oz Gultekin](https://ozgur.design/) for typographic hierarchy, [Flexion Robotics](https://flexion.ai/) for cinematic space and engineering presence, and [Hugo Baron](https://nuageboi.fr/) for confident scale. The old portfolio's design and styles were not reused.

## Validation

`npm run build` validates compilation, TypeScript and all static project routes. With the production export served at `http://127.0.0.1:3100`, `node scripts/check-site.mjs` checks project filters, assembly switching, gallery keyboard controls, archive search/filter/pagination, project links, mobile navigation, layout widths, enlarged text, image loading and browser errors. Local screenshots and results are saved to ignored `qa/`.

## GitHub Pages deployment

Live portfolio: https://zaidh-mech.github.io/engineering-portfolio/

Source repository: https://github.com/zaidh-mech/engineering-portfolio

Every push to `main` runs `.github/workflows/deploy-pages.yml`, builds the static Next.js export and publishes `out/` to GitHub Pages. The workflow can also be run manually from the Actions tab. Repository Settings → Pages uses **GitHub Actions** as its build source.

The workflow supplies `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` from the Pages configuration. Next.js prefixes internal navigation, while `lib/paths.ts` prefixes public images, downloads and the file catalog. External source links remain absolute.

To reproduce the deployed build locally in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/engineering-portfolio'
$env:NEXT_PUBLIC_SITE_URL = 'https://zaidh-mech.github.io/engineering-portfolio/'
npm ci
npm run build
```

For browser checks at a prefixed URL, set `PORTFOLIO_TEST_ORIGIN` to the server origin and `NEXT_PUBLIC_BASE_PATH` to `/engineering-portfolio` before running `node scripts/check-site.mjs`. Install Chromium with `npx playwright install chromium` if needed.

The postbuild helper preserves generated segment payloads and adds the flat paths needed for client navigation when building on Windows, addressing the [documented Next.js export issue](https://github.com/vercel/next.js/issues/92339). It is a no-op when flat paths are already present.
