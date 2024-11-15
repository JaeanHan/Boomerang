import { DropDown } from '@components/DropDown';
import { DropDownItem } from '@components/DropDown/DropDownItem';
import { alignOptions } from '@components/TextEditor/options/constants';

import React from 'react';

import { FORMAT_ELEMENT_COMMAND, LexicalEditor } from 'lexical';

export const AlignDropDown: React.FC<{
  isDisabled?: boolean;
  editor: LexicalEditor;
  currentAlign: string;
}> = ({ isDisabled = false, editor, currentAlign = 'left' }) => {
  return (
    <DropDown isDisabled={isDisabled} buttonLabel={currentAlign}>
      {alignOptions.map(({ label, value, iconClass }) => (
        <DropDownItem
          key={value}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value);
          }}
        >
          {iconClass && <i className={`icon ${iconClass}`} />}
          <span className="text">{label}</span>
        </DropDownItem>
      ))}
    </DropDown>
  );
};
