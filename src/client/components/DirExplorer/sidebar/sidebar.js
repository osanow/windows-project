import React from 'react';
import styled from 'styled-components';

import SidebarItem from './sidebarItem';
import ItemsList from './itemsList';

import desktopIcon from '../../../assets/icons/desktop.svg';

const Wrapper = styled.div`
  width: 160px;
  overflow: hidden;
  margin-right: 0.4rem;
  position: relative;
`;

const Sidebar = styled.ul`
  padding: 0.1rem;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0.5rem 0.5rem 0.5rem 0;
  overflow-y: auto;
  width: 20rem;
`;

const sidebar = (props) => {
  const { changeDirHandler } = props;
  return (
    <Wrapper>
      <Sidebar>
        <SidebarItem icon={desktopIcon} path="/Desktop" changeDirHandler={() => changeDirHandler('Desktop', 'Desktop')}>
          Desktop
        </SidebarItem>
        <ItemsList path="/Desktop" changeDirHandler={changeDirHandler} active />
      </Sidebar>
    </Wrapper>
  );
};

export default sidebar;
