import { Flex, Image, Input } from '@chakra-ui/react';
import search from '@images/search.svg';

export const Search: React.FC = () => (
  <Flex
    bgColor="#E7F4FF"
    borderRadius={62}
    border="2px solid rgba(23, 108, 255, 0.69)"
    w={887}
    h={67}
    alignItems="center"
    pl={'32px'}
    pr={'32px'}
    mt={'21px'}
  >
    <Input
      border="none"
      _focus={{
        boxShadow: 'none',
      }}
      placeholder="검색어 예)도로명(서울특별시 서초구 반포대로 58), 지번(서울특별시 강남구 삼성동 25)"
      _placeholder={{
        color: 'rgba(23, 108, 255, 0.51)',
        fontSize: '20px',
      }}
    />
    <Image src={search} w={39} h={39} />
  </Flex>
);
