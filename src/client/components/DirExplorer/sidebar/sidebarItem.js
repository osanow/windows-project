import React from 'react';
import styled from 'styled-components';

const SidebarItem = styled.li`
  position: relative;
  padding-left: 2.5rem;
  width: 100%;
  margin-top: 0.3rem;
  font-size: 13px;
  text-align: left;
  display: flex;
  align-items: center;
  height: 1rem;

  &::before {
    position: absolute;
    content: url(${({ icon }) => icon});
    left: 1.2rem;
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const sidebarItem = (props) => {
  const { icon, children, changeDirHandler } = props;
  return (
    <SidebarItem icon={icon} onClick={changeDirHandler}>
      <p>{children}</p>
    </SidebarItem>
  );
};

export default sidebarItem;
