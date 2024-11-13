import { getLikedStatus, likePost, unlikePost } from '@apis/Forumpost';

import React, { useEffect, useState } from 'react';

import { ChatIcon, StarIcon } from '@chakra-ui/icons';
import { Button, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';

import { PostStatsProps } from './types';

interface ApiError {
  code: number;
  message: string;
}

export const PostStats: React.FC<PostStatsProps> = ({
  likes,
  comments,
  postId,
}) => {
  const toast = useToast();
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikedStatusAsync = async () => {
      const authToken = localStorage.getItem('Authorization') || '';
      if (!authToken) return;

      try {
        const isLiked = await getLikedStatus(postId, authToken);
        setLiked(isLiked);
      } catch (error) {
        console.error('좋아요 상태를 불러오는데 실패했습니다.', error);
      }
    };

    fetchLikedStatusAsync();
  }, [postId]);

  const handleLike = async () => {
    const authToken = localStorage.getItem('Authorization') || '';

    if (!authToken) {
      toast({
        title: '로그인이 필요합니다.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      if (liked) {
        await unlikePost(postId, authToken);
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        await likePost(postId, authToken);
        setLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (
        axios.isAxiosError(axiosError) &&
        axiosError.response?.status === 401
      ) {
        toast({
          title: '로그인이 필요합니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: '좋아요 처리에 실패했습니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex gap={6} mt={11} fontSize="2xl" color="gray.700">
      <Flex align="center" gap={1}>
        <Button onClick={handleLike} variant="ghost">
          <Icon
            as={StarIcon}
            w={6}
            h={6}
            color={liked ? 'yellow.400' : 'gray.500'}
          />
        </Button>
        <Text>{likeCount}</Text>
      </Flex>
      <Flex align="center" gap={1}>
        <Icon as={ChatIcon} w={6} h={6} />
        <Text>{comments}</Text>
      </Flex>
    </Flex>
  );
};
