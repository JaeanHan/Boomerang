import React, { Fragment, useMemo } from 'react';

import { BoomerangColors } from '@/utils/colors';
import { Box, Button, ButtonGroup } from '@chakra-ui/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxPageButtons = 9;

  const getPageNumbers = () => {
    const startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
    const adjustedStartPage = Math.max(endPage - maxPageButtons + 1, 1);

    return Array.from(
      { length: endPage - adjustedStartPage + 1 },
      (_, i) => adjustedStartPage + i
    );
  };

  const pageNumbers = useMemo(
    () => getPageNumbers(),
    [currentPage, totalPages]
  );

  return (
    <Box mt={8} textAlign="center">
      <ButtonGroup>
        {pageNumbers[0] > 1 && (
          <Fragment>
            <Button onClick={() => onPageChange(1)}>1</Button>
            <Button isDisabled>...</Button>
          </Fragment>
        )}
        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={page === currentPage ? 'solid' : 'outline'}
            color={page === currentPage ? BoomerangColors.deepBlue : 'black'}
          >
            {page}
          </Button>
        ))}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <Fragment>
            <Button isDisabled>...</Button>
            <Button onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </Button>
          </Fragment>
        )}
      </ButtonGroup>
    </Box>
  );
};
