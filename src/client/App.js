import React, { Component } from 'react';
import styled from 'styled-components';

import { updateObject } from './util/utility';
import Toolbar from './containers/Toolbar/Toolbar';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';

import './app.css';

const App = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 1rem 0.3rem 3rem 0.3rem;

  background: ${props => `#3366ff ${props.bg ? `url(${props.bg})` : ''} center no-repeat`};

  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 6rem);
  grid-template-rows: repeat(auto-fill, 4.5rem);
  grid-gap: 0.3rem;
  justify-content: center;
  grid-auto-flow: column;
`;

class root extends Component {
  state = {
    currWallpaper: null
  };

  componentWillMount() {
    import('./assets/bgrounds/wallpaper_default.jpg')
      .then((path) => {
        this.setState(prevState => updateObject(prevState, { currWallpaper: path.default }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { currWallpaper } = this.state;

    return (
      <>
        <App bg={currWallpaper}>
          <DesktopIcon name="My computer" iconName="computer.png" />
          <DesktopIcon name="Trash" iconName="trash-empty.png" />
        </App>
        <Toolbar />
      </>
    );
  }
}

export default root;
