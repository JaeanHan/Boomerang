import { sidebarWidth } from '@components/Sidebar/constants';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MentorCalendar } from '@/components/Sidebar/sidebarIcons/MentorCalendar';
import { MentorCharge } from '@/components/Sidebar/sidebarIcons/MentorCharge';
import { MentorCheck } from '@/components/Sidebar/sidebarIcons/MentorCheck';
import { MentorEmergency } from '@/components/Sidebar/sidebarIcons/MentorEmergency';
import { MentorMessage } from '@/components/Sidebar/sidebarIcons/MentorMessage';
import { MentorPaper } from '@/components/Sidebar/sidebarIcons/MentorPaper';
import { MentorPeople } from '@/components/Sidebar/sidebarIcons/MentorPeople';
import { MentorSearch } from '@/components/Sidebar/sidebarIcons/MentorSearch';
import { useSidebar } from '@/pages/ConsultingManagement/SidebarContext';
import { ROUTER_PATH } from '@/routerPath';
import { BoomerangColors } from '@/utils/colors';
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
import blueArrow2 from '@images/blueArrow2.svg';
import profileImg from '@images/profileImg.svg';

export const Sidebar: React.FC = () => {
  const { isSidebarOpen: isOpen, setIsSidebarOpen: setIsOpen } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  //TODO: 임시
  const userType = 'MENTOR';

  const menteeSidebarCategories = [
    {
      title: '멘토 선택하기',
      icon: MentorPeople,
      path: ROUTER_PATH.SELECT_MENTOR,
    },
    {
      title: '상담 진행하기',
      icon: MentorMessage,
      path: ROUTER_PATH.CONSULTING_START,
    },
    {
      title: '과거 상담 내용 조회하기',
      icon: MentorSearch,
      path: ROUTER_PATH.PREVIOUS_CONSULTING,
    },
    {
      title: '불편 사항 신고',
      icon: MentorEmergency,
      path: '',
    },
    {
      title: '포인트 충전하기',
      icon: MentorCharge,
      path: '',
    },
  ];

  const mentorSidebarCategories = [
    {
      title: '상담 일자 등록하기',
      icon: MentorCalendar,
      path: ROUTER_PATH.MENTOR_DATE_REGISTRATION,
    },
    {
      title: '신청 내역 확인하기',
      icon: MentorCheck,
      path: ROUTER_PATH.MENTOR_CONFIRM_REQUEST,
    },
    {
      title: '상담 예정 내용 확인하기',
      icon: MentorPaper,
      path: ROUTER_PATH.MENTOR_SCHEDULED,
    },
    {
      title: '과거 상담 내역 조회하기',
      icon: MentorSearch,
      path: ROUTER_PATH.MENTOR_CONSULTING_HISTORY,
    },
    {
      title: '불편 사항 신고',
      icon: MentorEmergency,
      path: '',
    },
    {
      title: '포인트 충전하기',
      icon: MentorCharge,
      path: '',
    },
  ];

  const sidebarCategories =
    userType === 'MENTOR' ? mentorSidebarCategories : menteeSidebarCategories;

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
        <UserProfileSection />
        <Box height="59px" w="100%" borderBottom="0.8px solid #BCD1DF" />
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

const UserProfileSection = () => {
  const user = {
    name: '유저 닉네임',
    type: '일반',
    profile: profileImg,
  };

  return (
    <Box mt="23px">
      <Flex alignItems="center" gap="15px">
        <Image src={user.profile ? user.profile : profileImg} />
        <Box>
          <Text fontWeight={800} fontSize="20px" color="#4D4D4D">
            {user.name}
          </Text>
          <Text fontSize="15px" color="#4D4D4D">
            {user.type} 사용자
          </Text>
        </Box>
      </Flex>
      <Button
        borderRadius="7px"
        bg={BoomerangColors.white}
        border="1px solid #BFBFBF"
        w="266px"
        h="52px"
        mt="28px"
      >
        <Text fontSize="18px" fontWeight="bold" color="#6B6B6B">
          {user.type} 사용자
        </Text>
        <Image src={blueArrow2} position="absolute" top="13px" right="17px" />
      </Button>
    </Box>
  );
};
