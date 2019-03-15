import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import axios from '../../axios-instance';
import DesktopIcon from '../../components/DesktopIcon/DesktopIcon';

const Desktop = styled.div`
  width: 100vw;
  height: calc(100vh - 3rem);
  overflow: hidden;
  margin: 0;
  padding: 1rem 0.3rem 1rem 0.3rem;

  background: ${({ wallpaperUrl }) => `#3366ff ${wallpaperUrl ? `url(${wallpaperUrl})` : ''} center no-repeat`};

  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 6rem);
  grid-template-rows: repeat(auto-fill, 4.5rem);
  grid-gap: 0.3rem;
  justify-content: center;
  grid-auto-flow: column;
`;

const desktop = (props) => {
  const [wallpaperUrl, setWallpaperUrl] = useState('');
  const [desktopItems, setDesktopItems] = useState([]);

  const { wallpaper, isAuth, token } = props;

  useEffect(() => {
    if (isAuth) {
      axios('items/', {
        method: 'POST',
        params: {
          path: '/Desktop/'
        },
        headers: {
          authorization: token
        }
      })
        .then((res) => {
          setDesktopItems(res.data);
          return import(`../../assets/bgrounds/${wallpaper}`);
        })
        .then((res) => {
          setWallpaperUrl(res.default);
        })
        .catch((err) => {
          if (wallpaperUrl) setWallpaperUrl('');
          if (desktopItems !== []) setDesktopItems([]);
          console.log(err);
        });
    }
  }, [isAuth]);

  return (
    <Desktop wallpaperUrl={wallpaperUrl}>
      {desktopItems.map(item => (
        <DesktopIcon key={item._id} {...item} />
      ))}
    </Desktop>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null,
  token: state.auth.token,
  wallpaper: state.auth.preferences.wallpaper
});

export default connect(mapStateToProps)(memo(desktop));
