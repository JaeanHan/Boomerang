import BoomerangBoard from '@components/CommunityBoard/BoomerangBoard';
import ForumPostBoard from '@components/ForumPost/ForumPostBoard';

import React from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import Community from '@/pages/Community';
import { DamagePrevention1 } from '@/pages/DamagePrevention1';
import { Guideline } from '@/pages/Guideline';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Welcome } from '@/pages/Welcome';
import { ROUTER_PATH } from '@/routerPath';
import { CommunityPosting } from '@/templates/Community/CommunityPosting';

const PrivateRoute = (): React.ReactElement => {
  const auth = true;
  return auth ? <Outlet /> : <Navigate to={ROUTER_PATH.ROOT} />;
};

export const router = createBrowserRouter([
  { index: true, path: ROUTER_PATH.ROOT, element: <Home /> },
  { path: ROUTER_PATH.WELCOME, element: <Welcome /> },
  { path: ROUTER_PATH.GUIDELINE, element: <Guideline /> },
  { path: ROUTER_PATH.PREVENT, element: <DamagePrevention1 /> },
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
    path: ROUTER_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: '*',
    // element: <Navigate to={ROUTER_PATH.ROOT} />,
    element: <div>404</div>,
  },
]);
