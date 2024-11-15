import { sidebarWidth } from '@components/Sidebar/constants';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserInfo } from '@/apis/user';
import {
  menteeSidebarCategories,
  mentorSidebarCategories,
} from '@/components/Sidebar/sidebarCategories';
import { useSidebar } from '@/pages/ConsultingManagement/SidebarContext';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import SidebarArrowClose from '@images/SidebarArrowClose.svg?react';
import profileImg from '@images/profileImg.svg';

interface userProfileProps {
  nickname: string;
  member_role: keyof typeof userType;
  profile_image: string;
}

const userType = {
  COMPLETE_USER: '일반',
  MENTOR: '멘토',
};

export const Sidebar: React.FC = () => {
  const { isSidebarOpen: isOpen, setIsSidebarOpen: setIsOpen } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userProfile, setUserProfile] = useState<userProfileProps>({
    nickname: '',
    member_role: 'COMPLETE_USER',
    profile_image: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const { nickname, member_role, profile_image } = await getUserInfo();
      setUserProfile({
        nickname: nickname,
        member_role: member_role,
        profile_image: profile_image,
      });
    } catch (error) {
      console.error('유저 정보 패치 실패', error);
    }
  };

  const sidebarCategories =
    userProfile.member_role === 'MENTOR'
      ? mentorSidebarCategories
      : menteeSidebarCategories;

  const handleButtonClick = (category: string, path: string) => {
    setSelectedCategory(category);
    navigate(path);
  };

  return (
    <Box
      as="nav"
      bg="#EBF1F5"
      w={isOpen ? `${sidebarWidth}px` : '0'}
      transition="width 0.5s"
      h="calc(100% - 55px)"
      position="fixed"
      top="55px"
      left="0"
      overflow="hidden"
      zIndex={9999}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <VStack spacing={0}>
        <IconButton
          icon={<SidebarArrowClose />}
          aria-label="사이드바 닫기"
          onClick={() => setIsOpen(!isOpen)}
          alignSelf="flex-end"
          mt="25px"
          mr="20px"
          opacity={isHovered ? 1 : 0}
        />
        <UserProfileSection
          profile_image={userProfile.profile_image}
          nickname={userProfile.nickname}
          member_role={userProfile.member_role}
        />
        <Box height="138px" w="100%" borderBottom="0.8px solid #BCD1DF" />
        {sidebarCategories.map((category) => (
          <Button
            key={category.title}
            w="100%"
            h="72px"
            gap="8px"
            borderBottom="0.8px solid #BCD1DF"
            borderRadius={0}
            onClick={() => handleButtonClick(category.title, category.path)}
            bg={category.title === selectedCategory ? '#B1D7F1' : 'none'}
          >
            <category.icon
              color={
                category.title === selectedCategory ? '#005DFF' : '#6B6B6B'
              }
            />
            <Text
              fontWeight="bold"
              fontSize="20px"
              color={
                category.title === selectedCategory ? '#005DFF' : '#6B6B6B'
              }
            >
              {category.title}
            </Text>
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

const UserProfileSection: React.FC<userProfileProps> = ({
  profile_image,
  nickname,
  member_role,
}) => {
  return (
    <Box mt="23px" w="266px">
      <Flex alignItems="center" gap="15px">
        <Image
          src={profile_image ? profile_image : profileImg}
          w="77px"
          borderRadius="50px"
        />
        <Box>
          <Text fontWeight={800} fontSize="20px" color="#4D4D4D">
            {nickname}
          </Text>
          <Text fontSize="15px" color="#4D4D4D">
            {userType[member_role]} 사용자
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
