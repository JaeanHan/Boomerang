import { Box, Text } from '@chakra-ui/react';

export const MentorCard = ({ w, h }: { w: string; h: string }) => {
  return (
    <Box w={w} h={h} borderRadius={19} bg="#FFF">
      <Text>MentorCard</Text>
    </Box>
  );
};
