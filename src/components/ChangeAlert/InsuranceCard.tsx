import React from 'react';

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

interface InsuranceCardProps {
  imageSrc: string;
  name: string;
  description: string;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({
  imageSrc,
  name,
  description,
}) => {
  return (
    <Flex
      flexWrap="wrap"
      bg="#E9F2F7"
      borderRadius="2xl"
      px={{ base: 5, md: 10 }}
      py={8}
      mt={3}
      maxW="877px"
      w="full"
      gap={10}
    >
      <Image
        src={imageSrc}
        alt=""
        objectFit="contain"
        w="98px"
        alignSelf="center"
      />
      <Box flex="1">
        <Heading
          as="h4"
          size="md"
          fontWeight="extrabold"
          color="#484848"
          mb={3.5}
        >
          {name}
        </Heading>
        <Text fontSize="lg" color="#656565" lineHeight="1.5">
          {description}
        </Text>
      </Box>
    </Flex>
  );
};

export default InsuranceCard;
