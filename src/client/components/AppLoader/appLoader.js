import React from 'react';
import styled, { keyframes } from 'styled-components';

import { underlineAnimation } from '../../assets/styles/globalStyles';
import RotatingSpinner from '../Spinners/rotatingSpinner';

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(60deg, #3f51b5, #00bcd4);
  animation: ${({ closed }) => (closed ? 'smooth-toggle 1.5s ease-in 2s forwards' : 'none')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-top: 100vh solid transparent;
    border-left: 100vh solid #fff;
    opacity: 0.1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    border-top: 100vh solid transparent;
    border-right: 100vh solid #fff;
    opacity: 0.1;
  }

  @keyframes smooth-toggle {
    0% {
      opacity: 1;
      z-index: 10;
    }
    90% {
      opacity: 0;
      z-index: 10;
    }
    100% {
      opacity: 0;
      z-index: -1;
    }
  }
`;

const textAnimation = keyframes`
    0% {
      opacity: 0;
      letter-spacing: 8px;
    }
    100% {
      opacity: 1;
      letter-spacing: 0.5px;
    }
`;

const Title = styled.h1`
  position: relative;
  font-size: 32px;
  font-weight: 700;
  color: whitesmoke;
  opacity: 0;
  animation: ${textAnimation} 2s ease-in-out 0.5s 1 forwards;

  &::after {
    content: '';
    background-color: #305796;
    width: 0;
    height: 3px;
    border-radius: 4px;
    margin-top: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: ${underlineAnimation} 1s ease-in-out 2s forwards;
  }
`;

const SpinnerBox = styled.div`
  margin-top: 3rem;
  opacity: 0;
  animation: fadeWithTimeout 0.6s ease-in-out 4s forwards;

  @keyframes fadeWithTimeout {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const appLoader = ({ closed }) => (
  <Wrapper closed={closed}>
    <Title>Windows 10 simulator</Title>
    <SpinnerBox>
      <RotatingSpinner />
    </SpinnerBox>
  </Wrapper>
);

export default React.memo(appLoader);
