# AP LOI Builder (APLB) — Final Plan

**LOI = Letter of Intent.** A pre-contract document used in USA real estate.
This tool generates an LOI from existing site data. The user **selects a site**, **picks a template**, **tweaks formatting if needed**, and **downloads**.

> `.doc` (legacy Word format) is **not supported**. `.docx` only.

---

## Scope

- **Now:** Frontend only (React + Vite). This document covers the FE build.
- **Later:** NestJS backend will be added to persist templates, saved LOIs, and users.
  For now, templates live in `/public` and site data in a static JSON file. The FE is written so swapping these for API calls later is a straight-forward change.

---

## Page layout — three regions

```
┌──────────┬──────────────────────────┬─────────────────────────────┐
│  TAB     │   LEFT PANEL             │   RIGHT PANEL               │
│  SIDE    │   (selection + mapping)  │  ┌───────────────────────┐  │
│  BAR     │                          │  │ TOOLBAR               │  │
│          │   • Pick a Site          │  │ B I U · font · size · │  │
│  Draft   │   • Pick / upload a      │  │ align · lists · color │  │
│  Templ.  │     Template             │  │ undo/redo · Export    │  │
│  Saved   │   • See placeholder →    │  │ Send                  │  │
│          │     site-field mappings  │  └───────────────────────┘  │
│          │                          │                             │
│          │                          │   .docx rendered exactly    │
│          │                          │   as Word shows it,         │
│          │                          │   and FULLY EDITABLE        │
└──────────┴──────────────────────────┴─────────────────────────────┘
```

Two modes in the tab sidebar:
1. **Template Mode** — upload any `.docx`, auto-fill from site data, edit, export.
2. **Draft Mode** — same flow but starts from a built-in master template (guided).

---

## The stack (final choices, no alternatives)

| Need | Package | Why |
|---|---|---|
| Framework | **React 19 + Vite** | Current team stack |
| Styling | **Tailwind CSS + Radix UI + Lucide** | Matches Figma primitives |
| Routing | **react-router-dom** | Mode routes |
| Fill `.docx` placeholders | **docxtemplater + pizzip** | Fills `{tags}` without touching formatting |
| Render + edit `.docx` in-browser | **SuperDoc** (`@harbour-enterprises/superdoc`) | Opens, renders, and edits `.docx` with a Word-like toolbar. MIT. Purpose-built for this exact use case. |
| Fuzzy field matching | **fuse.js** | `{property_address}` ↔ `propertyAddress` |
| Upload UX | **react-dropzone** | Drag-and-drop |
| Download file | **file-saver** | Blob → file |
| PDF export | **html2canvas + jsPDF** | Browser-only, no backend needed |

Install:

```bash
npm create vite@latest apbl -- --template react
cd apbl
npm i react-router-dom @radix-ui/react-tabs @radix-ui/react-checkbox @radix-ui/react-select @radix-ui/react-dialog @radix-ui/react-slot \
      class-variance-authority clsx tailwind-merge lucide-react \
      @harbour-enterprises/superdoc docxtemplater pizzip fuse.js file-saver react-dropzone html2canvas jspdf
npm i -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

---

## Data flow

```
Site (sites.json)  ──┐
                     ├─► docxtemplater fills {placeholders} ─► SuperDoc loads .docx
Template (.docx)   ──┤                                               │
Mapping (auto)     ──┘                                               ▼
                                                       user edits with toolbar
                                                               │
                                                               ▼
                                                   Export (.docx | PDF) | Send
