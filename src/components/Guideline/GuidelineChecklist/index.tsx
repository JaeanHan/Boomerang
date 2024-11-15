import { ServerError } from '@apis/errors';
import { checkASubProgress, uncheckASubProgress } from '@apis/guideline';
import { SubStep } from '@apis/guideline/types';

import { CheckListHeader } from '@components/Guideline/GuidelineChecklist/CheckListHeader';

import React, { useCallback, useState } from 'react';

import { PropH } from '@/components/commons/types';
import { useGuidelineContext } from '@/pages/Guideline/guidelineContext';
import { BoomerangColors } from '@/utils/colors';
import { useToast } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Flex,
  Text,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';

export interface IGuidelineChecklist extends PropH {
  subStepList: SubStep[];
  mainStep: string;
}

const replaceHyphensWithSpaces = (str: string): string => {
  return str.replace(/-/g, ' ');
};

export const GuidelineChecklist: React.FC = ({ h }) => {
  const { currIdx, mainStepList, subStepList } = useGuidelineContext();
  const toast = useToast();
  const [checkState, setCheckState] = useState(() =>
    subStepList.reduce(
      (acc, item) => {
        acc[item.name] = item.completion;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const onChange = useCallback(
    (name: string, isChecked: boolean) => {
      if (isChecked) {
        checkASubProgress(mainStepList[currIdx].main_step_name, name)
          .then(() => {
            setCheckState((prev) => ({
              ...prev,
              [name]: true,
            }));
          })
          .catch(() => {
            setCheckState((prev) => ({
              ...prev,
              [name]: false,
            }));
          });
        return;
      }
      uncheckASubProgress(mainStepList[currIdx].main_step_name, name)
        .then(() => {
          setCheckState((prev) => ({
            ...prev,
            [name]: false,
          }));
        })
        .catch((err: AxiosError<ServerError>) => {
          if (err.code === 'PG013') {
            toast({
              title: '이미 완료한 단계는 수정할 수 없습니다.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
          setCheckState((prev) => ({
            ...prev,
            [name]: true,
          }));
        });
    },
    [setCheckState, currIdx]
  );

  return (
    <Box
      shadow="0px 0px 8.9px 0px rgba(0, 0, 0, 0.26)"
      minH={h}
      w={555}
      bg={BoomerangColors.white}
      borderRadius={38}
    >
      <CheckListHeader />
      <Box>
        <Accordion allowMultiple variant="custom">
          {subStepList.map((item) => (
            <AccordionItem key={item.name}>
              <Flex>
                <AccordionButton>
                  <AccordionIcon
                    color={BoomerangColors.deepBlue}
                    fontSize={'50px'}
                  />
                  <Flex
                    w={'100%'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Text
                      color="#434343"
                      fontSize={'19.5px'}
                      fontWeight={800}
                      ml={2}
                    >
                      {replaceHyphensWithSpaces(item.name)}
                    </Text>
                    <Checkbox
                      iconColor="white"
                      colorScheme={BoomerangColors.deepBlue}
                      isChecked={checkState[item.name]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChange(item.name, e.target.checked)
                      }
                      sx={{
                        '& .chakra-checkbox__control': {
                          bg: '#D9D9D9',
                          border: 'none',
                          width: '31px',
                          height: '31px',
                          borderRadius: 5,
                        },
                        '& .chakra-checkbox__control[data-checked]': {
                          bg: '#176CFF',
                        },
                        '& .chakra-checkbox__control svg': {
                          width: '22px',
                          height: '22px',
                        },
                      }}
                    />
                  </Flex>
                </AccordionButton>
              </Flex>
              <AccordionPanel
                p={'10px 40px'}
                bg={'#E9E9E9'}
                color={'#BBBBBB'}
                minH={235}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};
