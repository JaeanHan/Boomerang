import { useConsultationMutation } from '@apis/mentee';
import { ConsultationRequest } from '@apis/mentee/types';

import { AutoSizingTextarea } from '@components/AutoSizingTextarea';

import { useState } from 'react';

import { ConsultingItemTitle } from '@/components/ConsultingManagement/ConsultingItemTitle';
import { BoomerangButton } from '@/components/commons/BoomerangButton';
import { BoomerangColors } from '@/utils/colors';
import { useToast } from '@chakra-ui/icons';
import { Box, Flex, Input, Text, VStack } from '@chakra-ui/react';
import document from '@images/document2.svg';

const toISO8601 = (selectedDate: Date, selectedTime: string): string => {
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.getDate()).padStart(2, '0');

  const [hours, minutes] = selectedTime.split(':').map(Number);

  const date = new Date(year, Number(month) - 1, Number(day), hours, minutes);

  return date.toISOString().replace(/\.\d{3}Z$/, '');
};

export const ConsultingInformationInputSection: React.FC<{
  selectedDate: Date | null;
  selectedTime: string;
  id: number;
}> = ({ selectedDate, selectedTime, id }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { mutateAsync } = useConsultationMutation();
  const toast = useToast();

  const isSubmitButtonDisabled =
    selectedDate === null ||
    selectedTime === '' ||
    title.trim().length === 0 ||
    content.trim().length === 0;

  const requestConsulting = () => {
    if (
      !selectedDate ||
      title.trim().length === 0 ||
      content.trim().length === 0
    ) {
      return;
    }

    const request: ConsultationRequest = {
      content: content,
      title: title,
      mentor_id: id,
      consultation_date_time: toISO8601(selectedDate, selectedTime),
    };

    mutateAsync(request)
      .then(() => {
        toast({
          title: '멘토링 신청에 성공했습니다.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: '멘토링 신청에 실패했습니다.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box w="951px">
      <ConsultingItemTitle
        title="상담 신청 정보를 입력해주세요!"
        icon={document}
      />
      <VStack spacing="25px">
        <ConsultingTitleForm setTitle={setTitle} />
        <ConsultingDateForm date={selectedDate} time={selectedTime} />
        <Box mt="14px">
          <Text color="434343" fontSize="24px" fontWeight={800} mb="12px">
            상담 내용 작성하기
          </Text>
          <ConsultingContentForm setContent={setContent} />
          <Flex
            justifyContent={'flex-end'}
            transform={'translate(-20px, -67px)'}
          >
            <BoomerangButton
              w="98px"
              h="47px"
              fontSize="24px"
              isDisabled={isSubmitButtonDisabled}
              onClick={() => requestConsulting()}
            >
              확인
            </BoomerangButton>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

const ConsultingTitleForm: React.FC<{
  setTitle: (value: string) => void;
}> = ({ setTitle }) => {
  return (
    <Flex
      w="817px"
      h="82px"
      bg="#EAF0FF"
      borderRadius={4}
      alignItems="center"
      p="0 19px 0 46px"
    >
      <Input
        border="none"
        p={0}
        _focus={{
          boxShadow: 'none',
        }}
        placeholder="제목을 작성해주세요."
        _placeholder={{
          color: 'rgba(23, 108, 255, 0.30)',
          fontSize: '24px',
        }}
        fontSize="24px"
        onChange={(e) => setTitle(e.target.value)}
      />
    </Flex>
  );
};

const addOneHour = (time: string): string => {
  const [hour] = time.split(':').map(Number);

  let newHour = hour + 1;
  if (newHour === 24) newHour = 0;

  return `${newHour.toString().padStart(2, '0')}:00`;
};

const ConsultingDateForm: React.FC<{ date: Date | null; time: string }> = ({
  date,
  time,
}) => (
  <Flex
    w="817px"
    h="82px"
    bg="#EAF0FF"
    borderRadius={4}
    alignItems="center"
    justifyContent="space-between"
    p="0 46px"
  >
    <Text color={BoomerangColors.deepBlue} fontSize="24px" fontWeight={800}>
      상담 일시
    </Text>
    {date != null && (
      <Text color="#484848" fontSize="24px" fontWeight="bold">
        {`${date.toISOString().split('T')[0]} ${time && `${time} ~ ${addOneHour(time)}`}`}
      </Text>
    )}
  </Flex>
);

const ConsultingContentForm: React.FC<{
  setContent: (value: string) => void;
}> = ({ setContent }) => {
  return (
    <Flex
      w="817px"
      minH="211px"
      bg="#EAF0FF"
      borderRadius={4}
      p="26px 19px 68px 46px"
      flexDir="column"
      justifyContent="space-between"
    >
      <AutoSizingTextarea
        setContent={setContent}
        border="none"
        p={0}
        _focus={{
          boxShadow: 'none',
        }}
        placeholder="상담 내용을 작성해주세요."
        _placeholder={{
          color: 'rgba(23, 108, 255, 0.30)',
          fontSize: '24px',
        }}
        fontSize="24px"
        resize="none"
      />
    </Flex>
  );
};
