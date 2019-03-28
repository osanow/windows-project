import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 12.5rem;
  list-style: none;
  margin: 0.5rem;
  border-right: 1px solid #eee;
  overflow: hidden;
  padding: 0 0.5rem;
`;

const sidebar = (props) => {
  console.log(props);
  return <Sidebar />;
};

export default sidebar;
