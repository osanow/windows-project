import styled, { keyframes } from 'styled-components';

export const imageContainer = styled.img`
  user-select: none;
  -webkit-user-drag: none;
  -moz-user-drag: none;
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

export const underlineAnimation = keyframes`
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
`;
