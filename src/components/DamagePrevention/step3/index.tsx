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

  const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, '').substring(0, 8);
    const len = digits.length;

    if (len < 5) {
      return digits;
    } else if (len < 7) {
      return `${digits.substring(0, 4)}-${digits.substring(4)}`;
    } else {
      return `${digits.substring(0, 4)}-${digits.substring(4, 6)}-${digits.substring(6)}`;
    }
  };

  const sanitizeNumberInput = (value: string) => {
    return value.replace(/,/g, '').replace(/\D/g, '');
  };

  const handleMortgageChange = (
    index: number,
    field: string,
    value: string
  ) => {
    let formattedValue = value;

    if (field === 'registration_date') {
      formattedValue = formatDate(value);
    } else if (
      field === 'amount' ||
      field === 'housePrice' ||
      field === 'depositAmount'
    ) {
      formattedValue = sanitizeNumberInput(value);
    }

    const newMortgageInputs = [...mortgageInputs];
    newMortgageInputs[index] = {
      ...newMortgageInputs[index],
      [field]: formattedValue,
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

  const handleHousePriceChange = (value: string) => {
    const sanitizedValue = sanitizeNumberInput(value);
    setHousePrice(sanitizedValue);
  };

  const handleDepositAmountChange = (value: string) => {
    const sanitizedValue = sanitizeNumberInput(value);
    setDepositAmount(sanitizedValue);
  };

  const baseHeight = 622;
  const additionalHeightPerInput = 96;
  const totalHeight =
    baseHeight +
    (mortgageInputs.length > 1
      ? (mortgageInputs.length - 1) * additionalHeightPerInput
      : 0);

  return (
    <Box
      pl={71}
      pr={71}
      pt={2}
      h={totalHeight}
      transition="height 0.3s ease"
      bg="white"
      borderRadius="20px"
      boxShadow="md"
    >
      <QuestionText
        index={1}
        question={{
          title: '집 예상 매매 가격을 입력해주세요.',
          subtitle: '집값을 모르시나요? 아래 사이트에서 확인해보세요',
        }}
      />
      <Search
        address={housePrice}
        setAddress={handleHousePriceChange}
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
        setAddress={handleDepositAmountChange}
        placeholder="예시) 500000000"
      />
      <Box mt={5}></Box>
      <QuestionText
        index={3}
        question={{
          title: '채권 혹은 근저당권 정보를 입력해주세요.',
          subtitle:
            '금액, 채권자, 등록일자 순으로 입력해주세요. 등기부등본 을구에 기재 되어 있으며 없다면 입력을 하지 않아도 되요!',
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
        +채권 추가
      </Button>
    </Box>
  );
};
