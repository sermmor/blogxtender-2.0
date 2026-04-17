import React from 'react';
import { useEditor } from '../context/EditorContext';
import * as S from '../styles/AppCss';

const INITIAL_CONTENT = '<div style="text-align:justify;">\n\n</div>';

interface Props {
  mode: 'edit' | 'preview';
  previewHtml: string;
}

const EditorPanel: React.FC<Props> = ({ mode, previewHtml }) => {
  const { textareaRef } = useEditor();

  return (
    <div style={S.editorWrapper()}>
      {/*
        The textarea is ALWAYS mounted so its value is never lost.
        We hide it with display:none when in preview mode.
      */}
      <textarea
        ref={textareaRef}
        style={{ ...S.editorTextarea(), display: mode === 'edit' ? 'block' : 'none' }}
        name="contenidoTextoXtender"
        defaultValue={INITIAL_CONTENT}
      />
      {mode === 'preview' && (
        <div
          style={S.previewArea()}
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      )}
    </div>
  );
};

export default EditorPanel;
