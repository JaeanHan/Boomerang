import { BoomerangColors } from '@/utils/colors';
import { Button } from '@chakra-ui/react';

export const BoomerangButton: React.FC<{
  w: string;
  h: string;
  fontSize: string;
  children: React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
}> = ({ w, h, fontSize, children, onClick, isDisabled = false }) => (
  <Button
    width={w}
    height={h}
    borderRadius="8px"
    bg="#176CFF"
    shadow="1px 1px 4px rgba(0, 0, 0, 0.25)"
    color={BoomerangColors.white}
    fontSize={fontSize}
    fontWeight="bold"
    onClick={onClick}
    _hover={{}}
    isDisabled={isDisabled}
  >
    {children}
  </Button>
);
