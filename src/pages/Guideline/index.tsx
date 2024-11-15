import { getSubStepsByMainStep } from '@apis/guideline';
import { MainStep, ProgressResponse, SubStep } from '@apis/guideline/types';

import { GuidelineChecklist } from '@components/Guideline/GuidelineChecklist';
import { GuidelineCloseBanner } from '@components/Guideline/GuidelineCloseBanner';
import { GuidelineNavHelp } from '@components/Guideline/GuidelineNavHelp';
import { GuidelineProgressBar } from '@components/Guideline/GuidelineProgressBar';
import { GuidelineStatistics } from '@components/Guideline/GuidelineStatistics';
import { GuidelineWarning } from '@components/Guideline/GuidelineWarning';
import { BasicLayout } from '@components/commons/BasicLayout';

import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import {
  GuidelineContext,
  GuidelineContextType,
} from '@/pages/Guideline/guidelineContext';
import { Flex, VStack } from '@chakra-ui/react';

export const Guideline: React.FC = () => {
  const data = useLoaderData() as ProgressResponse;
  const { main_step_list, current_main_step, sub_step_list } = data;

  const currPosIdx = main_step_list.findIndex(
    (mainStep: MainStep) => mainStep.main_step_name === current_main_step
  );
  const [currIdx, setCurrIdx] = useState(currPosIdx);
  const [mainStepList, setMainStepList] = useState<MainStep[]>(
    () => main_step_list
  );
  const [subStepList, setSubStepList] = useState<SubStep[]>(
    () => sub_step_list
  );

  useEffect(() => {
    if (currIdx !== currPosIdx) {
      getSubStepsByMainStep(mainStepList[currIdx].main_step_name)
        .then((res) => {
          const {
            main_step_list: newMainStepList,
            sub_step_list: newSubStepList,
          } = res;
          setMainStepList(newMainStepList);
          setSubStepList(newSubStepList);
        })
        .catch(() => {
          setCurrIdx(currIdx);
        });
      return;
    }
    setMainStepList(main_step_list);
    setSubStepList(sub_step_list);
  }, [currIdx]);

  const value: GuidelineContextType = {
    currIdx,
    setCurrIdx,
    mainStepList,
    subStepList,
  };

  return (
    <BasicLayout maxW={1015}>
      <GuidelineContext.Provider value={value}>
        <VStack spacing={'39px'} align="stretch" mb={'66px'}>
          <GuidelineProgressBar h={195} currPosIdx={currPosIdx} />
          <Flex gap={'40px'} h={'max-content'}>
            <GuidelineChecklist h={667} />
            <VStack h={667} justifyContent="space-between">
              <GuidelineWarning h={361} />
              <GuidelineNavHelp h={278} />
            </VStack>
          </Flex>
          <GuidelineStatistics h={530} />
          <GuidelineCloseBanner h={274} />
        </VStack>
      </GuidelineContext.Provider>
    </BasicLayout>
  );
};
