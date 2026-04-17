import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import SectionToggle from '../SectionToggle';
import { makeImagen } from '../../utils/insertionUtils';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

type Alignment = 'center' | 'left' | 'right';

const PictureSection: React.FC<Props> = ({ isOpen, onToggle }) => {
  const { insertCode } = useEditor();
  const [titleImg, setTitleImg] = useState('');
  const [altImg, setAltImg] = useState('');
  const [urlImg, setUrlImg] = useState('http://');
  const [alignment, setAlignment] = useState<Alignment>('center');
  const [caption, setCaption] = useState('');

  const handleOk = () => {
    insertCode('', makeImagen(titleImg, altImg, urlImg, caption, alignment));
    setTitleImg('');
    setAltImg('');
    setUrlImg('http://');
    setCaption('');
    setAlignment('center');
  };

  return (
    <>
      <SectionToggle label="PICTURE" onToggle={onToggle} />
      {isOpen && (
        <div id="idImagen">
          <span style={{ marginLeft: '3px' }}>
            Title image:{' '}
            <input type="text" style={{ marginLeft: '3px' }} value={titleImg} onChange={(e) => setTitleImg(e.target.value)} />
          </span>
          <br /><br />
          <span style={{ marginLeft: '3px' }}>
            Alt image:{' '}
            <input type="text" style={{ marginLeft: '12px' }} value={altImg} onChange={(e) => setAltImg(e.target.value)} />
          </span>
          <br /><br />
          <span style={{ marginLeft: '3px' }}>
            Url image:{' '}
            <input type="text" style={{ marginLeft: '12px' }} value={urlImg} onChange={(e) => setUrlImg(e.target.value)} />
          </span>
          <br /><br />
          <span style={{ marginLeft: '3px' }}>
            Alignment:{' '}
            <label><input type="radio" name="imagenAlign" checked={alignment === 'center'} onChange={() => setAlignment('center')} /> Center.</label>
            {' '}
            <label><input type="radio" name="imagenAlign" checked={alignment === 'left'} onChange={() => setAlignment('left')} /> Left.</label>
            {' '}
            <label><input type="radio" name="imagenAlign" checked={alignment === 'right'} onChange={() => setAlignment('right')} /> Right.</label>
          </span>
          <br /><br />
          <span style={{ marginLeft: '3px' }}>
            Caption: <br />
            <textarea className="sectionArea" value={caption} onChange={(e) => setCaption(e.target.value)} />
          </span>
          <br /><br />
          <button className="btStyle2Action" onClick={handleOk}>OK</button>
          <div className="floatstop"> </div>
          <br />
        </div>
      )}
    </>
  );
};

export default PictureSection;
