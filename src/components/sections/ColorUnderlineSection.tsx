import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import SectionToggle from '../SectionToggle';
import ColorPickerInput from '../ColorPickerInput';
import { makeSubrayado } from '../../utils/insertionUtils';
import * as S from '../../styles/AppCss';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const ColorUnderlineSection: React.FC<Props> = ({ isOpen, onToggle }) => {
  const { insertCode } = useEditor();
  const [color, setColor] = useState('fffda5');

  const handleOk = () => {
    const [open, close] = makeSubrayado(color);
    insertCode(open, close);
  };

  return (
    <>
      <SectionToggle label="COLOR UNDERLINE" onToggle={onToggle} />
      {isOpen && (
        <div id="idSubrayadoColor">
          <span style={{ marginLeft: '3px' }}>
            Underline color:{' '}
            <ColorPickerInput value={color} onChange={setColor} />
          </span>
          <br /><br />
          <button
            style={{ ...S.btStyle2Action(), marginRight: '22px' }}
            onClick={handleOk}
          >
            OK
          </button>
          <div style={S.floatstop()}> </div>
          <br />
        </div>
      )}
    </>
  );
};

export default ColorUnderlineSection;
