import React from 'react';

import { BoomerangColors } from '@/utils/colors';
import { Button, ButtonGroup } from '@chakra-ui/react';

interface SortButtonProps {
  label: string;
  value: 'ID' | 'LIKE' | 'COMMENT';
  isActive: boolean;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  label,
  isActive,
  onClick,
}) => (
  <Button
    px={6}
    py={3.5}
    borderRadius="3xl"
    fontWeight="bold"
    bg={isActive ? BoomerangColors.deepBlue : 'blue.50'}
    color={isActive ? 'white' : BoomerangColors.deepBlue}
    borderColor={BoomerangColors.deepBlue}
    borderWidth={isActive ? '0' : '2px'}
    _hover={{ bg: isActive ? BoomerangColors.deepBlue : 'blue.100' }}
    onClick={onClick}
  >
    {label}
  </Button>
);

interface SortButtonsProps {
  sortType: 'ID' | 'LIKE' | 'COMMENT';
  onSortChange: (sortType: 'ID' | 'LIKE' | 'COMMENT') => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({
  sortType,
  onSortChange,
}) => (
  <ButtonGroup spacing={2.5} flexShrink={0}>
    <SortButton
      label="최신 순"
      value="ID"
      isActive={sortType === 'ID'}
      onClick={() => onSortChange('ID')}
    />
    <SortButton
      label="댓글 순"
      value="COMMENT"
      isActive={sortType === 'COMMENT'}
      onClick={() => onSortChange('COMMENT')}
    />
    <SortButton
      label="추천 순"
      value="LIKE"
      isActive={sortType === 'LIKE'}
      onClick={() => onSortChange('LIKE')}
    />
  </ButtonGroup>
);

export default SortButtons;
