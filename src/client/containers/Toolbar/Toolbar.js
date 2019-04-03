import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ToolbarItem from './ToolbarItem/toolbarItem';
import ClockItem from '../../components/ClockItem/clockItem';

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
  margin: 0 0.5rem;
`;

const toolbar = (props) => {
  const { minimalizedApps } = props;

  const itemsArray = minimalizedApps.map(item => (
    <ToolbarItem key={item._id} {...item} />
  ));

  return (
    <Bar>
      <Box>{itemsArray}</Box>
      <Box>
        <ToolbarItem iconName="sound.png" isPermanent scale="small" />
        <ToolbarItem iconName="wifi.png" isPermanent scale="small" />
        <ClockItem />
      </Box>
    </Bar>
  );
};

const mapStateToProps = state => ({
  minimalizedApps: state.apps.minimalized
});

export default connect(mapStateToProps)(React.memo(toolbar));
