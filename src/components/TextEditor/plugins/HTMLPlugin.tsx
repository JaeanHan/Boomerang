import { useEffect } from 'react';

import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const HTMLPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        console.log(htmlString);
      });
    });
  }, [editor]);

  return null;
};
