import { PropH } from '@components/commons/types';

import React, { useState } from 'react';

import { GuidelineProgressBarProps } from '@/components/Guideline/GuidelineProgressBar';
import { BoomerangColors } from '@/utils/colors';
import { Box, Flex, Image, keyframes } from '@chakra-ui/react';
import home from '@images/home.svg';

const progressBarPadding = 15;

const scaleAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

interface IProgressStep {
  label: string;
}

const ProgressStep: React.FC<IProgressStep & { onClick: () => void }> = ({
  label,
  onClick,
}) => {
  return (
    <Box
      zIndex={3}
      bgColor="#C5DFFF"
      borderRadius={50}
      width="22.5px"
      height="22.5px"
      position="relative"
      transition="transform 0.2s ease-in-out"
      cursor="pointer"
      _hover={{
        transform: 'scale(1.1)',
      }}
      _after={{
        content: `"${label}"`,
        position: 'absolute',
        color: '#8AB4FF',
        width: 'max-content',
        fontSize: '16px',
        transform: 'translate(-50%, 35px)',
      }}
      onClick={onClick}
    />
  );
};

const ProgressSelectedStep: React.FC<IProgressStep> = ({ label }) => {
  return (
    <Box
      zIndex={3}
      bgColor="none"
      borderRadius={50}
      width="22.5px"
      height="22.5px"
      position="relative"
      _after={{
        content: `"${label}"`,
        position: 'absolute',
        color: BoomerangColors.white,
        width: 'max-content',
        fontSize: '16px',
        transform: 'translate(-50%, 35px)',
      }}
    >
      <Box
        position={'absolute'}
        w={'70px'}
        h={'70px'}
        top={'-30px'}
        left={'-30px'}
      >
        <Image
          src={home}
          alt={label}
          animation={`${scaleAnimation} 0.4s ease-in-out forwards`}
        />
      </Box>
    </Box>
  );
};

export const ProgressBar: React.FC<GuidelineProgressBarProps & PropH> = ({
  currMainIdx,
  mainStepList,
  h,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(() => currMainIdx);

  const progressbarWidth =
    currMainIdx + 1 == mainStepList.length
      ? '100%'
      : `calc(${progressBarPadding}% + 40px + (${100 - 2 * progressBarPadding}% / ${mainStepList.length - 1} * ${currMainIdx}) )`;

  return (
    <Box h={h} bgColor="#F1F1F1" borderRadius={199.8} position={'relative'}>
      <Box
        h={'100%'}
        w={progressbarWidth}
        borderRadius={65}
        bgColor="#0042B6"
        position="absolute"
      />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        h={'100%'}
        p={`0 ${progressBarPadding}%`}
      >
        {mainStepList
          .map((item) => ({
            ...item,
            main_step_name: item.main_step_name.replaceAll('-', ' '),
          }))
          .map((item, idx) =>
            selectedIdx === idx ? (
              <ProgressSelectedStep
                label={item.main_step_name}
                key={item.main_step_name}
              />
            ) : (
              <ProgressStep
                label={item.main_step_name}
                key={item.main_step_name}
                onClick={() => setSelectedIdx(idx)}
              />
            )
          )}
      </Flex>
    </Box>
  );
};
