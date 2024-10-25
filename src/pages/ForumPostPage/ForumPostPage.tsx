import ForumPostBoard from '@components/ForumPost/ForumPostBoard';
import { BasicLayout } from '@components/commons/BasicLayout';

import React from 'react';

const ForumPostPage: React.FC = () => {
  return (
    <BasicLayout maxW={1920} bg="white">
      <ForumPostBoard />
    </BasicLayout>
  );
};

export default ForumPostPage;
