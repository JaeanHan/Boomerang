import React, { useEffect, useState } from 'react';

import { ChatIcon, StarIcon } from '@chakra-ui/icons';
import { Button, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';

interface PostStatsProps {
  likes: number;
  comments: number;
  postId: string;
}

export const PostStats: React.FC<PostStatsProps> = ({
  likes,
  comments,
  postId,
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const authToken = localStorage.getItem('Authorization') || '';
        if (!authToken) return;

        const response = await axios.get<{ liked: boolean }>(
          `http://3.34.197.198:8080/api/v1/board/${postId}/likes`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        setLiked(response.data.liked);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            '좋아요 상태를 불러오는데 실패했습니다.',
            error.message
          );
        } else {
          console.error('예상치 못한 에러가 발생했습니다.', error);
        }
      }
    };

    fetchLikedStatus();
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
        await axios.delete(
          `http://3.34.197.198:8080/api/v1/board/${postId}/likes`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        await axios.post(
          `http://3.34.197.198:8080/api/v1/board/${postId}/likes`,
          {},
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        setLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
      }
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data.code === 'LK003'
      ) {
        // 이미 좋아요한 게시물인 경우
        toast({
          title: '이미 좋아요를 누르셨습니다.',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        // 로그인 필요
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
        <Button onClick={handleLike}>
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
