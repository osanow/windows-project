import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as menuOptions from '../../utils/contextMenuOptions';
import ContextMenu from '../../components/UI/ContextMenu/contextMenu';
import axios from '../../axios-instance';
import DesktopIcon from '../../components/DesktopIcon/DesktopIcon';

const Desktop = styled.div`
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

const desktop = (props) => {
  const [desktopConfig, setDesktopConfig] = useState({
    wallpaperUrl: '',
    desktopItems: []
  });
  const [contextMenuData, setContextMenuData] = useState({
    opened: false,
    options: {},
    left: 0,
    top: 0
  });

  const { wallpaper, isAuth, userId } = props;

  const closeContextMenuHandler = () => {
    document.removeEventListener('click', closeContextMenuHandler);
    setContextMenuData({
      opened: false,
      options: {},
      left: 0,
      top: 0
    });
  };

  const onContextMenu = (e) => {
    const correctTarget = e.path.find(
      val => val.getAttribute('data-type') || val.id === 'app-root'
    );

    const iconId = correctTarget.id;
    const iconType = correctTarget.getAttribute('data-type').split(',');
    const iconPath = correctTarget.getAttribute('data-path');

    const options = { ...menuOptions[[...iconType]] };

    setContextMenuData({
      opened: true,
      left: e.clientX,
      top: e.clientY,
      data: {
        path: iconPath,
        owner: userId,
        id: iconId
      },
      options
    });
    document.addEventListener('click', closeContextMenuHandler);
    return false;
  };
  window.oncontextmenu = onContextMenu;

  let ResItems = null;
  useEffect(() => {
    if (isAuth) {
      axios('items/', {
        method: 'GET',
        params: {
          path: '/Desktop/'
        }
      })
        .then((res) => {
          ResItems = res.data;
          return import(`../../assets/bgrounds/${wallpaper}`);
        })
        .then((res) => {
          setDesktopConfig({
            wallpaperUrl: res.default,
            desktopItems: ResItems
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAuth]);

  return (
    <Desktop wallpaperUrl={desktopConfig.wallpaperUrl} data-type="desktop" data-path="/Desktop/">
      {desktopConfig.desktopItems.map(item => (
        <DesktopIcon key={item._id} {...item} />
      ))}
      {contextMenuData.opened && <ContextMenu {...contextMenuData} />}
    </Desktop>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null,
  userId: state.auth.userId,
  wallpaper: state.auth.preferences.wallpaper
});

export default connect(mapStateToProps)(React.memo(desktop));
