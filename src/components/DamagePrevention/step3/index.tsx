import React, { useEffect, useState } from 'react';

import { Search } from '@/components/DamagePrevention/step1/Search';
import { QuestionText } from '@/components/commons/QuestionText';
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';

interface Step3Props {
  setIsNextButtonEnabled: (value: boolean) => void;
  housePrice: string;
  setHousePrice: (value: string) => void;
  depositAmount: string;
  setDepositAmount: (value: string) => void;
  mortgages: { amount: number; creditor: string; registration_date: string }[];
  setMortgages: (
    value: { amount: number; creditor: string; registration_date: string }[]
  ) => void;
}

export const Step3: React.FC<Step3Props> = ({
  setIsNextButtonEnabled,
  housePrice,
  setHousePrice,
  depositAmount,
  setDepositAmount,
  setMortgages,
}) => {
  const [mortgageInputs, setMortgageInputs] = useState<
    { amount: string; creditor: string; registration_date: string }[]
  >([]);

  useEffect(() => {
    if (housePrice.trim() !== '' && depositAmount.trim() !== '') {
      setIsNextButtonEnabled(true);
    } else {
      setIsNextButtonEnabled(false);
    }
  }, [housePrice, depositAmount, setIsNextButtonEnabled]);

  const addMortgageInput = () => {
    setMortgageInputs([
      ...mortgageInputs,
      { amount: '', creditor: '', registration_date: '' },
    ]);
  };

  const handleMortgageChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newMortgageInputs = [...mortgageInputs];
    newMortgageInputs[index] = {
      ...newMortgageInputs[index],
      [field]: value,
    };
    setMortgageInputs(newMortgageInputs);

    const allFieldsFilled = newMortgageInputs.every(
      (mortgage) =>
        mortgage.amount.trim() !== '' &&
        mortgage.creditor.trim() !== '' &&
        mortgage.registration_date.trim() !== ''
    );

    setMortgages(
      allFieldsFilled
        ? newMortgageInputs.map((mortgage) => ({
            amount: Number(mortgage.amount),
            creditor: mortgage.creditor,
            registration_date: mortgage.registration_date,
          }))
        : []
    );
  };

  return (
    <Box pl={71} pr={71} pt={2} h={622}>
      <QuestionText
        index={1}
        question={{
          title: '집 예상 매매 가격을 입력해주세요.',
          subtitle: '집값을 모르시나요? 아래 사이트에서 확인해보세요',
        }}
      />
      <Search
        address={housePrice}
        setAddress={setHousePrice}
        placeholder="예시) 1000000000"
      />
      <Text mt={1}>
        <Link href="http://www.rtech.or.kr" color="gray.500" isExternal>
          아파트 및 주거용 오피스텔 확인하기
        </Link>
        &nbsp;,&nbsp;
        <Link
          href="https://www.realtyprice.kr/notice/town/nfSiteLink.htm"
          color="gray.500"
          isExternal
        >
          기타주택 확인하기
        </Link>
      </Text>
      <Box mt={3}></Box>
      <QuestionText
        index={2}
        question={{
          title: '보증금 가격을 입력해주세요.',
          subtitle: '임대인이 요구한 보증금 금액을 입력해주세요.',
        }}
      />
      <Search
        address={depositAmount}
        setAddress={setDepositAmount}
        placeholder="예시) 500000000"
      />
      <Box mt={5}></Box>
      <QuestionText
        index={3}
        question={{
          title: '채권 혹은 근저당권 정보를 입력해주세요.',
          subtitle:
            '금액, 채권자, 등록일자 순으로 입력해주세요. 등기부등본 을구에 기재되어있습니다.',
        }}
      />

      {mortgageInputs.map((mortgage, index) => (
        <Flex key={index} mt={2} gap={2}>
          <Search
            address={mortgage.amount}
            setAddress={(value) => handleMortgageChange(index, 'amount', value)}
            placeholder="예: 100000000"
          />
          <Search
            address={mortgage.creditor}
            setAddress={(value) =>
              handleMortgageChange(index, 'creditor', value)
            }
            placeholder="예) 신한은행"
          />
          <Search
            address={mortgage.registration_date}
            setAddress={(value) =>
              handleMortgageChange(index, 'registration_date', value)
            }
            placeholder="예) 2024-11-11"
          />
        </Flex>
      ))}
      <Button mt={2} w="100%" onClick={addMortgageInput}>
        +
      </Button>
    </Box>
  );
};
