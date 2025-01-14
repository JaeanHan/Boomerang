import styles from '@components/Guideline/index.module.css';

import React from 'react';

import { AverageTime } from '@/components/Guideline/GuidelineProgressBar/AverageTime';
import { Percentage } from '@/components/Guideline/GuidelineProgressBar/Percentage';
import { ProgressBar } from '@/components/Guideline/GuidelineProgressBar/ProgressBar';
import { PropH } from '@/components/commons/types';
import { useGuidelineContext } from '@/pages/Guideline/guidelineContext';
import { BoomerangColors } from '@/utils/colors';
import { Box, Button, Flex } from '@chakra-ui/react';
import progressBg from '@images/progressBg.svg';

export const GuidelineProgressBar: React.FC<
  PropH & {
    currPosIdx: number;
  }
> = ({ h, currPosIdx }) => {
  const { mainStepList } = useGuidelineContext();
  const percent = Math.round((currPosIdx + 1) * (100 / mainStepList.length));

  return (
    <Box
      className={styles.guideline}
      h={h}
      bg={BoomerangColors.deepBlue}
      bgImage={progressBg}
      bgRepeat={'no-repeat'}
      bgPosition={'0% 10%'}
      borderBottomRadius={22}
      pl={'50px'}
      pr={'50px'}
      justifyContent="center"
    >
      <Box mt={'36px'}>
        <Flex alignItems="center" justifyContent="space-between">
          <Percentage percentage={percent} />
          <Flex gap={'10px'} alignItems={'center'}>
            <AverageTime />
            <Button h={50}>전체 단계 보기</Button>
          </Flex>
        </Flex>
        <ProgressBar h={9} currPosIdx={currPosIdx} />
      </Box>
    </Box>
  );
};
