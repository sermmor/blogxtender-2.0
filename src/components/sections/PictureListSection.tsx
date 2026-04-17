import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import SectionToggle from '../SectionToggle';
import { makeImageList } from '../../utils/insertionUtils';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

interface ImageEntry {
  url: string;
  caption: string;
}

const PictureListSection: React.FC<Props> = ({ isOpen, onToggle }) => {
  const { insertCode } = useEditor();
  const [listTitle, setListTitle] = useState('');
  const [urlToAdd, setUrlToAdd] = useState('http://');
  const [captionToAdd, setCaptionToAdd] = useState('');
  const [images, setImages] = useState<ImageEntry[]>([]);

  const handleAdd = () => {
    if (!urlToAdd || urlToAdd === 'http://') return;
    setImages((prev) => [...prev, { url: urlToAdd, caption: captionToAdd }]);
    setUrlToAdd('http://');
    setCaptionToAdd('');
  };

  const handleInsert = () => {
    if (!listTitle || images.length === 0) return;
    const html = makeImageList(listTitle, images);
    insertCode('', html);
    setImages([]);
    setListTitle('');
    setUrlToAdd('http://');
    setCaptionToAdd('');
  };

  return (
    <>
      <SectionToggle label="PICTURE LIST" onToggle={onToggle} />
      {isOpen && (
        <div id="idListImagenes">
          <span style={{ marginLeft: '3px' }}>
            List title:{' '}
            <input
              style={{ marginLeft: '66px' }}
              type="text"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
          </span>
          <br />
          <span style={{ marginLeft: '3px' }}>
            Url image to add:{' '}
            <input
              style={{ marginLeft: '4px' }}
              type="text"
              value={urlToAdd}
              onChange={(e) => setUrlToAdd(e.target.value)}
            />
          </span>
          <br /><br />
          <span style={{ marginLeft: '3px' }}>
            Caption: <br />
            <textarea
              className="sectionArea"
              value={captionToAdd}
              onChange={(e) => setCaptionToAdd(e.target.value)}
            />
          </span>
          <br /><br />
          <button className="btStyle2Action" onClick={handleAdd}>Add to list</button>
          <div className="floatstop"> </div>
          <br />

          {/* Thumbnail preview strip */}
          <div className="prevToolsEske">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.caption}
                title={img.caption}
                style={{ margin: '3px', width: '50px' }}
              />
            ))}
          </div>
          <br />

          <button className="btStyle2Action" onClick={handleInsert}>OK</button>
          <div className="floatstop"> </div>
          <br />
        </div>
      )}
    </>
  );
};

export default PictureListSection;
