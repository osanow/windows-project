import React from 'react';
import styled from 'styled-components';

import menuIcon from '../../assets/icons/menu.svg';
import keyIcon from '../../assets/icons/key.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import pictureIcon from '../../assets/icons/picture.svg';

const MainMenu = styled.div`
  opacity: 0;
  transform: translateY(calc(80vh + 2.5rem));
  animation: ${({ show }) => (show ? 'slideMenu .3s ease-out forwards' : 'none')};
  position: absolute;
  bottom: 100%;
  width: 30vw;
  height: 80vh;
  max-width: 1120px;
  max-height: 800px;
  left: 0;
  background: rgba(100,100,100,.98);
  display: flex;
  cursor: default;
  user-select: none;

  @keyframes slideMenu {
    0% {
      opacity: 0;
      transform: translateY(5rem);
    }
    1% {
      opacity: 0;
      transform: translateY(5rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const OptionsBox = styled.div`
  height: 100%;
  width: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid rgba(125,125,125,.9);
`;

const ExpandButton = styled.button`
  background: none;
  position: relative;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 3rem;
  height: 3rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(125,125,125,.9)
  }

  & > img {
    width: 1.5rem;
    height: 1rem;
    filter: invert(100%);
  }
`;

const Options = styled.nav`
  width: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Option = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: invert(100%);
  width: 3rem;
  height: 3rem;
  cursor: pointer;

  & > img {
    width: 1.1rem;
    height: 1.1rem;
  }

  & > p {
    position: absolute;
    display: none;
  }

  &:hover {
    background-color: rgba(120,120,120,.9)
  }
`;

const AppsBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0.5rem;
`;

const App = styled.div`
  color: white;
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  padding: 0 .3rem;

  &:hover {
    background-color: rgba(120,120,120,.9)
  }
`;

const mainMenu = ({ show }) => (
  <MainMenu show={show} onClick={e => e.stopPropagation()}>
    <OptionsBox>
      <ExpandButton>
        <img src={menuIcon} alt="expand" />
      </ExpandButton>
      <Options>
        <Option>
          <img src={pictureIcon} alt="images" />
          <p>Images</p>
        </Option>
        <Option>
          <img src={settingsIcon} alt="settings" />
          <p>Settings</p>
        </Option>
        <Option>
          <img src={keyIcon} alt="logout" />
          <p>Logout</p>
        </Option>
      </Options>
    </OptionsBox>
    <AppsBox>
      <App>
        <p>A</p>
      </App>
    </AppsBox>
  </MainMenu>
);

export default mainMenu;
