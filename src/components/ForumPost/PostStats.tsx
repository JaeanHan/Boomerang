import { addLikeToPost, removeLikeToPost } from '@apis/Forumpost';

import { PostStatsProps } from '@components/ForumPost/types';

import React, { useState } from 'react';

import { useUserContext } from '@/pages/Login/userContext';
import { ChatIcon, StarIcon, useToast } from '@chakra-ui/icons';
import { Button, Flex, Text } from '@chakra-ui/react';

export const PostStats: React.FC<PostStatsProps> = ({
  likes,
  comments,
  postId,
}) => {
  const [liked, setLiked] = useState<boolean>(() => false);
  const toast = useToast();
  const { user } = useUserContext();

  const toggleLike = () => {
    if (user === null) {
      toast({ status: 'info', description: '로그인 후 진행해주세요' });
      return;
    }

    if (liked) {
      setLiked(false);
      removeLikeToPost(postId).catch(() => {
        setLiked(true);
        toast({ status: 'error', description: '좋아요 표시에 실패했습니다.' });
      });
      return;
    }

    setLiked(true);
    addLikeToPost(postId).catch(() => {
      setLiked(false);
      toast({ status: 'error', description: '좋아요 취소에 실패했습니다.' });
    });
  };

  return (
    <Flex
      gap={6}
      mt={11}
      fontSize="2xl"
      color="gray.700"
      justifyContent={'flex-end'}
    >
      <Flex align="center" gap={1}>
        <Button onClick={toggleLike} variant="ghost">
          <StarIcon w={6} h={6} color={liked ? 'yellow.400' : 'gray.500'} />
        </Button>
        <Text>{liked ? likes + 1 : likes}</Text>
      </Flex>
      <Flex align="center" gap={1}>
        <ChatIcon w={6} h={6} />
        <Text>{comments}</Text>
      </Flex>
    </Flex>
  );
};
