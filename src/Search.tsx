import React, { useState } from 'react';

interface ISearch {
  search: (searchText: string) => void;
}

export default function Search({ search }: ISearch) {
  const [searchText, setSearchText] = useState('');

  const onChangeSearchText = (e: any) => {
    console.log('e.target.value', e.target.value);
    setSearchText(e.target.value);
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      search(searchText);
    }
  }

  const onBlurSearchText = () => {
    search(searchText);
  };

  return (
    <input
      type='text'
      autoFocus
      onChange={onChangeSearchText}
      onBlur={onBlurSearchText}
      onKeyDown={onKeyDown}
    />
  );
}
