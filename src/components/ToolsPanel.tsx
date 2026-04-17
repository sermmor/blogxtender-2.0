import React from 'react';
import EditionSection from './sections/EditionSection';
import ToolsSection from './sections/ToolsSection';
import TableSection from './sections/TableSection';
import ColorUnderlineSection from './sections/ColorUnderlineSection';
import QuoteSection from './sections/QuoteSection';
import LateralTextSection from './sections/LateralTextSection';
import YoutubeSection from './sections/YoutubeSection';
import PictureSection from './sections/PictureSection';
import PictureListSection from './sections/PictureListSection';
import NoteZoneSection from './sections/NoteZoneSection';

export interface SectionsState {
  idEdicion: boolean;
  idHerramientas: boolean;
  idTabla: boolean;
  idSubrayadoColor: boolean;
  idCitar: boolean;
  idFraseLateral: boolean;
  idYoutubeInsert: boolean;
  idImagen: boolean;
  idListImagenes: boolean;
  idZonaNotas: boolean;
}

interface Props {
  sections: SectionsState;
  onToggleSection: (id: keyof SectionsState) => void;
  pasarABr: boolean;
  onPasarABrChange: (v: boolean) => void;
  pasarANotas: boolean;
  onPasarANotasChange: (v: boolean) => void;
  tituloNota: string;
  onTituloNotaChange: (v: string) => void;
  colorNota: string;
  onColorNotaChange: (v: string) => void;
}

const ToolsPanel: React.FC<Props> = ({
  sections,
  onToggleSection,
  pasarABr,
  onPasarABrChange,
  pasarANotas,
  onPasarANotasChange,
  tituloNota,
  onTituloNotaChange,
  colorNota,
  onColorNotaChange,
}) => (
  <div id="toolsXtender">
    <EditionSection
      isOpen={sections.idEdicion}
      onToggle={() => onToggleSection('idEdicion')}
    />
    <ToolsSection
      isOpen={sections.idHerramientas}
      onToggle={() => onToggleSection('idHerramientas')}
      pasarABr={pasarABr}
      onPasarABrChange={onPasarABrChange}
    />
    <TableSection
      isOpen={sections.idTabla}
      onToggle={() => onToggleSection('idTabla')}
    />
    <ColorUnderlineSection
      isOpen={sections.idSubrayadoColor}
      onToggle={() => onToggleSection('idSubrayadoColor')}
    />
    <QuoteSection
      isOpen={sections.idCitar}
      onToggle={() => onToggleSection('idCitar')}
    />
    <LateralTextSection
      isOpen={sections.idFraseLateral}
      onToggle={() => onToggleSection('idFraseLateral')}
    />
    <YoutubeSection
      isOpen={sections.idYoutubeInsert}
      onToggle={() => onToggleSection('idYoutubeInsert')}
    />
    <PictureSection
      isOpen={sections.idImagen}
      onToggle={() => onToggleSection('idImagen')}
    />
    <PictureListSection
      isOpen={sections.idListImagenes}
      onToggle={() => onToggleSection('idListImagenes')}
    />
    <NoteZoneSection
      isOpen={sections.idZonaNotas}
      onToggle={() => onToggleSection('idZonaNotas')}
      pasarANotas={pasarANotas}
      onPasarANotasChange={onPasarANotasChange}
      tituloNota={tituloNota}
      onTituloNotaChange={onTituloNotaChange}
      colorNota={colorNota}
      onColorNotaChange={onColorNotaChange}
    />
  </div>
);

export default ToolsPanel;
