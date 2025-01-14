import React, { useState } from 'react';

import { SearchIcon } from '@chakra-ui/icons';
import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <InputGroup flex="auto">
      <InputLeftElement pointerEvents="none">
        <Icon as={SearchIcon} color="#4E8EFF" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="궁금한 주제를 검색해보고, 원하는 답을 찾아보세요!"
        bg="#DBE7F3"
        borderColor="#69A0FF"
        borderWidth="2px"
        borderRadius="full"
        pl={10}
        py={2.5}
        _placeholder={{ color: '#88B3FF' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
};

export default SearchBar;
