import React from 'react';

interface Props {
  label: string;
  onToggle: () => void;
}

const SectionToggle: React.FC<Props> = ({ label, onToggle }) => (
  <>
    <div className="sectionHeader" onClick={onToggle}>
      &raquo; {label}
    </div>
    <br />
  </>
);

export default SectionToggle;
