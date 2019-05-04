import React from 'react';
import styled from 'styled-components';

import menuIcon from '../../assets/icons/menu.svg';
import keyIcon from '../../assets/icons/key.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import pictureIcon from '../../assets/icons/picture.svg';

const MainMenu = styled.div`
  transform: translateY(calc(80vh + 2.5rem));
  ${({ show }) => {
    if (show) {
      return `
        opacity: 1;
        z-index: 10;
        transform: translateY(0);
      `;
    }
    return `
      opacity: 0;
      z-index: -1;
      transform: translateY(calc(100% + 2.5rem));
    `;
  }}
  transition: opacity .3s ease-out, transform .3s cubic-bezier(0.47, 0.09, 0.56, 0.68);
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

const ExpandButton = styled.div`
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
  transition: background-color .1s ease-in-out;

  & > img {
    width: 1.5rem;
    height: 1rem;
    filter: invert(100%);
  }

  &:hover {
    background-color: rgba(125,125,125,.9)
  }
  &:active {
    background-color: rgba(150,150,150,.9)
  }
`;

const Options = styled.ul`
  width: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Option = styled.li`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: invert(100%);
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: background-color .2s ease-in-out;

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
  &:active {
    background-color: rgba(90,90,90,.9)
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
  transition: background-color .2s ease-in-out;

  &:hover {
    background-color: rgba(120,120,120,.9)
  }
  &:active {
    background-color: rgba(150,150,150,.9)
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
