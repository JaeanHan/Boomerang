import { BasicLayout } from '@components/commons/BasicLayout';

import React from 'react';
import { Outlet } from 'react-router-dom';

import BoomerangBoard from '../../components/CommunityBoard/BoomerangBoard';

const Community: React.FC = () => (
  <BasicLayout maxW={1920} bg="white">
    <Outlet />
  </BasicLayout>
);

export default Community;
