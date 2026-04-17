import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import SectionToggle from '../SectionToggle';
import { makeYoutubeCode } from '../../utils/insertionUtils';
import * as S from '../../styles/AppCss';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

type Alignment = 'center' | 'left' | 'right';

const YoutubeSection: React.FC<Props> = ({ isOpen, onToggle }) => {
  const { insertCode } = useEditor();
  const [alignment, setAlignment] = useState<Alignment>('center');
  const [code, setCode] = useState('');
  const [caption, setCaption] = useState('');

  const handleOk = () => {
    if (!code.trim()) return;
    insertCode('', makeYoutubeCode(code, caption, alignment));
    setCode('');
    setCaption('');
    setAlignment('center');
  };

  return (
    <>
      <SectionToggle label="YOUTUBE" onToggle={onToggle} />
      {isOpen && (
        <div id="idYoutubeInsert">
          <span style={{ marginLeft: '3px' }}>
            Alignment:{' '}
            <label><input type="radio" name="YoutubeInsertAlign" checked={alignment === 'center'} onChange={() => setAlignment('center')} /> Center.</label>
            {' '}
            <label><input type="radio" name="YoutubeInsertAlign" checked={alignment === 'left'} onChange={() => setAlignment('left')} /> Left.</label>
            {' '}
            <label><input type="radio" name="YoutubeInsertAlign" checked={alignment === 'right'} onChange={() => setAlignment('right')} /> Right.</label>
          </span>
          <br /><br />
          <span style={{ marginLeft: '3px' }}>
            Youtube embed code:{' '}
            <input
              type="text"
              style={{ marginLeft: '5px' }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </span>
          <br /><br />
          <span style={{ marginLeft: '3px' }}>
            Caption: <br />
            <textarea
              style={S.sectionArea()}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
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

export default YoutubeSection;
