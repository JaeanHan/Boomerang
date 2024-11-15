import { getCurrentGuideLineProgress } from '@apis/guideline';
import { ProgressResponse } from '@apis/guideline/types';

import React from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import { ConsultingChat } from '@/components/ConsultingManagement/ConsultingChat';
import { ConsultingHistory } from '@/components/ConsultingManagement/ConsultingHistory';
import { ConsultingScheduling } from '@/components/ConsultingManagement/ConsultingScheduling';
import { ConsultingStart } from '@/components/ConsultingManagement/ConsultingStart';
import { PreviousConsulting } from '@/components/ConsultingManagement/PreviousConsulting';
import { SelectMentor } from '@/components/ConsultingManagement/SelectMentor';
import { ConfirmConsultingRequest } from '@/components/MentorConsultingManagement/ConfirmConsultingRequest';
import { MentorChat } from '@/components/MentorConsultingManagement/MentorChat';
import { MentorConsultingHistory } from '@/components/MentorConsultingManagement/MentorConsultingHistory';
import { MentorDateRegistration } from '@/components/MentorConsultingManagement/MentorDateRegistration';
import { MentorScheduledConsulting } from '@/components/MentorConsultingManagement/MentorScheduledConsulting';
import AuctionPage from '@/pages/Auction';
import Channel from '@/pages/Channel';
import { Community } from '@/pages/Community';
import { Consulting } from '@/pages/Consulting';
import { ConsultingManagement } from '@/pages/ConsultingManagement';
import { DocumentForm } from '@/pages/DocumentForm';
import { FullProgressGuide } from '@/pages/FullProgressGuide';
import { Guideline } from '@/pages/Guideline';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { MentorConsultingManagement } from '@/pages/MentorConsultingManagement';
import { PreventionResult } from '@/pages/PreventionResult';
import ReportDetail from '@/pages/ReportDetail';
import { Survey } from '@/pages/Survey';
import { User } from '@/pages/User';
import { Welcome } from '@/pages/Welcome';
import { ROUTER_PATH } from '@/routerPath';
import { CommunityBoard } from '@/templates/Community/CommunityBoard';
import { CommunityPostDetail } from '@/templates/Community/CommunityPostDetail';
import { CommunityPosting } from '@/templates/Community/CommunityPosting';
import axios from 'axios';

import { 서류필드기입폼 } from './components/DocumentForm/서류필드기입폼';
import ChangeAlert from './pages/ChageAlert';
import { DamagePrevention } from './pages/DamagePrevention';

const PrivateRoute = (): React.ReactElement => {
  const auth = true;
  return auth ? <Outlet /> : <Navigate to={ROUTER_PATH.ROOT} />;
};

const fields = [
  { id: 1, label: '성명' },
  { id: 2, label: '생년월일' },
  { id: 3, label: '주민등록지' },
  { id: 4, label: '별도 우편 수령지 주소' },
  { id: 5, label: '전화번호' },
  { id: 6, label: '전자 우편주소' },
  { id: 7, label: '대리인 성명' },
  { id: 8, label: '대리인 생년월일' },
  { id: 9, label: '대리인 주소' },
  { id: 10, label: '대리인 전화번호' },
  { id: 11, label: '대리인 전자우편주소' },
  { id: 12, label: '전세사기 피해 주택 지번주소' },
  { id: 13, label: '전임대인 성명' },
  { id: 14, label: '전임대인 생년월일' },
  { id: 15, label: '현임대인 성명' },
  { id: 16, label: '현임대인 생년월일' },
  { id: 17, label: '공인중개사 상호(등록번호)' },
  { id: 18, label: '공인중개사 대표자명' },
  { id: 19, label: '공인중개사 연락처' },
  { id: 20, label: '계약일자' },
  { id: 21, label: '전월세구분(전세/보증부 월세)*', type: 'checkbox' },
  { id: 22, label: '계약기간' },
  { id: 23, label: '선순위 담보권(여/부)*', type: 'checkbox' },
  { id: 24, label: '선순위 담보권자(금융기관/개인)*', type: 'checkbox' },
  { id: 25, label: '압류(여/부)*', type: 'checkbox' },
  {
    id: 26,
    label: '압류권자(국가 또는 지방자치단체/이외의 자)*',
    type: 'checkbox',
  },
  {
    id: 27,
    label: '주택 유형(아파트/오피스텔/다세대/연립/단독/다중/다가구/기타)*',
    type: 'checkbox',
  },
  { id: 28, label: '대항력 발생일' },
  { id: 29, label: '전입일자' },
  { id: 30, label: '점유일자' },
  { id: 31, label: '확정일자' },
  { id: 32, label: '임차권 등기명령 사건번호' },
  { id: 33, label: '(거주/퇴거)*', type: 'checkbox' },
  { id: 34, label: '임차보증금' },
  { id: 35, label: '월세' },
  { id: 36, label: '파산·회생 사건번호' },
  { id: 37, label: '경매 사건번호' },
  { id: 38, label: '공매 물건관리번호' },
  { id: 39, label: '압류 사건번호' },
  { id: 40, label: '집행 권원 확보 여부(여/부)*', type: 'checkbox' },
  { id: 41, label: '임대인등의 기망 이유 혹은 수사개시 등' },
  { id: 42, label: '경매 배당요구 여부(여/부)*', type: 'checkbox' },
  { id: 43, label: '공매 배분요구 여부(여/부)*', type: 'checkbox' },
  { id: 44, label: '경매·매각·유예·정지 긴급 여부(여/부)*', type: 'checkbox' },
  { id: 45, label: '신청일' },
  { id: 46, label: '제출지역(광역자치단체)' },
];

