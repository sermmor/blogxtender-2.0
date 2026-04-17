import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import SectionToggle from '../SectionToggle';
import { fromPDFFormatToText, findAndSelect } from '../../utils/textUtils';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  pasarABr: boolean;
  onPasarABrChange: (v: boolean) => void;
}

const ToolsSection: React.FC<Props> = ({ isOpen, onToggle, pasarABr, onPasarABrChange }) => {
  const { textareaRef, extractSelectedText, substituteSelectionWithText, setSelRange } = useEditor();
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  const handleReplaceSearch = () => {
    const ta = textareaRef.current;
    if (!ta) return;

    const selected = extractSelectedText();
    if (selected.toLowerCase() === searchText.toLowerCase()) {
      substituteSelectionWithText(replaceText);
    }

    const [start, end] = findAndSelect(ta.value, searchText);
    setSelRange(start, end);
  };

  const handlePdfFormat = () => {
    const selected = extractSelectedText();
    substituteSelectionWithText(fromPDFFormatToText(selected));
  };

  return (
    <>
      <SectionToggle label="TOOLS" onToggle={onToggle} />
      {isOpen && (
        <div id="idHerramientas">
          <input
            style={{ marginLeft: '3px' }}
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
          />
          <br />
          <input
            style={{ marginLeft: '3px' }}
            type="text"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            placeholder="Replace with..."
          />
          <button onClick={handleReplaceSearch}>Replace/Search</button>
          <hr />
          <button onClick={handlePdfFormat}>Format copy&amp;paste text from PDF</button>
          <br />
          <hr />
          <label>
            <input
              type="checkbox"
              checked={pasarABr}
              onChange={(e) => onPasarABrChange(e.target.checked)}
            />
            {' '}Replace end of lines with &lt;br /&gt;
          </label>
          <br /><br />
        </div>
      )}
    </>
  );
};

export default ToolsSection;
