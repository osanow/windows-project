import React, { useState } from 'react';
import styled from 'styled-components';

import search from '../../assets/icons/search.svg';

const SearchBox = styled.input`
  position: relative;
  margin: 0 0.3rem;
  padding: 0.1rem 0.3rem;
  padding-right: 2rem;
  height: 1.3rem;
  font-size: 12px;
  width: 18rem;
  border: 1px solid #ccc;

  & + img {
    position: absolute;
    filter: invert(50%);
    width: 1rem;
    height: 1rem;
    right: 0.5rem;
  }
`;

const searchBox = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const { dirName, debouncedSearchHandler } = props;

  const onChangeSearchInputHandler = (e) => {
    setSearchValue(e.target.value);
    debouncedSearchHandler(e.target.value);
  };

  return (
    <>
      <SearchBox
        placeholder={`Search in: ${dirName}`}
        value={searchValue}
        onChange={onChangeSearchInputHandler}
        spellCheck="false"
      />
      <img src={search} alt="search" />
    </>
  );
};

export default searchBox;
