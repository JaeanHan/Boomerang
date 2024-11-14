import React from 'react';

import Button from '@/components/ChangeAlert/Button';
import Header from '@/components/ChangeAlert/Header';
import InsuranceCard from '@/components/ChangeAlert/InsuranceCard';
import InsuranceSection from '@/components/ChangeAlert/InsuranceSection';
import { BasicLayout } from '@/components/commons/BasicLayout';
import { Box, Heading, Text } from '@chakra-ui/react';
import blub from '@images/bluby.svg';
import mega from '@images/megaphone.svg';

interface InsuranceCardData {
  imageSrc: string;
  name: string;
  description: string;
}

interface InsuranceData {
  title: string;
  cards: InsuranceCardData[];
  url: string;
}

const insuranceData: InsuranceData[] = [
  {
    title: 'HUG 전세 보증금 반환 보증 보험',
    url: 'https://khig.khug.or.kr/main.jsp',
    cards: [
      {
        imageSrc: mega,
        name: '가입 조건',
        description:
          '보증금과 선수위 채권의 합이 HUG 주택 가격의 90% 작아야하며, 선수위 채권이 HUG 산정 주택가액의 60%를 넘지 않아야해요.',
      },
      {
        imageSrc: blub,
        name: '추가 조건',
        description:
          '소유권 권리 침해사항 (압류,가압류)가 없어야 하고 보증금이 보증한도 5억이 넘지 않아야해요. 추가로 임차권이 설정되어 있으면 안되요.',
      },
    ],
  },
  {
    title: 'SGI 전세금 반환 보증 보험',
    url: 'https://www.sgic.co.kr/chp/iutf/hp/insurance/CHPINFO002VM0_06.mvc?q_insrnSrlno=112',
    cards: [
      {
        imageSrc: mega,
        name: '가입 조건',
        description:
          '임대차기간이 1년 이상이면서 임대차 계약기간의 2분의 1이 지나지 않은 임대차계약이며 보증금과 선수위 채권의 합이 SGI 주택가격보다 작아야해요.',
      },
      {
        imageSrc: blub,
        name: '보장 범위',
        description:
          '임대차계약이 해지 또는 종료되었으나, 임대인이 임대차계약에 따른 임차보증금반환채무를 이행하지 않아 임차인이 임차보증금을 반환받지 못한 때 가능해요.',
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
                <Button url={insurance.url} />
              </InsuranceSection>
            ))}
          </Box>
        </Box>
      </Box>
    </BasicLayout>
  );
};

export default ChangeAlert;
