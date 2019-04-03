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
    soundIcon: noIcon,
    wifiIcon: noIcon
  });
  const { minimalizedApps, showAppHandler } = props;

  const fetchIcons = async () => {
    const soundIcon = (await import('../../assets/icons/sound.png')).default;
    const wifiIcon = (await import('../../assets/icons/wifi.png')).default;
    setIcons({ soundIcon, wifiIcon });
  };
  useEffect(() => {
    fetchIcons();
  }, []);

  console.log(minimalizedApps);
  const itemsArray = minimalizedApps.map(item => (
    <ToolbarItem
      {...item.props}
      active="true"
      key={item.props._id}
      scale="medium"
      showAppHandler={() => showAppHandler(item.props._id)}
    />
  ));

  return (
    <Bar>
      <Box>{itemsArray}</Box>
      <Box>
        <ToolbarItem icon={icons.soundIcon} isPermanent scale="small" />
        <ToolbarItem icon={icons.wifiIcon} isPermanent scale="small" />
        <ClockItem />
      </Box>
    </Bar>
  );
};

const mapStateToProps = state => ({
  minimalizedApps: state.apps.minimalized
});

const mapDispatchToProps = dispatch => ({
  showAppHandler: id => dispatch(showApp(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(toolbar));
