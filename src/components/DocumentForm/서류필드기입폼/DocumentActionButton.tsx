import React from 'react';

import { BoomerangColors } from '@/utils/colors';
import { Button } from '@chakra-ui/react';

interface DocumentActionButtonProps {
  w: string;
  h: string;
  fontSize: string;
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}

export const DocumentActionButton: React.FC<DocumentActionButtonProps> = ({
  w,
  h,
  fontSize,
  children,
  onClick,
  isLoading = false,
}) => (
  <Button
    width={w}
    height={h}
    borderRadius="4px"
    bg="#176CFF"
    shadow="1px 1px 4px rgba(0, 0, 0, 0.25)"
    color={BoomerangColors.white}
    fontSize={fontSize}
    fontWeight="bold"
    onClick={onClick}
    isLoading={isLoading}
  >
    {children}
  </Button>
);
