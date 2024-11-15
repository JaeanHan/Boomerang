import { MainStep, SubStep } from '@apis/guideline/types';

import React, { createContext, useContext } from 'react';

export interface GuidelineContextType {
  currIdx: number;
  setCurrIdx: (value: ((prevState: number) => number) | number) => void;
  mainStepList: MainStep[];
  subStepList: SubStep[];
}

export const GuidelineContext = createContext<GuidelineContextType | undefined>(
  undefined
);

export const useGuidelineContext = () => {
  const context = useContext(GuidelineContext);
  if (context === undefined) {
    throw new Error(
      'useGuidelineContext must be used within a GuidelineProvider'
    );
  }
  return context;
};
