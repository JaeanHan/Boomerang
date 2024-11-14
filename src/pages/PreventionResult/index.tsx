import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MoreInfoSection } from '@/components/PreventionResult/MoreInfoSection';
import { ReportResultSection } from '@/components/PreventionResult/ReportResultSection';
import { BasicLayout } from '@/components/commons/BasicLayout';
import { Box } from '@chakra-ui/react';

interface Mortgage {
  id: number;
  amount: number;
  creditor: string;
  registration_date: number[];
}

interface ResultData {
  id: number;
  address: string;
  house_price: number;
  deposit_amount: number;
  mortgages: Mortgage[];
  total_mortgage_amount: number;
  date: string;
}

interface LocationState {
  resultData: ResultData;
}

export const PreventionResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState<ResultData | null>(null);

  useEffect(() => {
    const state = location.state as LocationState | undefined;
    if (state && state.resultData) {
      setResultData(state.resultData);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <BasicLayout maxW={1024}>
      <Box bg="#FFF" borderRadius={20}>
        {resultData && (
          <>
            <ReportResultSection resultData={resultData} />
            <MoreInfoSection />
          </>
        )}
      </Box>
    </BasicLayout>
  );
};
