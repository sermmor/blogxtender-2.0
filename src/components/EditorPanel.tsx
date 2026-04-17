import React from 'react';
import { useEditor } from '../context/EditorContext';

const INITIAL_CONTENT = '<div style="text-align:justify;">\n\n</div>';

const EditorPanel: React.FC = () => {
  const { textareaRef } = useEditor();

  return (
    <div id="contentXtender">
      <textarea
        ref={textareaRef}
        id="idContenidoTextoXtender"
        name="contenidoTextoXtender"
        defaultValue={INITIAL_CONTENT}
      />
    </div>
  );
};

export default EditorPanel;
