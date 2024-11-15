import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { PropH } from '@/components/commons/types';
import { kakaoLoginUrl } from '@/pages/Login/constants';
import { useUserContext } from '@/pages/Login/userContext';
import { ROUTER_PATH } from '@/routerPath';
import { useToast } from '@chakra-ui/icons';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import logo from '@images/logo.svg';

export const Header: React.FC<PropH> = ({ h }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useUserContext();

  return (
    <Box
      zIndex={99}
      position={'fixed'}
      top={0}
      left={0}
      right={0}
      h={h}
      bg="#fff"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="lg"
    >
      <Link to={ROUTER_PATH.ROOT}>
        <Image src={logo} alt="logo" w={132} h={27} ml={10} />
      </Link>
      <Flex
        mr={'37px'}
        color="#4D4D4D"
        fontSize={'20px'}
        fontWeight={800}
        gap={'70px'}
      >
        <Link to={ROUTER_PATH.ROOT}>
          <Text>홈</Text>
        </Link>
        <Text>Q&As</Text>
        <Text
          onClick={() => {
            if (user === null) {
              toast({
                title: '로그인후 이용하실 수 있습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
              return;
            }
            navigate(ROUTER_PATH.SELECT_MENTOR);
          }}
        >
          전문가와의 상담
        </Text>
        <Link to={`/community/open-forum`}>
          <Text cursor={'pointer'}>커뮤니티</Text>
        </Link>
        {user ? (
          <Text
            cursor={'pointer'}
            onClick={() => {
              navigate(ROUTER_PATH.USER);
            }}
          >
            {user.nickname}
          </Text>
        ) : (
          <a href={kakaoLoginUrl}>
            <Text>로그인</Text>
          </a>
        )}
      </Flex>
    </Box>
  );
};
