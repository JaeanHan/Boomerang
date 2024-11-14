import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import apiInstance from '@/apis';
import { PreventionBtn } from '@/components/DamagePrevention/PreventionBtn';
import { ProcedureBar } from '@/components/DamagePrevention/ProgressBar';
import { Step1 } from '@/components/DamagePrevention/step1';
import { Step2 } from '@/components/DamagePrevention/step2';
import { Step3 } from '@/components/DamagePrevention/step3';
import { SurveyQuestions } from '@/components/Survey/QuestionSection';
import { BasicLayout } from '@/components/commons/BasicLayout';
import { ROUTER_PATH } from '@/routerPath';
import { Flex, VStack, useToast } from '@chakra-ui/react';

interface ErrorResponse {
  code: string;
  message: string;
}

export const preventionSurvey: SurveyQuestions[] = [
  {
    title: '조회할 집 주소의 별칭을 지정해주세요.',
    subtitle: '추후 리포트를 조회할때 사용되요!',
  },
  {
    title: '등기부 등본에 다음 해당사항이 있나요?',
    subtitle: '정확히 선택해주셔야 정확한 가이드가 가능합니다.',
  },
];

export const DamagePrevention: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const currentId = id ? parseInt(id) : 1;
  const totalStep = 3;
  const navigate = useNavigate();
  const toast = useToast();

  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [address, setAddress] = useState('');
  const [issuanceTypeId, setIssuanceTypeId] = useState<number | null>(null);
  const [depositTypeId, setDepositTypeId] = useState<number | null>(null);
  const [housePrice, setHousePrice] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [mortgages, setMortgages] = useState<
    { amount: number; creditor: string; registration_date: string }[]
  >([]);

  const goToPreviousStep = () => {
    if (currentId > 1) {
      navigate(`/prevent/${currentId - 1}`);
    }
  };

  const goToNextStep = async () => {
    if (currentId === totalStep) {
      try {
        const response = await apiInstance.post('/api/v1/prevention', {
          address,
          house_price: Number(housePrice),
          deposit_amount: Number(depositAmount),
          mortgages,
        });

        const resultData = {
          ...response.data,
          date: new Date().toLocaleString(),
        };

        navigate(ROUTER_PATH.PREVENT_RESULT, { state: { resultData } });
      } catch (error) {
        const err = error as { response?: { data: ErrorResponse } };
        toast({
          title: '오류 발생',
          description:
            err.response?.data.message || '요청 중 오류가 발생했습니다.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      navigate(`/prevent/${currentId + 1}`);
    }
  };

  let currentStepComponent;
  if (currentId === 1) {
    currentStepComponent = (
      <Step1
        setIsNextButtonEnabled={setIsNextButtonEnabled}
        address={address}
        setAddress={setAddress}
        selectedId={issuanceTypeId}
        setSelectedId={setIssuanceTypeId}
        isNextButtonEnabled={isNextButtonEnabled}
      />
    );
  } else if (currentId === 2) {
    currentStepComponent = (
      <Step2
        setIsNextButtonEnabled={setIsNextButtonEnabled}
        selectedId={depositTypeId}
        setSelectedId={setDepositTypeId}
      />
    );
  } else if (currentId === 3) {
    currentStepComponent = (
      <Step3
        setIsNextButtonEnabled={setIsNextButtonEnabled}
        housePrice={housePrice}
        setHousePrice={setHousePrice}
        depositAmount={depositAmount}
        setDepositAmount={setDepositAmount}
        mortgages={mortgages}
        setMortgages={setMortgages}
      />
    );
  }

  return (
    <BasicLayout maxW={1024}>
      <VStack
        bgColor="#FFF"
        align="stretch"
        borderRadius={20}
        shadow="0px 0px 4.3px rgba(0,0,0,0.25)"
        mt={'52px'}
      >
        <ProcedureBar nowStep={currentId} totalStep={totalStep} />
        {currentStepComponent}
      </VStack>

      <Flex justifyContent="flex-end" mt="41px" gap={'772px'}>
        {currentId !== 1 && (
          <PreventionBtn bgColor="#969696" onClick={goToPreviousStep}>
            이전
          </PreventionBtn>
        )}
        <PreventionBtn
          bgColor="#176CFF"
          onClick={goToNextStep}
          isDisabled={!isNextButtonEnabled}
        >
          다음
        </PreventionBtn>
      </Flex>
    </BasicLayout>
  );
};
