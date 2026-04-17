import React from 'react';
import { useEditor } from '../context/EditorContext';
import * as S from '../styles/AppCss';

const INITIAL_CONTENT = '<div style="text-align:justify;">\n\n</div>';

const EditorPanel: React.FC = () => {
  const { textareaRef } = useEditor();

  return (
    <div style={S.contentXtender()}>
      <textarea
        ref={textareaRef}
        style={S.contenidoTextoXtender()}
        name="contenidoTextoXtender"
        defaultValue={INITIAL_CONTENT}
      />
    </div>
  );
};

export default EditorPanel;
