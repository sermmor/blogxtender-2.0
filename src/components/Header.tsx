import React from 'react';
import * as S from '../styles/AppCss';

interface Props {
  mode: 'edit' | 'preview';
  onModeChange: (mode: 'edit' | 'preview') => void;
  onExport: () => void;
  onImportMarkdown: () => void;
}

const Header: React.FC<Props> = ({ mode, onModeChange, onExport, onImportMarkdown }) => (
  <div style={S.headerBar()}>
    <div style={S.headerLeft()}>
      <span style={S.logoText()}>BlogXtender</span>
      <div style={S.modeToggleGroup()}>
        <button
          style={S.modeToggleBtn(mode === 'edit')}
          onClick={() => onModeChange('edit')}
        >
          Edit
        </button>
        <button
          style={S.modeToggleBtn(mode === 'preview')}
          onClick={() => onModeChange('preview')}
        >
          Preview
        </button>
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
