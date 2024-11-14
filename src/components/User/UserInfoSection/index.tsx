import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { confirmNickname, getUserInfo, updateProfileImage } from '@/apis/user';
import { useUserContext } from '@/pages/Login/userContext';
import { ROUTER_PATH } from '@/routerPath';
import { BoomerangColors } from '@/utils/colors';
import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import businessman from '@images/businessman.svg';
import CameraBtn from '@images/cameraBtn.svg?react';
import change from '@images/change.svg';
import Writedown from '@images/writedown.svg?react';

interface userInfoType {
  nickname: string;
  email: string;
  profile_image: string;
  member_role: 'COMPLETE_USER' | 'MENTOR';
}

const userRoleLables = {
  COMPLETE_USER: '일반 유저',
  MENTOR: '멘토 유저',
};

export const UserInfoSection = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [userInfo, setUserInfo] = useState<userInfoType>({
    nickname: '',
    email: '',
    profile_image: '',
    member_role: 'COMPLETE_USER',
  });
  const uploadImage = useRef<HTMLInputElement | null>(null);
  const { logout } = useUserContext();
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo();
      setUserInfo(data);
    } catch (error) {
      console.error('유저 정보 패치 실패', error);
    }
  };

  const changeNickname = async () => {
    if (newNickname.trim() !== '') {
      try {
        await confirmNickname(newNickname);
        fetchUserInfo();
      } catch (error) {
        console.error('닉네임 변경 실패', error);
      }
    }
    setIsEdit(!isEdit);
  };

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      updateProfileImage(e.target.files[0]);
      fetchUserInfo();
    },
    []
  );

  const handleProfileUpload = useCallback(() => {
    uploadImage.current?.click();
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <VStack borderBottom="4px dotted #C1C1C1" w="100%" pb="60px">
      <HStack
        w="861px"
        h="246px"
        bg="#F6F7F9"
        borderRadius={25}
        gap="43px"
        mt="103px"
        mb="20px"
        pl="100px"
        shadow="0px 0px 12.1px rgba(0, 0, 0, 0.23)"
      >
        <Box position="relative">
          <Image
            src={userInfo.profile_image ? userInfo.profile_image : businessman}
            h="140px"
          />
          <Input
            display="none"
            accept="image/*"
            type="file"
            ref={uploadImage}
            onChange={onUploadImage}
          />
          <IconButton
            onClick={() => handleProfileUpload()}
            aria-label="change profile"
            icon={<CameraBtn />}
            variant="custom"
            position="absolute"
            right={-1}
            bottom={-3}
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Box>
        <Flex flexDir="column" justifyContent="flex-start">
          <Text fontSize="22px" color="#4A4A4A">
            <Text fontWeight={800} color="#000000" as="span">
              {userInfo.nickname}
            </Text>
            님 안녕하세요
          </Text>
          <Text fontSize="15px" color="#4F4F4F" mt="7px">
            {userRoleLables[userInfo.member_role]}
          </Text>
          <Flex fontSize="18px" color="#000000" mt="18px" alignItems="center">
            <Text mr="52px">닉네임</Text>
            {isEdit ? (
              <Flex
                alignItems="center"
                justifyContent="space-between"
                minW="182px"
              >
                <Input
                  w="137px"
                  bg="#FFFFFF"
                  borderColor="#D9D9D9"
                  _focus={{
                    boxShadow: 'none',
                    borderColor: '#D9D9D9',
                  }}
                  fontSize="18px"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                />
                <CheckIcon
                  aria-label="save nickname"
                  _hover={{ transform: 'scale(1.1)' }}
                  onClick={() => changeNickname()}
                  color={BoomerangColors.deepBlue}
                  mr="10px"
                />
              </Flex>
            ) : (
              <Flex
                alignItems="center"
                justifyContent="space-between"
                minW="182px"
              >
                <Text>{userInfo.nickname}</Text>
                <IconButton
                  aria-label="change nickname"
                  icon={<Writedown />}
                  bg="none"
                  _hover={{
                    bg: '#E7E9EC',
                  }}
                  onClick={() => setIsEdit(!isEdit)}
                />
              </Flex>
            )}
          </Flex>
          <Flex fontSize="18px" color="#000000" gap="52px" mt="7px">
            <Text>이메일</Text>
            <Text>{userInfo.email}</Text>
          </Flex>
        </Flex>
      </HStack>

      {userInfo.member_role === 'COMPLETE_USER' && (
        <UserPageBtn onClick={() => ''}>
          <Image src={change} />
          <Text fontWeight="20px" fontSize="bold" color="#6B6B6B">
            멘토 전환 신청
          </Text>
        </UserPageBtn>
      )}

      <UserPageBtn
        onClick={() => {
          logout();
          navigate(ROUTER_PATH.ROOT);
        }}
      >
        <Text fontWeight="20px" fontSize="bold" color="#6B6B6B">
          로그아웃
        </Text>
      </UserPageBtn>
    </VStack>
  );
};

const UserPageBtn = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Button
    mt="10px"
    shadow="0px 0px 7px rgba(0, 0, 0, 0.14)"
    gap="12px"
    bg="#FFF"
    w="861px"
    h="46px"
    borderRadius={10}
    onClick={onClick}
    _hover={{
      bg: '#F4F4F4',
    }}
  >
    {children}
  </Button>
);
