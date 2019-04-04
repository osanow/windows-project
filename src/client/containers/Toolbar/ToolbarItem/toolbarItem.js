import React from 'react';
import styled from 'styled-components';

import { imageContainer } from '../../../assets/styles/globalStyles';

const BarItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${({ scale }) => (scale === 'small' ? '1.5rem' : '3rem')};
  border-top: 2px solid transparent;
  border-bottom: ${({ active }) => (active ? '2px solid #82ebfc' : '2px solid transparent')};
  transition: border 300ms ease-in-out;
  background: ${({ focused }) => (focused ? 'rgba(150, 150, 150, 0.3)' : 'transparent')};
  cursor: pointer;

  &:hover {
    background: ${({ focused }) => (focused ? 'rgba(150, 150, 150, 0.3)' : 'rgba(150, 150, 150, 0.1)')};
  }
`;

const ImageContainer = styled(imageContainer)`
  filter: ${({ permanent }) => (permanent ? 'invert(100%)' : 'none')};
`;

const item = (props) => {
  const {
    icon, isPermanent, scale, showAppHandler, active, focused
  } = props;
  return (
    <BarItem
      scale={scale}
      onClick={showAppHandler}
      active={active}
      focused={focused}
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
