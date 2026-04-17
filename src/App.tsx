import React, { useState, useCallback, useEffect } from 'react';
import { useEditor } from './context/EditorContext';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import EditorPanel from './components/EditorPanel';
import Sidebar from './components/Sidebar';
import { createCodeEntry } from './utils/previewUtils';
import * as S from './styles/AppCss';

const App: React.FC = () => {
  const { insertCode, getContent } = useEditor();

  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [previewHtml, setPreviewHtml] = useState('');
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Note-zone / tools settings shared with sidebar sections
  const [pasarABr, setPasarABr]       = useState(false);
  const [pasarANotas, setPasarANotas] = useState(false);
  const [tituloNota, setTituloNota]   = useState('');
  const [colorNota, setColorNota]     = useState('FFD0DF');

  // Toggle sidebar tool (click same tool again to close)
  const handleToolToggle = useCallback((tool: string) => {
    setActiveTool((prev) => (prev === tool ? null : tool));
  }, []);

  // Switch Edit / Preview
  const handleModeChange = useCallback((newMode: 'edit' | 'preview') => {
    if (newMode === 'preview') {
      const content = getContent();
      const html = createCodeEntry(content, tituloNota, pasarANotas, pasarABr, colorNota);
      setPreviewHtml(html);
    }
    setMode(newMode);
  }, [getContent, tituloNota, pasarANotas, pasarABr, colorNota]);

  // Export to new window
  const handleExport = useCallback(() => {
    const content = getContent();
    const html = createCodeEntry(content, tituloNota, pasarANotas, true, colorNota);
    const marcaDeUso = '<br /><br /><i>Created with BlogXtender.</i>';

    const principio =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtmlll/DTD/xhtmlll.dtd">\n` +
      `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">\n<head>\n` +
      `  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n` +
      `  <title>BlogXtender - Export</title>\n</head>\n\n<body>\n` +
      `Code html embedded (to post in a blog or a website):<br />\n` +
      `<textarea rows="15" cols="93">`;

    const mitad =
      `</textarea><br /><br />\n` +
      `Complete HTML code (for create a website with it):<br />\n` +
      `<textarea rows="15" cols="93">`;

    const fullHtml =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtmlll/DTD/xhtmlll.dtd">\n` +
      `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">\n<head>\n` +
      `  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n` +
      `  <title></title>\n</head>\n\n<body>\n` +
      html + marcaDeUso + `\n</body>\n</html>\n`;

    const fin = `</textarea><br /><br />\n</body>\n</html>\n`;

    const win = window.open('', 'export_dialog', 'width=800,height=600,toolbar=0,status=0');
    if (win) {
      win.document.write(principio + html + mitad + fullHtml + fin);
      win.document.close();
    }
  }, [getContent, tituloNota, pasarANotas, colorNota]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && !e.altKey && !e.metaKey) {
        if (e.key === 'b') {
          e.preventDefault();
          insertCode('<span style="font-weight: bold;">', '</span>');
        } else if (e.key === 'i') {
          e.preventDefault();
          insertCode('<span style="font-style: oblique;">', '</span>');
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [insertCode]);

  return (
    <div style={S.appContainer()}>
      <Header
        mode={mode}
        onModeChange={handleModeChange}
        onExport={handleExport}
      />
      <Toolbar
        activeTool={activeTool}
        onToolToggle={handleToolToggle}
        mode={mode}
      />
      <div style={S.contentArea()}>
        <EditorPanel mode={mode} previewHtml={previewHtml} />
        <Sidebar
          activeTool={activeTool}
          onClose={() => setActiveTool(null)}
          pasarABr={pasarABr}
          onPasarABrChange={setPasarABr}
          pasarANotas={pasarANotas}
          onPasarANotasChange={setPasarANotas}
          tituloNota={tituloNota}
          onTituloNotaChange={setTituloNota}
          colorNota={colorNota}
          onColorNotaChange={setColorNota}
        />
      </div>
    </div>
  );
};

export default App;
