import React, { Component } from 'react';
import styled from 'styled-components';

import ToolbarItem from '../../components/ToolbarItem/toolbarItem';
import ClockItem from '../../components/ClockItem/clockItem';

const Bar = styled.nav`
  position: absolute;
  bottom: 0;
  height: 3rem;
  width: 100vw;
  background-color: rgba(45, 45, 45, 0.9);
  display: flex;
  justify-content: space-between;
`;

const Box = styled.section`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
`;

class Toolbar extends Component {
  state = {};

  render() {
    return (
      <Bar>
        <Box>
          <ToolbarItem iconName="win10.png" isPermanent scale="medium" />
          <ToolbarItem iconName="search.svg" isPermanent scale="medium" />
        </Box>
        <Box>
          <ToolbarItem iconName="sound.png" isPermanent scale="small" />
          <ToolbarItem iconName="wifi.png" isPermanent scale="small" />
          <ClockItem />
        </Box>
      </Bar>
    );
  }
}

export default React.memo(Toolbar);
