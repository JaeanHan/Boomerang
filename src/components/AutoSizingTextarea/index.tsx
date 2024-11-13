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

  return <Textarea {...chakraStyles} onChange={onChange} />;
};
