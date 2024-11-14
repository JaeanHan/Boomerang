import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Auction from '@/components/Auction/Auction';
import { BasicLayout } from '@/components/commons/BasicLayout';

interface Mortgage {
  amount: number;
  creditor: string;
  registration_date: string;
}

interface ResultData {
  address: string;
  house_price: number;
  deposit_amount: number;
  total_mortgage_amount: number;
  date: string;
  mortgages: Mortgage[];
}

interface LocationState {
  resultData: ResultData;
}

const AuctionPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  if (!state || !state.resultData) {
    navigate(-1);
    return null;
  }

  const { resultData } = state;

  return (
    <BasicLayout maxW="full">
      <Auction resultData={resultData} />
    </BasicLayout>
  );
};

export default AuctionPage;
