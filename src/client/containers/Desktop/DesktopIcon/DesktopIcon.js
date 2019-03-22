import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-instance';
import { updateObject, onCatchHandler } from '../../../utils/utility';
import { openApp } from '../../../store/actions/index';
import noIcon from '../../../assets/icons/noIcon.png';
import * as Styles from './styles';

class Item extends Component {
  state = {
    displayIcon: noIcon,
    displayName: '',
    isDragging: false,
    gridPosition: {
      rowPos: 'auto',
      colPos: 'auto'
    },
    position: {
      x: 0,
      y: 0
    }
  };

  componentDidMount() {
    const {
      icon, rowPos, colPos, name
    } = this.props;

    import(`../../../assets/icons/${icon}`)
      .then(res => this.setState(prevState => updateObject(prevState, {
        displayIcon: res.default,
        displayName: name,
        gridPosition: { rowPos, colPos }
      })))
      .catch(err => console.log(err));
  }

  onChangeNameHandler = (e) => {
    const newValue = e.target.value.replace(/[^\w\s]/g, '');
    this.setState({ displayName: newValue });
  };

  onSubmitNameHandler = (e) => {
    if (e.keyCode === 13) {
      const { _id } = this.props;

      axios(`/items/${_id}`, {
        method: 'PUT',
        data: {
          changedValues: {
            name: e.target.value
          }
        }
      }).catch(error => console.log(error));

      const icon = document.getElementById(_id);
      icon.querySelector('p').style.display = 'block';
      icon.lastChild.style.display = 'none';
    }
  };

  onOpenHandler = (e) => {
    const {
      runningApps, minimalizedApps, _id, openAppHandler
    } = this.props;
    if (runningApps.find(app => app.props._id === _id) || minimalizedApps.find(app => app.props._id === _id)) return;

    const { clientX, clientY } = e;
    openAppHandler(this, { clientX, clientY }, runningApps.length);
  };

  render() {
    const {
      _id, type, path, permanent, appLoading
    } = this.props;
    const {
      position,
      gridPosition,
      displayIcon,
      displayName
    } = this.state;

    return (
      <Styles.Container
        data-path={path}
        data-permanent={permanent}
        data-type={type.toString()}
        id={_id}
        // eslint-disable-next-line react/destructuring-assignment
        isDragging={this.state.isDragging}
        draggingTime={this.draggingTime}
        loading={appLoading}
        left={position.x}
        top={position.y}
        onMouseDown={e => onCatchHandler(this, e)}
        onDoubleClick={this.onOpenHandler}
        rowPos={gridPosition.rowPos}
        colPos={gridPosition.colPos}
      >
        <Styles.ItemIcon
          src={displayIcon}
          draggable="false"
          alt="icon"
          scale="huge"
        />
        <Styles.ItemName>
          {displayName.length > 11
            ? `${displayName.substring(0, 10)}...`
            : displayName}
        </Styles.ItemName>
        <Styles.NameChanging
          style={{ display: 'none' }}
          value={displayName}
          onKeyDown={this.onSubmitNameHandler}
          onChange={this.onChangeNameHandler}
        />
      </Styles.Container>
    );
  }
}

const mapStateToProps = state => ({
  appLoading: state.apps.loading,
  runningApps: state.apps.running,
  minimalizedApps: state.apps.minimalized
});

const mapDispatchToProps = dispatch => ({
  openAppHandler: (app, event, runningAppsAmount) => dispatch(openApp(app, event, runningAppsAmount))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Item));
