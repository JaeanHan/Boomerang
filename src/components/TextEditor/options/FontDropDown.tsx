import { DropDown } from '@components/DropDown';
import { DropDownItem } from '@components/DropDown/DropDownItem';

import React, { Fragment, useCallback } from 'react';

import { BoomerangColors } from '@/utils/colors';
import { $patchStyleText } from '@lexical/selection';
import { $getSelection, LexicalEditor } from 'lexical';

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

const FONT_COLOR_OPTIONS: [string, string][] = [
  ['#000', 'black'],
  [BoomerangColors.deepBlue, 'deep blue'],
  [BoomerangColors.white, 'white'],
  [BoomerangColors.blue, 'blue'],
  [BoomerangColors.calmWhite, 'calm white'],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
  ['10px', '10px'],
  ['12px', '12px'],
  ['14px', '14px'],
  ['16px', '16px'],
  ['18px', '18px'],
  ['20px', '20px'],
  ['22px', '22px'],
  ['24px', '24px'],
  ['26px', '26px'],
  ['28px', '28px'],
  ['30px', '30px'],
];

export const FontDropDown: React.FC<{
  editor: LexicalEditor;
  currentFontFamily?: string;
  currentFontSize?: string;
  currentFontColor?: string;
}> = ({ editor, currentFontFamily, currentFontSize, currentFontColor }) => {
  const onClick = useCallback(
    (style: string, option: string) => {
      editor.update(() => {
        if (editor.isEditable()) {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, {
              [style]: option,
            });
          }
        }
      });
    },
    [editor]
  );

  return (
    <Fragment>
      <DropDown buttonLabel={currentFontFamily}>
        {FONT_FAMILY_OPTIONS.map(([option, text]) => (
          <DropDownItem
            key={option}
            onClick={() => onClick('font-family', option)}
          >
            <span>{text}</span>
          </DropDownItem>
        ))}
      </DropDown>
      <DropDown buttonLabel={currentFontColor}>
        {FONT_COLOR_OPTIONS.map(([option, text]) => (
          <DropDownItem
            key={option}
            onClick={() => onClick('color', option || 'black')}
          >
            <span>{text}</span>
          </DropDownItem>
        ))}
      </DropDown>
      <DropDown buttonLabel={currentFontSize}>
        {FONT_SIZE_OPTIONS.map(([option, text]) => (
          <DropDownItem
            key={option}
            onClick={() => onClick('font-size', option || '20px')}
          >
            <span>{text}</span>
          </DropDownItem>
        ))}
      </DropDown>
    </Fragment>
  );
};
