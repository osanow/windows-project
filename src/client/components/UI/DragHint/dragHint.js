import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import arrowIcon from '../../../assets/icons/right-arrow.svg';

const Hint = styled.div`
  position: absolute;
  z-index: 101;
  background: whitesmoke;
  border: ${({ type }) => (type === 'not allowed' ? 'none' : '1px solid #bbb')};
  padding: ${({ type }) => (type === 'not allowed' ? '0' : '0.1rem 0.3rem 0.1rem 1rem')};
  height: ${({ type }) => (type === 'not allowed' ? '0' : '1.25rem')};
  width: ${({ type }) => (type === 'not allowed' ? '0' : 'auto')};

  &::after {
    position: absolute;
    content: '';
    display: ${({ type }) => (type === 'not allowed' ? 'block' : 'none')};
    top: -5rem;
    left: -5rem;
    width: 10rem;
    height: 10rem;
    cursor: not-allowed;
    z-index: 102;
  }
`;

const Message = styled.p`
  position: relative;
  color: blue;
  font-weight: 100;
  font-size: 13px;
  margin: 0;
  font-family: Monserrat, sans-serif;
  display: flex;
  align-items: center;

  &::before {
    position: absolute;
    content: '';
    background-image: url(${arrowIcon});
    left: -1rem;
    width: 0.7rem;
    height: 0.7rem;
  }
`;

const Target = styled.span`
  margin-left: 0.2rem;
  color: black;
`;

const dragHint = ({
  type, target, left, top, prevX, prevY
}) => ReactDOM.createPortal(
  <Hint
    type={type}
    style={{
      transform: `translate( ${left}px, ${top}px )`,
      left: prevX,
      top: prevY
    }}
  >
    {type !== 'not allowed' && (
      <Message>
        Move to:
        <Target>
          {`  /${target.getAttribute('data-name').split('/').slice(-2).join('/')}`}
        </Target>
      </Message>
    )}
  </Hint>,
  document.getElementById('dragHint-root')
);

export default dragHint;
