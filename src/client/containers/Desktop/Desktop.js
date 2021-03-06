import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as menuOptions from '../../components/UI/ContextMenu/options';
import ErrorWindow from '../../components/UI/ErrorWindow/errorWindow';
import ContextMenu from '../../components/UI/ContextMenu/contextMenu';
import DesktopIcon from './DesktopIcon/DesktopIcon';
import { updateObject } from '../../utils/utility';
import { appFetchItems } from '../../store/actions/index';

const DesktopWrapper = styled.div`
  width: 100vw;
  height: 101vh;
  overflow: hidden;
  margin: 0;
  padding: 1rem 0.3rem 1rem 0.3rem;

  background: ${({ wallpaperUrl }) => `${
    wallpaperUrl ? `url(${wallpaperUrl})` : ''
  } center center / cover no-repeat
    rgb(51, 102, 255)`};

  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 6rem);
  grid-template-rows: repeat(auto-fill, 4.5rem);
  grid-gap: 0.3rem;
  justify-content: center;
  grid-auto-flow: column;
`;

const LoadingBackdrop = styled.div`
  cursor: wait;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

class Desktop extends Component {
  state = {
    wallpaperUrl: '',
    contextMenu: {
      opened: false,
      options: {},
      data: {},
      left: 0,
      top: 0
    }
  };

  componentDidMount() {
    window.addEventListener(
      'contextmenu',
      (e) => {
        e.preventDefault();
        this.onContextMenu(e);
      },
      false
    );
  }

  componentDidUpdate(prevProps) {
    const { isAuth, wallpaper, appFetchItemsHandler } = this.props;

    if (prevProps.isAuth !== isAuth && isAuth) {
      appFetchItemsHandler('/Desktop');
      import(`../../assets/bgrounds/${wallpaper}`)
        .then((res) => {
          this.setState(prevState => updateObject(prevState, {
            wallpaperUrl: res.default
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  closeContextMenuHandler = () => {
    document.removeEventListener('click', this.closeContextMenuHandler);
    this.setState(prevState => updateObject(prevState, {
      contextMenu: {
        opened: false,
        options: {},
        data: {},
        left: 0,
        top: 0
      }
    }));
  };

  onContextMenu = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    const correctTarget = path.find(
      val => val.getAttribute('data-type') || val.id === 'app-root'
    );
    if (!correctTarget.getAttribute('data-type')) return false;

    const iconId = correctTarget.id;
    const iconType = correctTarget.getAttribute('data-type').split(',');
    const iconPath = correctTarget.getAttribute('data-path');

    let options = {};
    iconType.reverse().forEach((type) => {
      options = {
        ...options,
        ...menuOptions[type]
      };
    });
    Object.entries(options).forEach((el) => {
      if (el[1] === null) delete options[el[0]];
    });

    this.setState(prevState => updateObject(prevState, {
      contextMenu: {
        opened: true,
        left: e.clientX,
        top: e.clientY,
        data: {
          path: iconPath,
          id: iconId
        },
        options
      }
    }));

    document.addEventListener('click', this.closeContextMenuHandler);
    return false;
  };

  render() {
    const { wallpaperUrl, contextMenu } = this.state;
    const {
      runningApps,
      appFetchItemsHandler,
      desktopItems,
      loading,
      appError
    } = this.props;

    const itemsArray = desktopItems.map(item => (
      <DesktopIcon
        key={item._id}
        updateItems={appFetchItemsHandler}
        {...item}
      />
    ));

    return (
      <DesktopWrapper
        wallpaperUrl={wallpaperUrl}
        data-type="desktop,container"
        data-path="/Desktop"
        data-name="Desktop"
      >
        {appError && <ErrorWindow message={appError} />}
        {loading && <LoadingBackdrop />}
        {itemsArray}
        {runningApps}
        {contextMenu.opened && (
          <ContextMenu
            updateItems={path => appFetchItemsHandler(path)}
            {...contextMenu}
          />
        )}
      </DesktopWrapper>
    );
  }
}

const mapStateToProps = state => ({
  appError: state.apps.error,
  loading: state.apps.loading,
  isAuth: state.auth.token !== null,
  userId: state.auth.userId,
  wallpaper: state.auth.preferences.wallpaper,
  runningApps: state.apps.running,
  desktopItems:
    state.apps.data['/Desktop'] && state.apps.data['/Desktop'].items
      ? state.apps.data['/Desktop'].items
      : []
});

const mapDispatchToProps = dispatch => ({
  appFetchItemsHandler: path => dispatch(appFetchItems(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Desktop));
