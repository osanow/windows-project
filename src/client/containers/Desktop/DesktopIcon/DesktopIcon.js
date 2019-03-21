import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import axios from '../../../axios-instance';
import { updateObject } from '../../../utils/utility';
import { openApp } from '../../../store/actions/index';
import noIcon from '../../../assets/icons/noIcon.png';
import * as Styles from './styles';

const calculatePos = (type, value) => {
  if (type === 'row') return Math.abs(Math.ceil(value / (4.8 * 16)));
  return Math.abs(Math.ceil(value / (6.3 * 16)));
};

class Item extends Component {
  state = {
    displayIcon: noIcon,
    displayName: '',
    nameChanging: false,
    isDragging: false,
    opened: false,
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

  onMoveHandler = (e) => {
    const { isDragging } = this.state;
    if (!isDragging) return;
    this.draggingTime++;
    const newX = e.clientX - this.prevX;
    const newY = e.clientY - this.prevY;
    this.setState(prevState => updateObject(prevState, { position: { x: newX, y: newY } }));
  };

  onDropHandler = (e) => {
    const { _id } = this.props;

    this.draggingTime = 0;
    document.removeEventListener('mouseup', this.onDropHandler, false);
    document.removeEventListener('mousemove', this.throttledMouseMove, false);

    const posX = e.clientX
      - (e.target.offsetLeft > 94 || e.target.tagName !== 'DIV'
        ? 0
        : e.target.offsetLeft)
      + (e.target.offsetWidth > 94 || e.target.tagName !== 'DIV'
        ? 0
        : e.target.offsetWidth)
        / 2
      - 22;
    const posY = e.clientY
      - (e.target.offsetTop > 70 || e.target.tagName !== 'DIV'
        ? 0
        : e.target.offsetTop)
      + (e.target.offsetHeight > 70 || e.target.tagName !== 'DIV'
        ? 0
        : e.target.offsetHeight)
        / 2
      - 16;

    const maxRow = calculatePos('row', window.innerHeight - 128);
    const currRow = calculatePos('row', posY);

    const maxCol = calculatePos('col', window.innerWidth - 64);
    const currCol = calculatePos('col', posX);

    const newRow = currRow > maxRow ? maxRow.toString() : currRow.toString();
    const newCol = currCol > maxCol ? maxCol.toString() : currCol.toString();

    this.prevX = 0;
    this.prevY = 0;

    this.setState(prevState => updateObject(prevState, {
      isDragging: false,
      position: { x: 0, y: 0 },
      gridPosition: { rowPos: newRow, colPos: newCol }
    }));

    axios(`/items/${_id}`, {
      method: 'PUT',
      data: {
        changedValues: {
          rowPos: newRow,
          colPos: newCol
        }
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  onCatchHandler = (e) => {
    this.prevX = e.clientX;
    this.prevY = e.clientY;

    this.throttledMouseMove = _.throttle(this.onMoveHandler, 100);
    this.setState({ isDragging: true }, () => {
      this.draggingTime = 0;
      document.addEventListener('mouseup', this.onDropHandler, false);
      document.addEventListener('mousemove', this.throttledMouseMove, false);
    });
  };

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
      this.setState({ nameChanging: false });
    }
  };

  onOpenHandler = (e) => {
    const { opened } = this.state;
    if (opened) return;

    const { openAppHandler, runningApps } = this.props;
    const { clientX, clientY } = e;

    this.setState({ opened: true });
    openAppHandler(this, {clientX, clientY}, runningApps.length);
  };

  render() {
    const {
      _id, type, path, permanent, appLoading
    } = this.props;
    const {
      position,
      gridPosition,
      displayIcon,
      displayName,
      nameChanging
    } = this.state;

    console.log(nameChanging);
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
        onMouseDown={this.onCatchHandler}
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
        {nameChanging ? (
          <Styles.NameChanging
            value={displayName}
            onKeyDown={this.onSubmitNameHandler}
            onChange={this.onChangeNameHandler}
          />
        ) : (
          <Styles.ItemName>
            {displayName.length > 11
              ? `${displayName.substring(0, 10)}...`
              : displayName}
          </Styles.ItemName>
        )}
      </Styles.Container>
    );
  }
}

const mapStateToProps = state => ({
  appLoading: state.apps.loading,
  runningApps: state.apps.running
});

const mapDispatchToProps = dispatch => ({
  openAppHandler: (app, event, runningAppsAmount) => dispatch(openApp(app, event, runningAppsAmount))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Item));
