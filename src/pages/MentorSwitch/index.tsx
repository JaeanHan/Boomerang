import { BasicLayout } from '@components/commons/BasicLayout';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useSendMailMutation,
  useSwitchMutation,
  useValidationMutation,
} from '@/apis/mentor';
import { ConsultingSearchSection } from '@/components/Consulting/ConsultingSearchSection';
import {
  EmailForm,
  InputForm,
  SelectForm,
  TextareaForm,
  ValidationForm,
} from '@/components/MentorSwitch/Forms';
import { FormValues } from '@/components/MentorSwitch/type';
import { BoomerangButton } from '@/components/commons/BoomerangButton';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from '@chakra-ui/react';

const formFields = [
  {
    id: 'mentor_type',
    label: '멘토 유형',
    type: 'select',
    options: [
      { value: 'LAWYER', label: '변호사' },
      { value: 'REAL_ESTATE_AGENT', label: '부동산 중개인' },
      { value: 'PREVIOUS_DAMAGE_RESOLVER', label: '이전 사기 피해 경험자' },
    ],
  },
  {
    id: 'career',
    label: '경력',
    type: 'input',
  },
  {
    id: 'introduce',
    label: '자기소개',
    type: 'textarea',
  },
  {
    id: 'contact',
    label: '연락처',
    type: 'input',
  },
];

export const MentorSwitch: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    mentor_type: 'LAWYER',
    career: '',
    introduce: '',
    contact: '',
  });
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const { mutateAsync: validateEmail } = useValidationMutation();
  const { mutateAsync: sendEmail } = useSendMailMutation();
  const { mutateAsync: switchMentor } = useSwitchMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const sendEmailCode = () => {
    if (
      !email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      alert('유효한 이메일 형식을 입력해 주세요.');
    } else {
      const request = { email: email };
      sendEmail(request)
        .then(() => {
          setIsSendEmail(true);
          toast({
            title: '이메일이 전송 되었습니다.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: '이메일 전송에 실패했습니다.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  const handleVaildateEmail = () => {
    const validationRequest = {
      email: email,
      verificationCode: emailCode,
    };
    validateEmail(validationRequest)
      .then(() => {
        setIsValidate(true);
        toast({
          title: '이메일이 인증 되었습니다.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: '이메일 인증에 실패했습니다.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleSubmit = () => {
    if (!formValues.career || formValues.career.length < 10) {
      alert('경력는 최소 10자 이상 입력해야 합니다.');
    } else if (!formValues.introduce || formValues.introduce.length < 50) {
      alert('자기소개는 최소 50자 이상 입력해야 합니다.');
    } else if (
      !formValues.contact ||
      !/^\d{2,3}-\d{3,4}-\d{4}$/.test(formValues.contact)
    ) {
      alert('유효한 연락처 형식이 아닙니다. (예: 010-1234-5678)');
    } else {
      switchMentor(formValues)
        .then(() => {
          toast({
            title: '멘토 신청이 완료 되었습니다.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
          toast({
            title:
              error.response?.data?.message ||
              '알 수 없는 오류가 발생했습니다.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          navigate(-1);
        });
    }
  };

  return (
    <BasicLayout maxW={1024}>
      <Flex flexDirection="column" justifyContent="center" bg="white">
        <ConsultingSearchSection />
        <Text
          mt="30px"
          color="#4488FF"
          fontSize="42px"
          fontWeight={800}
          alignSelf="center"
        >
          멘토 신청하기
        </Text>
        <Flex flexDir="column" padding="70px" gap="30px">
          {isSendEmail ? (
            <ValidationForm
              emailCode={emailCode}
              setEmailCode={setEmailCode}
              onClick={handleVaildateEmail}
              isValidate={isValidate}
            />
          ) : (
            <EmailForm
              email={email}
              setEmail={setEmail}
              sendEmailCode={sendEmailCode}
            />
          )}
          {formFields.map((field) => (
            <FormControl mb={4} key={field.id}>
              <FormLabel color="#176CFF" fontSize="18px" fontWeight={800}>
                {field.label}
              </FormLabel>
              {field.type === 'select' ? (
                <SelectForm
                  id={field.id}
                  onChange={handleChange}
                  options={field.options || []}
                  formValues={formValues}
                />
              ) : field.type === 'textarea' ? (
                <TextareaForm
                  id={field.id}
                  placeholder={field.label}
                  value={formValues[field.id as keyof FormValues]}
                  onChange={handleChange}
                />
              ) : (
                <InputForm
                  id={field.id}
                  placeholder={field.label}
                  value={formValues[field.id as keyof FormValues]}
                  onChange={handleChange}
                />
              )}
            </FormControl>
          ))}
          <Box alignSelf="center" mt="30px">
            <BoomerangButton
              fontSize="20px"
              w="300px"
              h="50px"
              onClick={handleSubmit}
            >
              신청하기
            </BoomerangButton>
          </Box>
        </Flex>
      </Flex>
    </BasicLayout>
  );
};
