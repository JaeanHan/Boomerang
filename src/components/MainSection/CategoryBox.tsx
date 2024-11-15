import { useNavigate } from 'react-router-dom';

import { useUserContext } from '@/pages/Login/userContext';
import { ROUTER_PATH } from '@/routerPath';
import { useToast } from '@chakra-ui/icons';
import { Box, Text, VStack } from '@chakra-ui/react';

import styles from './index.module.css';

export interface ICategoryBox {
  category: string;
  example: string;
  img: string;
  path: string;
}

export const CategoryBox = ({ category, example, img, path }: ICategoryBox) => {
  const { user } = useUserContext();
  const toast = useToast();
  const navigate = useNavigate();

  const onClick = () => {
    if (path !== ROUTER_PATH.CHANGEALERT) {
      if (!user) {
        toast({
          title: '로그인 후 진행해주세요.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      navigate(path);
      return;
    }
    navigate(path);
  };
  return (
    <Box className={styles['category--box']} to={path}>
      <VStack spacing={4} alignItems="space-between" onClick={onClick}>
        <Text fontWeight={900} fontSize="20px">
          {category}
        </Text>
        <Text color={'#888888'} fontSize="15px" whiteSpace="nowrap">
          {example}
        </Text>
      </VStack>
      <img alt="category image" src={img} />
    </Box>
  );
};
