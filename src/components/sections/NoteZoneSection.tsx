import React from 'react';
import { useEditor } from '../../context/EditorContext';
import SectionToggle from '../SectionToggle';
import ColorPickerInput from '../ColorPickerInput';
import { makeNoticiaReference } from '../../utils/insertionUtils';
import { convertirTextoConNotasEnLlaves } from '../../utils/notesUtils';
import * as S from '../../styles/AppCss';

const NOTE_ZONE_PRESETS = [
  'E0F8F7', 'fffda5', 'fff4cb', 'e3ffd0',
  'ffd0df', 'e2e7ff', 'fdffe2', 'f8e2ff',
];

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  pasarANotas: boolean;
  onPasarANotasChange: (v: boolean) => void;
  tituloNota: string;
  onTituloNotaChange: (v: string) => void;
  colorNota: string;
  onColorNotaChange: (v: string) => void;
}

const NoteZoneSection: React.FC<Props> = ({
  isOpen,
  onToggle,
  pasarANotas,
  onPasarANotasChange,
  tituloNota,
  onTituloNotaChange,
  colorNota,
  onColorNotaChange,
}) => {
  const { textareaRef, insertCode } = useEditor();

  const [refTitulo, setRefTitulo] = React.useState('');
  const [refEnlace, setRefEnlace] = React.useState('http://');
  const [refAutor, setRefAutor] = React.useState('');
  const [refMedio, setRefMedio] = React.useState('');
  const [refFecha, setRefFecha] = React.useState('');

  const handleCreateReference = () => {
    const ref = makeNoticiaReference(refTitulo, refEnlace, refAutor, refMedio, refFecha);
    insertCode(ref, '');
    setRefTitulo('');
    setRefEnlace('http://');
    setRefAutor('');
    setRefMedio('');
    setRefFecha('');
  };

  const handleImport = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const [newContent, foundTitle, hasNotes] = convertirTextoConNotasEnLlaves(ta.value);
    ta.value = newContent;
    if (hasNotes) {
      onTituloNotaChange(foundTitle);
      onPasarANotasChange(true);
    }
  };

  return (
    <>
      <SectionToggle label="NOTE ZONE" onToggle={onToggle} />
      {isOpen && (
        <div id="idZonaNotas">
          <span style={{ marginLeft: '3px' }}>
            <label>
              <input
                type="checkbox"
                checked={pasarANotas}
                onChange={(e) => onPasarANotasChange(e.target.checked)}
              />
              {' '}Replace text between {'{ }'} in footnote.
            </label>
          </span>
          <br /><br />

          <span style={{ marginLeft: '3px' }}>Note title: </span>
          <span style={{ marginLeft: '14px' }}>
            <input
              type="text"
              value={tituloNota}
              onChange={(e) => onTituloNotaChange(e.target.value)}
            />
          </span>
          <br /><br />

          <span style={{ margin: '5px' }}>
            Parse text with notes to text between {'{ }'}: {'  '}
          </span>
          <button style={{ ...S.btStyle(), marginLeft: '10px' }} onClick={handleImport}>
            Import
          </button>
          <br /><br />

          <span style={{ margin: '5px' }}>
            Background color:{' '}
            <ColorPickerInput
              value={colorNota}
              onChange={onColorNotaChange}
              extraPresets={NOTE_ZONE_PRESETS}
              includeEmpty
            />
          </span>
          <br /><br />

          <fieldset style={{ marginLeft: '9px' }}>
            <legend>New reference in note</legend>
            <label>
              Title: <input
                type="text"
                style={{ marginLeft: '58px' }}
                value={refTitulo}
                onChange={(e) => setRefTitulo(e.target.value)}
              />
            </label>
            <br />
            <label>
              Link: <input
                type="text"
                style={{ marginLeft: '58px' }}
                value={refEnlace}
                onChange={(e) => setRefEnlace(e.target.value)}
              />
            </label>
            <br />
            <label>
              Author: <input
                type="text"
                style={{ marginLeft: '43px' }}
                value={refAutor}
                onChange={(e) => setRefAutor(e.target.value)}
              />
            </label>
            <br />
            <label>
              Media: <input
                type="text"
                style={{ marginLeft: '47px' }}
                value={refMedio}
                onChange={(e) => setRefMedio(e.target.value)}
              />
            </label>
            <br />
            <label>
              Date: <input
                type="text"
                style={{ marginLeft: '58px' }}
                value={refFecha}
                onChange={(e) => setRefFecha(e.target.value)}
              />
            </label>
            <button
              style={{ float: 'right' }}
              onClick={handleCreateReference}
            >
              Create reference
            </button>
          </fieldset>
          <br /><br />
        </div>
      )}
    </>
  );
};

export default NoteZoneSection;
