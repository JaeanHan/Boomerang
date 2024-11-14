import React from 'react';

import Auction from '@/components/Auction/Auction';
import { BasicLayout } from '@/components/commons/BasicLayout';

const AuctionPage: React.FC = () => {
  return (
    <BasicLayout maxW="full">
      <Auction />
    </BasicLayout>
  );
};

export default AuctionPage;
