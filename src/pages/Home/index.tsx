import { CommunitySection } from '@components/CommunitySection';
import { ConsultationSection } from '@components/CounsultationSection';
import { HeroSection } from '@components/HeroSection';
import { MainSection } from '@components/MainSection';
import { BasicLayout } from '@components/commons/BasicLayout';

import React, { Fragment } from 'react';

import { Spacer, VStack } from '@chakra-ui/react';

export const Home: React.FC = () => {
  return (
    <BasicLayout maxW={1024}>
      <VStack spacing={10} align="stretch">
        <HeroSection
          h={300}
          upperText={
            <Fragment>
              <b>전세사기 대응 가이드라인</b> 저희가 드릴게요!
            </Fragment>
          }
          whiteBoxText={'전세 사기를 당했어요! 어떻게 하죠?😢'}
        />
        <MainSection h={492} />
        <ConsultationSection h={470} />
        <CommunitySection h={700} />
        <Spacer />
      </VStack>
    </BasicLayout>
  );
};
