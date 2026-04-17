import React from 'react';
import * as S from '../styles/AppCss';

interface Props {
  onExport: () => void;
}

const Header: React.FC<Props> = ({ onExport }) => (
  <>
    <div style={S.logo()}>BlogXtender</div>
    <div style={S.btCargaGuarda()}>
      <button style={S.btStyle()} onClick={onExport}>Export</button>
      <a style={S.falsoBoton()} href="#logoVistaPrevia">Preview</a>
    </div>
    <div style={S.floatstop()}> </div>
    <br />
  </>
);

export default Header;
