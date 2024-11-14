import React from 'react';

import Button from '@/components/ChangeAlert/Button';
import Header from '@/components/ChangeAlert/Header';
import InsuranceCard from '@/components/ChangeAlert/InsuranceCard';
import InsuranceSection from '@/components/ChangeAlert/InsuranceSection';
import { BasicLayout } from '@/components/commons/BasicLayout';
import { Box, Heading, Text } from '@chakra-ui/react';

interface InsuranceData {
  title: string;
  cards: {
    imageSrc: string;
    name: string;
    description: string;
  }[];
}

const insuranceData: InsuranceData[] = [
  {
    title: 'HUG 보증 보험',
    cards: [
      {
        imageSrc:
          'https://cdn.builder.io/api/v1/image/assets/TEMP/36f434e7c4312f2e0653fd60a31cd19dcd37d9bf57e19c7f9ef4ad817f1ab40e?placeholderIfAbsent=true&apiKey=351a63978f264015abee97d2128dc17c',
        name: '보증 보험',
        description:
          '부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고',
      },
      {
        imageSrc:
          'https://cdn.builder.io/api/v1/image/assets/TEMP/aaeee133aae1ad75c7b67087eaae49f57531f6b7e5f408deced222c81e7a9fa0?placeholderIfAbsent=true&apiKey=351a63978f264015abee97d2128dc17c',
        name: '보험 이름',
        description:
          '부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고',
      },
    ],
  },
  {
    title: 'SGI 보증 보험',
    cards: [
      {
        imageSrc:
          'https://cdn.builder.io/api/v1/image/assets/TEMP/36f434e7c4312f2e0653fd60a31cd19dcd37d9bf57e19c7f9ef4ad817f1ab40e?placeholderIfAbsent=true&apiKey=351a63978f264015abee97d2128dc17c',
        name: '보험 이름',
        description:
          '부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고',
      },
      {
        imageSrc:
          'https://cdn.builder.io/api/v1/image/assets/TEMP/aaeee133aae1ad75c7b67087eaae49f57531f6b7e5f408deced222c81e7a9fa0?placeholderIfAbsent=true&apiKey=351a63978f264015abee97d2128dc17c',
        name: '보험 이름',
        description:
          '부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고 저쩌고 부메랑 서비스는 어쩌고',
      },
    ],
  },
];

const ChangeAlert: React.FC = () => {
  return (
    <BasicLayout maxW={1024}>
      <Box as="main" w="full">
        <Header />
        <Box
          as="section"
          bg="white"
          pt={10}
          pb={20}
          mt={{ base: 10, md: 16 }}
          w="full"
        >
          <Box px={{ base: 5, md: 1 }} w="full">
            <Heading
              as="h2"
              size="xl"
              fontWeight="extrabold"
              textAlign="center"
              color="#0071DE"
            >
              보증 보험
            </Heading>
            <Text
              mt={1}
              fontSize="2xl"
              fontWeight="bold"
              textAlign="center"
              color="#9CA9C0"
            >
              한눈에 가입여부를 확인하세요!
            </Text>
            {insuranceData.map((insurance, index) => (
              <InsuranceSection key={index} title={insurance.title}>
                {insurance.cards.map((card, cardIndex) => (
                  <InsuranceCard
                    key={cardIndex}
                    imageSrc={card.imageSrc}
                    name={card.name}
                    description={card.description}
                  />
                ))}
                <Button />
              </InsuranceSection>
            ))}
          </Box>
        </Box>
      </Box>
    </BasicLayout>
  );
};

export default ChangeAlert;
