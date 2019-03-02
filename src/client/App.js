import React, { Component } from 'react';
import styled from 'styled-components';

import { updateObject } from './util/utility';
import Toolbar from './containers/Toolbar/Toolbar';

import './app.css';

const App = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0.3rem 0.3rem 3rem 0.3rem;

  background: ${props => `#3366ff ${'' && (props.bg && `url(${props.bg})`)} center no-repeat`};

  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 4rem);
  grid-template-rows: repeat(auto-fill, 4rem);
  grid-gap: 0.3rem;
  justify-content: center;
  grid-auto-flow: column;

  & > * {
    position: relative;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > p {
    text-align: center;
  }
`;

class root extends Component {
  state = {
    currWallpaper: null
  };

  componentWillMount() {
    this.setState(updateObject(this.state, { currWallpaper: import('./assets/bgrounds/wallpaper_default.jpg') } ));
  }

  render() {
    // const { currWallpaper } = this.state;

    return (
      <>
        <App bg={this.currWallpaper}>
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
        </App>
        <Toolbar />
      </>
    );
  }
}

export default root;
