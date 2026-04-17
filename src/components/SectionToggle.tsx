import React from 'react';
import * as S from '../styles/AppCss';

interface Props {
  label: string;
  onToggle: () => void;
}

const SectionToggle: React.FC<Props> = ({ label, onToggle }) => (
  <>
    <div style={S.sectionHeader()} onClick={onToggle}>
      &raquo; {label}
    </div>
    <br />
  </>
);

export default SectionToggle;
