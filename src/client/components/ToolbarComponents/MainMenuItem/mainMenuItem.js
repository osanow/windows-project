import React, { useState, useEffect } from 'react';

import MainMenu from '../../MainMenu/mainMenu';
import ToolbarItem from '../../../containers/Toolbar/ToolbarItem/toolbarItem';
import winIcon from '../../../assets/icons/win10.png';


const mainMenuItem = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenuHandler = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible) {
      const desktopWrapper = document.getElementById('Desktop');
      desktopWrapper.addEventListener('click', toggleMenuHandler);
      return () => desktopWrapper.removeEventListener('click', toggleMenuHandler);
    }
  }, [isVisible]);

  return (
    <>
      <ToolbarItem icon={winIcon} onClick={toggleMenuHandler} isPermanent scale="medium" />
      <MainMenu show={isVisible} />
    </>
  );
};

export default mainMenuItem;
