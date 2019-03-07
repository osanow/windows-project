import React, { useState } from 'react';
import styled from 'styled-components';

import { imageContainer } from '../../assets/styles/globalStyles';
import noIcon from '../../assets/icons/noIcon.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid transparent;
  grid-column-start: ${({ colPos }) => colPos};
  grid-row-start: ${({ rowPos }) => rowPos};
  cursor: pointer;

  &:hover {
    border: 1px solid rgba(107, 128, 160, 0.3);
    background: rgba(89, 151, 249, 0.1);
  }

  &:active {
    border: 1px solid #4286f4;
    background: rgba(89, 151, 249, 0.4);
  }
`;

const ItemIcon = styled(imageContainer)``;

const ItemDesc = styled.p`
  color: white;
  font-size: 13px;
  letter-spacing: 0.5px;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
  padding: 0;
  margin: 0.3rem 0 0 0;
`;

const calculatePos = (type, value) => {
  if (type === 'row') return Math.round(value / (4.5 * 16));
  return Math.round(value / (6 * 16));
};

const item = ({ name, iconName }) => {
  const [icon, setIcon] = useState(noIcon);
  const [position, setPosition] = useState(['auto', 'auto']); // row , col

  const onDropHandler = (e) => {
    console.log('down', e.clientX, e.clientY);
    setPosition([
      calculatePos('row', e.clientY).toString(),
      calculatePos('col', e.clientX).toString()
    ]);
  };

  const onCatchHandler = (e) => {
    console.log('up', e.clientX, e.clientY);
  };

  if (icon === noIcon) {
    import(`../../assets/icons/${iconName}`)
      .then(res => setIcon(res.default))
      .catch(err => console.log(err));
  }

  return (
    <Container
      draggable="true"
      onDragStart={onCatchHandler}
      onDragEnd={onDropHandler}
      rowPos={position[0]}
      colPos={position[1]}
    >
      <ItemIcon src={icon} alt="icon" scale="huge" />
      <ItemDesc>{name}</ItemDesc>
    </Container>
  );
};

export default item;
