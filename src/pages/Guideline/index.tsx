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

const filterUniqueSubSteps = (subSteps: SubStep[]): SubStep[] => {
  const seenNames = new Set<string>();

  return subSteps.filter((subStep) => {
    if (seenNames.has(subStep.name)) {
      return false;
    }
    seenNames.add(subStep.name);
    return true;
  });
};

let isInit = true;

export const Guideline: React.FC = () => {
  const data = useLoaderData() as ProgressResponse;
  const { main_step_list, current_main_step, sub_step_list } = data;

  const [currMainIdx, setCurrMainIdx] = useState(() =>
    main_step_list.findIndex(
      (mainStep: MainStep) => mainStep.main_step_name === current_main_step
    )
  );
  const [currViewIdx, setCurrViewIdx] = useState(() => currMainIdx);
  const [mainStepList, setMainStepList] = useState<MainStep[]>(
    () => main_step_list
  );
  // TODO : 백엔드에서 중복 제거 할 때 까지 유지
  const [subStepList, setSubStepList] = useState<SubStep[]>(() =>
    filterUniqueSubSteps(sub_step_list)
  );

  useEffect(() => {
    if (isInit) {
      isInit = false;
      return;
    }
    getSubStepsByMainStep(mainStepList[currViewIdx].main_step_name)
      .then((res) => {
        const {
          main_step_list: newMainStepList,
          sub_step_list: newSubStepList,
        } = res;
        setMainStepList(newMainStepList);
        setSubStepList(filterUniqueSubSteps(newSubStepList));
      })
      .catch(() => {
        setCurrViewIdx(currViewIdx);
      });
  }, [currViewIdx]);

  const value: GuidelineContextType = {
    currIdx: currViewIdx,
    setCurrIdx: setCurrViewIdx,
    mainStepList,
    subStepList,
    currMainIdx,
    setCurrMainIdx,
  };

  return (
    <BasicLayout maxW={1015}>
      <GuidelineContext.Provider value={value}>
        <VStack spacing={'39px'} align="stretch" mb={'66px'}>
          <GuidelineProgressBar h={195} currPosIdx={currMainIdx} />
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
