import React from 'react';
import styled from 'styled-components';

import { imageContainer } from '../../../assets/styles/globalStyles';

const BarItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${({ scale }) => (scale === 'small' ? '1.5rem' : '3rem')};
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: rgba(150, 150, 150, 0.1);
  }
`;

const ImageContainer = styled(imageContainer)`
  filter: ${props => (props.permanent ? 'invert(100%)' : 'none')};
`;

const item = (props) => {
  const {
    icon, isPermanent, scale, showAppHandler, active
  } = props;
  return (
    <BarItem scale={scale} onClick={showAppHandler} active={active}>
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
