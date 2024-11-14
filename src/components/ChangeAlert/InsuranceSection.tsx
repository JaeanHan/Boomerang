import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

interface InsuranceSectionProps {
  title: string;
  children: React.ReactNode;
}

const InsuranceSection: React.FC<InsuranceSectionProps> = ({
  title,
  children,
}) => {
  return (
    <Box
      as="section"
      mt={{ base: 10, md: 20 }}
      px={{ base: 5, md: 20 }}
      w="full"
    >
      <Heading
        as="h3"
        size="lg"
        fontWeight="extrabold"
        textAlign="left"
        color="#494949"
        mb={5}
      >
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export default InsuranceSection;
