import { Button, Image, Text } from '@chakra-ui/react';

export interface DepositTypeBoxProps {
  id?: number;
  title: string;
  icon: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const DepositTypeBox: React.FC<DepositTypeBoxProps> = ({
  title,
  icon,
  isSelected,
  onClick,
}) => (
  <Button
    bgColor={isSelected ? '#1E71FF' : '#F5F5F5'}
    shadow="0px 0px 6.2px rgba(0,0,0,0.35)"
    borderRadius={17}
    w={'240.51px'}
    h={'243.22px'}
    flexDirection="column"
    gap="15px"
    onClick={onClick}
  >
    <Text
      fontSize={'28px'}
      fontWeight={800}
      color={isSelected ? '#FFF' : '#303030'}
    >
      {title}
    </Text>
    <Image src={icon} />
  </Button>
);
