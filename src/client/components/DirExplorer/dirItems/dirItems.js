import React from 'react';
import styled from 'styled-components';

import DirItem from './dirItem';

const Wrapper = styled.div`
  width: auto;
  height: 100%;

  display: grid;
  grid-template-columns:
    14rem repeat(${({ categoriesAmount }) => categoriesAmount - 2}, 9rem)
    5rem;
  grid-template-rows: 2rem repeat(auto-fit, 1.5rem);
  grid-auto-flow: row;
  align-items: center;
`;

const Category = styled.div`
  font-family: Monserrat, sans-serif;
  font-size: 13px;
  width: 100%;
  height: 80%;
  padding: 0;
  display: flex;
  align-items: center;
  text-align: left;
  color: #042430;
  font-weight: 100;
  border-right: 1px solid #ccc;
  padding-left: 5%;

  &:hover {
    background: rgba(20, 171, 229, 0.1);
  }
`;

const dirItems = ({ items }) => {
  console.log(items);
  const categories = ['Name', 'Edited at', 'Created at', 'Type', 'Size'];
  const categoriesArray = categories.map(item => (
    <Category key={item}>{item}</Category>
  ));
  const itemsArray = items.map(item => <DirItem key={item._id} {...item} />);
  return (
    <Wrapper categoriesAmount={categories.length}>
      {categoriesArray}
      {itemsArray}
    </Wrapper>
  );
};

export default dirItems;
