import React, { Component } from 'react';
import styled from 'styled-components';

const Bar = styled.nav`
  width: 100vw;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Box = styled.div``;

class Toolbar extends Component {
  state = {};

  render() {
    return (
      <Bar>
        <Box />
        <Box />
      </Bar>
    );
  }
}

export default Toolbar;
