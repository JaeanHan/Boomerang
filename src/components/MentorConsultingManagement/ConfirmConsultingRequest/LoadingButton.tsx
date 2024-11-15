import React from 'react';

import { Button, ButtonProps, Flex, Spinner } from '@chakra-ui/react';

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <Button {...props} isDisabled={isLoading}>
      {isLoading ? (
        <Flex alignItems="center">
          <Spinner size="sm" mr="2" />
          로딩 중...
        </Flex>
      ) : (
        children
      )}
    </Button>
  );
};
