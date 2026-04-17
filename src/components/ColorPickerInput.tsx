import React, { useRef } from 'react';
import * as S from '../styles/AppCss';

const PRESET_COLORS = [
  'fffda5', 'fff4cb', 'ffcfa1', 'e3ffd0',
  'ffd0df', 'e2e7ff', 'fdffe2', 'f8e2ff',
];

interface Props {
  value: string; // hex WITHOUT #
  onChange: (hex: string) => void;
  extraPresets?: string[];
  includeEmpty?: boolean;
}

const ColorPickerInput: React.FC<Props> = ({
  value,
  onChange,
  extraPresets,
  includeEmpty = false,
}) => {
  const nativePickerRef = useRef<HTMLInputElement>(null);
  const presets = extraPresets ?? PRESET_COLORS;

  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.replace('#', ''));
  };

  return (
    <span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '70px' }}
        disabled
      />
      {' '}
      <input
        ref={nativePickerRef}
        type="color"
        value={'#' + value}
        onChange={handleNativeChange}
        style={{ marginLeft: '4px', cursor: 'pointer', verticalAlign: 'middle' }}
        title="Browse color"
      />
      <br />
      <span style={{ marginLeft: '3px' }}>
        {presets.map((c) => (
          <span
            key={c}
            style={{ ...S.colorSelectorClass(), backgroundColor: '#' + c }}
            onClick={() => onChange(c)}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        ))}
        {includeEmpty && (
          <span
            style={S.colorSelectorClass()}
            onClick={() => onChange('')}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        )}
      </span>
    </span>
  );
};

export default ColorPickerInput;
