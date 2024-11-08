import { DocumentAcionButton } from '@/components/DocumentForm/Form/DocumentBtn';
import { BoomerangColors } from '@/utils/colors';
import { Box, Flex, Input, Text } from '@chakra-ui/react';

export const DocumentInput: React.FC<{ label: string }> = ({ label }) => (
  <Box>
    <Text fontSize="14px" fontWeight={800} color={BoomerangColors.deepBlue}>
      {label}
    </Text>
    <Flex borderBottom="1.5px solid #7FADFF" w="533px" mt="3px" pr="17px">
      <Input
        fontSize={'20px'}
        border={'none'}
        borderRadius={0}
        _focus={{
          boxShadow: 'none',
        }}
      />
      <DocumentAcionButton w="58px" h="29px" fontSize="16px">
        확인
      </DocumentAcionButton>
    </Flex>
  </Box>
);
