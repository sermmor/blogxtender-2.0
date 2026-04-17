/**
 * BlogXtender 2.0 — Inline style functions
 * Converted from App.css (Sergio Martín Moreno, 2012)
 *
 * Each function returns a React.CSSProperties object so it can be used
 * directly as a style prop: <div style={logo()} />
 */
import { CSSProperties } from 'react';

const btnFont: CSSProperties['fontFamily'] =
  "'Trebuchet MS', Trebuchet, Verdana, sans-serif";

// ── Navigation logo ──────────────────────────────────────────────────────────

export const logo = (): CSSProperties => ({
  float: 'left',
  fontSize: '20pt',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  marginTop: '12px',
  marginRight: '18px',
  border: '1px solid #ccc',
  backgroundColor: '#efefef',
  color: '#000000',
  borderRadius: '7px',
  paddingRight: '5px',
  paddingLeft: '5px',
});

export const logoVistaPrevia = (): CSSProperties => ({
  float: 'left',
  fontSize: '20pt',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  marginTop: '12px',
  marginRight: '18px',
  border: '6px solid #ccc',
  backgroundColor: '#000000',
  color: '#efefef',
  paddingRight: '5px',
  paddingLeft: '5px',
});

// ── Nav button bar ────────────────────────────────────────────────────────────

export const btCargaGuarda = (): CSSProperties => ({
  float: 'right',
  fontSize: '20pt',
  marginTop: '12px',
  marginRight: '18px',
  display: 'flex',
  gap: '.5rem',
});

// ── Buttons ───────────────────────────────────────────────────────────────────

/** Link/anchor styled as a button (falsoBoton) */
export const falsoBoton = (): CSSProperties => ({
  fontSize: '11pt',
  fontWeight: 'bold',
  fontFamily: btnFont,
  width: '110px',
  height: '30px',
  backgroundColor: '#000000',
  color: '#efefef',
  borderTop: '7px solid #000000',
  borderBottom: '6.5px solid #000000',
  borderRight: '20px solid #000000',
  borderLeft: '20px solid #000000',
  borderRadius: '7px',
  textDecoration: 'none',
  cursor: 'pointer',
});

/** Primary action button (btStyle) */
export const btStyle = (): CSSProperties => ({
  fontSize: '11pt',
  fontWeight: 'bold',
  fontFamily: btnFont,
  width: '110px',
  height: '30px',
  backgroundColor: '#000000',
  color: '#efefef',
  border: 'none',
  borderRadius: '7px',
  cursor: 'pointer',
});

/** Float-right confirm button (btStyle2Action) */
export const btStyle2Action = (): CSSProperties => ({
  fontSize: '11pt',
  fontWeight: 'bold',
  fontFamily: btnFont,
  width: '110px',
  height: '30px',
  backgroundColor: '#000000',
  color: '#efefef',
  border: 'none',
  borderRadius: '7px',
  cursor: 'pointer',
  float: 'right',
  marginRight: '5px',
});

// ── Utility ───────────────────────────────────────────────────────────────────

/** Stops floating children from overflowing the parent */
export const floatstop = (): CSSProperties => ({
  clear: 'both',
});

/** Color swatch selector used in color pickers */
export const colorSelectorClass = (): CSSProperties => ({
  fontSize: '8pt',
  border: '1px solid #ccc',
  cursor: 'pointer',
  display: 'inline-block',
});

// ── Main panels ───────────────────────────────────────────────────────────────

/** The main editor textarea */
export const contenidoTextoXtender = (): CSSProperties => ({
  width: '99.7%',
  height: '99%',
});

/** Left editor panel (65 %) */
export const contentXtender = (): CSSProperties => ({
  width: '65%',
  height: '642px',
  padding: '5px',
  float: 'left',
  border: '1px solid #ccc',
  overflow: 'auto',
  boxSizing: 'border-box',
});

/** Right tools panel (32 %) */
export const toolsXtender = (): CSSProperties => ({
  width: '32%',
  height: '642px',
  marginLeft: '5px',
  padding: '5px',
  float: 'left',
  border: '1px solid #ccc',
  overflow: 'auto',
  boxSizing: 'border-box',
});

// ── Preview panels ────────────────────────────────────────────────────────────

/** Preview HTML content panel */
export const contentXtenderVistaPrevia = (): CSSProperties => ({
  width: '65%',
  minHeight: '656px',
  padding: '5px',
  border: '1px solid #ccc',
  overflow: 'auto',
  fontFamily: 'Helvetica, serif',
  fontSize: '11pt',
  boxSizing: 'border-box',
});

/** Preview tools panel */
export const toolsXtenderVistaPrevia = (): CSSProperties => ({
  width: '32%',
  minHeight: '656px',
  marginLeft: '5px',
  padding: '5px',
  border: '1px solid #ccc',
  overflow: 'auto',
  boxSizing: 'border-box',
});

/** Underline preview box */
export const prevToolsVP = (): CSSProperties => ({
  width: '95%',
  minHeight: '40px',
  marginLeft: '5px',
  padding: '5px',
  border: '1px solid #ccc',
  overflow: 'auto',
});

// ── Tool-section elements ─────────────────────────────────────────────────────

/** Clickable accordion section header */
export const sectionHeader = (): CSSProperties => ({
  fontSize: '14pt',
  fontWeight: 'bold',
  fontFamily: btnFont,
  padding: '3px',
  border: '1px solid #ccc',
  backgroundColor: '#000000',
  cursor: 'pointer',
  color: '#efefef',
});

/** Textarea inside a tool section */
export const sectionArea = (): CSSProperties => ({
  marginLeft: '9px',
  width: '95%',
  height: '100px',
});

/** Thumbnail preview strip (picture list) */
export const prevToolsEske = (): CSSProperties => ({
  width: '95%',
  height: '80px',
  marginLeft: '5px',
  padding: '5px',
  border: '1px solid #ccc',
  overflow: 'auto',
});
