import React, { useState } from 'react';
import { Container, SearchInput, Note } from './Search.style';

interface ISearch {
  search: (searchText: string) => void;
}

export default function Search({ search }: ISearch) {
  const [searchText, setSearchText] = useState('');

  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value);
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      search(searchText);
    }
  };

  const onBlurSearchText = () => {
    search(searchText);
  };

  return (
    <Container>
      <SearchInput
        type='text'
        autoFocus
        onChange={onChangeSearchText}
        onBlur={onBlurSearchText}
        onKeyDown={onKeyDown}
      />
      <Note>Comma separated values are AND'ed (e.g. remote, c#)</Note>
    </Container>
  );
}
