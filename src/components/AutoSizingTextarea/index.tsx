import { useCallback } from 'react';

import { Textarea, TextareaProps } from '@chakra-ui/react';

interface AutoSizingTextareaProps extends TextareaProps {
  setContent: (newContent: string) => void;
}
export const AutoSizingTextarea: React.FC<
  AutoSizingTextareaProps & {
    setContent: (newContent: string) => void;
  }
> = ({ setContent, ...chakraStyles }) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const element = e.target;
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
      setContent(element.value);
    },
    [setContent]
  );

  return (
    <Textarea
      {...chakraStyles}
      border="none"
      p={0}
      _focus={{
        boxShadow: 'none',
      }}
      placeholder="상담 내용을 작성해주세요."
      _placeholder={{
        color: 'rgba(23, 108, 255, 0.30)',
        fontSize: '24px',
      }}
      fontSize="24px"
      resize="none"
      onChange={onChange}
    />
  );
};
