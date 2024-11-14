import { getLandingMentors } from '@apis/mentor';

import { MostAnswersExpertSection } from '@components/Consulting/ExpertSection/MostAnswersExpertSection';
import { RecommendedExpertSection } from '@components/Consulting/ExpertSection/RecommendedExpertSection';

import { Fragment } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

export const ConsultingExperts = () => {
  const { data } = useSuspenseQuery({
    queryFn: () => getLandingMentors(),
    queryKey: ['asd'],
  });
  const { recommendedMentors, expertMentors } = data;
  return (
    <Fragment>
      <RecommendedExpertSection recommendedMentors={recommendedMentors} />
      <MostAnswersExpertSection />
    </Fragment>
  );
};
