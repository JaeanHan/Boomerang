import { Button, Image, Text } from '@chakra-ui/react';

export interface IssuanceTypeProps {
  id?: number;
  title: string;
  subtitle: string;
  icon: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const IssuanceTypeBox: React.FC<IssuanceTypeProps> = ({
  title,
  subtitle,
  icon,
  isSelected,
  onClick,
}) => (
  <Button
    bgColor={isSelected ? '#1E71FF' : '#FAFCFC'}
    shadow="0px 0px 12.7px rgba(0,0,0,0.25)"
    borderRadius={27}
    w={'275px'}
    h={'266px'}
    flexDirection="column"
    onClick={onClick}
    gap="10px"
  >
    <Text
      fontSize={'28px'}
      fontWeight={800}
      color={isSelected ? '#FFF' : '#373737'}
      lineHeight={'32px'}
      whiteSpace="pre-line"
      textAlign="left"
    >
      {title}
    </Text>
    <Text fontSize={'16px'} fontWeight="bold" color="#FF6C6F">
      {subtitle}
    </Text>
    <Image src={icon} />
  </Button>
);
