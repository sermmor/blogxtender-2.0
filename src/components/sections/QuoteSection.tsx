import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import SectionToggle from '../SectionToggle';
import ColorPickerInput from '../ColorPickerInput';
import { makeCita } from '../../utils/insertionUtils';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const QuoteSection: React.FC<Props> = ({ isOpen, onToggle }) => {
  const { insertCode } = useEditor();
  const [color, setColor] = useState('fffda5');
  const [enBloque, setEnBloque] = useState(true);

  const handleOk = () => {
    const [open, close] = makeCita(color, enBloque);
    insertCode(open, close);
  };

  return (
    <>
      <SectionToggle label="QUOTE" onToggle={onToggle} />
      {isOpen && (
        <div id="idCitar">
          <span style={{ marginLeft: '3px' }}>
            Quote type:{' '}
            <label>
              <input
                type="radio"
                name="citaTipo"
                checked={enBloque}
                onChange={() => setEnBloque(true)}
              /> In block.
            </label>
            {' '}
            <label>
              <input
                type="radio"
                name="citaTipo"
                checked={!enBloque}
                onChange={() => setEnBloque(false)}
              /> In line.
            </label>
          </span>
          <br /><br />
          <span style={{ marginLeft: '3px' }}>
            Quote color:{' '}
            <ColorPickerInput value={color} onChange={setColor} />
          </span>
          <br />
          <button className="btStyle2Action" style={{ marginRight: '22px' }} onClick={handleOk}>OK</button>
          <div className="floatstop"> </div>
          <br />
        </div>
      )}
    </>
  );
};

export default QuoteSection;
