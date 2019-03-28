import React from 'react';
import styled from 'styled-components';

import { calculateSize } from '../../../utils/utility';

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  padding-left: calc(50% - 4rem);
  font-size: 13px;
  color: #666;
  text-transform: capitalize;
  font-family: Monserrat, sans-serif;

  &:hover,
  &:active {
    &::after {
      z-index: 0;
      position: absolute;
      content: '';
      background: rgba(20, 171, 229, 0.1);
      left: 0;
      height: 1.5rem;
      width: 150%;
    }
  }

  &:active {
    &::after {
      background: rgba(20, 171, 229, 0.2);
      border: 1px solid #53bee8;
    }
  }

  &:last-child {
    justify-content: flex-end;
    padding-right: calc(50% - 2rem);
  }
`;

const MainItem = styled(Item)`
  padding-left: 1.5rem;
  color: black;
  text-align: left;
  font-family: 'lato', sans-serif;

  &::before {
    position: absolute;
    z-index: 1;
    content: url(${({ iconPath }) => iconPath});
    left: 5px;
    width: 1rem;
    height: 1rem;
  }
`;

const dirItem = (props) => {
  console.log(props);
  const {
    iconPath, updatedAt, createdAt, type, size
  } = props;

  return (
    <>
      <MainItem iconPath={iconPath}>dirItem</MainItem>
      <Item>
        {`
          ${new Date(updatedAt).toLocaleDateString()}
          ${new Date(updatedAt).toLocaleTimeString()}
        `}
      </Item>
      <Item>
        {`
          ${new Date(createdAt).toLocaleDateString()}
          ${new Date(createdAt).toLocaleTimeString()}
        `}
      </Item>
      <Item>{type.join(' ')}</Item>
      <Item>{calculateSize(size)}</Item>
    </>
  );
};

export default dirItem;
