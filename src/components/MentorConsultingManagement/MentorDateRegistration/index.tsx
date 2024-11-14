import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { BoomerangButton } from '@/components/commons/BoomerangButton';
import { Box, Flex, VStack } from '@chakra-ui/react';

export const MentorDateRegistration = () => {
  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="상담 일자 등록하기" />
      <VStack mt="56px">
        <Flex justifyContent="flex-end" w="876px" mt="15px">
          <BoomerangButton
            w="154px"
            h="47px"
            fontSize="24px"
            onClick={() => {}}
          >
            적용하기
          </BoomerangButton>
        </Flex>
      </VStack>
    </Box>
  );
};
