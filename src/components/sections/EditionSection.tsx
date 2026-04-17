import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import SectionToggle from '../SectionToggle';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const EditionSection: React.FC<Props> = ({ isOpen, onToggle }) => {
  const { insertCode, extractSelectedText, substituteSelectionWithText } = useEditor();
  const [htmlTab, setHtmlTab] = useState('0');
  const [link, setLink] = useState('http://');

  const indent = () => {
    if (htmlTab !== '0' && htmlTab !== '') return `style="text-indent:${htmlTab}pt;"`;
    return '';
  };
  const indentInline = () => {
    if (htmlTab !== '0' && htmlTab !== '') return `text-indent:${htmlTab}pt;`;
    return '';
  };

  return (
    <>
      <SectionToggle label="EDITION" onToggle={onToggle} />
      {isOpen && (
        <div id="idEdicion">
          {/* Special characters */}
          <button onClick={() => insertCode('&#171;', '&#187;')}>« »</button>
          <button title="WordPress Space" onClick={() => insertCode('', '&nbsp;')}>&amp;nbsp;</button>
          <button onClick={() => insertCode('', '&#8212;')}>—</button>
          <button onClick={() => insertCode('', '&#169;')}>©</button>
          <button onClick={() => insertCode('', '&#174;')}>®</button>
          <button onClick={() => insertCode('', '&#8482;')}>™</button>
          <button onClick={() => insertCode('', '&#9834;')}>♪</button>
          <button onClick={() => insertCode('', '&#9835;')}>♫</button>
          <hr />

          {/* Case */}
          <button title="Put selection to UPPER CASE" onClick={() => substituteSelectionWithText(extractSelectedText().toUpperCase())}>CAP</button>
          <button title="Put selection to lower case" onClick={() => substituteSelectionWithText(extractSelectedText().toLowerCase())}>low</button>
          <hr />

          {/* Text formatting */}
          <button style={{ fontWeight: 'bold' }} onClick={() => insertCode('<span style="font-weight: bold;">', '</span>')}>B</button>
          <button style={{ fontStyle: 'oblique' }} onClick={() => insertCode('<span style="font-style: oblique;">', '</span>')}>I</button>
          <button style={{ textDecoration: 'underline' }} onClick={() => insertCode('<span style="text-decoration: underline;">', '</span>')}>U</button>
          <button style={{ textDecoration: 'overline' }} onClick={() => insertCode('<span style="text-decoration: overline;">', '</span>')}>O</button>
          <button style={{ textDecoration: 'line-through' }} onClick={() => insertCode('<span style="text-decoration: line-through;">', '</span>')}>ABC</button>
          <button onClick={() => insertCode('<span style="vertical-align: super;">', '</span>')}>super</button>
          <button onClick={() => insertCode('<span style="vertical-align: sub;">', '</span>')}>sub</button>
          <hr />

          {/* Headings */}
          <button onClick={() => insertCode('<h1>', '</h1>')}>&lt;h1&gt;</button>
          <button onClick={() => insertCode('<h2>', '</h2>')}>&lt;h2&gt;</button>
          <button onClick={() => insertCode('<h3>', '</h3>')}>&lt;h3&gt;</button>
          <hr />

          {/* Paragraph/alignment with optional indent */}
          <span style={{ marginLeft: '3px' }}>
            Indentation:{' '}
            <input
              type="text"
              style={{ marginLeft: '3px', width: '30px' }}
              value={htmlTab}
              onChange={(e) => setHtmlTab(e.target.value)}
            /> pt.
          </span>
          <button onClick={() => insertCode(`<p ${indent()}>`, '</p>')}>&lt;p&gt;</button>
          <br /><br />
          <button onClick={() => insertCode(`<blockquote ${indent()}>`, '</blockquote>')}>Quote</button>
          <button onClick={() => insertCode(`<div style="text-align:left;${indentInline()}">`, '</div>')}>Left Alig</button>
          <button onClick={() => insertCode(`<div style="text-align:right;${indentInline()}">`, '</div>')}>Right Alig</button>
          <button onClick={() => insertCode(`<div style="text-align:center;${indentInline()}">`, '</div>')}>Center Alig</button>
          <button onClick={() => insertCode(`<div style="text-align:justify;${indentInline()}">`, '</div>')}>Just Alig</button>
          <button onClick={() => insertCode('', '<table><tr><td>\n\n</td><td>\n\n</td></tr></table>')}>2 Columns</button>
          <hr />

          {/* Link */}
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button onClick={() => {
            insertCode(`<a href="${link}" target='_blank'>`, '</a>');
            setLink('http://');
          }}>Link</button>
          <hr />

          {/* Lists */}
          <button onClick={() => insertCode('<li>', '</li>')}>&lt;li&gt;</button>
          <button onClick={() => insertCode('<ul>\n    <li>', '</li>\n</ul>')}>&lt;ul&gt;</button>
          <button onClick={() => insertCode('<ol>\n    <li>', '</li>\n</ol>')}>&lt;ol&gt;</button>
          <button onClick={() => {
            let text = extractSelectedText();
            text = text.replace(/- /gi, '    </li><li>');
            text = '<ul>\n' + text + '\n</ul>';
            text = text.replace('</li>', '');
            substituteSelectionWithText(text);
          }}>{`'-' → '<ul>'`}</button>
          <button onClick={() => {
            let text = extractSelectedText();
            text = text.replace(/#- /gi, '    </li><li>');
            text = '<ol>\n' + text + '\n</ol>';
            text = text.replace('</li>', '');
            substituteSelectionWithText(text);
          }}>{`'#-' → '<ol>'`}</button>
          <br /><br />
        </div>
      )}
    </>
  );
};

export default EditionSection;
