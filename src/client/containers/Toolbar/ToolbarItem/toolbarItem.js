import React from 'react';
import styled from 'styled-components';

import { imageContainer } from '../../../assets/styles/globalStyles';

const BarItem = styled.button`
  background: none;
  border: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${({ scale }) => (scale === 'small' ? '2rem' : '3rem')};
  border-top: 2px solid transparent;
  border-bottom: ${({ active }) => (active ? '2px solid #82ebfc' : '2px solid transparent')};
  transition: border 300ms ease-in-out;
  background: ${({ focused }) => (focused ? 'rgba(150, 150, 150, 0.3)' : 'transparent')};
  margin: 0 0.1rem;
  cursor: pointer;
  transition: background-color .2s ease-in-out;

  &:hover {
    background: ${({ focused }) => (focused ? 'rgba(150, 150, 150, 0.3)' : 'rgba(150, 150, 150, 0.1)')};
  }
  &:active {
    background-color: rgba(150,150,150,.5)
  }

  &:first-of-type {
    margin: 0;
  }
`;

const ImageContainer = styled(imageContainer)`
  filter: ${({ permanent }) => (permanent ? 'invert(100%)' : 'none')};
`;

const item = (props) => {
  const {
    icon, isPermanent, scale, active, focused, onClick, showAppHandler
  } = props;
  return (
    <BarItem
      scale={scale}
      active={active}
      focused={focused}
      onClick={onClick || showAppHandler}
    >
      <ImageContainer
        src={icon}
        alt="icon"
        permanent={isPermanent}
        scale={scale}
      />
    </BarItem>
  );
};

export default item;
