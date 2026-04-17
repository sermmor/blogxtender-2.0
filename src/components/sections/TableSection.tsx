import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import SectionToggle from '../SectionToggle';
import { makeTable } from '../../utils/insertionUtils';
import * as S from '../../styles/AppCss';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const TableSection: React.FC<Props> = ({ isOpen, onToggle }) => {
  const { insertCode } = useEditor();
  const [rows, setRows] = useState('');
  const [cols, setCols] = useState('');

  const handleOk = () => {
    const numRows = parseInt(rows, 10);
    const numCols = parseInt(cols, 10);
    if (!isNaN(numRows) && !isNaN(numCols) && numRows > 0 && numCols > 0) {
      insertCode('', makeTable(numRows, numCols));
    }
  };

  return (
    <>
      <SectionToggle label="TABLE" onToggle={onToggle} />
      {isOpen && (
        <div id="idTabla">
          <span style={{ marginLeft: '3px' }}>
            Number of rows:{' '}
            <input
              style={{ marginLeft: '46px' }}
              type="text"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
            />
          </span>
          <br />
          <span style={{ marginLeft: '3px' }}>
            Number of columns:{' '}
            <input
              style={{ marginLeft: '23px' }}
              type="text"
              value={cols}
              onChange={(e) => setCols(e.target.value)}
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

export default TableSection;
