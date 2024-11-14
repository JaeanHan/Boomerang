import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MoreInfoSection } from '@/components/PreventionResult/MoreInfoSection';
import { ReportResultSection } from '@/components/PreventionResult/ReportResultSection';
import { BasicLayout } from '@/components/commons/BasicLayout';
import { Box } from '@chakra-ui/react';

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

export const PreventionResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  if (!state || !state.resultData) {
    navigate(-1);
    return null;
  }

  const { resultData } = state;

  return (
    <BasicLayout maxW={1024}>
      <Box bg="#FFF" borderRadius={20}>
        <ReportResultSection resultData={resultData} />
        <MoreInfoSection resultData={resultData} />
      </Box>
    </BasicLayout>
  );
};
