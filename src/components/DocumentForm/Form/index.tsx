import { DocumentBtn } from '@/components/DocumentForm/Form/DocumentBtn';
import { DocumentInput } from '@/components/DocumentForm/Form/DocumentInput';
import { HoverBox } from '@/components/DocumentForm/Form/HoverBox';
import { FormProps } from '@/pages/DocumentForm';
import { BoomerangColors } from '@/utils/colors';
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import mesasgeIcon from '@images/questionMessage.svg';

export const Form: React.FC<FormProps> = ({
  title,
  description,
  image,
  fields,
}) => {
  return (
    <Box mt="20px">
      <VStack h="75px" bg="#176CFF" justifyContent="center">
        <Text fontSize="32px" fontWeight="bold" color={BoomerangColors.white}>
          {title} 서류 작성
        </Text>
      </VStack>
      <Flex bg={BoomerangColors.white} p="49px 41px 0" gap="64px">
        <Image w="335px" h="480px" src={image} mt="58px" mb="50px" />
        <Flex flexDir="column" justifyContent="space-between">
          <Box>
            <Flex gap="15px" mb="24px" position="relative" role="group">
              <Image src={mesasgeIcon} w={27} />
              <Text fontSize="20px" fontWeight="bold" color="#303030">
                {title}는 어떤 서류인가요?
              </Text>
              <HoverBox description={description} />
            </Flex>
            <VStack gap="22px">
              {fields.map((field) => (
                <DocumentInput key={field.id} label={field.label} />
              ))}
            </VStack>
          </Box>
          <Box alignSelf="flex-end" mt="30px" mb="16px">
            <DocumentBtn w="139px" h="49px" fontSize="24px">
              저장하기
            </DocumentBtn>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
