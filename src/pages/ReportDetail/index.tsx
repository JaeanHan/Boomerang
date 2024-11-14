import React from 'react';

import BoomerangHeader from '@/components/ReportDetail/BoomerangHeader';
import HistorySection from '@/components/ReportDetail/HistorySection';
import InfoNote from '@/components/ReportDetail/InfoNote';
import InfoSection from '@/components/ReportDetail/InfoSection';
import NoHistorySection from '@/components/ReportDetail/NoHistorySection';
import { BasicLayout } from '@/components/commons/BasicLayout';
import { Flex } from '@chakra-ui/react';

const historyData = [
  {
    date: '1번째',
    type: '가압류 / 압류',
    description: '집주인이 누군가에게 돈을 갚지 않아 피해야 해요.',
    status: '매우 중요',
  },
  {
    date: '2번째',
    type: '가등기 / 가처분',
    description: '집주인에게 집에 대한 권한이 없어 피해야 해요.',
    status: '매우 중요',
  },
];

const ReportDetail: React.FC = () => {
  return (
    <BasicLayout maxW={1024}>
      <Flex flexDirection="column" rounded="none">
        <BoomerangHeader title="BOOMERANG" />
        <InfoSection name="김주인" />
        <HistorySection historyData={historyData} />
        <NoHistorySection
          title="고액 체납자 조회"
          message="지금 바로 조회하러 가기!"
          link="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6685&cntntsId=8097"
        />
        <InfoNote text="체납기간이 1년 이상, 2억 원 이상의 체납자를 말해요! 고액 체납자 임대인은 보증금 반환 능력이 없을 가능성이 높아요." />
        <NoHistorySection
          title="악성 임대인 조회"
          message="지금 바로 조회하러 가기!"
          link="https://www.khug.or.kr/jeonse/web/s01/s010321.jsp"
        />
        <InfoNote text="주택 도시 공사에서 공개한 임차 보증금 반환 하지 않는 상습채무불이행자인 집주인을 말해요! 직접 꼭 확인해야해요." />
      </Flex>
    </BasicLayout>
  );
};

export default ReportDetail;
