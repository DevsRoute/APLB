# AP LOI Builder

Draft Letters of Intent for commercial real estate. Pick a site, pick a template, review the fill, pick optional language clauses, fill the underscore blanks, export as `.docx`.

Single-route React/Vite app. Everything lives behind `/`. There is no router — `main.jsx` renders `<App />` which renders `<Shell />`.

## Running it

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build
```

Vite config:
- `vite-plugin-node-polyfills` for `Buffer` / `process` / `global` (eigenpal-adjacent packages reach for them).
- `build.target: 'es2022'` because `@docx-editor.dev/*` ships top-level `await` in its PDF engine.

## The stack

| Need | Package | License | Why |
|---|---|---|---|
| Framework | React 18 + Vite 5 | MIT | What the team ships |
| Styling | Tailwind 3 | MIT | Pixel-perfect against Figma via arbitrary values |
| Font | Poppins (Google Fonts) | OFL | What Figma uses |
| Icons | Hand-rolled inline SVG + lucide-react | MIT | Figma icons are custom |
| In-browser `.docx` editor | `@docx-editor.dev/react` (eigenpal) | Apache 2.0 (Core) | Jay-approved; free Core covers v1. Hosts the right-side editor in `EditorPane.jsx` |
| Metric-compatible packaged fonts | `@docx-editor.dev/fonts` | Apache 2.0 | So Calibri/Arial measurement stays stable inside the editor |
| Zip for Word packages | `pizzip` | MIT | Opens / rewrites `word/document.xml` for both clause injection and docxtemplater |
| `[placeholder]` fill | `docxtemplater` | MIT | Preserves Word XML byte-for-byte except the replaced text runs |
| Fuzzy field match | `fuse.js` | Apache 2.0 | `[LL Brokage]` maps to `ll_brokerage` |

Dependencies still in `package.json` from the earlier POC era (`react-router-dom`, `html2canvas-pro`, `jspdf`, `docx-preview`, `@turbodocx/html-to-docx`, `file-saver`, `react-dropzone`, `html2canvas`) are no longer imported anywhere. Safe to remove via `npm uninstall` when we take a cleanup pass.

## What we tried and dropped

- **SuperDoc** (`@harbour-enterprises/superdoc`) — AGPL-3.0, incompatible with hosted SaaS without their commercial licence. Also hit a keypress crash on 1.46.3. Replaced with eigenpal.
- **contentEditable + html-to-docx round-trip** — lost images and complex tables on export. The POC that proved this (and the `/poc/*` pages that hosted it) have been removed from the source tree; the lesson stays here.

## File tree

```
src/
├── main.jsx                        # React entry, no router
├── App.jsx                         # just renders <Shell />
├── index.css                       # Tailwind + Poppins + .ap-scroll
├── app/
│   ├── Shell.jsx                   # TopHeader + three-column row, editor hidden on Link Site, shadow strip under header
│   ├── TopHeader.jsx               # 65px bar: AbstraPoint logo, My Sites tab (active), Delegated to Me — all static for now
│   ├── Sidebar.jsx                 # Draft LOI accordion with 5 steps. Build Template section is intentionally commented out.
│   ├── MiddlePanel.jsx             # Dispatches to the per-step panel. Width w-[358px].
│   ├── EditorPane.jsx              # Eigenpal editor + custom top bar (Export/Send + underscore nav buttons)
│   ├── WorkContext.jsx             # mode, step, site, template, templateBuffer, filled, chosenLanguage, runFill
│   └── panels/
│       ├── StepFooter.jsx          # back / next footer used by every step
│       ├── draft/
│       │   ├── ManageLOIs.jsx
│       │   ├── LinkSite.jsx
│       │   ├── ChooseTemplate.jsx
│       │   ├── FillTemplateData.jsx
│       │   ├── AddOptionalLanguage.jsx    # thin wrapper = OptionalLanguageList + step footer
│       │   ├── UnderscoresAndEdit.jsx     # thin wrapper = OptionalLanguageList + back-only footer
│       │   └── OptionalLanguageList.jsx   # the shared middle-panel body for the two steps above
│       └── build/
│           ├── UploadTemplate.jsx
│           ├── LinkSiteFields.jsx
│           ├── BuildOptionalLang.jsx
│           └── ConvertUnderscores.jsx
├── components/
│   └── ui/                         # Primitives — Button, Chevron, Field, Input, Select, Textarea, index.js
├── lib/
│   ├── api/
│   │   ├── sites.js                # backend-swap seam
│   │   └── templates.js            # backend-swap seam, only lists the two live templates
│   ├── autoMapFields.js            # fuzzy placeholder → site field
│   ├── parsePlaceholders.js        # pulls [tag] / <section> / <<option>> from a .docx
│   ├── fillOptionalLanguage.js     # Pass 1: swap <Clause Heading> paragraphs for chosen option body
│   └── fillTemplate.js             # Pass 2: docxtemplater fills [LL Broker] etc.
└── data/
    ├── sites.json                  # three sample sites matching the Figma Link Site screen
    ├── siteFieldCatalog.js         # field keys + normaliser
    ├── optionalLanguage.js         # auto-generated structure parsed from the DT library .docx
    └── clauseLinks.js              # hardwired linking map (dummy placeholders — real DT map awaited from client)
public/
├── abstrapoint-logo.svg            # top header logo, exported from Figma
├── dollar-tree-chip.svg            # My Sites tab chip, exported from Figma
├── avatar-placeholder.png          # Delegated to Me avatar stub
└── templates/
    ├── dt-apst-latest.docx         # default — latest APST template with `<Clause>` + `[placeholder]` tags
    └── dt-shopping-center.docx     # older DT shopping centre template (same tag structure)
```

## Design system

- **Font**: Poppins. Loaded in `index.html` from Google Fonts.
- **Tailwind tokens** (`ap.*`):
  - `ap-text` `#404040` — primary text
  - `ap-text2` `#4e4d4d` — sidebar nav
  - `ap-dark` `#4b4b4b` — sidebar bars, dark accents, selected card bg
  - `ap-mid` `#b8b8b8` — sidebar body
  - `ap-light` `#dcdcdc` — middle panel bg, active nav row, My Sites tab bg
  - `ap-cyan` `#00ffff` — `[placeholder]` highlight in the template
  - `ap-scroll` `#bbc3cf` — scrollbar thumb
- **Hard-coded extras** that haven't earned a token: `#f5a623` (Add to LOI, filter / auto badges), `#777`, `#FBB040`, `#F6F6F6` (clause library styles).
- **Spacing**: match Figma's odd pixel values via Tailwind arbitrary values (`px-[26px]`, `w-[358px]`, …). Pixel-perfect is the rule.
- **Layout widths**: Sidebar 199px, Middle panel 358px, Editor pane fills remaining.
- **Top header shadow**: a 16px vertical gradient strip is rendered in `Shell.jsx` as an absolute overlay with `z-30`, so it sits above the editor's own stacking contexts and runs the full width of the app under the 65px top bar.

## Draft LOI flow

Five steps in order:

1. **Link Site** — pick one of the three sample sites. Editor pane is hidden, right side blank white.
2. **Choose Template** — shows linked site data + list of available templates. Picking a template clears any filled state. Editor shows the raw template (clause tags + `[placeholder]` tags visible).
3. **Fill Template Data** — confirmation screen (linked site + chosen template). Hitting `Fill Template Data >` advances to Add Optional Language; the fill fires automatically whenever the user lands on `language` or `edit`.
4. **Add Optional Language** — the clause picker. See the next section for the full behaviour.
5. **Underscores and Edit** — same clause picker body as step 4; this step's job is to let the user fill underscore blanks inside the editor. Two custom buttons (`←_` / `_→`) appear in the editor pane's top bar for this step only and cycle through blank runs.

Build Template mode is **temporarily hidden** in `Sidebar.jsx` (code kept, header commented out) — client re-prioritised Draft LOI. Resume by uncommenting.

## Add Optional Language — the clause picker

The library and the template were both delivered by the client as `.docx` files. We parse the library once (output: `src/data/optionalLanguage.js`) and inject chosen clauses into the template at fill time.

### Library parsing

Format conventions in the library docx:

- `<Clause Name>` on its own line → **clause heading**. Also appears in the template where the chosen option body should land.
- `<< option label >>` or `<< >>` → **option marker**. The paragraphs that follow (until the next `<<` or `<...>`) are that option's body.
- Any option whose label contains the word `default` is tagged with `default: true` in the generated data — surfaced as a passive **DEFAULT** badge in the UI. **No** auto-commit; the badge is informational only.

Parse script (one-off, Python): dumps `word/document.xml`, splits by `</w:p>`, walks paragraphs, rewrites IDs via a slug of the heading / label.

### Two-step commit (pick → Add to LOI)

Client requirement: picking an option only *stages* it; it goes into the document only after the user explicitly clicks `Add to LOI >`.

- **Staged**: local `staged` map in `OptionalLanguageList`. Click an option → stage it (full dark bg + the yellow `Add to LOI >` link appears below).
- **Committed**: lives in `chosenLanguage` on `WorkContext`. Click the `Add to LOI >` link → commits + fires fill. The row keeps the dark bg and shows a `✓ IN LOI` badge; the yellow link disappears.
- `chosenLanguage` is the single source of truth for the fill pass. Nothing in the fill pipeline falls back to library defaults — if the user hasn't committed anything for a clause, the template keeps the raw `<Clause Heading>` tag visible.

### Clause linking (`src/data/clauseLinks.js`)

Client's mechanism, hardwired for Dollar Tree. Two modes:

- **auto-pair** — committing option X in a proactive clause also writes a predetermined reactive option into another clause. The reactive clause shows an `auto · <proactive heading>` badge.
- **filter** — committing option X limits the reactive clause's visible options to a subset. The reactive clause header shows a `FILTERED VIA <proactive heading>` chip. User still picks + commits one of the allowed options manually.

Both modes use the committed state (not the staged state) to drive the reactive side.

**Current contents of `clauseLinks.js` are placeholder examples** — Triple-Net → Non-Cumulative (auto), Fixed CAM → Excluded Costs (filter). The real DT map is pending from the client; swap the object body in that one file when it arrives. No other code needs to change.

### Fill pipeline — two passes

`WorkContext.runFill()` runs when the user advances to `language` or `edit`:

```
templateBuffer (raw .docx)
    │
    ▼
Pass 1  fillOptionalLanguage(templateBuffer, chosenLanguage)
            For each committed clause, locate the paragraph
            whose plain text equals `<Clause Heading>` and
            splice in <w:p> paragraphs built from the chosen
            option's bodyParagraphs. Strips `[` and `]` from
            injected prose so docxtemplater's lexer doesn't
            choke on orphan brackets in library prose.
    │
    ▼
Pass 2  parsePlaceholders → autoMapFields → buildFillData → fillDocx
            Standard docxtemplater pass. Replaces [LL Broker],
            [Project Name], [LOI Date] etc. with the chosen
            site's values.
    │
    ▼
EditorPane  <DocxEditor document={bytes} mode="edit" />
```

`runFill` loops: before and after the await it compares `chosenLanguageRef.current` to the snapshot it started with. If the user clicked another option mid-fill, the loop re-runs with the latest input and only the last completed pass calls `setFilled`. This prevents a stale fill from winning the race.

Both `templateBuffer` and `filled` reset when `site` or `template` changes, so re-selecting either forces a clean re-fill on next advance.

## Underscore navigation (edit step)

The right-side top bar in `EditorPane.jsx` shows two extra arrow-with-underscore buttons only when `step === 'edit'`. Clicking them calls `editor.findMatches('_')` on the eigenpal `Editor` instance (via `editorRef.current.getEditor()`), coalesces adjacent `_` matches into a single blank span (so a 20-underscore run is **one** stop, not twenty), then calls `editor.selectMatch(match) + editor.scrollToBlock(match.blockId)`. Direction cycles with wrap-around. Index resets whenever the committed language changes.

Eigenpal does expose a proper `DocxEditor.Toolbar.Group` compound API — our two underscore buttons could live inside the editor's own toolbar instead of our custom top bar. That migration would require switching to `<DocxEditor.Root>` + composing viewport / content / menu manually; worth doing when there's time to also fold Export / Send into the eigenpal toolbar.

## Deferred / known-not-yet

- **`#8EDFE4` filled-highlight** — client originally asked for a softer cyan on filled values; parked. When we pick it up, the plan is to post-process `word/document.xml` after docxtemplater and swap `<w:highlight w:val="cyan"/>` on filled runs for a `<w:shd w:fill="8EDFE4"/>` shading element (Word's `highlight` is palette-only, not hex).
- **Real DT linking map** — populate `clauseLinks.js` when client delivers.
- **Build Template mode** — paused; UI kept in-tree but hidden in the sidebar.
- **`Send` button** — stub; would email the LOI to the LL broker.
- **Full eigenpal toolbar composition** — see note above.
- **Addon-style library markers** like `<<Non-Disturbance Agreement from fee owner required>>` under LL Property Ownership Status are currently parsed as regular (empty-body) options. If the client wants them treated as modifiers to the sibling option, we'll add a nesting pass.

## Backend swap

`src/lib/api/sites.js` and `src/lib/api/templates.js` are the seams. Today they return static data. When the NestJS backend lands, change the body of those two files — nothing else needs to move.
