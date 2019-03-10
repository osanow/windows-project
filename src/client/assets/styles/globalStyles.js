import styled, { keyframes } from 'styled-components';

export const imageContainer = styled.img`
  height: ${({ scale }) => {
    if (scale === 'huge') return '3rem';
    if (scale === 'medium') return '1.5rem';
    return '1.1rem';
  }};
  width: ${({ scale }) => {
    if (scale === 'huge') return '3rem';
    if (scale === 'medium') return '1.5rem';
    return '1.1rem';
  }};
`;

export const underslineAnimation = keyframes`
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
`;