```

- **Left-panel change** (site / template / mapping) → re-fill from original + reload editor.
- **Right-panel edit** (toolbar / typing) → kept in SuperDoc's live state.
- Changing the mapping after manual edits shows a confirm dialog before discarding edits.

---

## Folder structure

```
apbl/
├── public/
│   └── templates/              # built-in .docx master templates
├── src/
│   ├── pages/
│   │   ├── TemplateMode.jsx
│   │   └── DraftMode.jsx
│   ├── components/
│   │   ├── loi/
│   │   │   ├── TabSidebar.jsx
│   │   │   ├── SiteSelector.jsx
│   │   │   ├── TemplateSelector.jsx
│   │   │   ├── FieldMappingPanel.jsx
│   │   │   ├── EditorToolbar.jsx
│   │   │   ├── DocEditor.jsx
│   │   │   └── DownloadBar.jsx
│   │   └── ui/                 # Button, Input, Select, Tabs, Dialog
│   ├── lib/
│   │   ├── docx/
│   │   │   ├── parsePlaceholders.js
│   │   │   ├── autoMapFields.js
│   │   │   ├── fillTemplate.js
│   │   │   ├── mountEditor.js
│   │   │   └── exportPdf.js
│   │   ├── api/
│   │   │   ├── sites.js        # today: reads sites.json · tomorrow: fetch from NestJS
│   │   │   └── templates.js    # today: reads /public/templates · tomorrow: fetch from NestJS
│   │   └── schema/
│   │       ├── siteFieldCatalog.js
│   │       └── templateLibrary.js
│   ├── data/
│   │   └── sites.json          # static site metadata (copied from Figma)
│   ├── context/
│   │   └── LoiContext.jsx
│   ├── App.jsx
│   └── main.jsx
```

> `lib/api/*.js` is the backend-swap seam. When NestJS lands, we change the body of these functions only — no component edits.

---

## Site field catalog (single source of truth)

`src/lib/schema/siteFieldCatalog.js`:

```js
export const SITE_FIELDS = [
  { key: 'propertyAddress', label: 'Property Address', type: 'text' },
  { key: 'city',            label: 'City',             type: 'text' },
  { key: 'state',           label: 'State',            type: 'text' },
  { key: 'askingPrice',     label: 'Asking Price',     type: 'currency' },
  { key: 'squareFeet',      label: 'Square Feet',      type: 'number' },
  { key: 'siteOwnerName',   label: 'Owner Name',       type: 'text' },
  { key: 'clientName',      label: 'Client Name',      type: 'text' },
  { key: 'offerDate',       label: 'Offer Date',       type: 'date' },
  // extend as more fields are added from Figma
];
```

Formatters (currency, date) live here so every template formats values consistently.

---

## Build phases

**Phase 0 — SuperDoc spike (1 day)**
Prove on a scratch page that we can: open a real `.docx`, render it with the toolbar, edit it, export back to `.docx` and PDF.

**Phase 1 — Template Mode (3–4 days)**
Full three-region shell · `sites.json` · upload `.docx` · auto-map placeholders · live re-fill · editor + toolbar · Export (.docx + PDF) · Send stub.

**Phase 2 — Draft Mode (2–3 days)**
2–3 built-in master templates in `/public/templates/` · guided wizard that reuses the Phase 1 editor and download pieces.

**Phase 3 — FE polish (1–2 days)**
Saved LOIs tab (localStorage until BE arrives) · uploaded templates list (localStorage) · empty / loading / error states · responsive tuning.

Total FE: **~2 weeks** to a shippable UI.

---

## Risks & limits

1. **Visual fidelity ~95–99%.** SuperDoc is the best browser option. Rare Word features (SmartArt, embedded charts, exotic fonts) may look slightly off. Fine for standard LOIs.
2. **Placeholder naming matters.** Template authors must use `{snake_case}` tags matching `SITE_FIELDS` keys. Short "How to prepare an LOI template" guide shipped alongside.
3. **Edits are lost when mapping changes.** Intentional (output must be deterministic from site + mapping). Confirm dialog prevents accidents.

---

## What this plan does NOT include (FE scope)

- No backend (NestJS comes next, separate workstream).
- No auth / users / roles.
- No `.doc` support.
- No manual value override on left panel (post-fill editing happens in the right-panel editor).
- No multi-site batch export.

---

## To start Phase 0

Need from the client:
1. One sample `.docx` LOI template (with `{placeholder}` tags).
2. Confirmation of the exact site fields on the Figma site card so `sites.json` matches 1:1.

Once received: spike SuperDoc on day 1, scaffold Phase 1 on day 2.
