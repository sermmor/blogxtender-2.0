import React, { useState, useEffect, useRef } from 'react';
import * as S from '../styles/AppCss';

type Tab = 'embedded' | 'full' | 'markdown' | 'substack';

const TAB_LABELS: Record<Tab, string> = {
  embedded: 'Embedded HTML',
  full:     'Full HTML document',
  markdown: 'Markdown',
  substack: 'Substack',
};

const TAB_DESCRIPTIONS: Record<Exclude<Tab, 'substack'>, string> = {
  embedded: 'Paste this into your blog post editor (WordPress, Blogger, etc.)',
  full:     'Complete XHTML document — save as .html to open in a browser',
  markdown: 'Markdown version — paste into Ghost, Notion, GitHub, etc.',
};

interface Props {
  embedded: string;
  full: string;
  markdown: string;
  onClose: () => void;
}

const ExportModal: React.FC<Props> = ({ embedded, full, markdown, onClose }) => {
  const [tab, setTab] = useState<Tab>('embedded');
  const [copied, setCopied] = useState(false);
  const [substackCopied, setSubstackCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const content: Record<Exclude<Tab, 'substack'>, string> = { embedded, full, markdown };
  const current = tab !== 'substack' ? content[tab as Exclude<Tab, 'substack'>] : '';

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Scroll textarea to top when switching tabs
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;
    }
  }, [tab]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(current);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      textareaRef.current?.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /** Copy as text/html so Substack (and other rich-text editors) paste it as rendered HTML. */
  const handleSubstackCopy = async () => {
    const html = embedded;

    // Preferred path: ClipboardItem with text/html MIME type
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      try {
        const blob = new Blob([html], { type: 'text/html' });
        await navigator.clipboard.write([
          new ClipboardItem({ 'text/html': blob }),
        ]);
        setSubstackCopied(true);
        setTimeout(() => setSubstackCopied(false), 2500);
        return;
      } catch {
        // fall through to DOM fallback
      }
    }

    // Fallback: render into a hidden div and use execCommand('copy')
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
    div.innerHTML = html;
    document.body.appendChild(div);
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(div);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }
    document.body.removeChild(div);
    setSubstackCopied(true);
    setTimeout(() => setSubstackCopied(false), 2500);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div style={S.modalOverlay()} onClick={handleOverlayClick}>
      <div style={S.modalBox()}>

        {/* Header */}
        <div style={S.modalHead()}>
          <span style={S.modalTitle()}>Export</span>
          <button style={S.modalCloseBtn()} onClick={onClose} title="Close (Esc)">✕</button>
        </div>

        {/* Tabs */}
        <div style={S.modalTabBar()}>
          {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
            <button
              key={t}
              style={S.modalTab(tab === t)}
              onClick={() => { setTab(t); setCopied(false); setSubstackCopied(false); }}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Body */}
        {tab === 'substack' ? (
          <div style={{ ...S.modalBody(), gap: '16px' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '8px 0',
            }}>
              <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: '1.6' }}>
                <strong>Paste rich text directly into Substack</strong> — no raw HTML visible.
              </p>
              <ol style={{ fontSize: '13px', color: '#6b7280', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>Click <strong>"Copy for Substack"</strong> below.</li>
                <li>Open your Substack post editor.</li>
                <li>Press <kbd style={{ background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', padding: '1px 5px' }}>Ctrl+V</kbd> (or <kbd style={{ background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', padding: '1px 5px' }}>⌘V</kbd> on Mac).</li>
                <li>Your formatted content will appear as rendered rich text.</li>
              </ol>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                This copies the content as <code>text/html</code> MIME type so Substack recognises it as formatted text rather than raw code.
              </p>
            </div>
          </div>
        ) : (
          <div style={S.modalBody()}>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, flexShrink: 0 }}>
              {TAB_DESCRIPTIONS[tab as Exclude<Tab, 'substack'>]}
            </p>
            <textarea
              ref={textareaRef}
              readOnly
              style={S.modalCode()}
              value={current}
              onFocus={() => textareaRef.current?.select()}
            />
          </div>
        )}

        {/* Footer */}
        <div style={S.modalFooter()}>
          {tab !== 'substack' ? (
            <>
              <span style={S.charCount()}>
                {current.length.toLocaleString()} characters
              </span>
              <button style={S.copyBtn(copied)} onClick={handleCopy}>
                {copied ? '✓ Copied!' : 'Copy to clipboard'}
              </button>
            </>
          ) : (
            <>
              <span style={S.charCount()}>
                {embedded.length.toLocaleString()} characters
              </span>
              <button
                style={{
                  ...S.copyBtn(substackCopied),
                  background: substackCopied ? '#059669' : '#f97316',
                  borderColor: substackCopied ? '#059669' : '#ea580c',
                }}
                onClick={handleSubstackCopy}
              >
                {substackCopied ? '✓ Copied for Substack!' : 'Copy for Substack'}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default ExportModal;
