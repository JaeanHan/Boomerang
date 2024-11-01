import { DropDown } from '@components/DropDown';
import { DropDownItem } from '@components/DropDown/DropDownItem';

import React, { MouseEvent, ReactNode } from 'react';

import { BoomerangColors } from '@/utils/colors';
import { Box } from '@chakra-ui/react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import styles from './index.module.css';

const theme = {};

const onError = (error) => {
  console.log(error);
};

export const TextEditor = () => {
  const initialConfig = {
    namespace: '',
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <DropDown buttonLabel={'FONT STYLE'} className={styles.test}>
        <DropDownItem onClick={() => console.log('TEST')}>
          <span>TTTTTT1</span>
        </DropDownItem>
        <DropDownItem onClick={() => console.log('TEST2')}>
          <span>TTTTTT2</span>
        </DropDownItem>
        <DropDownItem onClick={() => console.log('TEST3')}>
          <span>TTTTTT3</span>
        </DropDownItem>
      </DropDown>
      <EditorContainer>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className={styles.contentEditable} />
          }
          ErrorBoundary={LexicalErrorBoundary}
          placeholder={<EditorPlaceholder />}
        />
        <HistoryPlugin />
      </EditorContainer>
    </LexicalComposer>
  );
};

const EditorContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [editor] = useLexicalComposerContext();
  const onClick = (e: MouseEvent) => {
    editor.focus();
  };

  return (
    <Box
      minH={272}
      bg={BoomerangColors.white}
      borderRadius={15}
      p={10}
      pt={5}
      pb={5}
      position="relative"
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

const EditorPlaceholder: React.FC = () => {
  return (
    <Box top={5} position="absolute" pointerEvents="none" userSelect="none">
      게시글 내용을 작성해 주세요.
    </Box>
  );
};
