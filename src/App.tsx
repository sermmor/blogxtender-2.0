import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { useEditor } from './context/EditorContext';
import Header from './components/Header';
import EditorPanel from './components/EditorPanel';
import ToolsPanel, { SectionsState } from './components/ToolsPanel';
import PreviewSection from './components/PreviewSection';
import { createCodeEntry } from './utils/previewUtils';

const INITIAL_SECTIONS: SectionsState = {
  idEdicion: false,
  idHerramientas: false,
  idTabla: false,
  idSubrayadoColor: false,
  idCitar: false,
  idFraseLateral: false,
  idYoutubeInsert: false,
  idImagen: false,
  idListImagenes: false,
  idZonaNotas: false,
};

const SHORTCUT_MAP: Record<string, keyof SectionsState> = {
  h: 'idHerramientas',
  e: 'idEdicion',
  t: 'idTabla',
  s: 'idSubrayadoColor',
  c: 'idCitar',
  f: 'idFraseLateral',
  y: 'idYoutubeInsert',
  i: 'idImagen',
  l: 'idListImagenes',
  z: 'idZonaNotas',
};

const App: React.FC = () => {
  const { insertCode, getContent } = useEditor();
  const [sections, setSections] = useState<SectionsState>(INITIAL_SECTIONS);
  const [pasarABr, setPasarABr] = useState(false);
  const [pasarANotas, setPasarANotas] = useState(false);
  const [tituloNota, setTituloNota] = useState('');
  const [colorNota, setColorNota] = useState('FFD0DF');

  const toggleSection = useCallback((id: keyof SectionsState) => {
    setSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const sectionId = SHORTCUT_MAP[e.key.toLowerCase()];
        if (sectionId) {
          e.preventDefault();
          toggleSection(sectionId);
        }
      } else if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        insertCode('<span style="font-weight: bold;">', '</span>');
      } else if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        insertCode('<span style="font-style: oblique;">', '</span>');
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [toggleSection, insertCode]);

  const handleExport = () => {
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
  };

  return (
    <div>
      <Header onExport={handleExport} />

      <div style={{ display: 'flex', gap: '5px' }}>
        <EditorPanel />
        <ToolsPanel
          sections={sections}
          onToggleSection={toggleSection}
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

      <div className="floatstop"> </div>
      <br />
      <em>
        Programmed and designed by Sergio Martín (
        <a href="https://twitter.com/sermmor" target="_blank" rel="noreferrer">@sermmor</a>
        ).{' '}
        <a href="http://www.gnu.org/licenses/gpl.html">GNU GPLv3 License.</a>
      </em>
      <div className="floatstop"> </div>
      <br />
      <hr />

      <PreviewSection
        pasarABr={pasarABr}
        pasarANotas={pasarANotas}
        tituloNota={tituloNota}
        colorNota={colorNota}
      />

      <div className="floatstop"> </div>
      <br />
      <em>
        Programmed and designed by Sergio Martín (
        <a href="https://twitter.com/sermmor" target="_blank" rel="noreferrer">@sermmor</a>
        ).{' '}
        <a href="http://www.gnu.org/licenses/gpl.html">GNU GPLv3 License.</a>
      </em>
    </div>
  );
};

export default App;
