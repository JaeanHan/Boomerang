import { Flex, Input } from '@chakra-ui/react';

interface SearchProps {
  address: string;
  setAddress: (value: string) => void;
  placeholder?: string;
}

export const Search: React.FC<SearchProps> = ({
  address,
  setAddress,
  placeholder,
}) => (
  <Flex
    bgColor="#E7F4FF"
    borderRadius={20}
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
      placeholder={placeholder || '예시) 서울특별시 서초구 반포대로 58 의 집'}
      _placeholder={{
        color: 'rgba(23, 108, 255, 0.51)',
        fontSize: '20px',
      }}
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
  </Flex>
);
