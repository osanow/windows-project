import React, { useState } from 'react';

import wifiIcon from '../../../assets/icons/wifi.svg';
import noWifiIcon from '../../../assets/icons/no-wifi.svg';
import ToolbarItem from '../../../containers/Toolbar/ToolbarItem/toolbarItem';

const wifiItem = () => {
  const [isOnline, setIsOnline] = useState(true);

  window.addEventListener('online', () => setIsOnline(true));
  window.addEventListener('offline', () => setIsOnline(false));

  return (
    <ToolbarItem icon={isOnline ? wifiIcon : noWifiIcon} isPermanent scale="small" />
  );
};


export default wifiItem;
