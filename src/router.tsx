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
import { kakaoLoginUrl } from '@/pages/Login/constants';
import { MentorConsultingManagement } from '@/pages/MentorConsultingManagement';
import { MentorSwitch } from '@/pages/MentorSwitch';
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

import ChangeAlert from './pages/ChageAlert';
import { DamagePrevention } from './pages/DamagePrevention';

const PrivateRoute = (): React.ReactElement => {
  const auth = true;
  return auth ? <Outlet /> : <Navigate to={ROUTER_PATH.ROOT} />;
};

const guidelineLoader = async () => {
  try {
    const response: ProgressResponse = await getCurrentGuideLineProgress();

    return response;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data;
      if (data.code === 'MB002') {
        window.location.href = kakaoLoginUrl;
        return null;
      }
      if (data.code === 'PG004') {
        throw new Response(
          JSON.stringify({ code: data.code, message: data.message }),
          {
            status: 400,
          }
        );
      }

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
  { path: ROUTER_PATH.MENTOR_SWITCH, element: <MentorSwitch /> },

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
]);
