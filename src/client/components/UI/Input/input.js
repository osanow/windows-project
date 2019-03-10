import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  text-align: center;
  position: relative;
  display: block;
  font-family: lato, sans-serif;
  font-weight: bold;
  font-size: 14px;
  border: 1px solid gray;
  padding: 0.3rem;
  width: 100%;
  height: 2rem;
  color: #202020;
  background: ${({ valid, touched }) => (!valid && touched
    ? 'rgba(220, 130, 130, 0.85)'
    : 'rgba(255, 255, 255, 0.7)')};

  &::placeholder {
    font-weight: bold;
    font-size: 14px;
    color: #505050;
    opacity: 1;
    transition: transform 0.2s ease-in-out, opacity 0.15s ease-in-out;
  }

  &:focus::placeholder {
    opacity: 0;
    transform: translateX(200px);
  }

  &:last-of-type {
    padding-left: 2.25rem;
    width: calc(100% - 2rem);
    display: inline-block;
    align-self: flex-start;
  }
`;

const input = ({ inputConfig, changeHandler }) => (
  <Input spellCheck="off" {...inputConfig} onChange={changeHandler} />
);

export default input;
