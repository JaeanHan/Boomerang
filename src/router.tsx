import BoomerangBoard from '@components/CommunityBoard/BoomerangBoard';
import ForumPostBoard from '@components/ForumPost/ForumPostBoard';

import React from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import Community from '@/pages/Community';
import { Consulting } from '@/pages/Consulting';
import { DamagePrevention } from '@/pages/DamagePrevention';
import { Guideline } from '@/pages/Guideline';
import { Home } from '@/pages/Home';
import { PreventionResult } from '@/pages/PreventionResult';
import { Welcome } from '@/pages/Welcome';
import { CommunityPosting } from '@/templates/Community/CommunityPosting';

export const ROUTER_PATH = {
  ROOT: '/',
  WELCOME: '/welcome',
  USER: '/user',
  GUIDELINE: '/guideline',
  PREVENT: '/prevent/:id',
  COMMUNITY: '/community/:type',
  POST_DETAIL: '/community/:type/post',
  POSTING: '/community/post',
  PREVENT_RESULT: '/preventResult',
  CONSULTING: '/consulting',
  NOT_FOUND: '*',
} as const;

const PrivateRoute = (): React.ReactElement => {
  const auth = true;
  return auth ? <Outlet /> : <Navigate to={ROUTER_PATH.ROOT} />;
};

export const router = createBrowserRouter([
  { index: true, path: ROUTER_PATH.ROOT, element: <Home /> },
  { path: ROUTER_PATH.WELCOME, element: <Welcome /> },
  { path: ROUTER_PATH.GUIDELINE, element: <Guideline /> },
  { path: ROUTER_PATH.PREVENT_RESULT, element: <PreventionResult /> },
  { path: ROUTER_PATH.CONSULTING, element: <Consulting /> },
  {
    element: <Community />,
    children: [
      {
        path: ROUTER_PATH.POSTING,
        element: <CommunityPosting />,
      },
      {
        path: ROUTER_PATH.POST_DETAIL,
        element: <ForumPostBoard />,
      },
      {
        path: ROUTER_PATH.COMMUNITY,
        element: <BoomerangBoard />,
      },
    ],
  },
  { path: ROUTER_PATH.PREVENT, element: <DamagePrevention /> },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: ROUTER_PATH.USER,
        element: <div>private router</div>,
      },
    ],
  },
  {
    path: '*',
    // element: <Navigate to={ROUTER_PATH.ROOT} />,
    element: <div>404</div>,
  },
]);
