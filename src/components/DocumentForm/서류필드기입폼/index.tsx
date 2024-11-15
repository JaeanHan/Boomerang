import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiInstance from '@/apis';
import { BoomerangColors } from '@/utils/colors';
import {
  Box,
  Checkbox,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import mesasgeIcon from '@images/questionMessage.svg';

import { DocumentActionButton } from './DocumentAcionButton';
import { HoverBox } from './HoverBox';
import { FieldType, FormData, FormProps } from './types';

export const 서류필드기입폼: React.FC<FormProps> = ({
  title,
  description,
  image,
  fields,
}) => {
  const [formData, setFormData] = useState<FormData>({
    성명: '김갑동',
    생년월일: '781111-1234567',
    주민등록지: '서울특별시 강남구 역삼동 123-45',
    '별도 우편 수령지 주소': '없음',
    전화번호: '010-1234-5678',
    '전자 우편주소': 'kim@example.com',
    '대리인 성명': '박변호',
    '대리인 생년월일': '850101-1234567',
    '대리인 주소': '서울특별시 서초구 서초동 456-78',
    '대리인 전화번호': '010-9876-5432',
    '대리인 전자우편주소': 'park@law.com',
    '전세사기 피해 주택 지번주소': '서울특별시 강남구 역삼동 123-45',
    '전임대인 성명': '이전주',
    '전임대인 생년월일': '690315-1234567',
    '현임대인 성명': '김을동',
    '현임대인 생년월일': '710520-1234567',
    '공인중개사 상호(등록번호)': '한강공인중개사(12345)',
    '공인중개사 대표자명': '최중개',
    '공인중개사 연락처': '02-555-1234',
    계약일자: '2023. 01. 01',
    '전월세구분(전세/보증부 월세)*': '전세',
    계약기간: '2023. 01. 01 ~ 2025. 01. 01',
    '선순위 담보권(여/부)*': '부',
    '선순위 담보권자(금융기관/개인)*': '개인',
    '압류(여/부)*': '부',
    '압류권자(국가 또는 지방자치단체/이외의 자)*': '이외의 자',
    '주택 유형(아파트/오피스텔/다세대/연립/단독/다중/다가구/기타)*': '아파트',
    '대항력 발생일': '2023. 01. 05',
    전입일자: '2023. 01. 05',
    점유일자: '2023. 01. 10',
    확정일자: '2023. 01. 02',
    '임차권 등기명령 사건번호': '2023가단12345',
    '(거주/퇴거)*': '거주',
    임차보증금: '200,000,000',
    월세: '0',
    '파산·회생 사건번호': '2023하단67890',
    '경매 사건번호': '2023타경98765',
    '공매 물건관리번호': '2023공매1234',
    '압류 사건번호': '2023가압류4321',
    '집행 권원 확보 여부(여/부)*': '부',
    '임대인등의 기망 이유 혹은 수사개시 등':
      '임대인이 선순위 채권을 고지하지 않고 계약을 체결함. 현재 사기죄로 고소하여 수사 진행중(서울강남경찰서 2023-12345호)',
    '경매 배당요구 여부(여/부)*': '부',
    '공매 배분요구 여부(여/부)*': '부',
    '경매·매각·유예·정지 긴급 여부(여/부)*': '부',
    신청일: '2024. 01. 05',
    '제출지역(광역자치단체)': '서울',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (label: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiInstance.post('/api/v1/documents', {
        subStep: '결정-신청서',
        formData: formData,
      });
      toast({
        title: '성공',
        description: '서류가 성공적으로 제출되었습니다.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;
        toast({
          title: '에러',
          description: data.message || '서류 제출 중 오류가 발생했습니다.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: '에러',
          description: '알 수 없는 오류가 발생했습니다.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt="20px">
      <VStack h="75px" bg="#176CFF" justifyContent="center">
        <Text fontSize="32px" fontWeight="bold" color={BoomerangColors.white}>
          {title} 서류 작성
        </Text>
      </VStack>
      <Flex bg={BoomerangColors.white} p="49px 41px 0" gap="64px">
        <Image w="335px" h="480px" src={image} mt="58px" mb="50px" />
        <Flex flexDir="column" justifyContent="space-between">
          <Box>
            <Flex gap="15px" mb="24px" position="relative" role="group">
              <Image src={mesasgeIcon} w={27} />
              <Text fontSize="20px" fontWeight="bold" color="#303030">
                {title}는 어떤 서류인가요?
              </Text>
              <HoverBox description={description} />
            </Flex>
            <VStack gap="22px">
              {fields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formData[field.label] || ''}
                  onChange={handleChange}
                />
              ))}
            </VStack>
          </Box>
          <Box alignSelf="flex-end" mt="30px" mb="16px">
            <DocumentActionButton
              w="139px"
              h="49px"
              fontSize="24px"
              onClick={handleSubmit}
              isLoading={loading}
            >
              {loading ? <Spinner size="sm" /> : '저장하기'}
            </DocumentActionButton>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

interface FormFieldProps {
  field: FieldType;
  value: any;
  onChange: (label: string, value: any) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  const isCheckbox = field.type === 'checkbox' || field.label.endsWith('*');

  if (isCheckbox) {
    const optionsMatch = field.label.match(/\(([^)]+)\)/);
    const options = optionsMatch ? optionsMatch[1].split('/') : [];

    return (
      <Box>
        <Text fontSize="14px" fontWeight={800} color={BoomerangColors.deepBlue}>
          {field.label.replace('*', '')}
        </Text>
        <Flex gap="10px" mt="3px">
          {options.map((option, index) => (
            <Checkbox
              key={index}
              value={option.trim()}
              isChecked={value === option.trim()}
              onChange={(e) =>
                onChange(field.label, e.target.checked ? option.trim() : '')
              }
            >
              {option.trim()}
            </Checkbox>
          ))}
        </Flex>
      </Box>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field.label, e.target.value);
  };

  return (
    <Box>
      <Text fontSize="14px" fontWeight={800} color={BoomerangColors.deepBlue}>
        {field.label}
      </Text>
      <Flex borderBottom="1.5px solid #7FADFF" w="533px" mt="3px" pr="17px">
        <Input
          fontSize={'20px'}
          border={'none'}
          borderRadius={0}
          value={value}
          onChange={handleInputChange}
          _focus={{
            boxShadow: 'none',
          }}
        />
        <DocumentActionButton
          w="58px"
          h="29px"
          fontSize="16px"
          onClick={() => {}}
        >
          확인
        </DocumentActionButton>
      </Flex>
    </Box>
  );
};
