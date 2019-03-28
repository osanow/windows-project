import React from 'react';
import styled from 'styled-components';

import computer from '../../../assets/icons/computer.svg';
import desktop from '../../../assets/icons/desktop.svg';

const SidebarItem = styled.li`
  position: relative;
  padding-left: 2rem;
  width: 100%;
  margin-top: 0.3rem;
  font-size: 13px;
  text-align: left;

  & + ul {
    height: ${({ active }) => (active ? 'auto' : '0px')};
  }

  &::before {
    position: absolute;
    content: url(${({ icon }) => icon});
    left: 0.5rem;
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const sidebarItem = (props) => {
  console.log(props);
  return (
    <>
      <SidebarItem icon={computer} active="true">
        Computer
      </SidebarItem>
      <ItemsList>
        <SidebarItem icon={desktop} active="true">
          Desktop
        </SidebarItem>
        <ItemsList>
          <SidebarItem icon={desktop}> Desktop </SidebarItem>
        </ItemsList>
      </ItemsList>
    </>
  );
};

export default sidebarItem;
