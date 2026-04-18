import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useEditor } from './context/EditorContext';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import EditorPanel from './components/EditorPanel';
import Sidebar from './components/Sidebar';
import ExportModal from './components/ExportModal';
import ImportMarkdownModal from './components/ImportMarkdownModal';
import { createCodeEntry } from './utils/previewUtils';
import { htmlToMarkdown } from './utils/markdownUtils';
import * as S from './styles/AppCss';

type Mode = 'edit' | 'wysiwyg' | 'preview';

const App: React.FC = () => {
  const { insertCode, getContent, textareaRef } = useEditor();

  const [mode, setMode]       = useState<Mode>('edit');
  const [previewHtml, setPreviewHtml] = useState('');
  const [activeTool, setActiveTool]   = useState<string | null>(null);
  const [exportData, setExportData]   = useState<{ embedded: string; full: string; markdown: string } | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);

  // ── WYSIWYG content sync ──────────────────────────────────────────────────
  // wysiwygInitContent: passed to WysiwygPanel as seed when entering WYSIWYG mode.
  // wysiwygHtmlRef:     updated on every Tiptap onUpdate so we always have the
  //                     latest HTML even before the user switches modes.
  const [wysiwygInitContent, setWysiwygInitContent] = useState('');
  const wysiwygHtmlRef = useRef('');

  const handleWysiwygUpdate = useCallback((html: string) => {
    wysiwygHtmlRef.current = html;
  }, []);

  // Returns the most up-to-date HTML regardless of current mode
  const getCurrentContent = useCallback((): string => {
    if (mode === 'wysiwyg') return wysiwygHtmlRef.current || getContent();
    return getContent();
  }, [mode, getContent]);

  // ── Note-zone / tools settings shared with sidebar sections ──────────────
  const [pasarABr, setPasarABr]       = useState(false);
  const [pasarANotas, setPasarANotas] = useState(false);
  const [tituloNota, setTituloNota]   = useState('');
  const [colorNota, setColorNota]     = useState('FFD0DF');

  // ── Mode switching ────────────────────────────────────────────────────────
  const handleModeChange = useCallback((newMode: Mode) => {
    if (newMode === mode) return;

    // Leaving WYSIWYG → flush Tiptap HTML back into the hidden textarea
    if (mode === 'wysiwyg' && newMode !== 'wysiwyg') {
      const html = wysiwygHtmlRef.current;
      if (textareaRef.current && html) {
        textareaRef.current.value = html;
      }
    }

    // Entering WYSIWYG → seed the editor with the current textarea content
    if (newMode === 'wysiwyg') {
      const content = getContent();
      wysiwygHtmlRef.current = content;
      setWysiwygInitContent(content);
    }

    // Entering Preview → build rendered HTML
    if (newMode === 'preview') {
      const content = mode === 'wysiwyg'
        ? (wysiwygHtmlRef.current || getContent())
        : getContent();
      const html = createCodeEntry(content, tituloNota, pasarANotas, pasarABr, colorNota);
      setPreviewHtml(html);
    }

    // Hide sidebar when switching to WYSIWYG (its tools use insertCode into textarea)
    if (newMode === 'wysiwyg') setActiveTool(null);

    setMode(newMode);
  }, [mode, getContent, textareaRef, tituloNota, pasarANotas, pasarABr, colorNota]);

  // ── Sidebar tool toggle ───────────────────────────────────────────────────
  const handleToolToggle = useCallback((tool: string) => {
    setActiveTool((prev) => (prev === tool ? null : tool));
  }, []);

  // ── Export ────────────────────────────────────────────────────────────────
  const handleExport = useCallback(() => {
    const content = getCurrentContent();
    const embedded = createCodeEntry(content, tituloNota, pasarANotas, true, colorNota);
    const marcaDeUso = '\n<br /><br /><i>Created with BlogXtender.</i>';

    const full =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtmlll/DTD/xhtmlll.dtd">\n` +
      `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">\n<head>\n` +
      `  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n` +
      `  <title></title>\n</head>\n\n<body>\n` +
      embedded + marcaDeUso + `\n</body>\n</html>\n`;

    const markdown = htmlToMarkdown(embedded);
    setExportData({ embedded, full, markdown });
  }, [getCurrentContent, tituloNota, pasarANotas, colorNota]);

  // ── Import Markdown ───────────────────────────────────────────────────────
  const handleImportMarkdown = useCallback((html: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.value = ta.value + '\n' + html;
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
  }, [textareaRef]);

  // ── Keyboard shortcuts (HTML edit mode only) ──────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (mode !== 'edit') return;
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
  }, [mode, insertCode]);

  return (
    <div style={S.appContainer()}>

      {exportData && (
        <ExportModal
          embedded={exportData.embedded}
          full={exportData.full}
          markdown={exportData.markdown}
          onClose={() => setExportData(null)}
        />
      )}

      {showImportModal && (
        <ImportMarkdownModal
          onImport={handleImportMarkdown}
          onClose={() => setShowImportModal(false)}
        />
      )}

      <Header
        mode={mode}
        onModeChange={handleModeChange}
        onExport={handleExport}
        onImportMarkdown={() => setShowImportModal(true)}
      />

      {/* HTML toolbar — only visible in edit mode; WYSIWYG has its own toolbar */}
      <Toolbar
        activeTool={activeTool}
        onToolToggle={handleToolToggle}
        mode={mode}
      />

      <div style={S.contentArea()}>
        <EditorPanel
          mode={mode}
          previewHtml={previewHtml}
          wysiwygInitContent={wysiwygInitContent}
          onWysiwygUpdate={handleWysiwygUpdate}
        />

        {/* Sidebar disabled in WYSIWYG mode (its tools write into the textarea) */}
        {mode !== 'wysiwyg' && (
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
        )}
      </div>

    </div>
  );
};

export default App;