const guidelineLoader = async () => {
  try {
    const response: ProgressResponse = await getCurrentGuideLineProgress();

    return response;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data;
      // TODO: CODE ENUM 등록 필요
      if (data.code === 'PG004') {
        throw new Response(
          JSON.stringify({ code: data.code, message: data.message }),
          {
            status: 400,
          }
        );
      }
      // TODO : 로그인 에러시?
      // TODO: 공통 에러 처리 페이지 필요
    }
  }
};

export const router = createBrowserRouter([
  { index: true, path: ROUTER_PATH.ROOT, element: <Home /> },
  { path: ROUTER_PATH.WELCOME, element: <Welcome /> },
  {
    path: ROUTER_PATH.GUIDELINE,
    loader: guidelineLoader,
    element: <Guideline />,
    errorElement: <Survey />,
  },
  {
    path: ROUTER_PATH.JOURNEY_PREVIEW,
    element: <FullProgressGuide />,
  },
  { path: ROUTER_PATH.CONSULTING, element: <Consulting /> },
  { path: ROUTER_PATH.SURVEY, element: <Survey /> },
  { path: ROUTER_PATH.DOCUMENT_FORM, element: <DocumentForm /> },
  {
    element: <ConsultingManagement />,
    children: [
      {
        path: ROUTER_PATH.CONSULTING_HISTORY,
        element: <ConsultingHistory />,
      },
      {
        path: ROUTER_PATH.SELECT_MENTOR,
        element: <SelectMentor />,
      },
      {
        path: ROUTER_PATH.CONSULTING_SCHEDULING,
        element: <ConsultingScheduling />,
      },
      {
        path: ROUTER_PATH.CONSULTING_START,
        element: <ConsultingStart />,
      },
      {
        path: ROUTER_PATH.CONSULTING_CHAT,
        element: <ConsultingChat />,
      },
      {
        path: ROUTER_PATH.PREVIOUS_CONSULTING,
        element: <PreviousConsulting />,
      },
    ],
  },
  {
    element: <MentorConsultingManagement />,
    children: [
      {
        path: ROUTER_PATH.MENTOR_DATE_REGISTRATION,
        element: <MentorDateRegistration />,
      },
      {
        path: ROUTER_PATH.MENTOR_CONFIRM_REQUEST,
        element: <ConfirmConsultingRequest />,
      },
      {
        path: ROUTER_PATH.MENTOR_SCHEDULED,
        element: <MentorScheduledConsulting />,
      },
      {
        path: ROUTER_PATH.MENTOR_CHAT,
        element: <MentorChat />,
      },
      {
        path: ROUTER_PATH.MENTOR_CONSULTING_HISTORY,
        element: <MentorConsultingHistory />,
      },
    ],
  },
  {
    element: <Community />,
    children: [
      {
        path: ROUTER_PATH.POST_DETAIL,
        element: <CommunityPostDetail />,
      },
      {
        path: ROUTER_PATH.COMMUNITY,
        element: <CommunityBoard />,
      },
      {
        path: ROUTER_PATH.POSTING,
        element: <CommunityPosting />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: ROUTER_PATH.USER,
        element: <User />,
      },
    ],
  },
  {
    path: ROUTER_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
  {
    path: ROUTER_PATH.PREVENT,
    element: <DamagePrevention />,
  },
  {
    path: ROUTER_PATH.PREVENT_RESULT,
    element: <PreventionResult />,
  },
  {
    path: ROUTER_PATH.REPORTDETAIL,
    element: <ReportDetail />,
  },
  {
    path: ROUTER_PATH.CHANGEALERT,
    element: <ChangeAlert />,
  },
  {
    path: ROUTER_PATH.AUCTION,
    element: <AuctionPage />,
  },
  {
    path: ROUTER_PATH.CHANNEL,
    element: <Channel />,
  },
  {
    path: ROUTER_PATH.DOC,
    element: (
      <서류필드기입폼
        title="서류 작성"
        description="서류 작성에 대한 설명입니다."
        image="/path/to/image.png"
        fields={fields}
      />
    ),
  },
]);
