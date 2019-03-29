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
  overflow: hidden;

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

  &:nth-child(5n) {
    justify-content: flex-end;
    padding-right: calc(50% - 2rem);
  }
`;

const MainItem = styled(Item)`
  padding-left: 1.5rem;
  z-index: 1;
  color: black;
  text-align: left;
  font-family: 'lato', sans-serif;
  text-transform: none;

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
  const {
    iconPath,
    updatedAt,
    createdAt,
    type,
    path,
    size,
    name,
    _id,
    changeDirHandler
  } = props;
  console.log(props);

  return (
    <>
      <MainItem
        data-type={type}
        data-path={path}
        id={_id}
        iconPath={iconPath}
        onDoubleClick={() => changeDirHandler(_id, name)}
      >
        <p>{name}</p>

      </MainItem>
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
      <Item>
        {type[1] === 'container' || type[0] === 'computer'
          ? ''
          : calculateSize(size)}
      </Item>
    </>
  );
};

export default dirItem;
