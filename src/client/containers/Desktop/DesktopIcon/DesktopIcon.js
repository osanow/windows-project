import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-instance';
import { onCatchHandler, updateObject } from '../../../utils/utility';
import { openApp } from '../../../store/actions/index';
import * as Styles from './styles';

class Item extends Component {
  state = {
    displayName: '',
    isDragging: false,
    gridPosition: {
      rowPos: 'auto',
      colPos: 'auto'
    },
    dragPosition: {
      x: 0,
      y: 0
    }
  };

  componentWillMount() {
    const { rowPos, colPos, name } = this.props;
    this.setState({
      displayName: name,
      gridPosition: { rowPos, colPos }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => updateObject(prevState, {
      displayName: nextProps.name
    }));
  }

  onChangeNameHandler = (e) => {
    const newValue = e.target.value.replace(/[^\w\s]/g, '');
    this.setState({ displayName: newValue });
  };

  onSubmitNameHandler = (e) => {
    if (e.keyCode === 13) {
      const { _id, updateItems } = this.props;

      axios(`/items/${_id}`, {
        method: 'PUT',
        data: {
          changedValues: {
            name: e.target.value
          }
        }
      })
        .then(() => {
          updateItems();
        })
        .catch(error => console.log(error));

      const icon = document.getElementById(_id);
      icon.querySelector('p').style.display = 'block';
      icon.lastChild.style.display = 'none';
    }
  };

  onOpenHandler = (e) => {
    const {
      runningApps, minimalizedApps, _id, openAppHandler
    } = this.props;

    const findedApp = runningApps.find(app => app.props._id === _id)
      || minimalizedApps.find(app => app.props._id === _id);
    if (findedApp) return;

    const { clientX, clientY } = e;
    openAppHandler(this, { clientX, clientY }, runningApps.length);
  };

  render() {
    const {
      _id, type, path, permanent, appLoading, iconPath
    } = this.props;
    const {
      dragPosition, gridPosition, displayName, isDragging
    } = this.state;

    return (
      <Styles.Container
        data-path={path}
        data-permanent={permanent}
        data-type={type}
        id={_id}
        isDragging={isDragging}
        draggingTime={this.draggingTime}
        loading={appLoading}
        onMouseDown={e => onCatchHandler(this, e)}
        onDoubleClick={this.onOpenHandler}
        rowPos={gridPosition.rowPos}
        colPos={gridPosition.colPos}
        style={{
          transform: isDragging
            ? `translate( ${dragPosition.x}px, ${dragPosition.y}px )`
            : 'translate( 0px, 0px )'
        }}
      >
        <Styles.ItemIcon
          src={iconPath}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Item));
