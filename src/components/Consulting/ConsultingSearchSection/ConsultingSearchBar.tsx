import { Flex, Image, Input } from '@chakra-ui/react';
import search from '@images/search.svg';

export const ConsultingSearchBar: React.FC = () => (
  <Flex
    bgColor="#CFE0FF"
    borderRadius={62}
    border="4px solid #2575FF"
    w="891px"
    h="85px"
    alignItems="center"
    p="0 36px"
    mt="46px"
  >
    <Input
      border="none"
      _focus={{
        boxShadow: 'none',
      }}
      placeholder="궁금하신 점 있으시면 검색해보세요! ex) 보험이 없는 경우 어떤 전문가에게..."
      _placeholder={{
        color: '#71A4FF',
        fontSize: '24px',
      }}
      pt="5px"
      fontSize="24px"
    />
    <Image src={search} w={39} h={39} />
  </Flex>
);
