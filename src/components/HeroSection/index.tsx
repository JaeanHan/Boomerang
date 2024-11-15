import { PropH } from '@components/commons/types';

import React, { ReactNode } from 'react';

import { BoomerangColors } from '@/utils/colors';
import { Box, Text, VStack } from '@chakra-ui/react';
import HeroBannerBg from '@images/heroBg.svg?react';

import styles from './index.module.css';

export const HeroSection: React.FC<
  PropH & {
    upperText: ReactNode;
    whiteBoxText: ReactNode;
  }
> = ({ h, upperText, whiteBoxText }) => {
  return (
    <Box bg={BoomerangColors.blue} h={h} className={styles.hero}>
      <HeroBannerBg viewBox={`0 0 1024 ${h}`} />
      <VStack spacing={5} marginTop={75}>
        <Text color={BoomerangColors.white} fontSize={'20px'}>
          {upperText}
        </Text>
        <BoomerangLogo />
        <HeroKickBox whiteBoxText={whiteBoxText} />
      </VStack>
    </Box>
  );
};

const BoomerangLogo: React.FC = () => (
  <Text color={BoomerangColors.white} fontSize="40px" fontWeight={900}>
    BOOMERANG
    <Text as="sup" fontSize="40px">
      {'<'}
    </Text>
  </Text>
);

const HeroKickBox: React.FC<{
  whiteBoxText: ReactNode;
}> = ({ whiteBoxText }) => (
  <Box
    bg={BoomerangColors.white}
    padding={3}
    width={530}
    textAlign="center"
    borderRadius={34}
    borderTopRightRadius={1}
  >
    <Text fontWeight={700} fontSize="30px">
      {whiteBoxText}
    </Text>
  </Box>
);
