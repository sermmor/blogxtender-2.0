/**
 * HTML → Markdown converter for BlogXtender output.
 * Uses the browser's DOMParser so no third-party library is needed.
 * Handles all tags that BlogXtender's insertionUtils can produce.
 */

export function htmlToMarkdown(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const raw = convertNode(doc.body);
  // Collapse 3+ consecutive newlines to 2, then trim
  return raw.replace(/\n{3,}/g, '\n\n').trim();
}

// ── Node dispatcher ───────────────────────────────────────────────────────────

function convertNode(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? '';
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return '';

  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();

  switch (tag) {
    // ── Skip ──
    case 'script':
    case 'style':
    case 'head':
      return '';

    // ── Void / separators ──
    case 'br':
      return '\n';
    case 'hr':
      return '\n\n---\n\n';

    // ── Headings ──
    case 'h1': return `\n\n# ${inner(el).trim()}\n\n`;
    case 'h2': return `\n\n## ${inner(el).trim()}\n\n`;
    case 'h3': return `\n\n### ${inner(el).trim()}\n\n`;
    case 'h4': return `\n\n#### ${inner(el).trim()}\n\n`;
    case 'h5': return `\n\n##### ${inner(el).trim()}\n\n`;
    case 'h6': return `\n\n###### ${inner(el).trim()}\n\n`;

    // ── Block containers ──
    case 'p': {
      const text = inner(el).trim();
      return text ? `\n\n${text}\n\n` : '';
    }
    case 'div': {
      const text = inner(el).trim();
      return text ? `\n\n${text}\n\n` : '';
    }
    case 'blockquote': {
      const text = inner(el).trim();
      const quoted = text.split('\n').map((l) => `> ${l}`).join('\n');
      return `\n\n${quoted}\n\n`;
    }

    // ── Inline formatting ──
    case 'strong':
    case 'b':
      return `**${inner(el)}**`;
    case 'em':
    case 'i':
      return `*${inner(el)}*`;
    case 's':
    case 'del':
    case 'strike':
      return `~~${inner(el)}~~`;
    case 'u':
      return `_${inner(el)}_`;
    case 'sup':
      return `^${inner(el)}`;
    case 'sub':
      return `~${inner(el)}`;

    // ── Links & images ──
    case 'a': {
      const href = el.getAttribute('href') ?? '';
      const text = inner(el).trim();
      if (!text) return href;
      return `[${text}](${href})`;
    }
    case 'img': {
      const src = el.getAttribute('src') ?? '';
      const alt = el.getAttribute('alt') ?? '';
      return `![${alt}](${src})`;
    }

    // ── Lists ──
    case 'ul': {
      const items = liChildren(el);
      const lines = items.map((li) => `- ${inner(li).trim()}`);
      return `\n\n${lines.join('\n')}\n\n`;
    }
    case 'ol': {
      const items = liChildren(el);
      const lines = items.map((li, i) => `${i + 1}. ${inner(li).trim()}`);
      return `\n\n${lines.join('\n')}\n\n`;
    }
    case 'li':
      // Handled by ul/ol; if orphaned, render as a bullet
      return `- ${inner(el).trim()}\n`;

    // ── Table ──
    case 'table':
      return convertTable(el);

    // ── Span: detect BlogXtender inline styles ──
    case 'span': {
      const style = el.getAttribute('style') ?? '';
      const text = inner(el);
      if (style.includes('font-weight: bold'))                              return `**${text}**`;
      if (style.includes('font-style: oblique') ||
          style.includes('font-style: italic'))                             return `*${text}*`;
      if (style.includes('line-through'))                                   return `~~${text}~~`;
      if (style.includes('text-decoration: underline'))                     return `_${text}_`;
      if (style.includes('vertical-align: super'))                          return `^${text}`;
      if (style.includes('vertical-align: sub'))                            return `~${text}`;
      return text;
    }

    // ── Anything else: just recurse into children ──
    default:
      return inner(el);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Recursively convert all child nodes and join results. */
function inner(el: HTMLElement): string {
  return Array.from(el.childNodes).map(convertNode).join('');
}

/** Return direct <li> children of a list element. */
function liChildren(el: HTMLElement): HTMLElement[] {
  return Array.from(el.children)
    .filter((c) => c.tagName === 'LI') as HTMLElement[];
}

/** Convert an HTML <table> to a GitHub-Flavoured Markdown table. */
function convertTable(table: HTMLElement): string {
  const rows = Array.from(table.querySelectorAll('tr'));
  if (rows.length === 0) return '';

  const toCell = (td: Element) =>
    inner(td as HTMLElement).trim().replace(/\|/g, '\\|').replace(/\n+/g, ' ') || ' ';

  const headerCells = Array.from(rows[0].querySelectorAll('th, td')).map(toCell);
  const separator   = headerCells.map(() => '---');

  const bodyRows = rows.slice(1).map((row) =>
    Array.from(row.querySelectorAll('td, th')).map(toCell)
  );

  const format = (cells: string[]) => `| ${cells.join(' | ')} |`;

  const lines = [
    format(headerCells),
    format(separator),
    ...bodyRows.map(format),
  ];

  return `\n\n${lines.join('\n')}\n\n`;
}
