import { getLandingMentors } from '@apis/mentee';

import { MostAnswersExpertSection } from '@components/Consulting/ExpertSection/MostAnswersExpertSection';
import { RecommendedExpertSection } from '@components/Consulting/ExpertSection/RecommendedExpertSection';

import { Fragment } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

export const ConsultingExperts = () => {
  const { data } = useSuspenseQuery({
    queryFn: () => getLandingMentors(8, 3, 3, 0),
    queryKey: ['landing'],
  });
  const { recommendedMentors, expertMentors, normalMentors } = data;
  return (
    <Fragment>
      <RecommendedExpertSection recommendedMentors={recommendedMentors} />
      <MostAnswersExpertSection
        expertMentors={expertMentors}
        normalMentors={normalMentors}
      />
    </Fragment>
  );
};
