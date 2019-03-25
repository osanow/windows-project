import React, { useState } from 'react';
import styled from 'styled-components';

import { imageContainer } from '../../../assets/styles/globalStyles';
import noIcon from '../../../assets/icons/noIcon.png';

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

const item = ({ iconName, isPermanent, scale }) => {
  const [icon, setIcon] = useState(noIcon);

  if (icon === noIcon) {
    import(`../../../assets/icons/${iconName}`)
      .then(res => setIcon(res.default))
      .catch(err => console.log(err));
  }

  return (
    <BarItem scale={scale}>
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
