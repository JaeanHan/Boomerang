import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Header } from '@/components/commons/Header';
import { Container } from '@chakra-ui/react';

export const HEADER_HEIGHT = 55;

export const BasicLayout: React.FC<{
  children: ReactNode;
  maxW: number | string;
  bg?: string;
}> = ({ children, maxW, bg = undefined }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Container maxW={maxW} minH={'100vh'} p={0} pt={HEADER_HEIGHT} bg={bg}>
      <Header h={HEADER_HEIGHT} />
      {children}
      {/*푸터*/}
    </Container>
  );
};
