import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;

  > div {
    position: absolute;
    top: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
      left: -2px;
      animation: lds-ellipsis1 0.6s infinite;
    }
    &:nth-child(2) {
      left: -2px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    &:nth-child(3) {
      left: 5px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    &:nth-child(4) {
      left: 12px;
      animation: lds-ellipsis3 0.6s infinite;
    }
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(8px, 0);
    }
  }
`;

const spinner = () => (
  <Spinner>
    <div />
    <div />
    <div />
    <div />
  </Spinner>
);

export default spinner;
