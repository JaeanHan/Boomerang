import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '@/pages/Login/userContext';
import { ROUTER_PATH } from '@/routerPath';
import { BoomerangColors } from '@/utils/colors';
import { Button } from '@chakra-ui/react';

const CreatePostButton: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const navigateToPosting = () => {
    navigate(ROUTER_PATH.POSTING);
  };

  return (
    <Button
      alignSelf="flex-end"
      px={2}
      py={1.5}
      fontSize="lg"
      fontWeight="bold"
      color="white"
      bg={BoomerangColors.blue}
      borderRadius="lg"
      _hover={{}}
      onClick={navigateToPosting}
      isDisabled={user === null}
    >
      게시글 작성하기
    </Button>
  );
};

export default CreatePostButton;
