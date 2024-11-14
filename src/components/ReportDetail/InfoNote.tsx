import React from 'react';

import { Flex, Image, Text } from '@chakra-ui/react';
import light from '@images/infoIcon.svg';

interface InfoNoteProps {
  text: string;
}

const InfoNote: React.FC<InfoNoteProps> = ({ text }) => {
  return (
    <Flex
      flexWrap="wrap"
      gap={3.5}
      alignItems="flex-start"
      mt={5}
      ml={6}
      fontSize="lg"
      color="blue.600"
    >
      <Image
        src={light}
        position="relative"
        top="2px"
        alt=""
        w="21px"
        objectFit="contain"
      />
      <Text flexGrow={1}>{text}</Text>
    </Flex>
  );
};

export default InfoNote;
