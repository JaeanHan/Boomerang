import { MentorCalendar } from '@/components/Sidebar/sidebarIcons/MentorCalendar';
import { MentorCharge } from '@/components/Sidebar/sidebarIcons/MentorCharge';
import { MentorCheck } from '@/components/Sidebar/sidebarIcons/MentorCheck';
import { MentorEmergency } from '@/components/Sidebar/sidebarIcons/MentorEmergency';
import { MentorMessage } from '@/components/Sidebar/sidebarIcons/MentorMessage';
import { MentorPaper } from '@/components/Sidebar/sidebarIcons/MentorPaper';
import { MentorPeople } from '@/components/Sidebar/sidebarIcons/MentorPeople';
import { MentorSearch } from '@/components/Sidebar/sidebarIcons/MentorSearch';
import { ROUTER_PATH } from '@/routerPath';

export const menteeSidebarCategories = [
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

export const mentorSidebarCategories = [
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
