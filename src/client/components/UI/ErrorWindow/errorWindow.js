import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import SystemWindow from '../../SystemWindow/systemWindow';
import warningIcon from '../../../assets/icons/warning.svg';

const ErrorWrapper = styled.div`
  position: absolute;
  bottom: 25vh;
  right: 35vw;
  z-index: 100;
`;

const Content = styled.div`
  border-top: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Message = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin: 0 auto;
`;

const dragHint = ({ message }) => ReactDOM.createPortal(
  <ErrorWrapper>
    <SystemWindow
      icon={warningIcon}
      name="Error"
      left="0"
      top="0"
      draggable={false}
      height="20vh"
      width="30vw"
      closeMode="true"
    >
      <Content>
        <Message>{message}</Message>
      </Content>
    </SystemWindow>
  </ErrorWrapper>,
  document.getElementById('errorHandler-root')
);

export default dragHint;
