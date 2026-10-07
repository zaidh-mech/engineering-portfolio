# Zaidh Rizme — Engineering Portfolio

A complete Next.js App Router + React portfolio, with a static production export and self-hosted fonts.

## Run locally

```powershell
npm install
npm run dev
```

Open the URL printed by Next.js. For a production build, run `npm run build`; the standalone website is written to `out/`.

## Portfolio content

- A personal introduction, toolkit chips and three featured project cards on the home page.
- A dedicated project collection with all seven projects and category filters. Each card pairs a wide image carousel with project metadata, a short explanation and an article link.
- ToF robot inspector inside its project article, with pointer response, switchable assembly/enclosure/PCB views and component notes.
- Seven project pages: ToF SLAM robot, pneumatic ironing workstation, FLOD hopper, Sense-Oil, implemented two-layer control PCB, proposed four-layer PCB, and posture-sensing research.
- Project articles with brief narratives, interactive hero previews, reading progress and expandable engineering decisions.
- Original CAD and prototype galleries with category filters, thumbnail navigation, fullscreen zoom, drag to pan and keyboard controls, plus PDF drawings, BOMs and MATLAB simulation recording.
- Interactive skills tabs covering mechanical design, electronics, robotics and software, with actual project evidence and CV-grounded tools.
- Persistent Studio and Midnight themes across the portfolio, project articles and archive.
- Searchable, filterable, paginated engineering archive, with project links and pinned GitHub source revisions.
- A separate About page with education and expandable career history, updated from the September 2026 CV, including the Hype Invention robotics internship.
- Responsive navigation, reduced-motion support, visible keyboard focus, accessible native image dialog, real mail/social/CV links and a custom 404 page.

Project metadata is maintained in `data/projects.ts` and article introductions in `data/stories.ts`. Media and document files are in `public/`. Archive entries are in `public/catalog.json` and counts are in `data/archive-stats.json`.

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

Atlantic `#16263D`, engineering blue `#315FE9`, glacier `#E5EDF4`, titanium `#F3F6F9` and white. Archivo gives the display type a mechanical, compact character; DM Sans keeps technical explanations legible. Studio uses paper-like surfaces, while Midnight shifts the surroundings into deeper blue tones. Original CAD inspection surfaces stay light. A centered introduction leads into a single-column project feed, with wide original imagery above concise editorial summaries. Image carousels, skill tabs and project-level inspection tools make the work interactive.

The user selected [manazir.dev](https://manazir.dev/) as the reference for content-card structure and site organization: large project previews, descriptive summaries and separate project stories. This portfolio uses its own typography, palette, branding and engineering imagery. Earlier references included [Sanctuary Computer](https://www.sanctuary.computer/), [Origin](https://origin.tech/) and [Sanctuary AI](https://sanctuary.ai/). The existing personal portfolio supplied factual context and original assets.

## Validation

`npm run build` validates compilation, TypeScript and all static routes. With the production export served at `http://127.0.0.1:3100`, `node scripts/check-site.mjs` checks featured cards, collection navigation and filters, assembly switching, gallery keyboard controls, archive search/filter/pagination, project links, mobile navigation, layout widths, enlarged text, image loading and browser errors. Local screenshots and results are saved to ignored `qa/`.

`node scripts/check-redesign.mjs` verifies component notes, pointer response, skills and their keyboard controls, card image carousels, theme persistence across routes, article image previews, expandable decisions, gallery filters, fullscreen zoom and drag to pan, the About page, experience expansion, mobile skills navigation and the themed archive. Both scripts accept `PORTFOLIO_TEST_ORIGIN` and `NEXT_PUBLIC_BASE_PATH` for local or deployed checks.

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
