import React from 'react';

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import money from '@images/Auctionmoney.svg';
import liner from '@images/liner.svg';

import InfoBox from './InfoBox';
import SafetyMeter from './SafetyMeter';

interface Mortgage {
  amount: number;
  creditor: string;
  registration_date: string;
}

interface ResultData {
  address: string;
  house_price: number;
  deposit_amount: number;
  total_mortgage_amount: number;
  date: string;
  mortgages: Mortgage[];
}

interface AuctionProps {
  resultData: ResultData;
}

const Auction: React.FC<AuctionProps> = ({ resultData }) => {
  const { house_price, deposit_amount, total_mortgage_amount, mortgages } =
    resultData;

  const isSafe = house_price * 0.8 - deposit_amount - total_mortgage_amount > 0;

  let message;
  if (isSafe) {
    message = '경매에 넘어가도 보증금을 돌려 받을 가능성이 있어요.(1회유찰시)';
  } else {
    message = `경매에 넘어간다면 보증금을 돌려 받기 힘들어요.`;
  }

  const safeAmount =
    house_price * 0.75 - deposit_amount - total_mortgage_amount > 0
      ? house_price * 0.55
      : house_price * 0.75 - total_mortgage_amount;

  const cautionAmount = isSafe ? house_price * 0.2 : 0;
  const dangerAmount = total_mortgage_amount;

  const auctionPrice = house_price * 0.75;
  const priority = mortgages.length + 1;

  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={{ base: 5, md: 20 }}
      pt={20}
      pb={8}
      bg="#F6F6F6"
      overflow="hidden"
    >
      <Box
        as="section"
        display="flex"
        flexDirection="column"
        px={{ base: 5, md: 6 }}
        pt={20}
        pb={10}
        w="full"
        bg="white"
        maxW="1029px"
      >
        <Flex
          alignSelf="flex-start"
          ml={{ base: 2.5, md: 32 }}
          alignItems="center"
        >
          <Image src={money} alt="money" mr={4} />
          <Heading
            as="h1"
            fontSize="3xl"
            fontWeight="extrabold"
            textAlign="center"
            color="#0071DE"
          >
            내가 되돌려 받을 수 있는 보증금은?
          </Heading>
        </Flex>
        <Box
          alignSelf="flex-start"
          px={{ base: 5, md: 16 }}
          py={5}
          mt={5}
          ml={{ base: 0, md: 16 }}
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
          bg="#EAEAEA"
          borderRadius="2px 43px 43px 43px"
          color="gray.600"
        >
          {message}
        </Box>
        <InfoBox
          auctionPrice={auctionPrice}
          priority={priority}
          totalMortgageAmount={total_mortgage_amount}
        />
        <Image
          loading="lazy"
          src={liner}
          objectFit="contain"
          mt={{ base: 10, md: 14 }}
          w="full"
        />
        <Heading
          as="h2"
          alignSelf="flex-start"
          mt={{ base: 10, md: 12 }}
          ml={{ base: 0, md: 20 }}
          fontSize="4xl"
          fontWeight="extrabold"
          lineHeight="tall"
          color="gray.700"
        >
          <Text as="span" color="blue.600">
            보증금의 안전도
          </Text>
          <Text as="span" fontWeight="bold" color="gray.600">
            를 확인하고,
          </Text>
          <br />
          <Text as="span" fontWeight="bold" color="gray.600">
            되돌려 받을 수 있는 보증금을 돌려받아요!
          </Text>
        </Heading>
        <SafetyMeter
          safeAmount={safeAmount}
          cautionAmount={cautionAmount}
          dangerAmount={dangerAmount}
        />
      </Box>
    </Box>
  );
};

export default Auction;
