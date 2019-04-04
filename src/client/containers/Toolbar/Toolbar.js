import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { showApp } from '../../store/actions/index';
import ToolbarItem from './ToolbarItem/toolbarItem';
import ClockItem from '../../components/ClockItem/clockItem';
import noIcon from '../../assets/icons/noIcon.png';

const Bar = styled.nav`
  position: absolute;
  bottom: 0;
  height: 2.5rem;
  width: 100vw;
  background-color: rgba(45, 45, 45, 0.9);
  display: flex;
  justify-content: space-between;
`;

const Box = styled.section`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`;

const toolbar = (props) => {
  const [icons, setIcons] = useState({
    sound: noIcon,
    wifi: noIcon,
    win: noIcon,
    search: noIcon
  });
  const { minimalizedApps, showAppHandler, runningApps } = props;

  const fetchIcons = async () => {
    const sound = (await import('../../assets/icons/sound.png')).default;
    const wifi = (await import('../../assets/icons/wifi.png')).default;
    const win = (await import('../../assets/icons/win10.png')).default;
    const search = (await import('../../assets/icons/search.svg')).default;
    setIcons({
      sound,
      wifi,
      win,
      search
    });
  };
  useEffect(() => {
    fetchIcons();
  }, []);

  const [focusedRunningApp] = runningApps.slice(-1);
  const itemsArray = minimalizedApps.map(item => (
    <ToolbarItem
      {...item.props}
      active="true"
      focused={
        focusedRunningApp
        && focusedRunningApp.props._id === item.props._id
      }
      key={item.props._id}
      scale="medium"
      showAppHandler={() => showAppHandler(item.props._id)}
    />
  ));

  const {
    win, sound, wifi, search
  } = icons;

  return (
    <Bar>
      <Box>
        <ToolbarItem icon={win} isPermanent scale="medium" />
        <ToolbarItem icon={search} isPermanent scale="medium" />
        {itemsArray}
      </Box>
      <Box>
        <ToolbarItem icon={sound} isPermanent scale="small" />
        <ToolbarItem icon={wifi} isPermanent scale="small" />
        <ClockItem />
      </Box>
    </Bar>
  );
};

const mapStateToProps = state => ({
  minimalizedApps: state.apps.minimalized,
  runningApps: state.apps.running
});

const mapDispatchToProps = dispatch => ({
  showAppHandler: id => dispatch(showApp(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(toolbar));
