import { Flex, Text } from '@chakra-ui/react';

export const ConsultingManagementHeader = ({
  category,
}: {
  category: string;
}) => (
  <Flex boxShadow="0px 2px 9.5px rgba(0, 0, 0, 0.10)" h="125px">
    <Text fontWeight={800} fontSize="35px" color="#0063D4" mt="52px" ml="104px">
      {category}
    </Text>
  </Flex>
);
