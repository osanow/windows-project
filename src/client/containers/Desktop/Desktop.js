import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

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
  const { wallpaper, isAuth } = props;

  useEffect(() => {
    if (wallpaper && isAuth) {
      import(`../../assets/bgrounds/${wallpaper}`)
        .then((res) => {
          setWallpaperUrl(res.default);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [wallpaper]);

  return (
    <Desktop wallpaperUrl={wallpaperUrl}>
      <DesktopIcon name="My computer" iconName="computer.png" />
      <DesktopIcon name="Trash" iconName="trash-empty.png" />
    </Desktop>
  );
};

const mapStateToProps = state => ({
  isAuth: state.token !== null,
  wallpaper: state.preferences.wallpaper
});

export default connect(mapStateToProps)(memo(desktop));
