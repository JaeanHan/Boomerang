import { Button } from '@chakra-ui/react';

const UserPageBtn = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Button
    mt="10px"
    shadow="0px 0px 7px rgba(0, 0, 0, 0.14)"
    gap="12px"
    bg="#FFF"
    w="861px"
    h="46px"
    borderRadius={10}
    onClick={onClick}
    _hover={{
      bg: '#F4F4F4',
    }}
  >
    {children}
  </Button>
);
