import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as menuOptions from '../../components/UI/ContextMenu/options';
import ContextMenu from '../../components/UI/ContextMenu/contextMenu';
import DesktopIcon from './DesktopIcon/DesktopIcon';
import { updateObject } from '../../utils/utility';
import { appFetchItems } from '../../store/actions/index';

const DesktopWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 3rem);
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
    window.oncontextmenu = this.onContextMenu;
  }

  componentDidUpdate(prevProps) {
    const { isAuth, wallpaper, appFetchItemsHandler } = this.props;

    if (prevProps.isAuth !== isAuth) {
      appFetchItemsHandler('/Desktop', 'Desktop');
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
    const { userId } = this.props;

    const correctTarget = e.path.find(
      val => val.getAttribute('data-type') || val.id === 'app-root'
    );
    if (!correctTarget.getAttribute('data-type')) return false;

    const iconId = correctTarget.id;
    const iconType = correctTarget.getAttribute('data-type').split(',');
    const iconPath = correctTarget.getAttribute('data-path');

    let options = {};
    iconType.forEach((type) => {
      options = {
        ...options,
        ...menuOptions[type]
      };
    });

    this.setState(prevState => updateObject(prevState, {
      contextMenu: {
        opened: true,
        left: e.clientX,
        top: e.clientY,
        data: {
          path: iconPath,
          owner: userId,
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
    const { runningApps, appFetchItemsHandler, desktopItems } = this.props;

    const itemsArray = desktopItems.map(item => (
      <DesktopIcon
        key={item._id}
        updateItems={() => appFetchItemsHandler('/Desktop', 'Desktop')}
        {...item}
      />
    ));

    return (
      <DesktopWrapper
        wallpaperUrl={wallpaperUrl}
        data-type="desktop"
        data-path="/Desktop"
      >
        {itemsArray}
        {runningApps}
        {contextMenu.opened && (
          <ContextMenu
            updateItems={() => appFetchItemsHandler('/Desktop', 'Desktop')}
            {...contextMenu}
          />
        )}
      </DesktopWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const appData = state.apps.data.Desktop;
  return {
    isAuth: state.auth.token !== null,
    userId: state.auth.userId,
    wallpaper: state.auth.preferences.wallpaper,
    runningApps: state.apps.running,
    desktopItems: appData && appData.items ? appData.items : []
  };
};

const mapDispatchToProps = dispatch => ({
  appFetchItemsHandler: (path, id) => dispatch(appFetchItems(path, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktop);
