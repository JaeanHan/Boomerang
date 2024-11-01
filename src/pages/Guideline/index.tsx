import { getCurrentGuideLineProgress } from '@apis/guideline';
import { ProgressResponse } from '@apis/guideline/types';

import { GuidelineChecklist } from '@components/Guideline/GuidelineChecklist';
import { GuidelineCloseBanner } from '@components/Guideline/GuidelineCloseBanner';
import { GuidelineNavHelp } from '@components/Guideline/GuidelineNavHelp';
import { GuidelineProgressBar } from '@components/Guideline/GuidelineProgressBar';
import { GuidelineStatistics } from '@components/Guideline/GuidelineStatistics';
import { GuidelineWarning } from '@components/Guideline/GuidelineWarning';
import { BasicLayout } from '@components/commons/BasicLayout';

import React from 'react';

import { Flex, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

const mockResponse: ProgressResponse = {
  progress_type: 'A타입',
  current_main_step: '진행도1번',
  main_step_list: [
    { main_step_name: '진행도1번', completion: false },
    { main_step_name: '진행도2번', completion: false },
    { main_step_name: '진행도3번', completion: false },
    { main_step_name: '진행도4번', completion: false },
  ],
  sub_step_list: [
    {
      name: '서브스텝1',
      content: '100글자 아무거나',
      completion: false,
    },
    {
      name: '서브스텝2',
      content: '설명',
      completion: false,
    },
    {
      name: '서브스텝3',
      content: '100글자 아무거나',
      completion: false,
    },
    {
      name: '서브스텝4',
      content: '설명',
      completion: false,
    },
  ],
};

export const Guideline: React.FC = () => {
  const { data } = useQuery<ProgressResponse>({
    queryFn: getCurrentGuideLineProgress,
    queryKey: ['guideline-progress'],
  });
  // const data = getCurrentGuideLineProgress();
  const safe = data ?? mockResponse;

  const {
    main_step_list: mainStepList,
    current_main_step: currentMainStep,
    sub_step_list: subStepList,
  } = safe;

  const currIdx = mainStepList.findIndex(
    (ele) => ele.main_step_name === currentMainStep
  );

  return (
    <BasicLayout maxW={1015}>
      <VStack spacing={'39px'} align="stretch" mb={'66px'}>
        <GuidelineProgressBar
          h={195}
          currMainIdx={currIdx}
          mainStepList={mainStepList}
        />
        {/*<GuidelineSaveButton h={49} />*/}
        <Flex gap={'40px'} h={'max-content'}>
          <GuidelineChecklist
            h={667}
            subStepList={subStepList}
            mainStep={currentMainStep}
          />
          <VStack h={667} justifyContent="space-between">
            <GuidelineWarning h={361} />
            <GuidelineNavHelp h={278} />
          </VStack>
        </Flex>
        <GuidelineStatistics h={530} />
        <GuidelineCloseBanner h={274} />
      </VStack>
    </BasicLayout>
  );
};
