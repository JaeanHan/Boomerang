import { FormatButton } from '@components/TextEditor/options/FormatButton';
import { InsertImagePayload } from '@components/TextEditor/plugins/ImagePlugin';

import React, {
  Fragment,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { BoomerangColors } from '@/utils/colors';
import { useToast } from '@chakra-ui/icons';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';

const ImageInputBox: React.FC<{
  imageInputRef: MutableRefObject<HTMLDivElement | null>;
  insertImage: (payload: InsertImagePayload) => void;
  closeImageInput: () => void;
}> = ({ imageInputRef, insertImage, closeImageInput }) => {
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [altText, setAltText] = useState('');
  const toast = useToast();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      return;
    }

    setFileInput(file);
    setUrlInput('');
  };

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
    if (event.target.value) {
      setFileInput(null);
    }
  };

  const onConfirm = () => {
    if (!fileInput && !urlInput) {
      toast({
        title: '이미지 파일을 넣거나 이미지 url을 기입해주세요.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    insertImage({
      src: fileInput ? URL.createObjectURL(fileInput) : urlInput,
      altText: altText ? altText : '이미지',
    });
    closeImageInput();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) {
      return;
    }

    setFileInput(file);
  };

  return (
    <VStack
      spacing={4}
      align="start"
      p={4}
      position={'fixed'}
      ref={imageInputRef}
      bg={BoomerangColors.calmWhite}
      border={`2px solid ${BoomerangColors.deepBlue}`}
      borderRadius={8}
      onClick={(e) => e.stopPropagation()}
    >
      <Box
        as="label"
        htmlFor="file-input"
        border="2px dashed"
        borderColor={`${urlInput !== '' ? 'gray.300' : 'gray.500'}`}
        borderRadius="md"
        p={4}
        textAlign="center"
        cursor="pointer"
        width="100%"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <Text color="gray.500">
          {fileInput
            ? fileInput.name
            : '첨부할 이미지를 끌어오거나 클릭해 선택해주세요.'}
        </Text>
        <Input
          id="file-input"
          type="file"
          accept="image/*"
          hidden
          onChange={onFileChange}
          borderColor={`${fileInput ? 'gray.300' : 'gray.500'}`}
          isDisabled={urlInput !== ''}
        />
      </Box>
      <Input
        type="url"
        placeholder="이미지 URL을 기입해 주세요."
        value={urlInput}
        onChange={onUrlChange}
        isDisabled={fileInput !== null}
        _disabled={{
          color: 'red',
        }}
      />
      <Input
        type="text"
        placeholder="이미지 설명을 기입해주세요."
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
      />
      <Button colorScheme="blue" onClick={onConfirm}>
        확인
      </Button>
    </VStack>
  );
};

export const InsertImageButton: React.FC<{
  insertImage: (payload: InsertImagePayload) => void;
}> = ({ insertImage }) => {
  const [showImageInsertBox, setShowImageInsertBox] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const imageInputRef = useRef<HTMLDivElement | null>(null);
  const closeImageInputBox = () => setShowImageInsertBox(false);

  useEffect(() => {
    const button = buttonRef.current;
    const imageInput = imageInputRef.current;

    if (showImageInsertBox && button && imageInput) {
      const { top, left } = button.getBoundingClientRect();
      imageInput.style.top = `${top + button.offsetHeight + 4}px`;
      imageInput.style.left = `${Math.min(left, window.innerWidth - 20)}px`;
    }
  }, [imageInputRef, buttonRef, showImageInsertBox]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || !showImageInsertBox) {
      return;
    }

    const onClick = (e: DocumentEventMap['click']) => {
      const target = e.target;
      if (!button.contains(target as Node)) {
        setShowImageInsertBox(false);
      }
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [buttonRef, showImageInsertBox]);

  return (
    <Fragment>
      <FormatButton
        buttonRef={buttonRef}
        isActive={false}
        onClick={() => setShowImageInsertBox(true)}
      >
        📷
      </FormatButton>
      {showImageInsertBox &&
        createPortal(
          <ImageInputBox
            imageInputRef={imageInputRef}
            insertImage={insertImage}
            closeImageInput={closeImageInputBox}
          />,
          document.body
        )}
    </Fragment>
  );
};
