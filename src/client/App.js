import React, { Component } from 'react';
import styled from 'styled-components';

import { updateObject } from './utils/utility';
import Toolbar from './containers/Toolbar/Toolbar';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';
import AppLoader from './components/AppLoader/appLoader';
import AuthLayer from './containers/AuthLayer/AuthLayer';

import './app.css';

const App = styled.div`
  width: 100vw;
  height: calc(100vh - 3rem);
  overflow: hidden;
  margin: 0;
  padding: 1rem 0.3rem 1rem 0.3rem;

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
    currWallpaper: null,
    appLoader: true
  };

  componentDidMount() {
    import('./assets/bgrounds/wallpaper_default.jpg')
      .then((path) => {
        this.setState(prevState => updateObject(prevState, { currWallpaper: path.default }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  shouldComponentUpdate(prevState, nextState) {
    return prevState.appLoader !== nextState.appLoader;
  }

  authLoadedHandler = () => {
    this.setState(prevState => updateObject(prevState, { appLoader: false }));
  };

  render() {
    const { currWallpaper, appLoader } = this.state;

    return (
      <>
        <App bg={currWallpaper}>
          <DesktopIcon name="My computer" iconName="computer.png" />
          <DesktopIcon name="Trash" iconName="trash-empty.png" />
        </App>
        <Toolbar />
        <AuthLayer onLoaded={this.authLoadedHandler} />
        <AppLoader closed={!appLoader} />
      </>
    );
  }
}

export default root;
