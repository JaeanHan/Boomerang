import { Box, Image, Text, VStack } from '@chakra-ui/react';
import bannerBg_message from '@images/consultingBg_message.svg';
import bannerBg_notebook from '@images/consultingBg_notebook.svg';
import logoArrow from '@images/logoArrow.svg';

export const ConsultingSearchSection = () => {
  return (
    <Box w="100%" h={252} bg="#4488FF" position="relative">
      <VStack spacing={0}>
        <Text fontWeight="bold" fontSize="20px" color="#FFF" mt="87px">
          부메랑만의 전세사기 전문가와의 컨설팅 서비스
        </Text>
        <Text
          fontWeight={800}
          fontSize="60px"
          color="#FFF"
          textShadow="1px 1px 6.8px rgba(0, 0, 0, 0.11)"
          lineHeight="65px"
          position="relative"
        >
          BOOMERANG
          <Image src={logoArrow} position="absolute" right={-10} top={-3} />
        </Text>
      </VStack>
      <Image
        src={bannerBg_message}
        position="absolute"
        top="46px"
        left="31px"
      />
      <Image
        src={bannerBg_notebook}
        position="absolute"
        right="-68px"
        bottom="-17px"
      />
    </Box>
  );
};
