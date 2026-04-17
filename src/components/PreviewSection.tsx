import React, { useRef, useState } from 'react';
import { useEditor } from '../context/EditorContext';
import ColorPickerInput from './ColorPickerInput';
import { intercambiaSaltosPorBr } from '../utils/textUtils';
import { convertirLlavesEnNotas } from '../utils/notesUtils';
import { createZonaNotas } from '../utils/previewUtils';
import * as S from '../styles/AppCss';

interface Props {
  pasarABr: boolean;
  pasarANotas: boolean;
  tituloNota: string;
  colorNota: string;
}

const PreviewSection: React.FC<Props> = ({
  pasarABr,
  pasarANotas,
  tituloNota,
  colorNota,
}) => {
  const { getContent } = useEditor();
  const [previewHtml, setPreviewHtml] = useState('');
  const [underlineType, setUnderlineType] = useState<'simple' | 'color'>('simple');
  const [underlineColor, setUnderlineColor] = useState('fffda5');
  const [underlinePreview, setUnderlinePreview] = useState('');
  const savedRangeRef = useRef<Range | null>(null);

  const buildCodeEntry = (forceBr: boolean): string => {
    const content = getContent();
    const withBr = intercambiaSaltosPorBr(content, forceBr);
    const [textoSinNotas, contentNotas] = convertirLlavesEnNotas(withBr, tituloNota, pasarANotas);
    if (contentNotas) {
      return textoSinNotas + '<br />\n' + createZonaNotas(contentNotas, colorNota, forceBr);
    }
    return textoSinNotas;
  };

  const handleRefreshPreview = () => {
    setPreviewHtml(buildCodeEntry(true));
  };

  const handlePrint = () => {
    const win = window.open('', 'print_preview', 'height=400,width=600');
    if (!win) return;
    win.document.write('<html><head><title></title></head><body>');
    win.document.write(previewHtml);
    win.document.write('</body></html>');
    win.print();
    win.close();
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setUnderlinePreview('');
      return;
    }
    const selectedText = selection.toString();
    if (!selectedText) {
      setUnderlinePreview('');
      return;
    }
    savedRangeRef.current = selection.getRangeAt(0).cloneRange();
    const brText = selectedText.replace(/(\r\n|\n|\r)/gm, '<br />');
    if (underlineType === 'color') {
      setUnderlinePreview(`<span style="background-color:#${underlineColor};">${brText}</span>`);
    } else {
      setUnderlinePreview(`<span style="text-decoration:underline;">${brText}</span>`);
    }
  };

  const handleApplyUnderline = () => {
    if (!savedRangeRef.current || !underlinePreview) return;
    savedRangeRef.current.deleteContents();
    const span = document.createElement('span');
    span.innerHTML = underlinePreview;
    const frag = document.createDocumentFragment();
    while (span.firstChild) frag.appendChild(span.firstChild);
    savedRangeRef.current.insertNode(frag);
    savedRangeRef.current = null;
    setUnderlinePreview('');
  };

  return (
    <>
      {/* anchor target for the "Preview" link in the header */}
      <div id="logoVistaPrevia" style={S.logoVistaPrevia()}>Preview</div>
      <div style={S.btCargaGuarda()}>
        <button style={S.btStyle()} onClick={handleRefreshPreview}>Refresh Preview</button>
        <button style={S.btStyle()} onClick={handlePrint}>Print</button>
        <button style={S.falsoBoton()} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Edit Text</button>
      </div>
      <div style={S.floatstop()}> </div>
      <br />

      <div style={{ display: 'flex', gap: '5px' }}>
        {/* Preview content */}
        <div
          style={S.contentXtenderVistaPrevia()}
          onMouseUp={handleMouseUp}
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />

        {/* Preview tools */}
        <div style={S.toolsXtenderVistaPrevia()}>
          <br />
          <span style={{ margin: '5px' }}>
            Underline type:{' '}
            <label>
              <input
                type="radio"
                name="subrayadoVistaPrevia"
                checked={underlineType === 'simple'}
                onChange={() => setUnderlineType('simple')}
              /> Simple.
            </label>
            {' '}
            <label>
              <input
                type="radio"
                name="subrayadoVistaPrevia"
                checked={underlineType === 'color'}
                onChange={() => setUnderlineType('color')}
              /> Background color.
            </label>
          </span>
          <br /><br />
          <span style={{ margin: '5px' }}>
            Background color:{' '}
            <ColorPickerInput value={underlineColor} onChange={setUnderlineColor} />
          </span>
          <br />
          <span style={{ margin: '5px' }}>Underline preview: </span>
          <br />
          <div
            style={S.prevToolsVP()}
            dangerouslySetInnerHTML={{ __html: underlinePreview }}
          />
          <br />
          <button style={S.btStyle2Action()} onClick={handleApplyUnderline}>OK</button>
        </div>
      </div>

      <div style={S.floatstop()}> </div>
      <br />
    </>
  );
};

export default PreviewSection;
