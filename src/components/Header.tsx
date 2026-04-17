import React from 'react';

interface Props {
  onExport: () => void;
}

const Header: React.FC<Props> = ({ onExport }) => (
  <>
    <div id="logo">BlogXtender</div>
    <div className="btCargaGuarda">
      <button className="btStyle" onClick={onExport}>Export</button>
      {' '}
      <a className="falsoBoton" href="#logoVistaPrevia">Preview</a>
    </div>
    <div className="floatstop"> </div>
    <br />
  </>
);

export default Header;
