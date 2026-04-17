import React, { useState, useEffect, useRef } from 'react';
import * as S from '../styles/AppCss';

type Tab = 'embedded' | 'full' | 'markdown';

const TAB_LABELS: Record<Tab, string> = {
  embedded: 'Embedded HTML',
  full:     'Full HTML document',
  markdown: 'Markdown',
};

const TAB_DESCRIPTIONS: Record<Tab, string> = {
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const content: Record<Tab, string> = { embedded, full, markdown };
  const current = content[tab];

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
      // Fallback for browsers without clipboard API
      textareaRef.current?.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Click on overlay backdrop to close
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
              onClick={() => { setTab(t); setCopied(false); }}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={S.modalBody()}>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, flexShrink: 0 }}>
            {TAB_DESCRIPTIONS[tab]}
          </p>
          <textarea
            ref={textareaRef}
            readOnly
            style={S.modalCode()}
            value={current}
            onFocus={() => textareaRef.current?.select()}
          />
        </div>

        {/* Footer */}
        <div style={S.modalFooter()}>
          <span style={S.charCount()}>
            {current.length.toLocaleString()} characters
          </span>
          <button style={S.copyBtn(copied)} onClick={handleCopy}>
            {copied ? '✓ Copied!' : 'Copy to clipboard'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ExportModal;
