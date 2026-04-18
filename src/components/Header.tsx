import React from 'react';
import * as S from '../styles/AppCss';

type Mode = 'edit' | 'wysiwyg' | 'preview';

interface Props {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onExport: () => void;
  onImportMarkdown: () => void;
}

const MODES: { id: Mode; label: string; title: string }[] = [
  { id: 'edit',    label: 'Edit HTML', title: 'Edit raw HTML source' },
  { id: 'preview', label: 'Preview',   title: 'Render preview of the final output' },
  { id: 'wysiwyg', label: 'Edit View',   title: 'Edit visually like a word processor' },
];

const Header: React.FC<Props> = ({ mode, onModeChange, onExport, onImportMarkdown }) => (
  <div style={S.headerBar()}>
    <div style={S.headerLeft()}>
      <span style={S.logoText()}>BlogXtender</span>
      <div style={S.modeToggleGroup()}>
        {MODES.map(({ id, label, title }) => (
          <button
            key={id}
            style={S.modeToggleBtn(mode === id)}
            title={title}
            onClick={() => onModeChange(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
    <div style={S.headerRight()}>
      <button
        style={{
          ...S.exportBtn(),
          background: 'transparent',
          color: '#7c3aed',
          border: '1px solid #7c3aed',
        }}
        onClick={onImportMarkdown}
        title="Import Markdown and append to editor"
      >
        Import MD
      </button>
      <button style={S.exportBtn()} onClick={onExport}>Export</button>
    </div>
  </div>
);

export default Header;
