import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';

import { UserProvider } from '@/pages/Login/userContext';
import { router } from '@/router';
import { Button, ChakraProvider, Flex, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, staleTime: 1000 * 60 },
  },
});

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: '#EDEDED',
        fontFamily: 'NanumSquareOTF_ac, sans-serif',
        fontDisplay: 'swap',
      },
      '@font-face': [
        {
          fontFamily: 'NanumSquareOTF_ac',
          src: 'url(/src/assets/fonts/NanumSquareOTF_acR.otf) format("opentype")',
          fontWeight: 400,
          fontStyle: 'normal',
        },
        {
          fontFamily: 'NanumSquareOTF_ac',
          src: 'url(/src/assets/fonts/NanumSquareOTF_acB.otf) format("opentype")',
          fontWeight: 700,
          fontStyle: 'normal',
        },
        {
          fontFamily: 'NanumSquareOTF_ac',
          src: 'url(/src/assets/fonts/NanumSquareOTF_acEB.otf) format("opentype")',
          fontWeight: 800,
          fontStyle: 'normal',
        },
      ],
    },
  },
});

const FallbackComponent = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
      <Button onClick={() => window.location.reload()}>새로 고침</Button>
    </Flex>
  );
};

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ErrorBoundary>
    </ChakraProvider>
  </QueryClientProvider>
);
