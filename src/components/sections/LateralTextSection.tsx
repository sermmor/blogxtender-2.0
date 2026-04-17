import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import SectionToggle from '../SectionToggle';
import { makeFraseLateral } from '../../utils/insertionUtils';
import * as S from '../../styles/AppCss';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

type Alignment = 'center' | 'left' | 'right';

const LateralTextSection: React.FC<Props> = ({ isOpen, onToggle }) => {
  const { insertCode } = useEditor();
  const [alignment, setAlignment] = useState<Alignment>('center');
  const [text, setText] = useState('');

  const handleOk = () => {
    if (!text.trim()) return;
    insertCode('', makeFraseLateral(text, alignment));
    setText('');
    setAlignment('center');
  };

  return (
    <>
      <SectionToggle label="LATERAL TEXT" onToggle={onToggle} />
      {isOpen && (
        <div id="idFraseLateral">
          <span style={{ marginLeft: '3px' }}>
            Alignment:{' '}
            <label><input type="radio" name="FraseLateralAlign" checked={alignment === 'center'} onChange={() => setAlignment('center')} /> Center.</label>
            {' '}
            <label><input type="radio" name="FraseLateralAlign" checked={alignment === 'left'} onChange={() => setAlignment('left')} /> Left.</label>
            {' '}
            <label><input type="radio" name="FraseLateralAlign" checked={alignment === 'right'} onChange={() => setAlignment('right')} /> Right.</label>
          </span>
          <br /><br />
          <span style={{ marginLeft: '3px' }}>
            Text: <br />
            <textarea
              style={S.sectionArea()}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </span>
          <br /><br />
          <button style={S.btStyle2Action()} onClick={handleOk}>OK</button>
          <div style={S.floatstop()}> </div>
          <br />
        </div>
      )}
    </>
  );
};

export default LateralTextSection;
