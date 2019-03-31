import React, { useState } from 'react';
import styled from 'styled-components';

import axios from '../../../axios-instance';
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

const NameChanging = styled.input`
  width: 90%;
  margin: 0.2rem auto;
  color: black;
  text-align: center;
  background-color: whitesmoke;
  border: 1px solid gray;
  z-index: 1;
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
    updateItems,
    onDoubleClickHandler
  } = props;

  const [displayName, setDisplayName] = useState(name);

  const onChangeNameHandler = (e) => {
    const newValue = e.target.value.replace(/[^\w\s]/g, '');
    setDisplayName(newValue);
  };

  const onSubmitNameHandler = (e) => {
    if (e.keyCode === 13) {
      axios(`/items/${_id}`, {
        method: 'PUT',
        data: {
          changedValues: {
            name: e.target.value
          }
        }
      })
        .then(() => {
          updateItems();
        })
        .catch(error => console.log(error));

      const icon = document.getElementById(`${path.substring(1)}/${_id}`);
      icon.querySelector('p').style.display = 'block';
      icon.lastChild.style.display = 'none';
    }
  };

  return (
    <>
      <MainItem
        data-type={type}
        data-path={path}
        id={`${path.substring(1)}/${_id}`}
        iconPath={iconPath}
        onDoubleClick={() => onDoubleClickHandler({ props: { ...props } })}
      >
        <p>{displayName}</p>
        <NameChanging
          style={{ display: 'none' }}
          value={displayName}
          onKeyDown={onSubmitNameHandler}
          onChange={onChangeNameHandler}
        />
      </MainItem>
      <Item id={`${path.substring(1)}/${_id}/1`}>
        {`
          ${new Date(updatedAt).toLocaleDateString()}
          ${new Date(updatedAt).toLocaleTimeString()}
        `}
      </Item>
      <Item id={`${path.substring(1)}/${_id}/2`}>
        {`
          ${new Date(createdAt).toLocaleDateString()}
          ${new Date(createdAt).toLocaleTimeString()}
        `}
      </Item>
      <Item id={`${path.substring(1)}/${_id}/3`}>{type.join(' ')}</Item>
      <Item id={`${path.substring(1)}/${_id}/4`}>
        {type[1] === 'container' || type[0] === 'computer'
          ? ''
          : calculateSize(size)}
      </Item>
    </>
  );
};

export default dirItem;
