import React, { useState, useEffect, useRef } from 'react';
import * as S from '../styles/AppCss';
import { markdownToHtml } from '../utils/markdownUtils';

interface Props {
  onImport: (html: string) => void;
  onClose: () => void;
}

const ImportMarkdownModal: React.FC<Props> = ({ onImport, onClose }) => {
  const [markdown, setMarkdown] = useState('');
  const [preview, setPreview] = useState('');
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Focus textarea when modal opens
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handlePreviewTab = () => {
    setPreview(markdownToHtml(markdown));
    setTab('preview');
  };

  const handleImport = () => {
    if (!markdown.trim()) return;
    const html = markdownToHtml(markdown);
    onImport(html);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div style={S.modalOverlay()} onClick={handleOverlayClick}>
      <div style={{ ...S.modalBox(), width: '680px', maxWidth: '94vw' }}>

        {/* Header */}
        <div style={S.modalHead()}>
          <span style={S.modalTitle()}>Import Markdown</span>
          <button style={S.modalCloseBtn()} onClick={onClose} title="Close (Esc)">✕</button>
        </div>

        {/* Tabs */}
        <div style={S.modalTabBar()}>
          <button
            style={S.modalTab(tab === 'write')}
            onClick={() => setTab('write')}
          >
            Write
          </button>
          <button
            style={S.modalTab(tab === 'preview')}
            onClick={handlePreviewTab}
          >
            Preview HTML
          </button>
        </div>

        {/* Body */}
        <div style={S.modalBody()}>
          {tab === 'write' ? (
            <>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, flexShrink: 0 }}>
                Paste your Markdown here. It will be converted to HTML and appended to the editor.
              </p>
              <textarea
                ref={textareaRef}
                style={{ ...S.modalCode(), resize: 'vertical' }}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="# Heading&#10;&#10;**Bold text**, *italic text*&#10;&#10;- List item 1&#10;- List item 2"
                readOnly={false}
              />
            </>
          ) : (
            <>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, flexShrink: 0 }}>
                This HTML will be appended to your editor content.
              </p>
              <textarea
                style={S.modalCode()}
                value={preview}
                readOnly
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div style={S.modalFooter()}>
          <span style={S.charCount()}>
            {markdown.length.toLocaleString()} characters
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              style={{
                ...S.copyBtn(false),
                background: 'transparent',
                color: '#6b7280',
                border: '1px solid #d1d5db',
              }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              style={S.copyBtn(false)}
              onClick={handleImport}
              disabled={!markdown.trim()}
              title={!markdown.trim() ? 'Paste some Markdown first' : undefined}
            >
              Import &amp; Append
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImportMarkdownModal;
