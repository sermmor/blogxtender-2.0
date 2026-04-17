# BlogXtender 2.0

A modern, Substack-inspired **HTML editor for bloggers** — built with React 18 and TypeScript.  
Write rich HTML content visually, preview it, and export it ready to paste into WordPress, Blogger, Substack, Ghost, or any other platform.

🌐 **Live app:** [sermmor.github.io/blogxtender-2.0](https://sermmor.github.io/blogxtender-2.0)

---

## Features

### Editor
- **HTML textarea editor** with an uncontrolled `<textarea>` — no cursor-jump issues, full undo history preserved.
- **Edit / Preview** toggle: preview renders your HTML in real time without losing editor content.
- **Keyboard shortcuts:** `Ctrl+B` (bold), `Ctrl+I` (italic).

### Toolbar
| Group | Buttons |
|---|---|
| Special chars | Ω menu with symbols, arrows, maths, etc. |
| Case | UPPERCASE / lowercase |
| Inline style | Bold · Italic · Underline · Overline · Strikethrough · Superscript · Subscript |
| Headings | H1 · H2 · H3 |
| Paragraph | Indent control (pt) · `<p>` · `<blockquote>` · Align left/center/right/justify · 2-column layout |
| Lists | `<li>` · `<ul>` · `<ol>` · Convert `- ` lines to `<ul>` · Convert `#- ` lines to `<ol>` |
| Link | Popover to insert `<a href>` |
| Sidebar tools | Table · Color Highlight · Quote · Pull Quote · YouTube · Picture · Gallery · Notes · Find & Replace |

### Sidebar panels (slide-in, 300 px)
Each sidebar tool opens a right-side panel:

| Tool | What it inserts |
|---|---|
| **Table** | Custom rows × columns HTML table |
| **Color Highlight** | Coloured underline / highlight spans |
| **Quote** | Styled `<blockquote>` |
| **Pull Quote** | Lateral pull-quote with custom styling |
| **YouTube** | `<iframe>` embed with optional caption |
| **Picture** | `<figure>` with image URL, caption, alignment, width |
| **Gallery** | Multi-image gallery with thumbnail grid |
| **Notes** | Coloured note-zone box with title |
| **Find & Replace** | Search and replace text inside the editor |

### Export modal (4 tabs)
| Tab | Description |
|---|---|
| **Embedded HTML** | Paste directly into WordPress, Blogger, etc. |
| **Full HTML document** | Complete XHTML file ready to save as `.html` |
| **Markdown** | Converted Markdown for Ghost, Notion, GitHub, etc. |
| **Substack** | Copies content as `text/html` MIME type so Substack pastes it as rich text (not raw code) |

### Import Markdown
Click **Import MD** in the header to open a dialog where you can paste Markdown.  
The content is converted to BlogXtender-style HTML and **appended** to the current editor content.

Supported Markdown syntax:
- Headings `#` / `##` / `###`
- Bold `**text**`, italic `*text*`, bold+italic `***text***`, strikethrough `~~text~~`
- Links `[text](url)`, images `![alt](url)`
- Unordered lists `- item`, ordered lists `1. item`
- Blockquotes `> text`
- Horizontal rules `---`
- Inline code `` `code` ``

---

## Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 18.2 |
| Language | TypeScript 4.9 |
| Build | Create React App 5 (react-scripts) |
| Styling | Inline `React.CSSProperties` — zero CSS files, all tokens in `AppCss.ts` |
| State | `useState` / `useCallback` / `useRef` — no external state library |
| Editor state | Uncontrolled `<textarea>` via `EditorContext` |
| Clipboard | `navigator.clipboard.write` (ClipboardItem) with `execCommand` fallback |
| Markdown ↔ HTML | Custom parsers in `src/utils/markdownUtils.ts` — no third-party library |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Project structure

```
src/
├── App.tsx                        # Root: layout, mode state, export/import orchestration
├── context/
│   └── EditorContext.tsx          # Shared textarea ref + helpers (insertCode, getContent, …)
├── components/
│   ├── Header.tsx                 # Logo, Edit/Preview toggle, Export, Import MD buttons
│   ├── Toolbar.tsx                # Horizontal formatting bar
│   ├── EditorPanel.tsx            # Textarea (edit) + preview div (preview)
│   ├── Sidebar.tsx                # Sliding right panel, delegates to section components
│   ├── ExportModal.tsx            # 4-tab export dialog
│   ├── ImportMarkdownModal.tsx    # Markdown → HTML import dialog
│   ├── LinkPopover.tsx            # URL popover for link insertion
│   ├── SpecialCharsMenu.tsx       # Special characters dropdown
│   └── sections/
│       ├── TableSection.tsx
│       ├── ColorUnderlineSection.tsx
│       ├── QuoteSection.tsx
│       ├── LateralTextSection.tsx
│       ├── YoutubeSection.tsx
│       ├── PictureSection.tsx
│       ├── PictureListSection.tsx
│       ├── NoteZoneSection.tsx
│       └── ToolsSection.tsx
├── styles/
│   └── AppCss.ts                  # All styles as TypeScript functions returning CSSProperties
└── utils/
    ├── markdownUtils.ts           # markdownToHtml() + htmlToMarkdown()
    └── previewUtils.ts            # createCodeEntry() — assembles final HTML for preview/export
```

---

## Local development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm start

# Production build
npm run build
```

---

## Deployment to GitHub Pages

Deployment is **fully automated** via GitHub Actions.

**One-time setup (do this once in your repo settings):**

1. Go to **Settings → Pages** in your GitHub repository.
2. Under *Source*, select **GitHub Actions**.
3. Save. That's it.

**After that, every push to `main` automatically:**
1. Installs dependencies (`npm ci`).
2. Builds the app (`npm run build`).
3. Deploys the `build/` folder to GitHub Pages.

The live URL will be: `https://sermmor.github.io/blogxtender-2.0`

> The `homepage` field in `package.json` is already set to that URL so all asset paths resolve correctly.

---

## Design system

All visual tokens live in `src/styles/AppCss.ts`:

| Token | Value |
|---|---|
| Primary accent | `#7c3aed` (purple) |
| Accent hover | `#6d28d9` |
| Background | `#f9fafb` |
| Surface | `#ffffff` |
| Border | `#e5e7eb` |
| Text primary | `#111827` |
| Text muted | `#6b7280` |

---

## License

MIT
